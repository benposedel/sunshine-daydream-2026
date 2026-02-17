"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { SHIRT_SIZES, type ShirtSize, type RegistrationFormData, type Team } from "@/types";

export default function Register() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: "",
    playerName: "",
    playerPin: "",
    playerPinConfirm: "",
    partnerName: "",
    partnerPin: "",
    partnerPinConfirm: "",
    shirtSize: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [showSetPin, setShowSetPin] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
    if (!formData.playerName.trim()) newErrors.playerName = "Player name is required";
    if (!formData.partnerName.trim()) newErrors.partnerName = "Partner name is required";
    if (!formData.shirtSize) newErrors.shirtSize = "Please select a shirt size";

    // Player PIN
    if (!formData.playerPin) {
      newErrors.playerPin = "PIN is required";
    } else if (!/^\d{4}$/.test(formData.playerPin)) {
      newErrors.playerPin = "PIN must be exactly 4 digits";
    } else if (formData.playerPin === "1234") {
      newErrors.playerPin = "This PIN is reserved, please choose a different one.";
    }
    if (formData.playerPin && formData.playerPin !== formData.playerPinConfirm) {
      newErrors.playerPinConfirm = "PINs don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name: formData.teamName.trim(),
          player1_name: formData.playerName.trim(),
          player2_name: formData.partnerName.trim(),
          player_pin: formData.playerPin,
          partner_pin: "",
          shirt_size: formData.shirtSize,
          notes: formData.notes.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          teamName: "", playerName: "", playerPin: "", playerPinConfirm: "",
          partnerName: "", partnerPin: "", partnerPinConfirm: "",
          shirtSize: "", notes: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
        setSubmitError(data.error || "Something went wrong.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearError(field: string) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  return (
    <div className="min-h-screen psychedelic-bg noise-overlay">
      <div className="lava-blob lava-blob-2" />
      <div className="lava-blob lava-blob-4" />
      <div className="lava-blob lava-blob-6" />

      <div className="relative z-10 flex flex-col items-center px-6 py-16 md:py-24 max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="self-start text-foreground/50 text-sm tracking-[0.1em] uppercase mb-12 hover:text-sunset-orange transition-colors flex items-center gap-2 font-[family-name:var(--font-body)]"
        >
          <span>&larr; Back</span>
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/wabodogs-logo.png"
            alt="WABO DOGS"
            width={300}
            height={50}
            priority
            className="w-[180px] md:w-[260px]"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 font-[family-name:var(--font-heading)] tracking-tight">
          <span className="text-foreground psychedelic-glow">Tournament</span>{" "}
          <span className="wavy-text">Registration</span>
        </h1>

        <p className="text-foreground/50 text-sm mb-10 text-center font-[family-name:var(--font-body)]">
          Register your team for Sunshine Daydream 2026
        </p>

        {/* Success State with Venmo */}
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full space-y-6"
            >
              <div className="glass-card p-8 text-center">
                <div className="text-5xl mb-4">&#x26A1;</div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-golden-yellow mb-2">
                  You&apos;re Registered!
                </h2>
                <p className="text-foreground/70 font-[family-name:var(--font-body)] mb-6">
                  We&apos;ll be in touch soon with details. Complete your entry by paying the tournament fee below.
                </p>

                {/* Venmo Payment */}
                <div className="border-t border-foreground/10 pt-6 mt-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3 font-[family-name:var(--font-heading)]">
                    Tournament Fee &mdash; $60 per player
                  </p>
                  <a
                    href="https://venmo.com/u/Ben-Posedel?txn=pay&amount=60&note=Sunshine%20Daydream%202026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#008CFF] text-white font-bold font-[family-name:var(--font-heading)] text-lg tracking-wider uppercase px-10 py-4 rounded-lg hover:bg-[#0074d4] transition-colors min-h-[52px] w-full md:w-auto"
                  >
                    Pay with Venmo
                  </a>
                  <p className="text-foreground/40 text-xs mt-3 font-[family-name:var(--font-body)]">
                    Pay via Venmo to @Ben-Posedel
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setSubmitStatus("idle")}
                >
                  Register Another Team
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="forms" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
              <form onSubmit={handleSubmit} className="w-full glass-card p-8 mb-6">
                {/* Error banner */}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-lg border border-grateful-red/30 bg-grateful-red/10 text-grateful-red text-sm text-center font-[family-name:var(--font-body)]">
                    {submitError}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Team Name */}
                  <FormField label="Team Name" id="teamName" error={errors.teamName}
                    value={formData.teamName}
                    onChange={(v) => { setFormData({ ...formData, teamName: v }); clearError("teamName"); }}
                    placeholder='e.g., "The Birdie Boys"'
                  />

                  {/* Divider */}
                  <div className="border-t border-foreground/10 pt-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-electric-teal/60 mb-4 font-[family-name:var(--font-heading)]">
                      Player 1
                    </p>
                  </div>

                  {/* Player Name */}
                  <FormField label="Player Name" id="playerName" error={errors.playerName}
                    value={formData.playerName}
                    onChange={(v) => { setFormData({ ...formData, playerName: v }); clearError("playerName"); }}
                    placeholder="Your name"
                  />

                  {/* Player PIN */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Your 4-Digit PIN" id="playerPin" error={errors.playerPin}
                      value={formData.playerPin}
                      onChange={(v) => { setFormData({ ...formData, playerPin: v.replace(/\D/g, "").slice(0, 4) }); clearError("playerPin"); }}
                      placeholder="0000" inputMode="numeric" maxLength={4}
                    />
                    <FormField label="Confirm PIN" id="playerPinConfirm" error={errors.playerPinConfirm}
                      value={formData.playerPinConfirm}
                      onChange={(v) => { setFormData({ ...formData, playerPinConfirm: v.replace(/\D/g, "").slice(0, 4) }); clearError("playerPinConfirm"); }}
                      placeholder="0000" inputMode="numeric" maxLength={4}
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-foreground/10 pt-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-electric-teal/60 mb-4 font-[family-name:var(--font-heading)]">
                      Player 2
                    </p>
                  </div>

                  {/* Partner Name */}
                  <FormField label="Partner Name" id="partnerName" error={errors.partnerName}
                    value={formData.partnerName}
                    onChange={(v) => { setFormData({ ...formData, partnerName: v }); clearError("partnerName"); }}
                    placeholder="Your partner's name"
                  />

                  {/* Divider */}
                  <div className="border-t border-foreground/10 pt-4" />

                  {/* Shirt Size - Radio buttons */}
                  <div>
                    <label className="block text-rose-magenta text-xs tracking-[0.2em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                      Shirt Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SHIRT_SIZES.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, shirtSize: size as ShirtSize });
                            clearError("shirtSize");
                          }}
                          className={`px-4 py-2.5 rounded-lg text-sm font-[family-name:var(--font-body)] font-medium transition-all min-w-[56px] cursor-pointer ${
                            formData.shirtSize === size
                              ? "bg-sunset-orange text-rich-black border-2 border-sunset-orange"
                              : "bg-rich-black/50 text-foreground/70 border-2 border-foreground/20 hover:border-foreground/40"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {errors.shirtSize && (
                      <p className="mt-1 text-xs text-grateful-red font-[family-name:var(--font-body)]">{errors.shirtSize}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-rose-magenta text-xs tracking-[0.2em] uppercase mb-2 font-[family-name:var(--font-heading)]"
                    >
                      Notes <span className="text-foreground/30">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-rich-black/50 border-2 border-foreground/20 text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors resize-none font-[family-name:var(--font-body)]"
                      placeholder="Dietary restrictions, song requests, etc."
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
                    Register Team
                  </Button>
                </div>
              </form>

              {/* Set PIN link */}
              <div className="text-center">
                <button
                  onClick={() => setShowSetPin(!showSetPin)}
                  className="text-foreground/40 text-sm hover:text-electric-teal transition-colors font-[family-name:var(--font-body)] cursor-pointer underline underline-offset-4"
                >
                  Already registered? Set your PIN here
                </button>
              </div>

              {/* Set PIN form */}
              <AnimatePresence>
                {showSetPin && <SetPinForm />}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-10 text-foreground/20 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
          A WABO DOGS Production
        </div>
      </div>
    </div>
  );
}

// ── Reusable form field ──

function FormField({ label, id, error, value, onChange, placeholder, inputMode, maxLength }: {
  label: string;
  id: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: "text" | "numeric";
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-rose-magenta text-xs tracking-[0.2em] uppercase mb-2 font-[family-name:var(--font-heading)]">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full bg-rich-black/50 border-2 ${
          error ? "border-grateful-red/60" : "border-foreground/20"
        } text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)]`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-xs text-grateful-red font-[family-name:var(--font-body)]">{error}</p>
      )}
    </div>
  );
}

