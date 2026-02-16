import { NextResponse } from "next/server";
import { GLENDOVEER_LAT, GLENDOVEER_LON } from "@/lib/weather";

export const revalidate = 900; // Cache for 15 minutes

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Weather API not configured" },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${GLENDOVEER_LAT}&lon=${GLENDOVEER_LON}&units=imperial&appid=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 900 } });

    if (!res.ok) throw new Error(`Weather API returned ${res.status}`);

    const data = await res.json();

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: Math.round(data.wind.speed),
      humidity: data.main.humidity,
    });
  } catch (error) {
    console.error("Weather fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
