# Sister's Secret Quest

SISTER QUEST 🔐❤️ — Lovable Build Prompt (Raksha Bandhan 2026)
Paste everything below directly into Lovable as your first prompt.
Build "Sister Quest" — a cinematic, mobile-first, interactive gift website I'm secretly building for my sister for Raksha Bandhan 2026. It should feel like a hand-crafted secret world, not a template: part personal dashboard, part mini-game, part digital memory box, part reward system. Emotional pacing matters as much as visuals — she should go from "what is this?" to "he actually built this for me" to happy tears by the end.
It must NOT look like a SaaS dashboard, e-commerce store, portfolio, or a generic greeting-card template. Every screen should feel personal, warm, and a little magical.
1. Emotional Arc (design every screen around this)
🔐 Curiosity → 👀 Delight → 🎮 Play → 🎁 Surprise → 📸 Nostalgia → ❤️ Love → 😭 "He made this for me"
2. Visual Identity
Palette: soft pink, lavender, cream/white, muted purple, subtle peach — blended in soft gradients, never flat or garish.
Style: glassmorphism cards, 18–28px rounded corners, soft drop shadows, glowing borders on important cards, generous whitespace, floating hearts/sparkles as ambient background motion (subtle, never distracting).
Typography: Poppins or Inter for body/UI text; Playfair Display (or similar elegant serif) for emotional headlines. Strong contrast, large touch-friendly buttons, fully legible on small screens.
Motion: smooth page transitions, card-lift on hover, button press feedback, confetti/sparkle bursts on key moments, 3D card-flip for the memory game, a real "gift unboxing" animation for the finale. Tasteful — never so much that it feels childish or slows the site down.
Feel: premium and modern, but unmistakably personal — like a love letter with a UI.
3. Full Journey / Site Map
SECRET LOGIN
   ↓
WELCOME
   ↓
MAIN DASHBOARD ── nav: Home · Quiz · Spin · Memories · Rewards (· Settings)
   ├── SISTER QUIZ ──────────→ Reward #1
   ├── LUCKY SPIN WHEEL ─────→ Reward #2
   ├── MEMORY MATCH GAME ────→ Reward #3
   │      └── toggle: Album Mode (photo gallery with captions)
   ├── REWARD CENTER (tracks all 3 + final gift)
   ↓ (once 3/3 claimed)
FINAL GIFT (cinematic unlock + unboxing)
   ↓
FINAL RAKSHA BANDHAN MESSAGE

