import { useState, useEffect } from "react";

const FALLBACK_GRADIENTS: Record<string, string> = {
  default: "linear-gradient(135deg, hsl(220, 25%, 12%), hsl(220, 30%, 25%))",
};

export function useCityImage(cityName: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cityName) {
      setImageUrl(null);
      return;
    }

    setLoading(true);
    // Use Unsplash source (no API key needed)
    const url = `https://source.unsplash.com/1600x900/?${encodeURIComponent(cityName + " city skyline")}`;

    const img = new Image();
    img.onload = () => {
      setImageUrl(img.src);
      setLoading(false);
    };
    img.onerror = () => {
      setImageUrl(null);
      setLoading(false);
    };
    img.src = url;
  }, [cityName]);

  const fallbackGradient = FALLBACK_GRADIENTS.default;

  return { imageUrl, loading, fallbackGradient };
}
