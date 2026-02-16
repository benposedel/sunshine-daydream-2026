"use client";

import { useRealtimeScores } from "@/hooks/useRealtimeScores";
import { TeamRow } from "./TeamRow";
import { COURSE_NAME, COURSE_PAR } from "@/lib/course-data";

export function LeaderboardTable() {
  const { leaderboard, scores, isLoading } = useRealtimeScores();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton h-20 w-full" />
        ))}
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">&#x1F43B;</p>
        <p className="text-foreground/60 text-lg font-[family-name:var(--font-heading)]">
          No teams yet
        </p>
        <p className="text-foreground/40 text-sm mt-2 font-[family-name:var(--font-body)]">
          Register a team and start scoring to see the leaderboard come alive!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-[family-name:var(--font-heading)]">
            {COURSE_NAME}
          </span>
          <span className="text-xs text-foreground/30 font-[family-name:var(--font-mono)]">
            Par {COURSE_PAR}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
          <span className="text-[10px] text-electric-teal font-[family-name:var(--font-body)]">LIVE</span>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {leaderboard.map((entry) => (
          <TeamRow
            key={entry.team_id}
            entry={entry}
            scores={scores}
            isLeader={entry.rank === 1 && entry.holes_completed > 0}
          />
        ))}
      </div>
    </div>
  );
}
