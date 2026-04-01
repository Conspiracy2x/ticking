import { useState, useEffect } from "react";
import { getCityImages } from "@/lib/cityImages";

export function useCityImage(cityName: string | null) {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [detailImage, setDetailImage] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!cityName) {
      setHeroImage(null);
      setDetailImage(null);
      return;
    }

    const images = getCityImages(cityName);

    // Load hero image
    setHeroLoading(true);
    const heroImg = new Image();
    heroImg.onload = () => { setHeroImage(heroImg.src); setHeroLoading(false); };
    heroImg.onerror = () => { setHeroImage(null); setHeroLoading(false); };
    heroImg.src = images.heroImage;

    // Load detail image
    setDetailLoading(true);
    const detailImg = new Image();
    detailImg.onload = () => { setDetailImage(detailImg.src); setDetailLoading(false); };
    detailImg.onerror = () => { setDetailImage(null); setDetailLoading(false); };
    detailImg.src = images.detailImage;
  }, [cityName]);

  const fallbackGradient = "linear-gradient(135deg, hsl(220, 25%, 12%), hsl(220, 30%, 25%))";

  return { heroImage, detailImage, heroLoading, detailLoading, fallbackGradient };
}