// ── Set PIN mini-form ──

function SetPinForm() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setTeams(data);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!selectedTeamId || !playerName.trim() || !pin) {
      setError("All fields are required");
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits");
      return;
    }
    if (pin === "1234") {
      setError("This PIN is reserved, please choose a different one.");
      return;
    }
    if (pin !== pinConfirm) {
      setError("PINs don't match");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/set-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_id: selectedTeamId, player_name: playerName.trim(), pin }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to set PIN");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="glass-card p-6 mt-6">
        <h3 className="text-sm font-bold font-[family-name:var(--font-heading)] text-foreground mb-4">
          Set Your PIN
        </h3>

        {success ? (
          <p className="text-electric-teal text-sm font-[family-name:var(--font-body)]">
            PIN set successfully!
          </p>
        ) : (
          <div className="space-y-4">
            {error && (
              <p className="text-grateful-red text-xs font-[family-name:var(--font-body)]">{error}</p>
            )}

            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full bg-rich-black/50 border-2 border-foreground/20 text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)] appearance-none cursor-pointer"
            >
              <option value="">Select your team</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.team_name || `${t.player1_name} & ${t.player2_name}`}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name (must match registration)"
              className="w-full bg-rich-black/50 border-2 border-foreground/20 text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)]"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                maxLength={4}
                placeholder="4-digit PIN"
                className="w-full bg-rich-black/50 border-2 border-foreground/20 text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)]"
              />
              <input
                type="text"
                value={pinConfirm}
                onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                maxLength={4}
                placeholder="Confirm PIN"
                className="w-full bg-rich-black/50 border-2 border-foreground/20 text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)]"
              />
            </div>

            <Button type="submit" variant="secondary" size="md" isLoading={isSubmitting} className="w-full">
              Set PIN
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  );
}
