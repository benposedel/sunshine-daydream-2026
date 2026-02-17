import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPin } from "@/lib/hash";
import type { VerifyPinPayload } from "@/types";

const ADMIN_PIN = "1234";

export async function POST(request: Request) {
  try {
    const body: VerifyPinPayload = await request.json();
    const { team_id, pin } = body;

    if (!team_id || !pin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Admin backdoor
    if (pin === ADMIN_PIN) {
      return NextResponse.json({ success: true });
    }

    // Fetch team
    const { data: team, error } = await supabase
      .from("teams")
      .select("player1_pin_hash, player2_pin_hash")
      .eq("id", team_id)
      .single();

    if (error || !team) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }

    const pinHash = await hashPin(pin);

    if (pinHash === team.player1_pin_hash || pinHash === team.player2_pin_hash) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Incorrect PIN" },
      { status: 401 }
    );
  } catch (error) {
    console.error("PIN verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify PIN" },
      { status: 500 }
    );
  }
}
