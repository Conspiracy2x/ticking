import { useState, useEffect, useRef } from "react";
import { CityData, getTimeForTimezone } from "@/lib/timezones";
import { useCityImage } from "@/hooks/useCityImage";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

interface CityImageProps {
  city: CityData;
  use24h: boolean;
  tick: number;
  onRemove: (id: string) => void;
}

export function CityImage({ city, use24h, tick: _tick, onRemove }: CityImageProps) {
  const { imageUrl, loading, fallbackGradient } = useCityImage(city.name);
  const time = getTimeForTimezone(city.timezone, use24h);
  const [imgOpacity, setImgOpacity] = useState(0);
  const [textAnim, setTextAnim] = useState(false);
  const prevCityRef = useRef(city.id);

  // Fade in image when loaded
  useEffect(() => {
    if (imageUrl) {
      setImgOpacity(0);
      const t = setTimeout(() => setImgOpacity(1), 50);
      return () => clearTimeout(t);
    }
  }, [imageUrl]);

  // Animate text on city change
  useEffect(() => {
    if (prevCityRef.current !== city.id) {
      setTextAnim(true);
      const t = setTimeout(() => setTextAnim(false), 50);
      prevCityRef.current = city.id;
      return () => clearTimeout(t);
    }
  }, [city.id]);

  return (
    <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden">
      {loading ? (
        <Skeleton className="w-full h-full rounded-none" />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={`${city.name} skyline`}
          className="w-full h-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: imgOpacity }}
        />
      ) : (
        <div
          className="w-full h-full transition-opacity duration-500"
          style={{ background: fallbackGradient }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--overlay-bg))/0.85] via-[hsl(var(--overlay-bg))/0.3] to-transparent" />

      {/* Remove button */}
      <button
        onClick={() => onRemove(city.id)}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors"
        aria-label={`Remove ${city.name}`}
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* City info overlay with slide-up animation */}
      <div
        key={city.id}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-[hsl(var(--overlay-text))]"
        style={{ animation: "fade-slide-in 0.6s ease-out" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{city.name}</h2>
        <p className="text-sm md:text-base font-medium opacity-80 mt-1">{city.country}</p>
        <p className="text-sm md:text-base opacity-70 mt-0.5">
          {time.dayOfWeek} · {time.date}
        </p>
      </div>
    </div>
  );
}
