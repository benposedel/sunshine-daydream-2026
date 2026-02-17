"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Team } from "@/types";

interface TeamSelectorProps {
  onSelect: (teamId: string, teamName: string) => void;
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

  const filtered = teams.filter((t) => {
    const term = search.toLowerCase();
    const teamName = t.team_name || "";
    return (
      teamName.toLowerCase().includes(term) ||
      t.player_name.toLowerCase().includes(term) ||
      t.partner_name.toLowerCase().includes(term)
    );
  });

  function getDisplayName(team: Team): string {
    return team.team_name || `${team.player_name} & ${team.partner_name}`;
  }

  function handleSelect(team: Team) {
    onSelect(team.id, getDisplayName(team));
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
            onClick={() => handleSelect(team)}
            className="w-full glass-card p-4 text-left hover:border-sunset-orange/40 transition-colors cursor-pointer"
          >
            <p className="text-foreground font-bold font-[family-name:var(--font-heading)]">
              {getDisplayName(team)}
            </p>
            {team.team_name && (
              <p className="text-foreground/40 text-xs font-[family-name:var(--font-body)] mt-1">
                {team.player_name} & {team.partner_name}
              </p>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
