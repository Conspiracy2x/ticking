import { getTimeForTimezone } from "@/lib/timezones";
import { CityData } from "@/lib/timezones";

interface HeroClockProps {
  city: CityData;
  use24h: boolean;
  tick: number;
}

export function HeroClock({ city, use24h, tick: _tick }: HeroClockProps) {
  const time = getTimeForTimezone(city.timezone, use24h);

  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 bg-[hsl(var(--clock-surface))] transition-colors duration-500">
      <div className="flex items-end gap-2 md:gap-4">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-[hsl(var(--clock-label))]">
            Hours
          </span>
          <span className="font-clock text-7xl md:text-[10rem] leading-none font-normal text-[hsl(var(--clock-digit))] tabular-nums">
            {time.hours}
          </span>
        </div>

        <span className="font-clock text-5xl md:text-8xl text-[hsl(var(--clock-separator))] pb-1 md:pb-4 select-none">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-[hsl(var(--clock-label))]">
            Minutes
          </span>
          <span className="font-clock text-7xl md:text-[10rem] leading-none font-normal text-[hsl(var(--clock-digit))] tabular-nums">
            {time.minutes}
          </span>
        </div>

        <span className="font-clock text-5xl md:text-8xl text-[hsl(var(--clock-separator))] pb-1 md:pb-4 select-none">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-[hsl(var(--clock-label))]">
            Seconds
          </span>
          <span className="font-clock text-7xl md:text-[10rem] leading-none font-normal text-[hsl(var(--clock-digit))] tabular-nums">
            {time.seconds}
          </span>
        </div>

        {/* AM/PM */}
        {time.period && (
          <span className="font-clock text-2xl md:text-4xl text-[hsl(var(--clock-label))] pb-2 md:pb-6 ml-2">
            {time.period}
          </span>
        )}
      </div>
    </div>
  );
}
