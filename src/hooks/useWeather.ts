"use client";

import { useState, useEffect } from "react";
import type { WeatherData } from "@/types";
import { fetchWeather } from "@/lib/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather()
      .then(setWeather)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { weather, isLoading, error };
}
