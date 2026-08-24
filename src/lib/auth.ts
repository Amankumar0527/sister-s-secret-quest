/**
 * Isolated auth module.
 * Today: client-side secret-code check.
 * Later: swap `verifySecret` for a server call — no UI changes needed.
 */
import { PASSWORD } from "@/config/questConfig";

const SESSION_KEY = "sister-quest:unlocked";

export async function verifySecret(input: string): Promise<boolean> {
  const ok = input.trim().toLowerCase() === PASSWORD.trim().toLowerCase();
  // Simulated latency keeps the "authenticating…" sequence honest.
  await new Promise((r) => setTimeout(r, 150));
  return ok;
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function setUnlocked(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (value) window.localStorage.setItem(SESSION_KEY, "true");
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage disabled — session simply won't persist */
  }
}
