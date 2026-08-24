import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/quest/AmbientBackground";
import { Photo } from "@/components/quest/Photo";
import { useRequireUnlock } from "@/components/quest/QuestShell";
import { PROFILE_IMAGE, SISTER_NAME } from "@/config/questConfig";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome, Sis 👑 — Sister Quest" },
      {
        name: "description",
        content: "A tiny digital world built by your brother for Raksha Bandhan 2026.",
      },
      { property: "og:title", content: "Welcome, Sis 👑 — Sister Quest" },
      {
        property: "og:description",
        content: "A tiny digital world built by your brother for Raksha Bandhan 2026.",
      },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();
  const ready = useRequireUnlock();
  if (!ready) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <AmbientBackground dense />
      <div className="glass-card glass-glow w-full max-w-lg animate-pop p-7 text-center sm:p-10">
        <h1 className="font-display text-3xl font-bold leading-tight text-gradient sm:text-4xl">
          HAPPY RAKSHA BANDHAN ❤️
        </h1>
        <p className="mt-3 font-display text-xl">
          Welcome, {SISTER_NAME} <span aria-hidden="true">👑</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          I made a tiny digital world just for you.
        </p>

        <div className="mx-auto mt-7 h-44 w-44 overflow-hidden rounded-full border-4 border-card shadow-[var(--shadow-glow)]">
          <Photo
            src={PROFILE_IMAGE}
            alt={`Photo of ${SISTER_NAME}`}
            emoji="👑"
            eager
            className="h-full w-full"
          />
        </div>

        <button
          type="button"
          onClick={() => void navigate({ to: "/dashboard" })}
          className="lift hover:lift-hover mt-8 w-full rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] active:scale-[0.98]"
        >
          ENTER YOUR SURPRISE →
        </button>
      </div>
    </div>
  );
}
