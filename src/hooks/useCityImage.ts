import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CityImages {
  heroImage: string;
  detailImage: string;
}

// Global cache + in-flight deduplication
const imageCache = new Map<string, CityImages>();
const inflight = new Map<string, Promise<CityImages | null>>();

function fetchCityImages(city: string, country?: string): Promise<CityImages | null> {
  const key = city.toLowerCase();

  if (imageCache.has(key)) return Promise.resolve(imageCache.get(key)!);

  if (inflight.has(key)) return inflight.get(key)!;

  const promise = supabase.functions
    .invoke("city-image", { body: { city, country } })
    .then(({ data, error }) => {
      inflight.delete(key);
      if (error || !data?.heroImage) return null;
      const result: CityImages = { heroImage: data.heroImage, detailImage: data.detailImage };
      imageCache.set(key, result);
      return result;
    });

  inflight.set(key, promise);
  return promise;
}

export function useCityImage(cityName: string | null, country?: string) {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [detailImage, setDetailImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef(0);

  useEffect(() => {
    if (!cityName) {
      setHeroImage(null);
      setDetailImage(null);
      return;
    }

    const id = ++cancelRef.current;
    const cached = imageCache.get(cityName.toLowerCase());

    if (cached) {
      setHeroImage(cached.heroImage);
      setDetailImage(cached.detailImage);
      return;
    }

    setLoading(true);

    fetchCityImages(cityName, country).then((result) => {
      if (cancelRef.current !== id) return;
      if (result) {
        setHeroImage(result.heroImage);
        setDetailImage(result.detailImage);
      } else {
        setHeroImage(null);
        setDetailImage(null);
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
    fallbackGradient,
  };
}
