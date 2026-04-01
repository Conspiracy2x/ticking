import { CityData, getShortTime } from "@/lib/timezones";
import { X } from "lucide-react";

interface CityStripProps {
  cities: CityData[];
  use24h: boolean;
  tick: number;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CityStrip({ cities, use24h, tick: _tick, onSelect, onRemove }: CityStripProps) {
  if (cities.length === 0) return null;

  return (
    <div className="relative flex gap-1 overflow-x-auto px-3 py-2 bg-[hsl(var(--city-strip-bg))] transition-colors duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] md:gap-1.5 md:px-4 md:py-3">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => onSelect(city.id)}
          className="group relative flex-shrink-0 flex flex-col items-center justify-center px-4 py-2 rounded-lg hover:bg-accent transition-colors min-w-[90px] md:px-6 md:py-3 md:min-w-[110px]"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onRemove(city.id);
            }}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full hover:bg-destructive/20 cursor-pointer"
            aria-label={`Remove ${city.name}`}
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">{city.name}</span>
          <span className="font-clock text-lg text-foreground tabular-nums mt-0.5">
            {getShortTime(city.timezone, use24h)}
          </span>
        </button>
      ))}
    </div>
  );
}
