"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COURSE_HOLES, COURSE_HOLES_COUNT } from "@/lib/course-data";
import { useTeamScoring } from "@/hooks/useTeamScoring";
import { StrokeDifferential, formatScoreToPar } from "./StrokeDifferential";
import { OfflineIndicator } from "@/components/ui/OfflineIndicator";

interface HoleScoringProps {
  teamId: string;
  onChangeTeam: () => void;
}

export function HoleScoring({ teamId, onChangeTeam }: HoleScoringProps) {
  const [currentHole, setCurrentHole] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const { scores, isLoading, savingHoles, getScoreForHole, submitScore, totalStrokes, holesCompleted, isOnline, pendingCount, syncedMessage } = useTeamScoring(teamId);

  const hole = COURSE_HOLES.find((h) => h.hole_number === currentHole)!;
  const currentStrokes = getScoreForHole(currentHole);
  const displayStrokes = currentStrokes ?? hole.par;

  // Calculate running score to par
  const runningScoreToPar = scores.reduce((acc, s) => {
    const h = COURSE_HOLES.find((c) => c.hole_number === s.hole_number);
    return acc + (h ? s.strokes - h.par : 0);
  }, 0);

  function handleStrokeChange(newStrokes: number) {
    if (newStrokes < 1 || newStrokes > 15) return;
    submitScore(currentHole, newStrokes);
  }

  function submitCurrentIfNeeded() {
    if (currentStrokes === null) {
      submitScore(currentHole, hole.par);
    }
  }

  function goToHole(nextHole: number) {
    if (nextHole >= 1 && nextHole <= COURSE_HOLES_COUNT) {
      submitCurrentIfNeeded();
      setCurrentHole(nextHole);
      setShowSummary(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-32 mx-auto" />
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (showSummary) {
    return (
      <ScoringRoundSummary
        scores={scores}
        onEditHole={(h) => goToHole(h)}
        onBack={() => setShowSummary(false)}
        onChangeTeam={onChangeTeam}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onChangeTeam}
          className="text-foreground/50 text-sm hover:text-sunset-orange transition-colors font-[family-name:var(--font-body)] cursor-pointer"
        >
          &larr; Change Team
        </button>
        <button
          onClick={() => setShowSummary(true)}
          className="text-electric-teal text-sm hover:text-electric-teal/80 transition-colors font-[family-name:var(--font-body)] cursor-pointer"
        >
          View Summary
        </button>
      </div>

      {/* Offline / sync status */}
      <OfflineIndicator isOnline={isOnline} pendingCount={pendingCount} syncedMessage={syncedMessage} />

      {/* Running score */}
      <div className="text-center mb-2">
        <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-[family-name:var(--font-heading)]">
          Round Score
        </span>
        <span className={`ml-2 font-[family-name:var(--font-mono)] font-bold ${
          runningScoreToPar < 0 ? "text-grateful-red" : runningScoreToPar === 0 ? "text-foreground" : "text-foreground/70"
        }`}>
          {formatScoreToPar(runningScoreToPar)}
        </span>
        <span className="ml-2 text-xs text-foreground/40 font-[family-name:var(--font-body)]">
          ({holesCompleted} holes)
        </span>
      </div>

      {/* Hole indicator dots */}
      <div className="flex justify-center gap-1.5 mb-8 flex-wrap">
        {COURSE_HOLES.map((h) => {
          const hasScore = getScoreForHole(h.hole_number) !== null;
          const isCurrent = h.hole_number === currentHole;
          return (
            <button
              key={h.hole_number}
              onClick={() => goToHole(h.hole_number)}
              className={`w-6 h-6 rounded-full text-[10px] font-[family-name:var(--font-mono)] font-bold transition-all cursor-pointer ${
                isCurrent
                  ? "bg-sunset-orange text-rich-black scale-110"
                  : hasScore
                  ? "bg-electric-teal/30 text-electric-teal"
                  : "bg-foreground/10 text-foreground/30"
              }`}
            >
              {h.hole_number}
            </button>
          );
        })}
      </div>

      {/* Hole info */}
      <motion.div
        key={currentHole}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="glass-card p-8 text-center"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-1 font-[family-name:var(--font-heading)]">
          Hole
        </p>
        <p className="text-6xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-2">
          {currentHole}
        </p>
        <div className="flex justify-center gap-6 mb-8 text-sm">
          <span className="text-foreground/60 font-[family-name:var(--font-body)]">
            Par <span className="text-foreground font-[family-name:var(--font-mono)] font-bold">{hole.par}</span>
          </span>
          <span className="text-foreground/60 font-[family-name:var(--font-body)]">
            <span className="text-foreground font-[family-name:var(--font-mono)] font-bold">{hole.yardage}</span> yds
          </span>
        </div>

        {/* Score stepper */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={() => handleStrokeChange(displayStrokes - 1)}
            disabled={displayStrokes <= 1}
            className="w-14 h-14 rounded-full bg-sunset-orange/20 text-sunset-orange text-2xl font-bold hover:bg-sunset-orange/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          >
            -
          </button>
          <div className="relative">
            <span className="text-6xl font-bold font-[family-name:var(--font-mono)] text-foreground tabular-nums">
              {displayStrokes}
            </span>
            {savingHoles.has(currentHole) && (
              <span className="absolute -top-1 -right-3 w-2 h-2 bg-sunset-orange rounded-full animate-pulse" />
            )}
          </div>
          <button
            onClick={() => handleStrokeChange(displayStrokes + 1)}
            disabled={displayStrokes >= 15}
            className="w-14 h-14 rounded-full bg-sunset-orange/20 text-sunset-orange text-2xl font-bold hover:bg-sunset-orange/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Score differential */}
        {currentStrokes !== null && (
          <StrokeDifferential strokes={currentStrokes} par={hole.par} />
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={() => goToHole(currentHole - 1)}
          disabled={currentHole <= 1}
          className="flex-1 py-3 text-sm font-[family-name:var(--font-heading)] uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          &larr; Prev Hole
        </button>
        {currentHole < COURSE_HOLES_COUNT ? (
          <button
            onClick={() => goToHole(currentHole + 1)}
            className="flex-1 py-3 bg-sunset-orange text-rich-black text-sm font-[family-name:var(--font-heading)] font-bold uppercase tracking-wider rounded-lg hover:bg-sunset-orange/90 transition-colors cursor-pointer"
          >
            Next Hole &rarr;
          </button>
        ) : (
          <button
            onClick={() => { submitCurrentIfNeeded(); setShowSummary(true); }}
            className="flex-1 py-3 bg-golden-yellow text-rich-black text-sm font-[family-name:var(--font-heading)] font-bold uppercase tracking-wider rounded-lg hover:bg-golden-yellow/90 transition-colors cursor-pointer"
          >
            Finish Round
          </button>
        )}
      </div>
    </div>
  );
}

// ── Round Summary (inline) ──

interface ScoringRoundSummaryProps {
  scores: { hole_number: number; strokes: number }[];
  onEditHole: (hole: number) => void;
  onBack: () => void;
  onChangeTeam: () => void;
}

function ScoringRoundSummary({ scores, onEditHole, onBack, onChangeTeam }: ScoringRoundSummaryProps) {
  const front9 = COURSE_HOLES.filter((h) => h.hole_number <= 9);
  const back9 = COURSE_HOLES.filter((h) => h.hole_number > 9);

  function getStrokes(holeNumber: number): number | null {
    const s = scores.find((s) => s.hole_number === holeNumber);
    return s ? s.strokes : null;
  }

  function renderNine(holes: typeof COURSE_HOLES, label: string) {
    const totalPar = holes.reduce((sum, h) => sum + h.par, 0);
    const totalStrokes = holes.reduce((sum, h) => sum + (getStrokes(h.hole_number) ?? 0), 0);
    const holesPlayed = holes.filter((h) => getStrokes(h.hole_number) !== null).length;

    return (
      <div className="mb-6">
        <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3 font-[family-name:var(--font-heading)]">
          {label}
        </h3>
        <div className="space-y-1">
          {holes.map((h) => {
            const strokes = getStrokes(h.hole_number);
            const diff = strokes !== null ? strokes - h.par : null;
            return (
              <button
                key={h.hole_number}
                onClick={() => onEditHole(h.hole_number)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-foreground/40 text-sm font-[family-name:var(--font-mono)] w-6">
                    {h.hole_number}
                  </span>
                  <span className="text-foreground/50 text-sm font-[family-name:var(--font-body)]">
                    Par {h.par}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {strokes !== null ? (
                    <>
                      <span className="text-foreground font-[family-name:var(--font-mono)] font-bold">
                        {strokes}
                      </span>
                      <span className={`text-sm font-[family-name:var(--font-mono)] w-8 text-right ${
                        diff! < 0 ? "text-grateful-red font-bold" : diff === 0 ? "text-foreground/50" : "text-foreground/40"
                      }`}>
                        {formatScoreToPar(diff!)}
                      </span>
                    </>
                  ) : (
                    <span className="text-foreground/20 text-sm font-[family-name:var(--font-body)]">
                      --
                    </span>
                  )}
                </div>
              </button>
            );
          })}
          {/* Subtotal */}
          <div className="flex items-center justify-between py-2 px-3 border-t border-foreground/10 mt-2">
            <span className="text-foreground/60 text-sm font-[family-name:var(--font-heading)] uppercase tracking-wider">
              {label} Total
            </span>
            <div className="flex items-center gap-4">
              <span className="text-foreground font-[family-name:var(--font-mono)] font-bold">
                {holesPlayed > 0 ? totalStrokes : "--"}
              </span>
              <span className="text-foreground/50 text-sm font-[family-name:var(--font-mono)] w-8 text-right">
                {holesPlayed > 0 ? formatScoreToPar(totalStrokes - totalPar) : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalStrokes = scores.reduce((sum, s) => sum + s.strokes, 0);
  const totalPar = scores.reduce((sum, s) => {
    const h = COURSE_HOLES.find((c) => c.hole_number === s.hole_number);
    return sum + (h?.par ?? 0);
  }, 0);
  const totalToPar = totalStrokes - totalPar;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-foreground/50 text-sm hover:text-sunset-orange transition-colors font-[family-name:var(--font-body)] cursor-pointer"
        >
          &larr; Back to Scoring
        </button>
        <button
          onClick={onChangeTeam}
          className="text-foreground/50 text-sm hover:text-sunset-orange transition-colors font-[family-name:var(--font-body)] cursor-pointer"
        >
          Change Team
        </button>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-center mb-2">
          Round Summary
        </h2>

        {/* Total */}
        <div className="text-center mb-6 pb-4 border-b border-foreground/10">
          <span className={`text-4xl font-bold font-[family-name:var(--font-mono)] ${
            totalToPar < 0 ? "text-grateful-red" : totalToPar === 0 ? "text-foreground" : "text-foreground/70"
          }`}>
            {formatScoreToPar(totalToPar)}
          </span>
          <p className="text-foreground/50 text-sm mt-1 font-[family-name:var(--font-body)]">
            {totalStrokes} total strokes &bull; {scores.length} holes played
          </p>
        </div>

        {renderNine(front9, "Front 9")}
        {renderNine(back9, "Back 9")}
      </div>
    </div>
  );
}
