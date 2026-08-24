import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/quest/AmbientBackground";
import { verifySecret, setUnlocked, isUnlocked } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sister Quest 🔐 — A Secret Raksha Bandhan Surprise" },
      {
        name: "description",
        content:
          "A hand-built secret world for my sister: missions, memories and hidden gifts for Raksha Bandhan 2026. Classified access only.",
      },
      { property: "og:title", content: "Sister Quest 🔐 — A Secret Raksha Bandhan Surprise" },
      {
        property: "og:description",
        content: "Classified access. Only one person knows the secret code.",
      },
    ],
  }),
  component: LoginPage,
});

const SEQUENCE = [
  "AUTHENTICATING…",
  "Identity verification ✓",
  "Brother verification ✓",
  "Sister verification ✓",
  "Love verification ∞",
  "ACCESS GRANTED ❤️",
];

function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(-1);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isUnlocked()) void navigate({ to: "/welcome" });
  }, [navigate]);

  useEffect(() => {
    if (step < 0) return;
    if (step >= SEQUENCE.length) {
      const t = setTimeout(() => {
        setUnlocked(true);
        void navigate({ to: "/welcome" });
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 620);
    return () => clearTimeout(t);
  }, [step, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const ok = await verifySecret(code);
    if (ok) {
      setStep(0);
    } else {
      setError("Nice try 😜 Only my sister knows the secret.");
      setCode("");
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <AmbientBackground dense />

      <div className="glass-card glass-glow w-full max-w-md animate-pop p-7 sm:p-9">
        {step < 0 ? (
          <>
            <div className="text-center">
              <div className="text-4xl" aria-hidden="true">
                🔐
              </div>
              <h1 className="mt-3 font-display text-3xl font-bold text-gradient">SISTER QUEST</h1>
              <p className="mt-1 text-sm font-medium tracking-widest text-muted-foreground">
                RAKSHA BANDHAN 2026
              </p>
              <p className="mt-4 inline-block rounded-full bg-secondary px-4 py-1 text-xs font-semibold tracking-[0.25em] text-secondary-foreground">
                CLASSIFIED ACCESS
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="secret" className="text-sm font-medium">
                  Secret code
                </label>
                <input
                  id="secret"
                  type="password"
                  autoComplete="off"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter Secret Code"
                  aria-describedby="hint secret-error"
                  className="mt-2 w-full rounded-2xl border border-input bg-card/70 px-4 py-3.5 text-base tracking-widest outline-none transition-shadow placeholder:tracking-normal placeholder:text-muted-foreground focus:shadow-[var(--shadow-glow)]"
                />
                <p id="hint" className="mt-2 text-xs text-muted-foreground">
                  Only you know this…
                </p>
              </div>

              {error && (
                <p
                  id="secret-error"
                  role="alert"
                  className="animate-pop rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy || !code}
                className="lift hover:lift-hover w-full rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition active:scale-[0.98] disabled:opacity-50"
              >
                UNLOCK ❤️
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center" aria-live="polite">
            <div className="text-4xl animate-heart-pulse" aria-hidden="true">
              ❤️
            </div>
            <ul className="mt-6 space-y-3 font-sans text-sm">
              {SEQUENCE.slice(0, step + 1).map((line, i) => (
                <li
                  key={line}
                  className={`animate-rise ${
                    i === SEQUENCE.length - 1
                      ? "font-display text-xl font-bold text-gradient"
                      : "text-foreground/80"
                  }`}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
