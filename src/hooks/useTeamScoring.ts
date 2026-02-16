"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Score } from "@/types";

export function useTeamScoring(teamId: string | null) {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingHoles, setSavingHoles] = useState<Set<number>>(new Set());

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

      // Upsert to Supabase
      const { data, error } = await supabase
        .from("scores")
        .upsert(
          { team_id: teamId, hole_number: holeNumber, strokes },
          { onConflict: "team_id,hole_number" }
        )
        .select()
        .single();

      if (data && !error) {
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

  return { scores, isLoading, savingHoles, getScoreForHole, submitScore, totalStrokes, holesCompleted };
}
