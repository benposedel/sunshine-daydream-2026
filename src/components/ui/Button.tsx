"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-[family-name:var(--font-heading)] font-semibold tracking-wider uppercase transition-all duration-200 overflow-hidden active:scale-[0.97] cursor-pointer";

  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900",
    secondary:
      "bg-transparent text-foreground border-2 border-border hover:border-foreground",
    ghost:
      "bg-transparent text-text-secondary hover:text-foreground border-2 border-transparent hover:border-border",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs min-h-[36px] rounded-md",
    md: "px-6 py-3 text-sm min-h-[44px] rounded-lg",
    lg: "px-10 py-4 text-base min-h-[52px] rounded-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      )}
      <span className={isLoading ? "opacity-0" : ""}>{children}</span>
    </button>
  );
}
