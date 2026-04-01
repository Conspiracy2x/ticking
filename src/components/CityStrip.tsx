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
    <div className="flex gap-1.5 overflow-x-auto px-4 py-3 bg-[hsl(var(--city-strip-bg))] transition-colors duration-500">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => onSelect(city.id)}
          className="group relative flex-shrink-0 flex flex-col items-center justify-center px-6 py-3 rounded-lg hover:bg-accent transition-colors min-w-[110px]"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(city.id);
            }}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full hover:bg-destructive/20"
            aria-label={`Remove ${city.name}`}
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground">{city.name}</span>
          <span className="font-clock text-lg text-foreground tabular-nums mt-0.5">
            {getShortTime(city.timezone, use24h)}
          </span>
        </button>
      ))}
    </div>
  );
}
