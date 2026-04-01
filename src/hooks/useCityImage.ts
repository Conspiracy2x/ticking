import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CityImages {
  heroImage: string;
  detailImage: string;
}

interface CacheEntry {
  data: CityImages;
  timestamp: number;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Global cache + in-flight deduplication
const imageCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<CityImages | null>>();

function getCached(key: string): CityImages | null {
  const entry = imageCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    imageCache.delete(key);
    return null;
  }
  return entry.data;
}

function fetchCityImages(city: string, country?: string): Promise<CityImages | null> {
  const key = city.toLowerCase();

  const cached = getCached(key);
  if (cached) return Promise.resolve(cached);

  if (inflight.has(key)) return inflight.get(key)!;

  const promise = supabase.functions
    .invoke("city-image", { body: { city, country } })
    .then(({ data, error }) => {
      inflight.delete(key);
      if (error || !data?.heroImage) return null;
      const result: CityImages = { heroImage: data.heroImage, detailImage: data.detailImage };
      imageCache.set(key, { data: result, timestamp: Date.now() });
      return result;
    });

  inflight.set(key, promise);
  return promise;
}

export function useCityImage(cityName: string | null, country?: string) {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [detailImage, setDetailImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelRef = useRef(0);

  useEffect(() => {
    if (!cityName) {
      setHeroImage(null);
      setDetailImage(null);
      setError(null);
      return;
    }

    const id = ++cancelRef.current;
    const cached = getCached(cityName.toLowerCase());

    if (cached) {
      setHeroImage(cached.heroImage);
      setDetailImage(cached.detailImage);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchCityImages(cityName, country).then((result) => {
      if (cancelRef.current !== id) return;
      if (result) {
        setHeroImage(result.heroImage);
        setDetailImage(result.detailImage);
        setError(null);
      } else {
        setHeroImage(null);
        setDetailImage(null);
        setError("Failed to load images");
      }
      setLoading(false);
    });
  }, [cityName, country]);

  const fallbackGradient = "linear-gradient(135deg, hsl(220, 25%, 12%), hsl(220, 30%, 25%))";

  return {
    heroImage,
    detailImage,
    heroLoading: loading && !heroImage,
    detailLoading: loading && !detailImage,
    error,
    fallbackGradient,
  };
}
