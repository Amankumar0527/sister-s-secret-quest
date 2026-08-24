import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { isUnlocked, setUnlocked } from "@/lib/auth";
import { useQuest, rewardStatus } from "@/lib/questState";
import { SISTER_NAME } from "@/config/questConfig";
import { AmbientBackground } from "./AmbientBackground";
import { MusicToggle } from "./MusicToggle";
import { celebrate } from "@/lib/celebrate";
import { toast } from "sonner";

const NAV = [
  { to: "/dashboard", emoji: "🏠", label: "Home" },
  { to: "/quiz", emoji: "🎯", label: "Quiz" },
  { to: "/spin", emoji: "🎡", label: "Spin" },
  { to: "/memories", emoji: "🧠", label: "Memories" },
  { to: "/rewards", emoji: "🎁", label: "Rewards" },
] as const;

/** Redirects to the secret login when the browser has no unlocked session. */
export function useRequireUnlock() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!isUnlocked()) void navigate({ to: "/" });
    else setChecked(true);
  }, [navigate]);
  return checked;
}

function HeartEasterEgg() {
  const [taps, setTaps] = useState(0);
  return (
    <button
      type="button"
      aria-label="A little secret"
      onClick={() => {
        const next = taps + 1;
        setTaps(next);
        if (next >= 5) {
          setTaps(0);
          celebrate(40);
          toast("You found the secret 🤫", {
            description: `${SISTER_NAME}, you were always the curious one. That's why I love you.`,
          });
        }
      }}
      className="rounded-full px-1 text-lg transition-transform active:scale-90 hover:scale-110"
    >
      <span aria-hidden="true">❤️</span>
    </button>
  );
}

export function QuestShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  const { state, completed } = useQuest();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <AmbientBackground />

      {/* Mobile header */}
      <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex min-w-0 items-center gap-1">
          <span className="truncate font-display text-lg font-semibold text-gradient">
            Sister Quest
          </span>
          <HeartEasterEgg />
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {completed}/3
        </span>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 pb-28 pt-6 md:px-6 md:pb-10">
        {/* Desktop sidebar */}
        <aside className="sticky top-6 hidden h-fit w-56 shrink-0 md:block">
          <div className="glass-card p-5">
            <div className="flex items-center gap-1">
              <span className="font-display text-xl font-bold text-gradient">Sister Quest</span>
              <HeartEasterEgg />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Raksha Bandhan 2026</p>

            <nav className="mt-5 flex flex-col gap-1">
              {NAV.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-gradient-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                        : "text-foreground/80 hover:bg-secondary"
                    }`}
                  >
                    <span aria-hidden="true">{item.emoji}</span>
                    {item.label}
                  </Link>
                );
              })}
              {state.finalGiftUnlocked && (
                <Link
                  to="/final-gift"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
                >
                  <span aria-hidden="true">🔓</span> Final Gift
                </Link>
              )}
            </nav>

            <div className="mt-5 border-t border-border pt-4">
              <MusicToggle className="w-full justify-center" />
              <button
                type="button"
                onClick={() => {
                  setUnlocked(false);
                  void navigate({ to: "/" });
                }}
                className="mt-2 w-full rounded-xl px-3 py-2 text-xs text-muted-foreground hover:bg-secondary"
              >
                ⚙️ Lock the quest
              </button>
            </div>
          </div>

          <div className="glass-card mt-4 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Rewards
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {(["quiz", "spin", "memory", "final"] as const).map((k) => {
                const st = rewardStatus(state, k);
                return (
                  <li key={k} className="flex items-center justify-between gap-2">
                    <span className="capitalize text-foreground/80">
                      {k === "final" ? "Final gift" : k}
                    </span>
                    <span aria-label={st}>
                      {st === "claimed" ? "✅" : st === "available" ? "✨" : "🔒"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {title && (
            <div className="mb-6 animate-rise">
              <h1 className="font-display text-3xl font-bold leading-tight text-gradient sm:text-4xl">
                {title}
              </h1>
              {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl md:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium transition-colors ${
                    active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="text-lg" aria-hidden="true">
                    {item.emoji}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
