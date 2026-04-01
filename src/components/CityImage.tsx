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

  return (
    <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden transition-all duration-500">
      {loading ? (
        <Skeleton className="w-full h-full rounded-none" />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={`${city.name} skyline`}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
      ) : (
        <div className="w-full h-full" style={{ background: fallbackGradient }} />
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

      {/* City info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-[hsl(var(--overlay-text))]">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{city.name}</h2>
        <p className="text-sm md:text-base font-medium opacity-80 mt-1">{city.country}</p>
        <p className="text-sm md:text-base opacity-70 mt-0.5">
          {time.dayOfWeek} · {time.date}
        </p>
      </div>
    </div>
  );
}
