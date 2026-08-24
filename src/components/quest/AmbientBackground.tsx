import { useMemo } from "react";

/** Floating hearts + twinkling sparkles. Purely decorative, low cost. */
export function AmbientBackground({ dense = false }: { dense?: boolean }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: dense ? 14 : 9 }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        delay: `${(i * 1.7) % 14}s`,
        duration: `${12 + ((i * 3) % 9)}s`,
        drift: `${((i % 5) - 2) * 30}px`,
        size: `${12 + ((i * 5) % 16)}px`,
        glyph: i % 3 === 0 ? "✨" : i % 3 === 1 ? "❤️" : "🌸",
      })),
    [dense],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-70"
        style={{ backgroundImage: "var(--gradient-glow)" }}
      />
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 select-none animate-float-up"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
            ["--drift" as string]: h.drift,
          }}
        >
          {h.glyph}
        </span>
      ))}
    </div>
  );
}
