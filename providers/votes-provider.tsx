"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "dsources:votes:v1";

type VotesSnapshot = {
  ids: string[];
};

const emptySnapshot: VotesSnapshot = { ids: [] };

let cache: VotesSnapshot | null = null;
const listeners = new Set<() => void>();

function loadVotes(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((x) => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function getSnapshot(): VotesSnapshot {
  if (cache === null) cache = { ids: loadVotes() };
  return cache;
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = { ids: loadVotes() };
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(ids: string[]) {
  cache = { ids };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage puede no estar disponible (modo privado); ignorar.
  }
  emit();
}

/** Optimistically adds/removes the id locally; the caller fires the API call. */
function toggleVote(id: string): boolean {
  const current = getSnapshot();
  const voted = current.ids.includes(id);
  commit(voted ? current.ids.filter((x) => x !== id) : [...current.ids, id]);
  return !voted;
}

type VotesContextValue = {
  isVoted: (id: string) => boolean;
  /** Returns true if the resource ended up voted. Caller handles the API. */
  toggleVoteLocal: (id: string) => boolean;
};

const VotesContext = createContext<VotesContextValue | null>(null);

export function VotesProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => emptySnapshot
  );
  const { ids: votedIds } = snapshot;

  const isVoted = useCallback(
    (id: string) => votedIds.includes(id),
    [votedIds]
  );

  return (
    <VotesContext.Provider
      value={{
        isVoted,
        toggleVoteLocal: toggleVote,
      }}
    >
      {children}
    </VotesContext.Provider>
  );
}

export function useVotes() {
  const ctx = useContext(VotesContext);
  if (!ctx) {
    throw new Error("useVotes debe usarse dentro de <VotesProvider>");
  }
  return ctx;
}
