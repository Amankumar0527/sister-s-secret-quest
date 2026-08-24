/* =========================================================================
 * SISTER QUEST — PERSONALIZATION CONFIG
 * -------------------------------------------------------------------------
 * This is the ONE file you edit to make the site yours.
 * Names, secret code, photos, quiz, spin prizes, final gift, message, music.
 * Nothing here is hardcoded anywhere else in the app.
 * =======================================================================*/

import giftQuiz from "@/assets/gift-quiz.jpg";
import giftSpin from "@/assets/gift-spin.jpg";
import giftMemory from "@/assets/gift-memory.jpg";
import finalGiftImage from "@/assets/final-gift.jpg";

/* ---------------------------------- WHO ---------------------------------- */
export const SISTER_NAME = "Ananya";
export const BROTHER_NAME = "Aman";

/** Secret code she types on the login screen (case-insensitive). */
export const PASSWORD = "rakhi2026";

/* --------------------------------- PHOTOS --------------------------------
 * Drop your own files in /public/assets/photos/ and point `src` at them,
 * e.g. src: "/assets/photos/us-2015.jpg".
 * Leave `src` as null to show a pretty gradient placeholder instead —
 * a missing image will never break the page.
 * ------------------------------------------------------------------------*/
export const PROFILE_IMAGE: string | null = null; // e.g. "/assets/photos/sister.jpg"

export type MemoryPhoto = {
  id: string;
  src: string | null;
  emoji: string;
  year: string;
  title: string;
  caption: string;
};

export const MEMORY_IMAGES: MemoryPhoto[] = [
  {
    id: "m1",
    src: null,
    emoji: "🎂",
    year: "2011",
    title: "The cake fight",
    caption: "You blew out my candles. I still haven't forgiven you 😂❤️",
  },
  {
    id: "m2",
    src: null,
    emoji: "🚲",
    year: "2014",
    title: "First cycle ride",
    caption: "I let go of the seat and you screamed the whole street awake.",
  },
  {
    id: "m3",
    src: null,
    emoji: "🏖️",
    year: "2017",
    title: "That beach trip",
    caption: "That day was chaotic… but somehow we survived 😂❤️",
  },
  {
    id: "m4",
    src: null,
    emoji: "📚",
    year: "2019",
    title: "Exam night",
    caption: "You made chai at 3am so I wouldn't fall asleep. Best sister ever.",
  },
  {
    id: "m5",
    src: null,
    emoji: "🎧",
    year: "2022",
    title: "Our playlist",
    caption: "Same three songs, on repeat, every single road trip.",
  },
  {
    id: "m6",
    src: null,
    emoji: "🎀",
    year: "2025",
    title: "Rakhi last year",
    caption: "You tied it too tight on purpose. I know you did.",
  },
];

/* --------------------------------- GIFTS --------------------------------- */
export const GIFT_IMAGES = {
  quiz: giftQuiz,
  spin: giftSpin,
  memory: giftMemory,
} as const;

export const FINAL_GIFT_IMAGE = finalGiftImage;

export const REWARDS = {
  quiz: {
    title: "The Secret Chocolate Stash",
    description: "A whole box of your favourites — hidden where you'd never look.",
    image: GIFT_IMAGES.quiz,
  },
  spin: {
    title: "Your Lucky Spin Prize",
    description: "Whatever the wheel decided, I'm honouring it. Promise.",
    image: GIFT_IMAGES.spin,
  },
  memory: {
    title: "One Day, Your Rules",
    description: "A full day where I say yes to everything you plan.",
    image: GIFT_IMAGES.memory,
  },
  final: {
    title: "This one is for you ❤️",
    description: "The real gift. Waiting for you on Raksha Bandhan.",
    image: FINAL_GIFT_IMAGE,
  },
} as const;

/* ---------------------------------- QUIZ ---------------------------------
 * Exactly 3 questions. `answer` is the index of the correct option.
 * ------------------------------------------------------------------------*/
export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  successNote: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Who is more annoying? 😂",
    options: ["Me, obviously", "You (sorry not sorry)", "Both, equally", "Mom would say you"],
    answer: 1,
    successNote: "Honesty accepted ❤️",
  },
  {
    question: "Who will always protect you?",
    options: ["Google Maps", "Your brother 🛡️", "Nobody, I'm strong", "The dog"],
    answer: 1,
    successNote: "Always. No matter what.",
  },
  {
    question: "What is the one thing that will never change?",
    options: ["My hairstyle", "Our fights over food", "That I'll always be here ❤️", "The WiFi password"],
    answer: 2,
    successNote: "Never. Not once.",
  },
];

/** Convenience export (mirrors QUIZ_QUESTIONS answers). */
export const QUIZ_ANSWERS: number[] = QUIZ_QUESTIONS.map((q) => q.answer);

/* -------------------------------- SPIN WHEEL ------------------------------ */
export type SpinPrize = { label: string; emoji: string };

export const SPIN_PRIZES: SpinPrize[] = [
  { label: "Chocolate", emoji: "🍫" },
  { label: "Flowers", emoji: "🌸" },
  { label: "Teddy", emoji: "🧸" },
  { label: "Mystery Gift", emoji: "🎁" },
  { label: "Special Message", emoji: "💌" },
  { label: "Special Treat", emoji: "🎟️" },
  { label: "Brother's Love", emoji: "❤️" },
  { label: "Surprise", emoji: "🎉" },
];

/* ------------------------------ FINAL MESSAGE ----------------------------- */
export const FINAL_MESSAGE = `Sis,

I'm not great at saying this out loud, so I built it instead.

Thank you for every time you covered for me, every plate you shared,
every fight we had that ended in laughing five minutes later.
You've been my first friend, my loudest critic and my safest place —
all at the same time.

No matter where life takes us, how far, how busy, how old we get:
this thread on my wrist means I'm one call away. Always.

Happy Raksha Bandhan. You're stuck with me forever 😜

— ${BROTHER_NAME}`;

/* --------------------------------- AUDIO ---------------------------------
 * Put a file at /public/assets/music/song.mp3 and set the path here.
 * Leave null to hide the music toggle. Music NEVER autoplays.
 * ------------------------------------------------------------------------*/
export const AUDIO_FILE: string | null = null; // e.g. "/assets/music/song.mp3"

/* ----------------------------- SIBLING STATS ------------------------------ */
export const SIBLING_STATS: { label: string; value: string; numeric?: number }[] = [
  { label: "Years as siblings", value: "21", numeric: 21 },
  { label: "Rakhis tied", value: "20", numeric: 20 },
  { label: "Fights survived", value: "∞" },
];

/* ------------------------------- MISSION COPY ----------------------------- */
export const MISSIONS = [
  {
    key: "quiz" as const,
    emoji: "🎯",
    title: "Sister Quiz",
    description: "Answer 3 questions about us.",
    cta: "START QUIZ",
    to: "/quiz",
  },
  {
    key: "spin" as const,
    emoji: "🎡",
    title: "Lucky Spin",
    description: "Spin once and discover your surprise.",
    cta: "SPIN NOW",
    to: "/spin",
  },
  {
    key: "memory" as const,
    emoji: "🧠",
    title: "Memory Match",
    description: "Match our memories and unlock another surprise.",
    cta: "PLAY MEMORY",
    to: "/memories",
  },
];
