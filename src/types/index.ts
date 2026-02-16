// ── Database Row Types ──────────────────────────────────────

export interface Team {
  id: string;
  player_name: string;
  partner_name: string;
  shirt_size: ShirtSize;
  notes: string | null;
  created_at: string;
}

export type ShirtSize = "Small" | "Medium" | "Large" | "XL" | "XXL";

export const SHIRT_SIZES: ShirtSize[] = [
  "Small",
  "Medium",
  "Large",
  "XL",
  "XXL",
];

export interface CourseHole {
  hole_number: number;
  par: number;
  yardage: number;
  handicap: number;
}

export interface Score {
  id: string;
  team_id: string;
  hole_number: number;
  strokes: number;
  created_at: string;
  updated_at: string;
}

// ── Derived / UI Types ──────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  tied: boolean;
  team_id: string;
  team_name: string;
  score_to_par: number;
  total_strokes: number;
  holes_completed: number;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  wind_speed: number;
  humidity: number;
}

// ── Form Types ──────────────────────────────────────────────

export interface RegistrationFormData {
  playerName: string;
  partnerName: string;
  shirtSize: ShirtSize | "";
  notes: string;
}

export interface RegistrationPayload {
  player_name: string;
  partner_name: string;
  shirt_size: ShirtSize;
  notes: string;
}
