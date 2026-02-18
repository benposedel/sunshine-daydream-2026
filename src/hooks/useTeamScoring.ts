"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { queueScore, getPendingScores, clearPendingScore } from "@/lib/offline-queue";
import { useOnlineStatus } from "./useOnlineStatus";
import type { Score } from "@/types";

export function useTeamScoring(teamId: string | null) {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingHoles, setSavingHoles] = useState<Set<number>>(new Set());
  const [pendingCount, setPendingCount] = useState(0);
  const [syncedMessage, setSyncedMessage] = useState(false);
  const isOnline = useOnlineStatus();
  const syncingRef = useRef(false);

  // Fetch existing scores for this team
  useEffect(() => {
    if (!teamId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    supabase
      .from("scores")
      .select("*")
      .eq("team_id", teamId)
      .order("hole_number")
      .then(({ data }) => {
        if (data) setScores(data);
        setIsLoading(false);
      });
  }, [teamId]);

  // Sync pending scores when coming back online
  useEffect(() => {
    if (!isOnline || !teamId || syncingRef.current) return;

    async function syncPending() {
      syncingRef.current = true;
      const pending = await getPendingScores();
      const teamPending = pending.filter((p) => p.team_id === teamId);

      if (teamPending.length === 0) {
        syncingRef.current = false;
        return;
      }

      let synced = 0;
      for (const entry of teamPending) {
        const { data, error } = await supabase
          .from("scores")
          .upsert(
            { team_id: entry.team_id, hole_number: entry.hole_number, strokes: entry.strokes },
            { onConflict: "team_id,hole_number" }
          )
          .select()
          .single();

        if (!error) {
          await clearPendingScore(entry.key);
          synced++;
          if (data) {
            setScores((prev) => {
              const exists = prev.some((s) => s.hole_number === entry.hole_number && s.team_id === entry.team_id);
              if (exists) {
                return prev.map((s) =>
                  s.hole_number === entry.hole_number && s.team_id === entry.team_id ? data : s
                );
              }
              return [...prev, data];
            });
          }
        }
      }

      setPendingCount(0);
      if (synced > 0) {
        setSyncedMessage(true);
        setTimeout(() => setSyncedMessage(false), 3000);
      }
      syncingRef.current = false;
    }

    syncPending();
  }, [isOnline, teamId]);

  const getScoreForHole = useCallback(
    (holeNumber: number): number | null => {
      const score = scores.find((s) => s.hole_number === holeNumber);
      return score ? score.strokes : null;
    },
    [scores]
  );

  const submitScore = useCallback(
    async (holeNumber: number, strokes: number) => {
      if (!teamId) return;

      // Optimistic update
      setSavingHoles((prev) => new Set(prev).add(holeNumber));
      setScores((prev) => {
        const existing = prev.find((s) => s.hole_number === holeNumber);
        if (existing) {
          return prev.map((s) =>
            s.hole_number === holeNumber ? { ...s, strokes, updated_at: new Date().toISOString() } : s
          );
        }
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            team_id: teamId,
            hole_number: holeNumber,
            strokes,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
      });

      // If offline, queue for later
      if (!navigator.onLine) {
        await queueScore(teamId, holeNumber, strokes);
        setPendingCount((prev) => prev + 1);
        setSavingHoles((prev) => {
          const next = new Set(prev);
          next.delete(holeNumber);
          return next;
        });
        return;
      }

      // Upsert to Supabase
      const { data, error } = await supabase
        .from("scores")
        .upsert(
          { team_id: teamId, hole_number: holeNumber, strokes },
          { onConflict: "team_id,hole_number" }
        )
        .select()
        .single();

      if (error) {
        // Network failed mid-request — queue it
        await queueScore(teamId, holeNumber, strokes);
        setPendingCount((prev) => prev + 1);
      } else if (data) {
        setScores((prev) =>
          prev.map((s) =>
            s.hole_number === holeNumber && s.team_id === teamId ? data : s
          )
        );
      }

      setSavingHoles((prev) => {
        const next = new Set(prev);
        next.delete(holeNumber);
        return next;
      });
    },
    [teamId]
  );

  const totalStrokes = scores.reduce((sum, s) => sum + s.strokes, 0);
  const holesCompleted = scores.length;

  return {
    scores,
    isLoading,
    savingHoles,
    getScoreForHole,
    submitScore,
    totalStrokes,
    holesCompleted,
    isOnline,
    pendingCount,
    syncedMessage,
  };
}
