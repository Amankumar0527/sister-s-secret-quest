import { useState } from "react";

/**
 * Image that gracefully degrades to a warm gradient + emoji placeholder,
 * so a missing photo never breaks a page.
 */
export function Photo({
  src,
  alt,
  emoji = "📸",
  className = "",
  eager = false,
}: {
  src?: string | null;
  alt: string;
  emoji?: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-gradient-primary text-4xl ${className}`}
      >
        <span aria-hidden="true">{emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
