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
    return stored ? JSON.parse(stored) : { darkMode: false, use24h: false };
  } catch {
    return { darkMode: false, use24h: false };
  }
}

export function useWorldClock() {
  const [cities, setCities] = useState<CityData[]>(loadCities);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [tick, setTick] = useState(0);

  // Live tick every second
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Persist cities
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  // Persist settings & apply dark mode
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings]);

  const addCity = useCallback(
    (city: CityData) => {
      if (cities.length >= 5) return;
      if (cities.some((c) => c.id === city.id)) return;
      setCities((prev) => [...prev, city]);
    },
    [cities]
  );

  const removeCity = useCallback(
    (id: string) => {
      setCities((prev) => {
        const newCities = prev.filter((c) => c.id !== id);
        return newCities;
      });
      setPrimaryIndex((prev) => {
        const idx = cities.findIndex((c) => c.id === id);
        if (idx === prev) return 0;
        if (idx < prev) return prev - 1;
        return prev;
      });
    },
    [cities]
  );

  const setPrimary = useCallback(
    (id: string) => {
      const idx = cities.findIndex((c) => c.id === id);
      if (idx >= 0) setPrimaryIndex(idx);
    },
    [cities]
  );

  const toggleDarkMode = useCallback(() => {
    setSettings((s) => ({ ...s, darkMode: !s.darkMode }));
  }, []);

  const toggleTimeFormat = useCallback(() => {
    setSettings((s) => ({ ...s, use24h: !s.use24h }));
  }, []);

  const primaryCity = cities.length > 0 ? cities[primaryIndex] || cities[0] : null;
  const secondaryCities = cities.filter((_, i) => i !== (primaryIndex < cities.length ? primaryIndex : 0));

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
