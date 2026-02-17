"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TeamSelector } from "@/components/scoring/TeamSelector";
import { HoleScoring } from "@/components/scoring/HoleScoring";
import { Button } from "@/components/ui/Button";

type View = "select" | "pin" | "scoring";

export default function ScoringPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [view, setView] = useState<View>("select");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  function handleTeamSelect(teamId: string, teamName: string) {
    setSelectedTeamId(teamId);
    setSelectedTeamName(teamName);
    setView("pin");
    setPin("");
    setPinError("");
  }

  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pin || !selectedTeamId) return;

    setIsVerifying(true);
    setPinError("");

    try {
      const res = await fetch("/api/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_id: selectedTeamId, pin }),
      });

      if (res.ok) {
        localStorage.setItem("scoring_team_id", selectedTeamId);
        setView("scoring");
      } else {
        setPinError("Incorrect PIN — try again");
      }
    } catch {
      setPinError("Something went wrong");
    } finally {
      setIsVerifying(false);
    }
  }

  function handleChangeTeam() {
    localStorage.removeItem("scoring_team_id");
    setSelectedTeamId(null);
    setSelectedTeamName("");
    setView("select");
    setPin("");
    setPinError("");
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

        {view === "scoring" && selectedTeamId ? (
          <div>
            {/* Team name banner */}
            <div className="text-center mb-6">
              <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-[family-name:var(--font-heading)]">
                Scoring for
              </span>
              <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-golden-yellow">
                {selectedTeamName}
              </p>
            </div>
            <HoleScoring teamId={selectedTeamId} onChangeTeam={handleChangeTeam} />
          </div>
        ) : view === "pin" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto"
          >
            <div className="glass-card p-8 text-center">
              <p className="text-foreground/60 text-sm mb-1 font-[family-name:var(--font-body)]">
                {selectedTeamName}
              </p>
              <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-foreground mb-6">
                Enter Your PIN
              </h2>

              <form onSubmit={handlePinSubmit}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                    setPinError("");
                  }}
                  placeholder="0000"
                  autoFocus
                  className={`w-full text-center text-4xl tracking-[0.5em] font-[family-name:var(--font-mono)] font-bold bg-rich-black/50 border-2 ${
                    pinError ? "border-grateful-red/60 animate-[shake_0.3s_ease-in-out]" : "border-foreground/20"
                  } text-foreground rounded-lg px-4 py-4 focus:outline-none focus:border-rose-magenta transition-colors mb-4`}
                />

                {pinError && (
                  <p className="text-grateful-red text-sm mb-4 font-[family-name:var(--font-body)]">
                    {pinError}
                  </p>
                )}

                <Button type="submit" variant="primary" size="lg" isLoading={isVerifying} className="w-full mb-3">
                  Unlock Scoring
                </Button>

                <button
                  type="button"
                  onClick={handleChangeTeam}
                  className="text-foreground/40 text-sm hover:text-foreground/60 transition-colors font-[family-name:var(--font-body)] cursor-pointer"
                >
                  &larr; Different team
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <div>
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-center">
              Select Your Team
            </h2>
            <TeamSelector onSelect={handleTeamSelect} />
          </div>
        )}
      </div>
    </div>
  );
}
