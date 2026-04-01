export interface CityData {
  id: string;
  name: string;
  country: string;
  timezone: string;
}

// --- Formatter cache: avoids recreating Intl objects every second ---
const timeFormatterCache = new Map<string, Intl.DateTimeFormat>();
const dateFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getTimeFormatter(timezone: string, use24h: boolean): Intl.DateTimeFormat {
  const key = `${timezone}|${use24h}`;
  let fmt = timeFormatterCache.get(key);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: !use24h,
    });
    timeFormatterCache.set(key, fmt);
  }
  return fmt;
}

function getDateFormatter(timezone: string): Intl.DateTimeFormat {
  let fmt = dateFormatterCache.get(timezone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    dateFormatterCache.set(timezone, fmt);
  }
  return fmt;
}

// Curated major cities with proper country names
const CURATED_CITIES: CityData[] = [
  { id: "new-york", name: "New York", country: "United States", timezone: "America/New_York" },
  { id: "los-angeles", name: "Los Angeles", country: "United States", timezone: "America/Los_Angeles" },
  { id: "chicago", name: "Chicago", country: "United States", timezone: "America/Chicago" },
  { id: "denver", name: "Denver", country: "United States", timezone: "America/Denver" },
  { id: "honolulu", name: "Honolulu", country: "United States", timezone: "Pacific/Honolulu" },
  { id: "anchorage", name: "Anchorage", country: "United States", timezone: "America/Anchorage" },
  { id: "london", name: "London", country: "United Kingdom", timezone: "Europe/London" },
  { id: "paris", name: "Paris", country: "France", timezone: "Europe/Paris" },
  { id: "berlin", name: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { id: "rome", name: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { id: "madrid", name: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam" },
  { id: "lisbon", name: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon" },
  { id: "athens", name: "Athens", country: "Greece", timezone: "Europe/Athens" },
  { id: "stockholm", name: "Stockholm", country: "Sweden", timezone: "Europe/Stockholm" },
  { id: "zurich", name: "Zurich", country: "Switzerland", timezone: "Europe/Zurich" },
  { id: "vienna", name: "Vienna", country: "Austria", timezone: "Europe/Vienna" },
  { id: "prague", name: "Prague", country: "Czech Republic", timezone: "Europe/Prague" },
  { id: "warsaw", name: "Warsaw", country: "Poland", timezone: "Europe/Warsaw" },
  { id: "moscow", name: "Moscow", country: "Russia", timezone: "Europe/Moscow" },
  { id: "istanbul", name: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul" },
  { id: "dubai", name: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { id: "doha", name: "Doha", country: "Qatar", timezone: "Asia/Qatar" },
  { id: "riyadh", name: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh" },
  { id: "mumbai", name: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { id: "delhi", name: "Delhi", country: "India", timezone: "Asia/Kolkata" },
  { id: "singapore", name: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { id: "hong-kong", name: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong" },
  { id: "shanghai", name: "Shanghai", country: "China", timezone: "Asia/Shanghai" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { id: "seoul", name: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok" },
  { id: "jakarta", name: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta" },
  { id: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { id: "sydney", name: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { id: "melbourne", name: "Melbourne", country: "Australia", timezone: "Australia/Melbourne" },
  { id: "auckland", name: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland" },
  { id: "toronto", name: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { id: "vancouver", name: "Vancouver", country: "Canada", timezone: "America/Vancouver" },
  { id: "sao-paulo", name: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo" },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", timezone: "America/Mexico_City" },
  { id: "cairo", name: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { id: "nairobi", name: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi" },
  { id: "lagos", name: "Lagos", country: "Nigeria", timezone: "Africa/Lagos" },
  { id: "johannesburg", name: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg" },
  { id: "casablanca", name: "Casablanca", country: "Morocco", timezone: "Africa/Casablanca" },
  { id: "dublin", name: "Dublin", country: "Ireland", timezone: "Europe/Dublin" },
  { id: "brussels", name: "Brussels", country: "Belgium", timezone: "Europe/Brussels" },
  { id: "helsinki", name: "Helsinki", country: "Finland", timezone: "Europe/Helsinki" },
  { id: "oslo", name: "Oslo", country: "Norway", timezone: "Europe/Oslo" },
  { id: "copenhagen", name: "Copenhagen", country: "Denmark", timezone: "Europe/Copenhagen" },
  { id: "bucharest", name: "Bucharest", country: "Romania", timezone: "Europe/Bucharest" },
  { id: "budapest", name: "Budapest", country: "Hungary", timezone: "Europe/Budapest" },
  { id: "taipei", name: "Taipei", country: "Taiwan", timezone: "Asia/Taipei" },
  { id: "manila", name: "Manila", country: "Philippines", timezone: "Asia/Manila" },
  { id: "karachi", name: "Karachi", country: "Pakistan", timezone: "Asia/Karachi" },
  { id: "dhaka", name: "Dhaka", country: "Bangladesh", timezone: "Asia/Dhaka" },
  { id: "colombo", name: "Colombo", country: "Sri Lanka", timezone: "Asia/Colombo" },
  { id: "kathmandu", name: "Kathmandu", country: "Nepal", timezone: "Asia/Kathmandu" },
  { id: "tehran", name: "Tehran", country: "Iran", timezone: "Asia/Tehran" },
  { id: "baghdad", name: "Baghdad", country: "Iraq", timezone: "Asia/Baghdad" },
  { id: "lima", name: "Lima", country: "Peru", timezone: "America/Lima" },
  { id: "bogota", name: "Bogotá", country: "Colombia", timezone: "America/Bogota" },
  { id: "santiago", name: "Santiago", country: "Chile", timezone: "America/Santiago" },
  { id: "havana", name: "Havana", country: "Cuba", timezone: "America/Havana" },
  { id: "panama", name: "Panama", country: "Panama", timezone: "America/Panama" },
  { id: "accra", name: "Accra", country: "Ghana", timezone: "Africa/Accra" },
  { id: "addis-ababa", name: "Addis Ababa", country: "Ethiopia", timezone: "Africa/Addis_Ababa" },
  { id: "dar-es-salaam", name: "Dar es Salaam", country: "Tanzania", timezone: "Africa/Dar_es_Salaam" },
  { id: "perth", name: "Perth", country: "Australia", timezone: "Australia/Perth" },
  { id: "brisbane", name: "Brisbane", country: "Australia", timezone: "Australia/Brisbane" },
];

// Region to readable name mapping for auto-generated cities
const REGION_MAP: Record<string, string> = {
  "Africa": "Africa",
  "America": "Americas",
  "Antarctica": "Antarctica",
  "Arctic": "Arctic",
  "Asia": "Asia",
  "Atlantic": "Atlantic",
  "Australia": "Australia",
  "Europe": "Europe",
  "Indian": "Indian Ocean",
  "Pacific": "Pacific",
};

// Generate additional cities from all IANA timezones
function generateAllCities(): CityData[] {
  const curatedTimezones = new Set(CURATED_CITIES.map(c => c.timezone));
  const curatedIds = new Set(CURATED_CITIES.map(c => c.id));
  
  let allTimezones: string[] = [];
  try {
    allTimezones = (Intl as any).supportedValuesOf('timeZone');
  } catch {
    // Fallback for older browsers
    return CURATED_CITIES;
  }

  const additional: CityData[] = allTimezones
    .filter(tz => tz.includes('/') && !curatedTimezones.has(tz))
    .map(tz => {
      const parts = tz.split('/');
      const cityPart = parts[parts.length - 1].replace(/_/g, ' ');
      const region = REGION_MAP[parts[0]] || parts[0];
      const id = tz.toLowerCase().replace(/\//g, '-').replace(/_/g, '-');
      
      if (curatedIds.has(id)) return null;
      
      return {
        id,
        name: cityPart,
        country: region,
        timezone: tz,
      };
    })
    .filter((c): c is CityData => c !== null);

  return [...CURATED_CITIES, ...additional];
}

const ALL_CITIES = generateAllCities();

export function searchCities(query: string): CityData[] {
  const q = query.toLowerCase().trim();
  if (!q) return CURATED_CITIES.slice(0, 10);
  return ALL_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.timezone.toLowerCase().includes(q)
  ).slice(0, 15);
}

export function getTimeForTimezone(
  timezone: string,
  use24h: boolean
): { hours: string; minutes: string; seconds: string; period?: string; dayOfWeek: string; date: string } {
  const now = new Date();

  const timeParts = getTimeFormatter(timezone, use24h).formatToParts(now);
  const hour = timeParts.find((p) => p.type === "hour")?.value || "00";
  const minute = timeParts.find((p) => p.type === "minute")?.value || "00";
  const second = timeParts.find((p) => p.type === "second")?.value || "00";
  const period = timeParts.find((p) => p.type === "dayPeriod")?.value;

  const dateParts = getDateFormatter(timezone).formatToParts(now);
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
