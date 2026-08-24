import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { QuestShell, useRequireUnlock } from "@/components/quest/QuestShell";
import { RewardReveal } from "@/components/quest/RewardReveal";
import { useQuest } from "@/lib/questState";
import { celebrate } from "@/lib/celebrate";
import { QUIZ_QUESTIONS } from "@/config/questConfig";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Sister Quiz 🎯 — How well do you know your brother?" },
      {
        name: "description",
        content: "Three questions about us. Get them all right to unlock your first Rakhi reward.",
      },
      { property: "og:title", content: "Sister Quiz 🎯 — How well do you know your brother?" },
      { property: "og:description", content: "Three questions about us, one reward waiting." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const ready = useRequireUnlock();
  const { state, update } = useQuest();
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [correct, setCorrect] = useState<number | null>(null);
  const [done, setDone] = useState(state.quizCompleted);

  if (!ready) return null;

  const q = QUIZ_QUESTIONS[index]!;

  const choose = (i: number) => {
    if (correct !== null) return;
    if (i === q.answer) {
      setCorrect(i);
      setWrong(null);
      celebrate(14);
      setTimeout(() => {
        setCorrect(null);
        if (index + 1 >= QUIZ_QUESTIONS.length) {
          setDone(true);
          celebrate(40);
          if (!state.quizCompleted) {
            update({ quizCompleted: true });
            toast("Mission complete! 🎉", { description: "Your first reward is ready." });
          }
        } else {
          setIndex((n) => n + 1);
        }
      }, 900);
    } else {
      setWrong(i);
    }
  };

  return (
    <QuestShell
      title="HOW WELL DO YOU KNOW YOUR BROTHER? 😜"
      subtitle="Three questions. No pressure. (Okay, a little pressure.)"
    >
      {!done ? (
        <section className="glass-card animate-pop p-6" key={index}>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
            QUESTION {index + 1} / {QUIZ_QUESTIONS.length}
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-primary transition-[width] duration-700"
              style={{ width: `${((index + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold">{q.question}</h2>

          <ul className="mt-5 space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = correct === i;
              const isWrong = wrong === i;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    aria-pressed={isCorrect}
                    className={`lift hover:lift-hover w-full rounded-2xl border px-4 py-4 text-left text-base font-medium transition ${
                      isCorrect
                        ? "border-transparent bg-gradient-primary text-primary-foreground"
                        : isWrong
                          ? "border-destructive/50 bg-secondary"
                          : "border-border bg-card/70 hover:border-primary/50"
                    }`}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>

          <p aria-live="polite" className="mt-4 min-h-6 text-sm font-semibold">
            {correct !== null && <span className="text-gradient">Correct! ❤️ {q.successNote}</span>}
            {wrong !== null && correct === null && (
              <span className="text-muted-foreground">Oops! Try again 😜</span>
            )}
          </p>
        </section>
      ) : (
        <>
          <section className="glass-card glass-glow animate-pop p-7 text-center">
            <p className="text-4xl" aria-hidden="true">
              🎉
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-gradient">
              QUIZ COMPLETED — 3/3 CORRECT
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">You really know your brother ❤️</p>
          </section>

          <RewardReveal
            rewardKey="quiz"
            claimed={state.quizRewardClaimed}
            onClaim={() => update({ quizRewardClaimed: true })}
            headline="Your first Rakhi reward!"
          />
        </>
      )}
    </QuestShell>
  );
}
