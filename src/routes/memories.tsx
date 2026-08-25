import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { QuestShell, useRequireUnlock } from "@/components/quest/QuestShell";
import { RewardReveal } from "@/components/quest/RewardReveal";
import { Photo } from "@/components/quest/Photo";
import { useQuest } from "@/lib/questState";
import { celebrate } from "@/lib/celebrate";
import { MEMORY_IMAGES, type MemoryPhoto } from "@/config/questConfig";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Our Memory Game 🧠 — Sister Quest" },
      {
        name: "description",
        content: "Match our memories to unlock a reward, or browse the album of our moments.",
      },
      { property: "og:title", content: "Our Memory Game 🧠 — Sister Quest" },
      { property: "og:description", content: "Let's see how well you remember our moments." },
    ],
  }),
  component: MemoriesPage,
});

type Card = { id: number; pairId: string; emoji: string; title: string };

function buildDeck(): Card[] {
  const pairs = MEMORY_IMAGES.slice(0, 6);
  const deck = pairs.flatMap((m, i) => [
    { id: i * 2, pairId: m.id, emoji: m.emoji, title: m.title },
    { id: i * 2 + 1, pairId: m.id, emoji: m.emoji, title: m.title },
  ]);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j]!, deck[i]!];
  }
  return deck;
}

function MemoriesPage() {
  const ready = useRequireUnlock();
  const { state, update } = useQuest();
  const [mode, setMode] = useState<"game" | "album">("game");
  const [deck, setDeck] = useState<Card[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [openPhoto, setOpenPhoto] = useState<MemoryPhoto | null>(null);

  const won = matched.length === 6;
  const showReward = won || state.memoryCompleted;

  const flip = (card: Card) => {
    if (busy || flipped.includes(card.id) || matched.includes(card.pairId)) return;
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length === 2) {
      setBusy(true);
      setMoves((m) => m + 1);
      const [a, b] = next.map((id) => deck.find((c) => c.id === id)!);
      if (a!.pairId === b!.pairId) {
        const newMatched = [...matched, a!.pairId];
        window.setTimeout(() => {
          setMatched(newMatched);
          setFlipped([]);
          setBusy(false);
          toast("Memory found! 📸", { description: a!.title });
          if (newMatched.length === 6) {
            celebrate(44);
            if (!state.memoryCompleted) update({ memoryCompleted: true });
          }
        }, 480);
      } else {
        window.setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 850);
      }
    }
  };

  const restart = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setBusy(false);
  };

  const timeline = useMemo(
    () => [...MEMORY_IMAGES].sort((a, b) => a.year.localeCompare(b.year)),
    [],
  );

  if (!ready) return null;

  return (
    <QuestShell
      title="OUR MEMORY GAME ❤️"
      subtitle="Let's see how well you remember our moments."
    >
      <div className="glass-card mb-5 inline-flex gap-1 p-1" role="tablist" aria-label="View mode">
        {(["game", "album"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              mode === m
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {m === "game" ? "🧠 Game Mode" : "📸 Album Mode"}
          </button>
        ))}
      </div>

      {mode === "game" ? (
        <>
          <section className="glass-card p-4 sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-4">
              <p className="truncate text-sm font-semibold">
                Moves: {moves} &nbsp;·&nbsp; Matches: {matched.length} / 6
              </p>
              <button
                type="button"
                onClick={restart}
                className="shrink-0 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold"
              >
                Restart
              </button>
            </div>

            <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {deck.map((card) => {
                const isOpen = flipped.includes(card.id) || matched.includes(card.pairId);
                const isMatched = matched.includes(card.pairId);
                return (
                  <li key={card.id} className="[perspective:900px]">
                    <button
                      type="button"
                      onClick={() => flip(card)}
                      aria-label={isOpen ? card.title : "Hidden memory card"}
                      className={`relative aspect-[3/4] w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                        isOpen ? "[transform:rotateY(180deg)]" : ""
                      } ${isMatched ? "animate-heart-pulse" : ""}`}
                    >
                      <span className="absolute inset-0 grid place-items-center rounded-2xl bg-gradient-primary text-2xl text-primary-foreground [backface-visibility:hidden]">
                        <span aria-hidden="true">❤️</span>
                      </span>
                      <span className="absolute inset-0 grid place-items-center gap-1 rounded-2xl border border-primary/30 bg-card p-1 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <span className="text-2xl" aria-hidden="true">
                          {card.emoji}
                        </span>
                        <span className="text-[10px] leading-tight text-muted-foreground">
                          {card.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {showReward && (
            <>
              <section className="glass-card glass-glow mt-5 animate-pop p-7 text-center">
                <p className="text-4xl" aria-hidden="true">
                  🏆
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-gradient">
                  MEMORY MASTER!
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">Every memory found ❤️</p>
              </section>
              <RewardReveal
                rewardKey="memory"
                claimed={state.memoryRewardClaimed}
                onClaim={() => update({ memoryRewardClaimed: true })}
                headline="Your third Rakhi reward"
              />
            </>
          )}
        </>
      ) : (
        <section className="glass-card p-5">
          <h2 className="font-display text-xl font-bold">Timeline of Us</h2>
          <ol className="mt-5 space-y-4 border-l-2 border-primary/30 pl-5">
            {timeline.map((m) => (
              <li key={m.id} className="relative">
                <span
                  className="absolute -left-[27px] top-4 h-3 w-3 rounded-full bg-gradient-primary"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => setOpenPhoto(m)}
                  className="lift hover:lift-hover grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-card/60 p-3 text-left"
                >
                  <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Photo src={m.src} alt={m.title} emoji={m.emoji} className="h-full w-full" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-muted-foreground">
                      {m.year}
                    </span>
                    <span className="block truncate font-display text-lg font-bold">{m.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      {openPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openPhoto.title}
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={() => setOpenPhoto(null)}
        >
          <div
            className="glass-card glass-glow w-full max-w-md animate-pop overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 w-full">
              <Photo
                src={openPhoto.src}
                alt={openPhoto.title}
                emoji={openPhoto.emoji}
                className="h-full w-full"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-muted-foreground">{openPhoto.year}</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-gradient">
                {openPhoto.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{openPhoto.caption}</p>
              <button
                type="button"
                onClick={() => setOpenPhoto(null)}
                className="mt-5 w-full rounded-2xl bg-secondary py-3 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </QuestShell>
  );
}
