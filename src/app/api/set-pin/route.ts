import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPin } from "@/lib/hash";
import type { SetPinPayload } from "@/types";

export async function POST(request: Request) {
  try {
    const body: SetPinPayload = await request.json();
    const { team_id, player_name, pin } = body;

    if (!team_id || !player_name || !pin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { error: "PIN must be exactly 4 digits" },
        { status: 400 }
      );
    }

    if (pin === "1234") {
      return NextResponse.json(
        { error: "This PIN is reserved, please choose a different one." },
        { status: 400 }
      );
    }

    // Fetch team to match player name
    const { data: team, error } = await supabase
      .from("teams")
      .select("player1_name, player2_name")
      .eq("id", team_id)
      .single();

    if (error || !team) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }

    const pinHash = await hashPin(pin);
    const nameLower = player_name.trim().toLowerCase();

    if (team.player1_name.toLowerCase() === nameLower) {
      await supabase
        .from("teams")
        .update({ player1_pin_hash: pinHash })
        .eq("id", team_id);
      return NextResponse.json({ success: true });
    }

    if (team.player2_name.toLowerCase() === nameLower) {
      await supabase
        .from("teams")
        .update({ player2_pin_hash: pinHash })
        .eq("id", team_id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Name doesn't match any player on this team" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Set PIN error:", error);
    return NextResponse.json(
      { error: "Failed to set PIN" },
      { status: 500 }
    );
  }
}
