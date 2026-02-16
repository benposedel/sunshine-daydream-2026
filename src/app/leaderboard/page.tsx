import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen psychedelic-bg noise-overlay">
      <div className="lava-blob lava-blob-2" />
      <div className="lava-blob lava-blob-5" />
      <div className="lava-blob lava-blob-8" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 font-[family-name:var(--font-heading)] tracking-tight">
          <span className="text-foreground psychedelic-glow">Leader</span>
          <span className="wavy-text">board</span>
        </h1>
        <p className="text-foreground/50 text-sm mb-10 text-center font-[family-name:var(--font-body)]">
          Sunshine Daydream 2026
        </p>

        <LeaderboardTable />
      </div>
    </div>
  );
}
