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
  const { heroImage, fallbackGradient } = useCityImage(city.name, city.country);
  const [animating, setAnimating] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const prevCityRef = useRef(city.id);

  useEffect(() => {
    if (prevCityRef.current !== city.id) {
      setAnimating(true);
      setImageVisible(false);
      const timeout = setTimeout(() => setAnimating(false), 50);
      prevCityRef.current = city.id;
      return () => clearTimeout(timeout);
    }
  }, [city.id]);

  useEffect(() => {
    setImageVisible(false);
  }, [heroImage]);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden py-10 transition-colors duration-500 md:py-16">
      {heroImage ? (
        <img
          key={heroImage}
          src={heroImage}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          onLoad={() => setImageVisible(true)}
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover transition-opacity duration-700"
          style={{ opacity: imageVisible ? 0.55 : 0, filter: "blur(12px) saturate(1.2)" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: fallbackGradient,
            opacity: 0.6,
          }}
        />
      )}

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--clock-surface)/0.55)] backdrop-blur-sm" />

      <div
        key={city.id}
        className={`relative z-10 flex items-end gap-1 transition-all duration-500 ease-out sm:gap-2 md:gap-4 ${
          animating ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{ animation: "fade-slide-in 0.5s ease-out" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--clock-label))] sm:text-[10px] md:text-xs">
            Hours
          </span>
          <span className="font-clock text-5xl font-normal leading-none tabular-nums text-[hsl(var(--clock-digit))] sm:text-7xl md:text-[10rem]">
            {time.hours}
          </span>
        </div>

        <span className="select-none pb-0.5 font-clock text-3xl text-[hsl(var(--clock-separator))] sm:text-5xl sm:pb-1 md:pb-4 md:text-8xl">:</span>

        <div className="flex flex-col items-center">
          <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--clock-label))] sm:text-[10px] md:text-xs">
            Minutes
          </span>
          <span className="font-clock text-5xl font-normal leading-none tabular-nums text-[hsl(var(--clock-digit))] sm:text-7xl md:text-[10rem]">
            {time.minutes}
          </span>
        </div>

        <span className="select-none pb-0.5 font-clock text-3xl text-[hsl(var(--clock-separator))] sm:text-5xl sm:pb-1 md:pb-4 md:text-8xl">:</span>

        <div className="flex flex-col items-center">
          <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--clock-label))] sm:text-[10px] md:text-xs">
            Seconds
          </span>
          <span className="font-clock text-5xl font-normal leading-none tabular-nums text-[hsl(var(--clock-digit))] sm:text-7xl md:text-[10rem]">
            {time.seconds}
          </span>
        </div>

        {time.period && (
          <span className="ml-1 pb-1 font-clock text-lg text-[hsl(var(--clock-label))] sm:text-2xl sm:ml-2 sm:pb-2 md:pb-6 md:text-4xl">
            {time.period}
          </span>
        )}
      </div>
    </div>
  );
}
