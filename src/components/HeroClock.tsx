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
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-3xl transition-opacity duration-700"
          style={{ opacity: imageVisible ? 0.42 : 0 }}
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

      <div className="absolute inset-0 bg-[hsl(var(--overlay-bg)/0.28)]" />
      <div className="absolute inset-0 bg-[hsl(var(--clock-surface)/0.38)]" />

      <div
        key={city.id}
        className={`relative z-10 flex items-end gap-2 transition-all duration-500 ease-out md:gap-4 ${
          animating ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{ animation: "fade-slide-in 0.5s ease-out" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--clock-label))] md:text-xs">
            Hours
          </span>
          <span className="font-clock text-7xl font-normal leading-none tabular-nums text-[hsl(var(--clock-digit))] md:text-[10rem]">
            {time.hours}
          </span>
        </div>

        <span className="select-none pb-1 font-clock text-5xl text-[hsl(var(--clock-separator))] md:pb-4 md:text-8xl">:</span>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--clock-label))] md:text-xs">
            Minutes
          </span>
          <span className="font-clock text-7xl font-normal leading-none tabular-nums text-[hsl(var(--clock-digit))] md:text-[10rem]">
            {time.minutes}
          </span>
        </div>

        <span className="select-none pb-1 font-clock text-5xl text-[hsl(var(--clock-separator))] md:pb-4 md:text-8xl">:</span>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--clock-label))] md:text-xs">
            Seconds
          </span>
          <span className="font-clock text-7xl font-normal leading-none tabular-nums text-[hsl(var(--clock-digit))] md:text-[10rem]">
            {time.seconds}
          </span>
        </div>

        {time.period && (
          <span className="ml-2 pb-2 font-clock text-2xl text-[hsl(var(--clock-label))] md:pb-6 md:text-4xl">
            {time.period}
          </span>
        )}
      </div>
    </div>
  );
}
