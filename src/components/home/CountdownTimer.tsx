"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer() {
  const dateStr = process.env.NEXT_PUBLIC_TOURNAMENT_DATE;
  const targetDate = dateStr ? new Date(dateStr) : null;

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!targetDate || isNaN(targetDate.getTime())) return;

    setTimeLeft(calculateTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return (
      <div className="glass-card p-6 w-full max-w-sm">
        <div className="skeleton h-4 w-32 mb-4" />
        <div className="skeleton h-16 w-full" />
      </div>
    );
  }

  // No date set
  if (!targetDate || isNaN(targetDate.getTime())) {
    return (
      <div className="glass-card p-6 w-full max-w-sm text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-golden-yellow mb-3 font-[family-name:var(--font-heading)]">
          Tournament Date
        </p>
        <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-foreground">
          DATE TBD
        </p>
        <p className="text-foreground/50 text-sm mt-2 font-[family-name:var(--font-body)]">
          Stay tuned for the announcement
        </p>
      </div>
    );
  }

  // Tournament day has arrived or passed
  if (!timeLeft) {
    return (
      <div className="glass-card p-6 w-full max-w-sm text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-golden-yellow mb-3 font-[family-name:var(--font-heading)]">
          Tournament
        </p>
        <p className="text-2xl font-bold font-[family-name:var(--font-heading)] wavy-text">
          Game Day!
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="glass-card p-6 w-full max-w-sm">
      <p className="text-xs tracking-[0.2em] uppercase text-golden-yellow mb-4 text-center font-[family-name:var(--font-heading)]">
        Countdown
      </p>
      <div className="grid grid-cols-4 gap-3">
        {units.map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="bg-rich-black/60 rounded-lg p-3 border border-foreground/10">
              <p className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-mono)] text-foreground tabular-nums">
                {String(value).padStart(2, "0")}
              </p>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/50 mt-1 font-[family-name:var(--font-heading)]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
