import { useCallback, useEffect, useState } from "react";

const KEY = "culimama-mealplanner-afgevinkt";

export function useAfvinken() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* negeer */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {
      /* negeer */
    }
  }, [done, hydrated]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const reset = useCallback(() => setDone({}), []);

  return { done, toggle, reset, hydrated };
}
