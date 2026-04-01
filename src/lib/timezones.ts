export interface CityData {
  id: string;
  name: string;
  country: string;
  timezone: string;
}

const CITIES: CityData[] = [
  { id: "new-york", name: "New York", country: "United States", timezone: "America/New_York" },
  { id: "los-angeles", name: "Los Angeles", country: "United States", timezone: "America/Los_Angeles" },
  { id: "chicago", name: "Chicago", country: "United States", timezone: "America/Chicago" },
  { id: "london", name: "London", country: "United Kingdom", timezone: "Europe/London" },
  { id: "paris", name: "Paris", country: "France", timezone: "Europe/Paris" },
  { id: "berlin", name: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { id: "sydney", name: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { id: "dubai", name: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { id: "singapore", name: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { id: "hong-kong", name: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong" },
  { id: "mumbai", name: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { id: "delhi", name: "Delhi", country: "India", timezone: "Asia/Kolkata" },
  { id: "shanghai", name: "Shanghai", country: "China", timezone: "Asia/Shanghai" },
  { id: "moscow", name: "Moscow", country: "Russia", timezone: "Europe/Moscow" },
  { id: "istanbul", name: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul" },
  { id: "cairo", name: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { id: "rome", name: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { id: "madrid", name: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam" },
  { id: "toronto", name: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { id: "vancouver", name: "Vancouver", country: "Canada", timezone: "America/Vancouver" },
  { id: "sao-paulo", name: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo" },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", timezone: "America/Mexico_City" },
  { id: "seoul", name: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok" },
  { id: "jakarta", name: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta" },
  { id: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { id: "nairobi", name: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi" },
  { id: "lagos", name: "Lagos", country: "Nigeria", timezone: "Africa/Lagos" },
  { id: "johannesburg", name: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg" },
  { id: "lisbon", name: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon" },
  { id: "athens", name: "Athens", country: "Greece", timezone: "Europe/Athens" },
  { id: "stockholm", name: "Stockholm", country: "Sweden", timezone: "Europe/Stockholm" },
  { id: "zurich", name: "Zurich", country: "Switzerland", timezone: "Europe/Zurich" },
  { id: "vienna", name: "Vienna", country: "Austria", timezone: "Europe/Vienna" },
  { id: "prague", name: "Prague", country: "Czech Republic", timezone: "Europe/Prague" },
  { id: "warsaw", name: "Warsaw", country: "Poland", timezone: "Europe/Warsaw" },
  { id: "denver", name: "Denver", country: "United States", timezone: "America/Denver" },
  { id: "honolulu", name: "Honolulu", country: "United States", timezone: "Pacific/Honolulu" },
  { id: "anchorage", name: "Anchorage", country: "United States", timezone: "America/Anchorage" },
  { id: "auckland", name: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland" },
  { id: "doha", name: "Doha", country: "Qatar", timezone: "Asia/Qatar" },
  { id: "riyadh", name: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh" },
];

export function searchCities(query: string): CityData[] {
  const q = query.toLowerCase().trim();
  if (!q) return CITIES.slice(0, 8);
  return CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.timezone.toLowerCase().includes(q)
  ).slice(0, 10);
}

export function getTimeForTimezone(
  timezone: string,
  use24h: boolean
): { hours: string; minutes: string; seconds: string; period?: string; dayOfWeek: string; date: string } {
  const now = new Date();

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24h,
  });

  const parts = timeFormatter.formatToParts(now);
  const hour = parts.find((p) => p.type === "hour")?.value || "00";
  const minute = parts.find((p) => p.type === "minute")?.value || "00";
  const second = parts.find((p) => p.type === "second")?.value || "00";
  const period = parts.find((p) => p.type === "dayPeriod")?.value;

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dateParts = dateFormatter.formatToParts(now);
  const dayOfWeek = dateParts.find((p) => p.type === "weekday")?.value || "";
  const month = dateParts.find((p) => p.type === "month")?.value || "";
  const day = dateParts.find((p) => p.type === "day")?.value || "";
  const year = dateParts.find((p) => p.type === "year")?.value || "";

  return {
    hours: hour.padStart(2, "0"),
    minutes: minute,
    seconds: second,
    period: period?.toUpperCase(),
    dayOfWeek,
    date: `${month} ${day}, ${year}`,
  };
}

export function getShortTime(timezone: string, use24h: boolean): string {
  const { hours, minutes, period } = getTimeForTimezone(timezone, use24h);
  return `${hours}:${minutes}${period ? ` ${period}` : ""}`;
}
