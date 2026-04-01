import { useState, useEffect, useCallback } from "react";
import { CityData } from "@/lib/timezones";

const STORAGE_KEY = "world-clock-cities";
const SETTINGS_KEY = "world-clock-settings";

interface Settings {
  darkMode: boolean;
  use24h: boolean;
}

function loadCities(): CityData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return { darkMode: true, use24h: false };
    const parsed = JSON.parse(stored);
    return {
      darkMode: parsed.darkMode ?? true,
      use24h: parsed.use24h ?? false,
    };
  } catch {
    return { darkMode: true, use24h: false };
  }
}

export function useWorldClock() {
  const [cities, setCities] = useState<CityData[]>(loadCities);
  const [primaryId, setPrimaryId] = useState<string | null>(() => {
    const loaded = loadCities();
    return loaded.length > 0 ? loaded[0].id : null;
  });
  const [settings, setSettings] = useState<Settings>(() => {
    const initialSettings = loadSettings();
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", initialSettings.darkMode);
    }
    return initialSettings;
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings]);

  const addCity = useCallback(
    (city: CityData) => {
      setCities((prev) => {
        if (prev.length >= 5) return prev;
        if (prev.some((c) => c.id === city.id)) return prev;
        const next = [...prev, city];
        // If this is the first city, set it as primary
        if (prev.length === 0) setPrimaryId(city.id);
        return next;
      });
    },
    []
  );

  const removeCity = useCallback((id: string) => {
    setCities((prev) => {
      const next = prev.filter((c) => c.id !== id);
      // If we removed the primary, reset to the first remaining city
      setPrimaryId((currentPrimaryId) => {
        if (currentPrimaryId === id) {
          return next.length > 0 ? next[0].id : null;
        }
        return currentPrimaryId;
      });
      return next;
    });
  }, []);

  const setPrimary = useCallback((id: string) => {
    setPrimaryId(id);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setSettings((s) => ({ ...s, darkMode: !s.darkMode }));
  }, []);

  const toggleTimeFormat = useCallback(() => {
    setSettings((s) => ({ ...s, use24h: !s.use24h }));
  }, []);

  const primaryCity = cities.find((c) => c.id === primaryId) || cities[0] || null;
  const secondaryCities = cities.filter((c) => c.id !== primaryCity?.id);

  return {
    cities,
    primaryCity,
    secondaryCities,
    settings,
    tick,
    addCity,
    removeCity,
    setPrimary,
    toggleDarkMode,
    toggleTimeFormat,
  };
}
