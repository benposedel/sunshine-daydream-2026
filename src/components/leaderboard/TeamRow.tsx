"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COURSE_HOLES_COUNT } from "@/lib/course-data";
import { formatScoreToPar } from "@/components/scoring/StrokeDifferential";
import { TeamScorecard } from "./TeamScorecard";
import type { LeaderboardEntry, Score } from "@/types";

interface TeamRowProps {
  entry: LeaderboardEntry;
  scores: Score[];
  isLeader: boolean;
}

export function TeamRow({ entry, scores, isLeader }: TeamRowProps) {
  const [expanded, setExpanded] = useState(false);
  const teamScores = scores.filter((s) => s.team_id === entry.team_id);
  const isFinished = entry.holes_completed === COURSE_HOLES_COUNT;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-4 cursor-pointer transition-colors ${
        isLeader ? "border-golden-yellow/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="w-10 text-center">
          <span className={`text-lg font-bold font-[family-name:var(--font-mono)] ${
            isLeader ? "text-golden-yellow" : "text-foreground/60"
          }`}>
            {entry.tied ? "T" : ""}{entry.rank}
          </span>
        </div>

        {/* Team name */}
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-bold font-[family-name:var(--font-heading)] truncate text-sm">
            {entry.team_name}
          </p>
          <p className="text-foreground/40 text-xs font-[family-name:var(--font-body)]">
            {isFinished ? "F" : `Thru ${entry.holes_completed}`}
            {!isFinished && entry.holes_completed > 0 && (
              <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
            )}
          </p>
        </div>

        {/* Score to par */}
        <div className="text-right">
          <span className={`text-xl font-bold font-[family-name:var(--font-mono)] ${
            entry.holes_completed === 0 ? "text-foreground/30" :
            entry.score_to_par < 0 ? "text-grateful-red" :
            entry.score_to_par === 0 ? "text-foreground" : "text-foreground/60"
          }`}>
            {entry.holes_completed > 0 ? formatScoreToPar(entry.score_to_par) : "--"}
          </span>
          {entry.holes_completed > 0 && (
            <p className="text-foreground/40 text-xs font-[family-name:var(--font-mono)]">
              {entry.total_strokes}
            </p>
          )}
        </div>
      </div>

      {/* Expanded scorecard */}
      {expanded && teamScores.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3"
        >
          <TeamScorecard scores={teamScores} />
        </motion.div>
      )}
    </motion.div>
  );
}
