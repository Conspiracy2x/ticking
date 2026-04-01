import { useState, useEffect, useRef } from "react";
import { getTimeForTimezone } from "@/lib/timezones";
import { CityData } from "@/lib/timezones";
import { useCityImage } from "@/hooks/useCityImage";

interface HeroClockProps {
  city: CityData;
  use24h: boolean;
  tick: number;
}

export function HeroClock({ city, use24h, tick: _tick }: HeroClockProps) {
  const time = getTimeForTimezone(city.timezone, use24h);
  const { heroImage } = useCityImage(city.name, city.country);
  const [animating, setAnimating] = useState(false);
  const prevCityRef = useRef(city.id);

  useEffect(() => {
    if (prevCityRef.current !== city.id) {
      setAnimating(true);
      const timeout = setTimeout(() => setAnimating(false), 50);
      prevCityRef.current = city.id;
      return () => clearTimeout(timeout);
    }
  }, [city.id]);

  return (
    <div className="relative flex flex-col items-center justify-center py-10 md:py-16 overflow-hidden transition-colors duration-500">
      {/* Blurred background image */}
      {heroImage && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px) brightness(0.6)",
            transform: "scale(1.2)",
            opacity: 0.35,
          }}
        />
      )}
      {/* Surface overlay for readability */}
      <div className="absolute inset-0 bg-[hsl(var(--clock-surface)/0.75)]" />

      <div
        key={city.id}
        className={`relative z-10 flex items-end gap-2 md:gap-4 transition-all duration-500 ease-out ${
          animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
        }`}
        style={{ animation: "fade-slide-in 0.5s ease-out" }}
      >
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
