import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 font-[family-name:var(--font-heading)] tracking-tight text-foreground">
          Leaderboard
        </h1>
        <p className="text-text-muted text-sm mb-10 text-center font-[family-name:var(--font-body)]">
          Sunshine Daydream 2026
        </p>

        <LeaderboardTable />
      </div>
    </div>
  );
}