Navigation must always reflect true progress state (locked/available/completed), and progress must persist across refresh and reopening the browser via localStorage.
4. Page-by-Page Details
🔐 Page 1 — Secret Login
Animated soft gradient background with floating hearts/stars.
Centered glass login card: 🔐 SISTER QUEST / RAKSHA BANDHAN 2026 / "CLASSIFIED ACCESS"
Masked password input, placeholder "Enter Secret Code", hint text "Only you know this…"
Button: UNLOCK ❤️
Correct password: short verification sequence animation — AUTHENTICATING… → Identity verification ✓ → Brother verification ✓ → Sister verification ✓ → Love verification ∞ → ACCESS GRANTED ❤️ → smooth transition to Welcome.
Wrong password: playful message ("Nice try 😜 Only my sister knows the secret.") and allow retry, no lockouts.
Implement password check client-side for now, but structure the code cleanly (isolated auth module) so it can later be swapped for a real backend check without touching UI code.
👑 Page 2 — Welcome
HAPPY RAKSHA BANDHAN ❤️ / Welcome, [SISTER_NAME] 👑
"I made a tiny digital world just for you."
Placeholder for a real photo of her.
Button: ENTER YOUR SURPRISE → → transitions into Dashboard.
🏠 Main Dashboard
Title SISTER QUEST ❤️, greeting Welcome back, [SISTER_NAME] 👑, subtitle "Your Rakhi adventure is waiting…"
Animated progress bar: "RAKHI QUEST PROGRESS" — X / 3 Missions Completed, filling smoothly as missions complete.
Three mission cards, each with icon, one-line description, dynamic status (🔒 Locked / ✨ Ready / ✅ Complete), and CTA:
🎯 Sister Quiz — "Answer 3 questions about us." → START QUIZ →
🎡 Lucky Spin — "Spin once and discover your surprise." → SPIN NOW → (available immediately, doesn't need to be gated)
🧠 Memory Match — "Match our memories and unlock another surprise." → PLAY MEMORY →
Reward Center preview card: 🎁 shows all four reward slots (Quiz / Spin / Memory / Final Gift) with live lock/claim icons.
Nav: desktop = left sidebar; mobile = bottom nav bar — 🏠 🎯 🎡 🧠 🎁 (+ optional ⚙️ Settings).
🎯 Page 3 — Sister Quiz
Title "HOW WELL DO YOU KNOW YOUR BROTHER? 😜", one question shown at a time with a progress indicator (Question 1/3, etc.) and animated card transitions.
Exactly 3 questions, 3–4 options each, correct answers configurable in a data file. Placeholder examples:
"Who is more annoying? 😂"
"Who will always protect you?"
"What is the one thing that will never change?"
Correct → "Correct! ❤️" and auto-advance. Wrong → "Oops! Try again 😜", stay on question.
On completion: celebration animation, 🎉 QUIZ COMPLETED — 3/3 CORRECT, "You really know your brother ❤️"
Reward #1 reveal: gift image placeholder, "Your first Rakhi reward!", CLAIM REWARD ❤️ → celebration → ✅ CLAIMED, saved to localStorage, dashboard/reward center update instantly.
🎡 Page 4 — Lucky Spin Wheel
Title "LUCKY RAKHI SPIN 🎡", subtitle "One spin. One surprise. No second chances 😜"
Colorful circular wheel, multiple labeled sections (🍫 Chocolate · 🌸 Flowers · 🧸 Teddy · 🎁 Mystery Gift · 💌 Special Message · 🎟️ Special Treat · ❤️ Brother's Love · 🎉 Surprise — all configurable in data).
Realistic spin physics with easing to a stop, suspenseful result animation, then reveal only the single won prize (never show all outcomes): 🎉 YOU WON! 🎁 [PRIZE]
CLAIM REWARD ❤️ → REWARD CLAIMED ✓
Spin result + claimed state persist in localStorage; wheel becomes disabled/read-only after first spin, even across refresh.
🧠 Page 5 — Memory Match Game
Title "OUR MEMORY GAME ❤️", subtitle "Let's see how well you remember our moments."
12 cards / 6 pairs, face shows ❤️ or ❓ until flipped; smooth 3D flip animation.
Match → cards stay open with a soft heart-pulse animation. No match → flip back after a short delay.
Live counters: Moves: N and Matches: N / 6.
On completion: 🏆 MEMORY MASTER! / "Every memory found ❤️" → Reward #3 reveal → CLAIM REWARD ❤️ → ✅ CLAIMED, saved to localStorage.
Toggle: Game Mode / Album Mode. Album mode shows a photo gallery (lazy-loaded); tapping a photo opens a modal with the photo, a title, and a short personal caption (e.g. "That day was chaotic… but somehow we survived 😂❤️"). All captions/images live in one editable config.
🎁 Reward Center
Title "YOUR RAKHI REWARDS ❤️" — three cards (Quiz / Spin / Memory), each with image, title, description, status pill (LOCKED / AVAILABLE / CLAIMED), and a claim button when available. No double-claiming. Updates dashboard progress live.
🔓 Final Gift (unlocks only at 3/3 claimed)
Dashboard shows 🎉 ALL MISSIONS COMPLETE! with Quiz ✓ Spin ✓ Memory ✓, 3/3 Rewards Claimed, then 🔓 FINAL SURPRISE UNLOCKED → OPEN FINAL GIFT ❤️
On click: cinematic sequence — background dims slightly, a glowing gift box appears and opens, hearts/confetti/sparkles burst out, then the real final gift image is revealed.
THIS ONE IS FOR YOU ❤️ / "Happy Raksha Bandhan, Sis!" → CLAIM FINAL GIFT ❤️ → 🎉 FINAL GIFT CLAIMED!
💌 Final Message Page
HAPPY RAKSHA BANDHAN ❤️
Editable heartfelt message block (default placeholder text about siblinghood, provided in config).
Photo section.
Optional PLAY MY MESSAGE 🎵 button for a personal voice recording (muted/off by default).
5. State & Persistence
Track this shape in localStorage (survives refresh and reopening the browser):
{
  quizCompleted: false,
  quizRewardClaimed: false,
  spinCompleted: false,
  spinResult: null,
  spinRewardClaimed: false,
  memoryCompleted: false,
  memoryRewardClaimed: false,
  finalGiftUnlocked: false,
  finalGiftClaimed: false
}

Progress = (quizCompleted + spinCompleted + memoryCompleted) / 3, animated on the progress bar. At 3/3, show 🎉 QUEST COMPLETE! and unlock the Final Gift flow. Claim buttons must: trigger a small celebration → change to CLAIMED ✓ → update Reward Center → update dashboard progress → persist to localStorage → prevent duplicate claims.
6. Micro-interactions & Feedback
Floating hearts, sparkles, hover lift, button-press animation, card-lift, card-flip, confetti, gift-unboxing animation, animated progress bar, and small toast notifications for moments like: "Mission unlocked! 🎉" · "Reward claimed! ❤️" · "Memory found! 📸" · "You're doing great, sis! 👑"
7. Sound (optional, never autoplay)
A single 🎵 "Play Music" toggle to start/stop background music manually. Optional short SFX (muted by default) for: correct quiz answer, card match, wheel spin, reward claim, final gift opening.
8. Personalization Config (single source of truth)
Put all of the following in one clearly-commented config file — never hardcoded elsewhere:
SISTER_NAME, BROTHER_NAME, PASSWORD,
PROFILE_IMAGE, MEMORY_IMAGES[], GIFT_IMAGES{},
QUIZ_QUESTIONS[], QUIZ_ANSWERS[],
SPIN_PRIZES[], FINAL_GIFT_IMAGE, FINAL_MESSAGE, AUDIO_FILE

Asset folders: /assets/photos/, /assets/gifts/, /assets/music/. Use attractive placeholders for anything missing, and never let a missing image break the page.
9. Responsive & Accessibility
Mobile-first; works cleanly on mobile, tablet, laptop, desktop.
Mobile: compact top header, bottom nav (🏠 🎯 🎡 🧠 🎁), full-width cards, large tap targets, no horizontal scroll, wheel and memory cards sized to fit the viewport.
Desktop: left nav/logo, centered main content with a max-width, small progress/reward panel on the right.
Keyboard-accessible controls, visible focus states, good color contrast, alt text on all images, no interaction that relies on color alone.
Keep it light: minimal dependencies, optimized/lazy-loaded images, restrained background animation so performance stays smooth on mobile data.
10. Code Quality
Modular structure with clear separation of concerns: UI components, game logic (quiz/spin/memory), reward/state logic, the personalization config, and styling. No duplicated logic. Everything a person would want to customize (name, password, images, questions, prizes, message, music) should be editable in one place without touching component code.
11. Optional "Wow" Add-ons (nice-to-have, add if time allows)
These aren't required, but would make it even more special — include any that fit:
Sibling Stats strip on the dashboard: playful auto-counting numbers like "Years as siblings: 21", "Fights survived: ∞", "Rakhis tied: 20" (all editable).
A hidden Easter egg: tapping the hearts in the header a few times in a row triggers a tiny secret animation or bonus mini-message.
A "Timeline of Us" section in Album Mode — a vertical scrolling timeline of memories by year instead of a flat grid.
A closing countdown-style reveal: instead of an instant image, the final gift box "ticks" open in 3 stages (ribbon → lid → gift) for extra suspense.
A personalized favicon/browser tab title like "❤️ For [Sister Name]" so even the tab feels intentional.
A "Save as memory" screenshot-friendly summary card at the very end — a shareable recap card (auto-generated, not requiring upload) she could screenshot and keep.
Keep these subtle and optional — the emotional core (quest → rewards → memories → final message) is the priority; polish these only if the core experience is already smooth.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8bed13dd-7dd7-4768-9cfb-ff3e53d95efb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
