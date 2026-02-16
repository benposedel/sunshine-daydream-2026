"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { COURSE_HOLES } from "@/lib/course-data";
import type { Team, Score, LeaderboardEntry } from "@/types";

export function useRealtimeScores() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    async function load() {
      const [teamsRes, scoresRes] = await Promise.all([
        supabase.from("teams").select("*"),
        supabase.from("scores").select("*"),
      ]);
      if (teamsRes.data) setTeams(teamsRes.data);
      if (scoresRes.data) setScores(scoresRes.data);
      setIsLoading(false);
    }
    load();
  }, []);

  // Real-time subscription for scores
  useEffect(() => {
    const channel = supabase
      .channel("scores-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "scores" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setScores((prev) => [...prev, payload.new as Score]);
          } else if (payload.eventType === "UPDATE") {
            setScores((prev) =>
              prev.map((s) =>
                s.id === (payload.new as Score).id
                  ? (payload.new as Score)
                  : s
              )
            );
          } else if (payload.eventType === "DELETE") {
            setScores((prev) =>
              prev.filter((s) => s.id !== (payload.old as Score).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Real-time subscription for teams (new registrations)
  useEffect(() => {
    const channel = supabase
      .channel("teams-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "teams" },
        (payload) => {
          setTeams((prev) => [...prev, payload.new as Team]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Derive leaderboard
  const leaderboard: LeaderboardEntry[] = useMemo(() => {
    const entries = teams.map((team) => {
      const teamScores = scores.filter((s) => s.team_id === team.id);
      const holesCompleted = teamScores.length;
      const totalStrokes = teamScores.reduce((sum, s) => sum + s.strokes, 0);

      const completedHoleNumbers = teamScores.map((s) => s.hole_number);
      const parForCompleted = COURSE_HOLES
        .filter((h) => completedHoleNumbers.includes(h.hole_number))
        .reduce((sum, h) => sum + h.par, 0);

      return {
        rank: 0,
        tied: false,
        team_id: team.id,
        team_name: `${team.player_name} & ${team.partner_name}`,
        score_to_par: holesCompleted > 0 ? totalStrokes - parForCompleted : 0,
        total_strokes: totalStrokes,
        holes_completed: holesCompleted,
      };
    });

    // Sort: lowest score to par first, then most holes completed
    entries.sort((a, b) => {
      if (a.score_to_par !== b.score_to_par) return a.score_to_par - b.score_to_par;
      return b.holes_completed - a.holes_completed;
    });

    // Assign ranks with tie handling
    let currentRank = 1;
    entries.forEach((entry, i) => {
      if (i > 0 && entry.score_to_par === entries[i - 1].score_to_par && entry.holes_completed > 0) {
        entry.rank = entries[i - 1].rank;
        entry.tied = true;
        entries[i - 1].tied = true;
      } else {
        entry.rank = currentRank;
      }
      currentRank = i + 2;
    });

    return entries;
  }, [teams, scores]);

  return { teams, scores, leaderboard, isLoading };
}
