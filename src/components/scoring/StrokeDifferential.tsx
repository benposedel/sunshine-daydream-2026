"use client";

interface StrokeDifferentialProps {
  strokes: number;
  par: number;
}

function getScoreLabel(diff: number): string {
  if (diff <= -3) return "Albatross!";
  if (diff === -2) return "Eagle";
  if (diff === -1) return "Birdie";
  if (diff === 0) return "Par";
  if (diff === 1) return "Bogey";
  if (diff === 2) return "Double Bogey";
  return `+${diff}`;
}

function getScoreColor(diff: number): string {
  if (diff < 0) return "text-grateful-red font-bold";
  if (diff === 0) return "text-foreground";
  return "text-foreground/60";
}

export function formatScoreToPar(score: number): string {
  if (score === 0) return "E";
  if (score > 0) return `+${score}`;
  return `${score}`;
}

export function StrokeDifferential({ strokes, par }: StrokeDifferentialProps) {
  const diff = strokes - par;
  const label = getScoreLabel(diff);
  const color = getScoreColor(diff);

  return (
    <div className="text-center">
      <span className={`text-lg font-[family-name:var(--font-mono)] ${color}`}>
        {formatScoreToPar(diff)}
      </span>
      <span className={`block text-xs mt-1 ${color} opacity-70 font-[family-name:var(--font-body)]`}>
        {label}
      </span>
    </div>
  );
}
