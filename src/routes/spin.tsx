import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { QuestShell, useRequireUnlock } from "@/components/quest/QuestShell";
import { RewardReveal } from "@/components/quest/RewardReveal";
import { useQuest } from "@/lib/questState";
import { celebrate } from "@/lib/celebrate";
import { SPIN_PRIZES } from "@/config/questConfig";

export const Route = createFileRoute("/spin")({
  head: () => ({
    meta: [
      { title: "Lucky Rakhi Spin 🎡 — Sister Quest" },
      {
        name: "description",
        content: "One spin. One surprise. No second chances — your Raksha Bandhan lucky wheel.",
      },
      { property: "og:title", content: "Lucky Rakhi Spin 🎡 — Sister Quest" },
      { property: "og:description", content: "One spin. One surprise. No second chances 😜" },
    ],
  }),
  component: SpinPage,
});

const SLICE = 360 / SPIN_PRIZES.length;

function wheelBackground() {
  const stops = SPIN_PRIZES.map((_, i) => {
    const hue = Math.round((i / SPIN_PRIZES.length) * 360);
    const color = `oklch(0.86 0.09 ${hue})`;
    return `${color} ${i * SLICE}deg ${(i + 1) * SLICE}deg`;
  });
  return `conic-gradient(${stops.join(",")})`;
}

function SpinPage() {
  const ready = useRequireUnlock();
  const { state, update } = useQuest();
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(state.spinCompleted);
  const bg = useRef(wheelBackground());

  if (!ready) return null;

  const alreadySpun = state.spinCompleted;

  const spin = () => {
    if (spinning || alreadySpun) return;
    setSpinning(true);
    const index = Math.floor(Math.random() * SPIN_PRIZES.length);
    const target = 360 * 6 + (360 - (index * SLICE + SLICE / 2));
    setAngle(target);
    window.setTimeout(() => {
      const prize = SPIN_PRIZES[index]!;
      update({ spinCompleted: true, spinResult: `${prize.emoji} ${prize.label}` });
      setSpinning(false);
      setRevealed(true);
      celebrate(38);
      toast("Mission complete! 🎉", { description: `You won ${prize.label}!` });
    }, 4600);
  };

  return (
    <QuestShell
      title="LUCKY RAKHI SPIN 🎡"
      subtitle="One spin. One surprise. No second chances 😜"
    >
      <section className="glass-card flex flex-col items-center p-6">
        <div className="relative aspect-square w-full max-w-[min(78vw,360px)]">
          <div
            className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2 text-2xl"
            aria-hidden="true"
          >
            🔻
          </div>
          <div
            className="h-full w-full rounded-full border-8 border-card shadow-[var(--shadow-glow)]"
            style={{
              background: bg.current,
              transform: `rotate(${angle}deg)`,
              transition: spinning ? "transform 4.5s cubic-bezier(0.12, 0.7, 0.12, 1)" : undefined,
            }}
          >
            {SPIN_PRIZES.map((p, i) => (
              <span
                key={p.label}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 origin-left text-lg"
                style={{
                  transform: `rotate(${i * SLICE + SLICE / 2}deg) translateX(28%)`,
                }}
              >
                {p.emoji}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card text-2xl shadow-[var(--shadow-soft)]">
            <span aria-hidden="true">❤️</span>
          </div>
        </div>

        <button
          type="button"
          onClick={spin}
          disabled={spinning || alreadySpun}
          className="lift hover:lift-hover mt-8 w-full max-w-xs rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground active:scale-[0.98] disabled:opacity-50"
        >
          {alreadySpun ? "ALREADY SPUN ✓" : spinning ? "SPINNING…" : "SPIN THE WHEEL 🎡"}
        </button>

        <p aria-live="polite" className="mt-4 min-h-6 text-center text-sm text-muted-foreground">
          {spinning ? "Hold your breath…" : alreadySpun ? "The wheel has spoken." : ""}
        </p>
      </section>

      {revealed && state.spinResult && !spinning && (
        <>
          <section className="glass-card glass-glow mt-5 animate-pop p-7 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              🎉 YOU WON!
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-gradient">
              {state.spinResult}
            </h2>
          </section>
          <RewardReveal
            rewardKey="spin"
            claimed={state.spinRewardClaimed}
            onClaim={() => update({ spinRewardClaimed: true })}
            headline="Your spin reward"
            prizeLabel={state.spinResult}
          />
        </>
      )}
    </QuestShell>
  );
}
