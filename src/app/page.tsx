"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleGolfClick() {
    // If already authenticated, go straight through
    if (localStorage.getItem("golf-access") === "true") {
      router.push("/golf");
      return;
    }
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "Cornell77") {
      localStorage.setItem("golf-access", "true");
      setShowPasswordModal(false);
      router.push("/golf");
    } else {
      setPasswordError("Incorrect password");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 relative">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/wabodogs-logo-color.png"
          alt="WABO DOGS"
          width={600}
          height={120}
          priority
          className="w-[280px] md:w-[500px]"
        />
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-heading)] mb-16">
        Sports and Leisure Club
      </p>

      {/* Activity Buttons */}
      <div className="flex gap-4 md:gap-6 mb-16">
        {/* Golf - clickable with password */}
        <button
          onClick={handleGolfClick}
          className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-900 hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer group"
        >
          <span className="text-3xl md:text-4xl">&#x26F3;</span>
          <span className="text-gray-900 text-sm md:text-base font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase">
            Golf
          </span>
        </button>

        {/* Running - coming soon */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 border-gray-200 bg-white flex flex-col items-center justify-center gap-2 opacity-60 group">
          <span className="text-3xl md:text-4xl">&#x1F3C3;</span>
          <span className="text-gray-400 text-sm md:text-base font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase">
            Running
          </span>
          <div className="absolute inset-0 rounded-2xl bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-gray-500 text-xs font-[family-name:var(--font-heading)] font-bold tracking-[0.2em] uppercase">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Softball - coming soon */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 border-gray-200 bg-white flex flex-col items-center justify-center gap-2 opacity-60 group">
          <span className="text-3xl md:text-4xl">&#x1F94E;</span>
          <span className="text-gray-400 text-sm md:text-base font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase">
            Softball
          </span>
          <div className="absolute inset-0 rounded-2xl bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-gray-500 text-xs font-[family-name:var(--font-heading)] font-bold tracking-[0.2em] uppercase">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Board of Directors Link */}
      <Link
        href="/board"
        className="text-gray-400 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-1"
      >
        Board of Directors
      </Link>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
            <h2 className="text-gray-900 text-lg font-[family-name:var(--font-heading)] font-bold text-center mb-2">
              Enter Password
            </h2>
            <p className="text-gray-400 text-xs text-center mb-6 font-[family-name:var(--font-body)]">
              Members only access
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Password"
                autoFocus
                className={`w-full border-2 ${
                  passwordError ? "border-red-400" : "border-gray-200"
                } rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:border-gray-900 transition-colors font-[family-name:var(--font-body)] mb-2`}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mb-2 font-[family-name:var(--font-body)]">
                  {passwordError}
                </p>
              )}

              <button
                type="submit"
                className="w-full mt-2 bg-gray-900 text-white py-3 rounded-lg font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Enter
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="w-full mt-2 text-gray-400 text-sm font-[family-name:var(--font-body)] hover:text-gray-600 transition-colors cursor-pointer py-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
