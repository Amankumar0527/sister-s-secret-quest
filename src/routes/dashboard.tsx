import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuestShell, useRequireUnlock } from "@/components/quest/QuestShell";
import { useQuest, missionStatus, rewardStatus } from "@/lib/questState";
import { MISSIONS, SIBLING_STATS, SISTER_NAME } from "@/config/questConfig";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Quest Dashboard — Sister Quest" },
      {
        name: "description",
        content: "Three missions, three rewards and one final surprise. Track your Rakhi quest.",
      },
      { property: "og:title", content: "Your Quest Dashboard — Sister Quest" },
      {
        property: "og:description",
        content: "Three missions, three rewards and one final surprise.",
      },
    ],
  }),
  component: DashboardPage,
});

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}

function DashboardPage() {
  const ready = useRequireUnlock();
  const { state, completed, progress } = useQuest();
  if (!ready) return null;

  return (
    <QuestShell
      title="SISTER QUEST ❤️"
      subtitle={`Welcome back, ${SISTER_NAME} 👑 — your Rakhi adventure is waiting…`}
    >
      {/* Progress */}
      <section className="glass-card animate-rise p-5 sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="truncate text-sm font-semibold tracking-[0.18em] text-muted-foreground">
            RAKHI QUEST PROGRESS
          </h2>
          <span className="shrink-0 font-display text-lg font-bold">{completed} / 3</span>
        </div>
        <div
          className="mt-3 h-3.5 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={3}
          aria-label="Missions completed"
        >
          <div
            className="h-full rounded-full bg-gradient-primary transition-[width] duration-1000 ease-out"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {completed} / 3 Missions Completed
        </p>

        {completed === 3 && (
          <p className="mt-4 animate-pop font-display text-xl font-bold text-gradient">
            🎉 QUEST COMPLETE!
          </p>
        )}
      </section>

      {/* Sibling stats */}
      <section className="mt-4 grid grid-cols-3 gap-3">
        {SIBLING_STATS.map((s) => (
          <div key={s.label} className="glass-card p-3 text-center sm:p-4">
            <p className="font-display text-xl font-bold text-gradient sm:text-2xl">
              {s.numeric != null ? <CountUp value={s.numeric} /> : s.value}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Missions */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MISSIONS.map((m) => {
          const st = missionStatus(state, m.key);
          return (
            <article
              key={m.key}
              className={`glass-card lift hover:lift-hover flex flex-col p-5 ${
                st === "complete" ? "glass-glow" : ""
              }`}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">
                  <span aria-hidden="true">{m.emoji}</span>
                </span>
                <h3 className="truncate font-display text-lg font-bold">{m.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
              <p className="mt-3 text-xs font-semibold tracking-wide">
                {st === "complete" ? "✅ Complete" : "✨ Ready"}
              </p>
              <Link
                to={m.to}
                className="lift hover:lift-hover mt-4 rounded-2xl bg-gradient-primary py-3 text-center text-sm font-semibold text-primary-foreground active:scale-[0.98]"
              >
                {st === "complete" ? "REPLAY" : m.cta} →
              </Link>
            </article>
          );
        })}
      </section>

      {/* Reward preview */}
      <section className="glass-card mt-6 p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="truncate font-display text-lg font-bold">🎁 Reward Center</h2>
          <Link to="/rewards" className="shrink-0 text-sm font-semibold text-primary underline">
            Open
          </Link>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["quiz", "spin", "memory", "final"] as const).map((k) => {
            const st = rewardStatus(state, k);
            return (
              <li key={k} className="rounded-2xl bg-secondary/70 p-3 text-center">
                <p className="text-xl" aria-hidden="true">
                  {st === "claimed" ? "✅" : st === "available" ? "✨" : "🔒"}
                </p>
                <p className="mt-1 text-xs font-medium capitalize">
                  {k === "final" ? "Final Gift" : k}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{st}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Final gift unlock */}
      {state.finalGiftUnlocked && (
        <section className="glass-card glass-glow mt-6 animate-pop p-6 text-center">
          <h2 className="font-display text-2xl font-bold text-gradient">
            🎉 ALL MISSIONS COMPLETE!
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quiz ✓ &nbsp; Spin ✓ &nbsp; Memory ✓ &nbsp;·&nbsp; 3/3 Rewards Claimed
          </p>
          <p className="mt-4 font-display text-lg font-semibold">🔓 FINAL SURPRISE UNLOCKED</p>
          <Link
            to="/final-gift"
            className="lift hover:lift-hover mt-4 inline-block rounded-2xl bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground active:scale-[0.98]"
          >
            OPEN FINAL GIFT ❤️
          </Link>
        </section>
      )}
    </QuestShell>
  );
}
