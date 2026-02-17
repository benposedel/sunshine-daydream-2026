import { createHash } from "node:crypto";

export async function hashPin(pin: string): Promise<string> {
  return createHash("sha256").update(pin).digest("hex");
}
