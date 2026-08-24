import { useEffect, useRef, useState } from "react";
import { AUDIO_FILE } from "@/config/questConfig";

/** Manual-only background music. Never autoplays. */
export function MusicToggle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => ref.current?.pause(), []);

  if (!AUDIO_FILE) return null;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={ref} src={AUDIO_FILE} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className={`glass-card lift hover:lift-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-medium ${className}`}
      >
        <span aria-hidden="true">🎵</span>
        {playing ? "Pause Music" : "Play Music"}
      </button>
    </>
  );
}
