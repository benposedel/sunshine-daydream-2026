"use client";

import { COURSE_HOLES } from "@/lib/course-data";
import { formatScoreToPar } from "@/components/scoring/StrokeDifferential";
import type { Score } from "@/types";

interface TeamScorecardProps {
  scores: Score[];
}

export function TeamScorecard({ scores }: TeamScorecardProps) {
  function getStrokes(holeNumber: number): number | null {
    const s = scores.find((s) => s.hole_number === holeNumber);
    return s ? s.strokes : null;
  }

  function renderRow(holes: typeof COURSE_HOLES, label: string) {
    return (
      <div className="mb-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1 font-[family-name:var(--font-heading)]">
          {label}
        </p>
        <div className="grid grid-cols-9 gap-1">
          {holes.map((h) => {
            const strokes = getStrokes(h.hole_number);
            const diff = strokes !== null ? strokes - h.par : null;
            return (
              <div key={h.hole_number} className="text-center">
                <div className="text-[9px] text-foreground/30 font-[family-name:var(--font-mono)]">
                  {h.hole_number}
                </div>
                <div className={`text-xs font-[family-name:var(--font-mono)] font-bold ${
                  diff === null ? "text-foreground/20" :
                  diff < 0 ? "text-grateful-red" :
                  diff === 0 ? "text-foreground" : "text-foreground/50"
                }`}>
                  {strokes ?? "-"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const front9 = COURSE_HOLES.filter((h) => h.hole_number <= 9);
  const back9 = COURSE_HOLES.filter((h) => h.hole_number > 9);

  return (
    <div className="pt-3 border-t border-foreground/10">
      {renderRow(front9, "Front 9")}
      {renderRow(back9, "Back 9")}
    </div>
  );
}
