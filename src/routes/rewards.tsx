import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { QuestShell, useRequireUnlock } from "@/components/quest/QuestShell";
import { Photo } from "@/components/quest/Photo";
import { useQuest, rewardStatus, type MissionKey } from "@/lib/questState";
import { celebrate } from "@/lib/celebrate";
import { REWARDS } from "@/config/questConfig";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Your Rakhi Rewards 🎁 — Sister Quest" },
      {
        name: "description",
        content: "Every reward you've unlocked on the quest, plus the final gift waiting at 3/3.",
      },
      { property: "og:title", content: "Your Rakhi Rewards 🎁 — Sister Quest" },
      { property: "og:description", content: "Every reward you've unlocked on the quest." },
    ],
  }),
  component: RewardsPage,
});

const ITEMS: { key: MissionKey; label: string }[] = [
  { key: "quiz", label: "Quiz Reward" },
  { key: "spin", label: "Spin Reward" },
  { key: "memory", label: "Memory Reward" },
];

function RewardsPage() {
  const ready = useRequireUnlock();
  const { state, update } = useQuest();
  if (!ready) return null;

  return (
    <QuestShell title="YOUR RAKHI REWARDS ❤️" subtitle="Claim them all to unlock the final gift.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ key, label }) => {
          const st = rewardStatus(state, key);
          const reward = REWARDS[key];
          return (
            <article
              key={key}
              className={`glass-card lift hover:lift-hover flex flex-col overflow-hidden ${
                st === "claimed" ? "glass-glow" : ""
              }`}
            >
              <div className="h-40 w-full bg-secondary/50">
                <Photo
                  src={reward.image}
                  alt={reward.title}
                  emoji="🎁"
                  className={`h-full w-full ${st === "locked" ? "opacity-40 blur-[3px]" : ""}`}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                  {label.toUpperCase()}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold">
                  {st === "locked" ? "Still a secret 🔒" : reward.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {st === "locked" ? "Finish the mission to reveal this one." : reward.description}
                </p>
                <p className="mt-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold tracking-wider text-secondary-foreground">
                    {st === "claimed" ? "CLAIMED ✓" : st === "available" ? "AVAILABLE" : "LOCKED"}
                  </span>
                </p>
                {st === "available" && (
                  <button
                    type="button"
                    onClick={() => {
                      update({ [`${key}RewardClaimed`]: true });
                      celebrate(30);
                      toast("Reward claimed! ❤️", { description: reward.title });
                    }}
                    className="mt-4 rounded-2xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98]"
                  >
                    CLAIM REWARD ❤️
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <section
        className={`glass-card mt-6 p-6 text-center ${state.finalGiftUnlocked ? "glass-glow" : ""}`}
      >
        <p className="text-3xl" aria-hidden="true">
          {state.finalGiftClaimed ? "✅" : state.finalGiftUnlocked ? "🔓" : "🔒"}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-gradient">The Final Gift</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {state.finalGiftClaimed
            ? "Claimed. And it's all yours ❤️"
            : state.finalGiftUnlocked
              ? "All three rewards claimed. It's time."
              : "Claim all three rewards to unlock this."}
        </p>
        {state.finalGiftUnlocked && !state.finalGiftClaimed && (
          <Link
            to="/final-gift"
            className="lift hover:lift-hover mt-5 inline-block rounded-2xl bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground"
          >
            OPEN FINAL GIFT ❤️
          </Link>
        )}
      </section>
    </QuestShell>
  );
}
