const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    const hero = results[0]?.urls?.raw ? `${results[0].urls.raw}&w=800&h=450&fit=crop&q=60` : results[0]?.urls?.small;
    const detailPhoto = results.length > 1 ? results[1] : results[0];
    const detail = detailPhoto?.urls?.raw ? `${detailPhoto.urls.raw}&w=1600&h=900&fit=crop&q=85` : detailPhoto?.urls?.full;
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
    const hero = photos[0]?.src?.original || photos[0]?.src?.large2x || photos[0]?.src?.landscape;
    const detailPhoto = photos.length > 1 ? photos[1] : photos[0];
    const detail = detailPhoto?.src?.original || detailPhoto?.src?.large2x || detailPhoto?.src?.landscape;
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

    // Use a single smart query — "{city} skyline" works for almost all cities
    const query = `${city} skyline`;
    let result: ImageResult | null = null;

    // Try Unsplash and Pexels in parallel for speed
    const [unsplashResult, pexelsResult] = await Promise.all([
      unsplashKey ? searchUnsplash(query, unsplashKey) : Promise.resolve(null),
      pexelsKey ? searchPexels(query, pexelsKey) : Promise.resolve(null),
    ]);

    if (unsplashResult) {
      result = { heroImage: unsplashResult.hero, detailImage: unsplashResult.detail, source: "unsplash" };
    } else if (pexelsResult) {
      result = { heroImage: pexelsResult.hero, detailImage: pexelsResult.detail, source: "pexels" };
    }

    // If no results, try broader query in parallel
    if (!result) {
      const fallbackQuery = country ? `${city} ${country}` : `${city} city`;
      const [u2, p2] = await Promise.all([
        unsplashKey ? searchUnsplash(fallbackQuery, unsplashKey) : Promise.resolve(null),
        pexelsKey ? searchPexels(fallbackQuery, pexelsKey) : Promise.resolve(null),
      ]);
      if (u2) result = { heroImage: u2.hero, detailImage: u2.detail, source: "unsplash" };
      else if (p2) result = { heroImage: p2.hero, detailImage: p2.detail, source: "pexels" };
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
