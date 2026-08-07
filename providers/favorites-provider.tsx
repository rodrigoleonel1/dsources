"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "dsources:favorites:v1";

type FavoritesSnapshot = {
  ids: string[];
  hydrated: boolean;
};

const emptySnapshot: FavoritesSnapshot = { ids: [], hydrated: false };

let cache: FavoritesSnapshot | null = null;
const listeners = new Set<() => void>();

function loadFavorites(): string[] {
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

function getSnapshot(): FavoritesSnapshot {
  if (cache === null) cache = { ids: loadFavorites(), hydrated: true };
  return cache;
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = { ids: loadFavorites(), hydrated: true };
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function toggleStore(id: string) {
  const current = getSnapshot();
  const next = current.ids.includes(id)
    ? current.ids.filter((x) => x !== id)
    : [...current.ids, id];
  cache = { ids: next, hydrated: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage puede no estar disponible (modo privado); ignorar.
  }
  emit();
}

type FavoritesContextValue = {
  favoriteIds: string[];
  ready: boolean;
  isFavorited: (id: string) => boolean;
  toggle: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => emptySnapshot
  );
  const { ids: favoriteIds, hydrated: ready } = snapshot;

  const isFavorited = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider value={{ favoriteIds, ready, isFavorited, toggle: toggleStore }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  }
  return ctx;
}
