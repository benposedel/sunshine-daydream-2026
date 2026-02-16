import type { WeatherData } from "@/types";

// Glendoveer West Golf Course, Portland, OR
export const GLENDOVEER_LAT = 45.5326;
export const GLENDOVEER_LON = -122.5574;

export async function fetchWeather(): Promise<WeatherData> {
  const res = await fetch("/api/weather");
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}
