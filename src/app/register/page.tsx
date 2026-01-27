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
    <div className="min-h-screen bg-[#0F0F0F] font-[family-name:var(--font-space-mono)]">
      <main className="flex flex-col items-center px-6 py-16 md:py-24 max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="self-start text-[#EECEC6]/50 text-sm tracking-[0.1em] uppercase mb-12 hover:text-[#EECEC6] transition-colors"
        >
          &larr; Back
        </Link>

        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/wabodogs-logo.png"
            alt="WABO DOGS"
            width={300}
            height={50}
            priority
            className="w-[200px] md:w-[300px]"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 font-[family-name:var(--font-playfair)] tracking-tight">
          <span className="text-[#EECEC6]">Tournament</span>{" "}
          <span className="text-[#E85A4F]">Registration</span>
        </h1>

        <p className="text-[#EECEC6]/60 text-sm mb-12 text-center">
          Register your team for Sunshine Daydream
        </p>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="w-full mb-8 p-4 border border-green-500/50 bg-green-500/10 text-green-400 text-sm text-center">
            Registration successful! We&apos;ll be in touch soon.
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="w-full mb-8 p-4 border border-red-500/50 bg-red-500/10 text-red-400 text-sm text-center">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Player Name */}
          <div>
            <label
              htmlFor="playerName"
              className="block text-[#E85A4F] text-xs tracking-[0.2em] uppercase mb-2"
            >
              Player Name
            </label>
            <input
              type="text"
              id="playerName"
              required
              value={formData.playerName}
              onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
              className="w-full bg-transparent border border-[#EECEC6]/30 text-[#EECEC6] px-4 py-3 text-base focus:outline-none focus:border-[#E85A4F] transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Partner Name */}
          <div>
            <label
              htmlFor="partnerName"
              className="block text-[#E85A4F] text-xs tracking-[0.2em] uppercase mb-2"
            >
              Partner Name
            </label>
            <input
              type="text"
              id="partnerName"
              required
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              className="w-full bg-transparent border border-[#EECEC6]/30 text-[#EECEC6] px-4 py-3 text-base focus:outline-none focus:border-[#E85A4F] transition-colors"
              placeholder="Your partner's name"
            />
          </div>

          {/* Shirt Size */}
          <div>
            <label
              htmlFor="shirtSize"
              className="block text-[#E85A4F] text-xs tracking-[0.2em] uppercase mb-2"
            >
              Shirt Size
            </label>
            <select
              id="shirtSize"
              required
              value={formData.shirtSize}
              onChange={(e) => setFormData({ ...formData, shirtSize: e.target.value })}
              className="w-full bg-[#0F0F0F] border border-[#EECEC6]/30 text-[#EECEC6] px-4 py-3 text-base focus:outline-none focus:border-[#E85A4F] transition-colors appearance-none cursor-pointer"
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
              className="block text-[#E85A4F] text-xs tracking-[0.2em] uppercase mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full bg-transparent border border-[#EECEC6]/30 text-[#EECEC6] px-4 py-3 text-base focus:outline-none focus:border-[#E85A4F] transition-colors resize-none"
              placeholder="Any additional notes (optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-[#E85A4F] text-[#E85A4F] py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#E85A4F] hover:text-[#0F0F0F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Register Team"}
          </button>
        </form>
      </main>
    </div>
  );
}
