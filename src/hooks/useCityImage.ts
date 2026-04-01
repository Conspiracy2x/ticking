import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CityImageResult {
  heroImage: string | null;
  detailImage: string | null;
  heroLoading: boolean;
  detailLoading: boolean;
  fallbackGradient: string;
}

const imageCache = new Map<string, { heroImage: string; detailImage: string }>();

export function useCityImage(cityName: string | null, country?: string): CityImageResult {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [detailImage, setDetailImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!cityName) {
      setHeroImage(null);
      setDetailImage(null);
      return;
    }

    const cacheKey = cityName.toLowerCase();

    // Use cache if available
    if (imageCache.has(cacheKey)) {
      const cached = imageCache.get(cacheKey)!;
      setHeroImage(cached.heroImage);
      setDetailImage(cached.detailImage);
      return;
    }

    // Abort previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    supabase.functions
      .invoke("city-image", {
        body: { city: cityName, country },
      })
      .then(({ data, error }) => {
        if (controller.signal.aborted) return;

        if (error || !data) {
          console.error("City image fetch error:", error);
          setHeroImage(null);
          setDetailImage(null);
          setLoading(false);
          return;
        }

        // Preload hero image
        const heroImg = new Image();
        heroImg.onload = () => {
          if (controller.signal.aborted) return;
          setHeroImage(data.heroImage);
          // Preload detail image
          const detailImg = new Image();
          detailImg.onload = () => {
            if (controller.signal.aborted) return;
            setDetailImage(data.detailImage);
            imageCache.set(cacheKey, { heroImage: data.heroImage, detailImage: data.detailImage });
            setLoading(false);
          };
          detailImg.onerror = () => {
            if (controller.signal.aborted) return;
            setDetailImage(data.heroImage); // fallback detail to hero
            imageCache.set(cacheKey, { heroImage: data.heroImage, detailImage: data.heroImage });
            setLoading(false);
          };
          detailImg.src = data.detailImage;
        };
        heroImg.onerror = () => {
          if (controller.signal.aborted) return;
          setHeroImage(null);
          setDetailImage(null);
          setLoading(false);
        };
        heroImg.src = data.heroImage;
      });

    return () => controller.abort();
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
