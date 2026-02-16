"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={`peer w-full bg-rich-black/50 border-2 ${
            error ? "border-grateful-red/60" : "border-foreground/20"
          } text-foreground rounded-lg px-4 pt-6 pb-2 text-base focus:outline-none focus:border-rose-magenta transition-colors font-[family-name:var(--font-body)] ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute left-4 top-2 text-xs text-foreground/50 font-[family-name:var(--font-heading)] tracking-wider uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-rose-magenta"
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-grateful-red font-[family-name:var(--font-body)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
