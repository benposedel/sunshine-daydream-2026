import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPin } from "@/lib/hash";
import type { RegistrationPayload } from "@/types";
import { SHIRT_SIZES } from "@/types";

export async function POST(request: Request) {
  try {
    const body: RegistrationPayload = await request.json();
    const { team_name, player1_name, player2_name, email, phone, player_pin, partner_pin, shirt_size, notes } = body;

    if (!team_name || !player1_name || !player2_name || !shirt_size || !player_pin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!SHIRT_SIZES.includes(shirt_size)) {
      return NextResponse.json(
        { error: "Invalid shirt size" },
        { status: 400 }
      );
    }

    // Validate PIN format
    if (!/^\d{4}$/.test(player_pin)) {
      return NextResponse.json(
        { error: "Player PIN must be exactly 4 digits" },
        { status: 400 }
      );
    }

    if (partner_pin && !/^\d{4}$/.test(partner_pin)) {
      return NextResponse.json(
        { error: "Partner PIN must be exactly 4 digits" },
        { status: 400 }
      );
    }

    // Block reserved PIN
    if (player_pin === "1234" || partner_pin === "1234") {
      return NextResponse.json(
        { error: "This PIN is reserved, please choose a different one." },
        { status: 400 }
      );
    }

    const player1_pin_hash = await hashPin(player_pin);
    const player2_pin_hash = partner_pin ? await hashPin(partner_pin) : null;

    const { data, error } = await supabase
      .from("teams")
      .insert({
        team_name,
        player1_name,
        player2_name,
        email: email || null,
        phone: phone || null,
        player1_pin_hash,
        player2_pin_hash,
        shirt_size,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: `Failed to register team: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, team: data });
  } catch (error) {
    console.error("Registration error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to submit registration: ${message}` },
      { status: 500 }
    );
  }
}
