const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SEARCH_QUERIES = (city: string, country?: string): string[] => {
  const queries = [
    `${city} skyline`,
    `${city} downtown cityscape`,
    `${city} city view`,
  ];
  if (country) queries.push(`${city} ${country}`);
  return queries;
};

interface ImageResult {
  heroImage: string;
  detailImage: string;
  source: string;
}

async function searchUnsplash(
  query: string,
  accessKey: string
): Promise<{ hero: string; detail: string } | null> {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=4&orientation=landscape&content_filter=high`;
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const results = data.results;
    if (!results || results.length < 1) return null;

    const hero = results[0]?.urls?.regular;
    const detail = results.length > 1 ? results[1]?.urls?.regular : results[0]?.urls?.regular;
    if (!hero) return null;
    return { hero, detail: detail || hero };
  } catch {
    return null;
  }
}

async function searchPexels(
  query: string,
  apiKey: string
): Promise<{ hero: string; detail: string } | null> {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=4&orientation=landscape`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const photos = data.photos;
    if (!photos || photos.length < 1) return null;

    const hero = photos[0]?.src?.landscape || photos[0]?.src?.large2x;
    const detail = photos.length > 1
      ? photos[1]?.src?.landscape || photos[1]?.src?.large2x
      : hero;
    if (!hero) return null;
    return { hero, detail: detail || hero };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { city, country } = await req.json();
    if (!city || typeof city !== "string") {
      return new Response(
        JSON.stringify({ error: "city is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const unsplashKey = Deno.env.get("UNSPLASH_ACCESS_KEY");
    const pexelsKey = Deno.env.get("PEXELS_API_KEY");

    const queries = SEARCH_QUERIES(city, country);
    let result: ImageResult | null = null;

    // Try Unsplash first with each query
    if (unsplashKey) {
      for (const q of queries) {
        const found = await searchUnsplash(q, unsplashKey);
        if (found) {
          result = { heroImage: found.hero, detailImage: found.detail, source: "unsplash" };
          break;
        }
      }
    }

    // Fallback to Pexels
    if (!result && pexelsKey) {
      for (const q of queries) {
        const found = await searchPexels(q, pexelsKey);
        if (found) {
          result = { heroImage: found.hero, detailImage: found.detail, source: "pexels" };
          break;
        }
      }
    }

    // Premium fallback
    if (!result) {
      result = {
        heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&q=80",
        detailImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&h=900&fit=crop&q=80",
        source: "fallback",
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
