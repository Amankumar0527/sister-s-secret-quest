/**
 * Quest state: single source of truth for progress + rewards.
 * Persisted to localStorage, survives refresh and browser restarts.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type QuestState = {
  quizCompleted: boolean;
  quizRewardClaimed: boolean;
  spinCompleted: boolean;
  spinResult: string | null;
  spinRewardClaimed: boolean;
  memoryCompleted: boolean;
  memoryRewardClaimed: boolean;
  finalGiftUnlocked: boolean;
  finalGiftClaimed: boolean;
};

export const INITIAL_STATE: QuestState = {
  quizCompleted: false,
  quizRewardClaimed: false,
  spinCompleted: false,
  spinResult: null,
  spinRewardClaimed: false,
  memoryCompleted: false,
  memoryRewardClaimed: false,
  finalGiftUnlocked: false,
  finalGiftClaimed: false,
};

const STORAGE_KEY = "sister-quest:state";

function load(): QuestState {
  if (typeof window === "undefined") return INITIAL_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    return { ...INITIAL_STATE, ...(JSON.parse(raw) as Partial<QuestState>) };
  } catch {
    return INITIAL_STATE;
  }
}

function save(state: QuestState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

type Ctx = {
  state: QuestState;
  hydrated: boolean;
  update: (patch: Partial<QuestState>) => void;
  reset: () => void;
  completed: number;
  progress: number;
  allClaimed: boolean;
};

const QuestContext = createContext<Ctx | null>(null);

export function QuestProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuestState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<QuestState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      const claimedAll =
        next.quizRewardClaimed && next.spinRewardClaimed && next.memoryRewardClaimed;
      next.finalGiftUnlocked = claimedAll;
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    save(INITIAL_STATE);
  }, []);

  const value = useMemo<Ctx>(() => {
    const completed =
      Number(state.quizCompleted) + Number(state.spinCompleted) + Number(state.memoryCompleted);
    return {
      state,
      hydrated,
      update,
      reset,
      completed,
      progress: Math.round((completed / 3) * 100),
      allClaimed:
        state.quizRewardClaimed && state.spinRewardClaimed && state.memoryRewardClaimed,
    };
  }, [state, hydrated, update, reset]);

  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}

export function useQuest() {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error("useQuest must be used inside <QuestProvider>");
  return ctx;
}

export type MissionKey = "quiz" | "spin" | "memory";

export function missionStatus(
  state: QuestState,
  key: MissionKey,
): "locked" | "ready" | "complete" {
  const done = state[`${key}Completed` as const];
  if (done) return "complete";
  return "ready";
}

export function rewardStatus(
  state: QuestState,
  key: MissionKey | "final",
): "locked" | "available" | "claimed" {
  if (key === "final") {
    if (state.finalGiftClaimed) return "claimed";
    return state.finalGiftUnlocked ? "available" : "locked";
  }
  if (state[`${key}RewardClaimed` as const]) return "claimed";
  return state[`${key}Completed` as const] ? "available" : "locked";
}
