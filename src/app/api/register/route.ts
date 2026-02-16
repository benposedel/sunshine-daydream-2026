import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { RegistrationPayload } from "@/types";
import { SHIRT_SIZES } from "@/types";

export async function POST(request: Request) {
  try {
    const body: RegistrationPayload = await request.json();
    const { player_name, partner_name, shirt_size, notes } = body;

    if (!player_name || !partner_name || !shirt_size) {
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

    const { data, error } = await supabase
      .from("teams")
      .insert({
        player_name,
        partner_name,
        shirt_size,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to register team" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, team: data });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to submit registration" },
      { status: 500 }
    );
  }
}
