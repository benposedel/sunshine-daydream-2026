"use client";

import { useState } from "react";
import { TeamSelector } from "@/components/scoring/TeamSelector";
import { HoleScoring } from "@/components/scoring/HoleScoring";

export default function ScoringPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  function handleChangeTeam() {
    localStorage.removeItem("scoring_team_id");
    setSelectedTeamId(null);
  }

  return (
    <div className="min-h-screen psychedelic-bg noise-overlay">
      <div className="lava-blob lava-blob-1" />
      <div className="lava-blob lava-blob-4" />
      <div className="lava-blob lava-blob-7" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 font-[family-name:var(--font-heading)] tracking-tight">
          <span className="text-foreground psychedelic-glow">Live</span>{" "}
          <span className="wavy-text">Scoring</span>
        </h1>
        <p className="text-foreground/50 text-sm mb-10 text-center font-[family-name:var(--font-body)]">
          Enter your scores hole by hole
        </p>

        {selectedTeamId ? (
          <HoleScoring teamId={selectedTeamId} onChangeTeam={handleChangeTeam} />
        ) : (
          <div>
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-center">
              Select Your Team
            </h2>
            <TeamSelector onSelect={setSelectedTeamId} />
          </div>
        )}
      </div>
    </div>
  );
}
