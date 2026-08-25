import { toast } from "sonner";
import { REWARDS } from "@/config/questConfig";
import { celebrate } from "@/lib/celebrate";
import { Photo } from "./Photo";

export function RewardReveal({
  rewardKey,
  claimed,
  onClaim,
  headline,
  prizeLabel,
}: {
  rewardKey: "quiz" | "spin" | "memory";
  claimed: boolean;
  onClaim: () => void;
  headline: string;
  prizeLabel?: string;
}) {
  const reward = REWARDS[rewardKey];

  return (
    <section className="glass-card glass-glow mt-5 animate-pop overflow-hidden">
      <div className="grid gap-5 p-6 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:items-center">
        <div className="mx-auto h-40 w-40 overflow-hidden rounded-3xl bg-secondary/60">
          <Photo
            src={reward.image}
            alt={reward.title}
            emoji="🎁"
            className="h-full w-full"
          />
        </div>
        <div className="min-w-0 text-center sm:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
            {headline.toUpperCase()}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-gradient">
            {prizeLabel ?? reward.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{reward.description}</p>

          {claimed ? (
            <p className="mt-5 inline-block rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground">
              ✅ CLAIMED
            </p>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClaim();
                celebrate(34);
                toast("Reward claimed! ❤️", { description: prizeLabel ?? reward.title });
              }}
              className="lift hover:lift-hover mt-5 w-full rounded-2xl bg-gradient-primary px-6 py-4 text-base font-semibold text-primary-foreground active:scale-[0.98] sm:w-auto"
            >
              CLAIM REWARD ❤️
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
