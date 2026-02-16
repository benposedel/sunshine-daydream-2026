"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SHIRT_SIZES, type ShirtSize, type RegistrationFormData } from "@/types";

export default function Register() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    playerName: "",
    partnerName: "",
    shirtSize: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.playerName.trim()) newErrors.playerName = "Player name is required";
    if (!formData.partnerName.trim()) newErrors.partnerName = "Partner name is required";
    if (!formData.shirtSize) newErrors.shirtSize = "Please select a shirt size";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_name: formData.playerName.trim(),
          partner_name: formData.partnerName.trim(),
          shirt_size: formData.shirtSize,
          notes: formData.notes.trim(),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ playerName: "", partnerName: "", shirtSize: "", notes: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Success State */}
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full glass-card p-8 text-center"
            >
              <div className="text-5xl mb-4">&#x26A1;</div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-golden-yellow mb-2">
                You&apos;re In!
              </h2>
              <p className="text-foreground/70 font-[family-name:var(--font-body)] mb-6">
                Registration successful. We&apos;ll be in touch soon with details.
              </p>
              <Button
                variant="secondary"
                onClick={() => setSubmitStatus("idle")}
              >
                Register Another Team
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="w-full glass-card p-8"
            >
              {/* Error banner */}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 rounded-lg border border-grateful-red/30 bg-grateful-red/10 text-grateful-red text-sm text-center font-[family-name:var(--font-body)]">
                  Something went wrong. Please try again.
                </div>
              )}

              <div className="space-y-6">
                {/* Player Name */}
                <div>
                  <label
                    htmlFor="playerName"
                    className="block text-rose-magenta text-xs tracking-[0.2em] uppercase mb-2 font-[family-name:var(--font-heading)]"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    id="playerName"
                    value={formData.playerName}
                    onChange={(e) => {
                      setFormData({ ...formData, playerName: e.target.value });
                      if (errors.playerName) setErrors({ ...errors, playerName: "" });
                    }}
                    className={`w-full bg-rich-black/50 border-2 ${
                      errors.playerName ? "border-grateful-red/60" : "border-foreground/20"
                    } text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)]`}
                    placeholder="Your name"
                  />
                  {errors.playerName && (
                    <p className="mt-1 text-xs text-grateful-red font-[family-name:var(--font-body)]">{errors.playerName}</p>
                  )}
                </div>

                {/* Partner Name */}
                <div>
                  <label
                    htmlFor="partnerName"
                    className="block text-rose-magenta text-xs tracking-[0.2em] uppercase mb-2 font-[family-name:var(--font-heading)]"
                  >
                    Partner Name
                  </label>
                  <input
                    type="text"
                    id="partnerName"
                    value={formData.partnerName}
                    onChange={(e) => {
                      setFormData({ ...formData, partnerName: e.target.value });
                      if (errors.partnerName) setErrors({ ...errors, partnerName: "" });
                    }}
                    className={`w-full bg-rich-black/50 border-2 ${
                      errors.partnerName ? "border-grateful-red/60" : "border-foreground/20"
                    } text-foreground rounded-lg px-4 py-3 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)]`}
                    placeholder="Your partner's name"
                  />
                  {errors.partnerName && (
                    <p className="mt-1 text-xs text-grateful-red font-[family-name:var(--font-body)]">{errors.partnerName}</p>
                  )}
                </div>

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
                          if (errors.shirtSize) setErrors({ ...errors, shirtSize: "" });
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
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  Register Team
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer decoration */}
        <div className="mt-10 text-foreground/20 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
          A WABO DOGS Production
        </div>
      </div>
    </div>
  );
}
