/** Tiny dependency-free confetti / sparkle burst. */
const PIECES = ["❤️", "✨", "🎉", "💖", "🌸", "⭐"];

export function celebrate(count = 26) {
  if (typeof document === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:70;display:grid;place-items:center;";

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.textContent = PIECES[i % PIECES.length] ?? "✨";
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 120 + Math.random() * 260;
    el.style.cssText = `position:absolute;font-size:${14 + Math.random() * 18}px;--bx:${
      Math.cos(angle) * dist
    }px;--by:${Math.sin(angle) * dist}px;animation:burst ${
      0.9 + Math.random() * 0.6
    }s cubic-bezier(.16,.84,.44,1) forwards;`;
    layer.appendChild(el);
  }

  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1800);
}
