import { useState, useEffect } from "react";
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
  const { detailImage, detailLoading, fallbackGradient } = useCityImage(city.name, city.country);
  const time = getTimeForTimezone(city.timezone, use24h);
  const [imgOpacity, setImgOpacity] = useState(0);

  useEffect(() => {
    if (detailImage) {
      setImgOpacity(0);
      const t = setTimeout(() => setImgOpacity(1), 50);
      return () => clearTimeout(t);
    }
  }, [detailImage]);

  return (
    <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden">
      {detailLoading ? (
        <Skeleton className="w-full h-full rounded-none" />
      ) : detailImage ? (
        <img
          src={detailImage}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Remove button */}
      <button
        onClick={() => onRemove(city.id)}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors"
        aria-label={`Remove ${city.name}`}
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* City info overlay with blur */}
      <div
        key={city.id}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
        style={{ animation: "fade-slide-in 0.6s ease-out" }}
      >
        <div className="inline-block backdrop-blur-md bg-black/30 rounded-xl px-5 py-3">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            {city.name}
          </h2>
          <p className="font-display text-sm md:text-base font-medium text-white/80 mt-1">
            {city.country}
          </p>
          <p className="font-body text-sm md:text-base text-white/60 mt-0.5 tracking-wide">
            {time.dayOfWeek} · {time.date}
          </p>
        </div>
      </div>
    </div>
  );
}
