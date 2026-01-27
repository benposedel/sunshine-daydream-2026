"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SHIRT_SIZES = ["Small", "Medium", "Large", "XL", "XXL"] as const;

export default function Register() {
  const [formData, setFormData] = useState({
    playerName: "",
    partnerName: "",
    shirtSize: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ playerName: "", partnerName: "", shirtSize: "", notes: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen psychedelic-bg font-[family-name:var(--font-space-mono)] poster-border">
      <main className="flex flex-col items-center px-6 py-16 md:py-24 max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="self-start text-[#6CB4EE]/70 text-sm tracking-[0.1em] uppercase mb-12 hover:text-[#E84A8A] transition-colors flex items-center gap-2"
        >
          <span className="text-[#C41E3A]">✿</span>
          <span>&larr; Back</span>
        </Link>

        {/* Decorative top */}
        <div className="text-[#C41E3A] text-xl tracking-[0.8em] mb-8 opacity-80">
          ❀ ✿ ❀
        </div>

        {/* Logo */}
        <div className="mb-10">
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
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 font-[family-name:var(--font-playfair)] tracking-tight">
          <span className="text-[#F5E6D3] psychedelic-glow">Tournament</span>{" "}
          <span className="wavy-text">Registration</span>
        </h1>

        {/* Skull and roses */}
        <div className="flex items-center gap-3 mb-4 text-lg">
          <span className="text-[#C41E3A]">✿</span>
          <span className="text-[#F5E6D3]">☠</span>
          <span className="text-[#C41E3A]">✿</span>
        </div>

        <p className="text-[#6CB4EE]/80 text-sm mb-10 text-center">
          Register your team for Sunshine Daydream
        </p>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="w-full mb-8 p-4 border-2 border-[#DAA520]/50 bg-[#DAA520]/10 text-[#DAA520] text-sm text-center">
            <span className="text-lg mr-2">✿</span>
            Registration successful! We&apos;ll be in touch soon.
            <span className="text-lg ml-2">✿</span>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="w-full mb-8 p-4 border-2 border-[#C41E3A]/50 bg-[#C41E3A]/10 text-[#C41E3A] text-sm text-center">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Form - in ornate frame */}
        <form onSubmit={handleSubmit} className="w-full ornate-frame">
          <div className="space-y-6">
            {/* Player Name */}
            <div>
              <label
                htmlFor="playerName"
                className="block text-[#E84A8A] text-xs tracking-[0.2em] uppercase mb-2"
              >
                Player Name
              </label>
              <input
                type="text"
                id="playerName"
                required
                value={formData.playerName}
                onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                className="w-full bg-[#0F2438]/50 border-2 border-[#6CB4EE]/30 text-[#F5E6D3] px-4 py-3 text-base focus:outline-none focus:border-[#E84A8A] transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Partner Name */}
            <div>
              <label
                htmlFor="partnerName"
                className="block text-[#E84A8A] text-xs tracking-[0.2em] uppercase mb-2"
              >
                Partner Name
              </label>
              <input
                type="text"
                id="partnerName"
                required
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                className="w-full bg-[#0F2438]/50 border-2 border-[#6CB4EE]/30 text-[#F5E6D3] px-4 py-3 text-base focus:outline-none focus:border-[#E84A8A] transition-colors"
                placeholder="Your partner's name"
              />
            </div>

            {/* Shirt Size */}
            <div>
              <label
                htmlFor="shirtSize"
                className="block text-[#E84A8A] text-xs tracking-[0.2em] uppercase mb-2"
              >
                Shirt Size
              </label>
              <select
                id="shirtSize"
                required
                value={formData.shirtSize}
                onChange={(e) => setFormData({ ...formData, shirtSize: e.target.value })}
                className="w-full bg-[#0F2438] border-2 border-[#6CB4EE]/30 text-[#F5E6D3] px-4 py-3 text-base focus:outline-none focus:border-[#E84A8A] transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select a size
                </option>
                {SHIRT_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-[#E84A8A] text-xs tracking-[0.2em] uppercase mb-2"
              >
                Notes
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full bg-[#0F2438]/50 border-2 border-[#6CB4EE]/30 text-[#F5E6D3] px-4 py-3 text-base focus:outline-none focus:border-[#E84A8A] transition-colors resize-none"
                placeholder="Any additional notes (optional)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full psychedelic-button border-2 border-[#E84A8A] text-[#E84A8A] py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#E84A8A] hover:text-[#0F2438] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            >
              {isSubmitting ? "Submitting..." : "Register Team"}
            </button>
          </div>
        </form>

        {/* Dancing bears */}
        <div className="flex gap-2 mt-10 text-lg">
          {['🐻', '🐻', '🐻'].map((bear, i) => (
            <span
              key={i}
              className="dance-hover cursor-default"
              style={{
                color: ['#E84A8A', '#6CB4EE', '#DAA520'][i]
              }}
            >
              {bear}
            </span>
          ))}
        </div>

        {/* Decorative bottom */}
        <div className="mt-8 text-[#C41E3A] text-lg tracking-[0.5em] opacity-60">
          ✿ ❀ ✿
        </div>
      </main>
    </div>
  );
}
