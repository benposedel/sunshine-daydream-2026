"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Team } from "@/types";

interface TeamSelectorProps {
  onSelect: (teamId: string) => void;
}

export function TeamSelector({ onSelect }: TeamSelectorProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setTeams(data);
        setIsLoading(false);
      });
  }, []);

  // Check localStorage for previously selected team
  useEffect(() => {
    const saved = localStorage.getItem("scoring_team_id");
    if (saved) onSelect(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = teams.filter((t) => {
    const term = search.toLowerCase();
    return (
      t.player_name.toLowerCase().includes(term) ||
      t.partner_name.toLowerCase().includes(term)
    );
  });

  function handleSelect(teamId: string) {
    localStorage.setItem("scoring_team_id", teamId);
    onSelect(teamId);
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-20 w-full" />
        ))}
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">&#x1F43B;</p>
        <p className="text-foreground/60 font-[family-name:var(--font-body)]">
          No teams registered yet.
        </p>
        <p className="text-foreground/40 text-sm mt-2 font-[family-name:var(--font-body)]">
          Register a team first to start scoring.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search teams..."
        className="w-full bg-rich-black/50 border-2 border-foreground/20 text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors mb-4 font-[family-name:var(--font-body)]"
      />

      {/* Team list */}
      <div className="space-y-3">
        {filtered.map((team, i) => (
          <motion.button
            key={team.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleSelect(team.id)}
            className="w-full glass-card p-4 text-left hover:border-sunset-orange/40 transition-colors cursor-pointer"
          >
            <p className="text-foreground font-bold font-[family-name:var(--font-heading)]">
              {team.player_name} & {team.partner_name}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
