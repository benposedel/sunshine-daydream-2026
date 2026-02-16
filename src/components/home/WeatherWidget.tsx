"use client";

import { useWeather } from "@/hooks/useWeather";

const WEATHER_ICONS: Record<string, string> = {
  "01d": "\u2600\uFE0F", "01n": "\uD83C\uDF19",
  "02d": "\u26C5", "02n": "\uD83C\uDF19",
  "03d": "\u2601\uFE0F", "03n": "\u2601\uFE0F",
  "04d": "\u2601\uFE0F", "04n": "\u2601\uFE0F",
  "09d": "\uD83C\uDF27\uFE0F", "09n": "\uD83C\uDF27\uFE0F",
  "10d": "\uD83C\uDF26\uFE0F", "10n": "\uD83C\uDF27\uFE0F",
  "11d": "\u26C8\uFE0F", "11n": "\u26C8\uFE0F",
  "13d": "\uD83C\uDF28\uFE0F", "13n": "\uD83C\uDF28\uFE0F",
  "50d": "\uD83C\uDF2B\uFE0F", "50n": "\uD83C\uDF2B\uFE0F",
};

function getCourseCondition(description: string): string {
  const lower = description.toLowerCase();
  if (lower.includes("rain") || lower.includes("drizzle") || lower.includes("thunderstorm")) {
    return "Wet";
  }
  return "Dry";
}

export function WeatherWidget() {
  const { weather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="glass-card p-6 w-full max-w-sm">
        <div className="skeleton h-4 w-32 mb-4" />
        <div className="skeleton h-12 w-20 mb-3" />
        <div className="skeleton h-4 w-48 mb-2" />
        <div className="skeleton h-4 w-36" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="glass-card p-6 w-full max-w-sm">
        <p className="text-foreground/40 text-sm font-[family-name:var(--font-body)]">
          Weather unavailable
        </p>
      </div>
    );
  }

  const icon = WEATHER_ICONS[weather.icon] || "\uD83C\uDF24\uFE0F";
  const condition = getCourseCondition(weather.description);

  return (
    <div className="glass-card p-6 w-full max-w-sm">
      <p className="text-xs tracking-[0.2em] uppercase text-electric-teal mb-3 font-[family-name:var(--font-heading)]">
        Course Weather
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-4xl font-bold font-[family-name:var(--font-mono)] text-foreground">
            {weather.temp}&deg;F
          </p>
          <p className="text-foreground/60 text-sm capitalize font-[family-name:var(--font-body)]">
            {weather.description}
          </p>
        </div>
      </div>

      <div className="flex gap-6 text-sm text-foreground/60 font-[family-name:var(--font-body)]">
        <div>
          <span className="text-foreground/40">Wind</span>{" "}
          <span className="text-foreground font-[family-name:var(--font-mono)]">{weather.wind_speed} mph</span>
        </div>
        <div>
          <span className="text-foreground/40">Humidity</span>{" "}
          <span className="text-foreground font-[family-name:var(--font-mono)]">{weather.humidity}%</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-foreground/10">
        <p className="text-xs text-foreground/50 font-[family-name:var(--font-body)]">
          Course Conditions:{" "}
          <span className={condition === "Dry" ? "text-electric-teal" : "text-sunset-orange"}>
            {condition}
          </span>
        </p>
      </div>
    </div>
  );
}
