// Long Beach weather for the siddharthshah.me card.
// Deployed as the Cloudflare Worker "card-weather" (personal account).
// GET /now.json -> {"t":64,"c":"clear","at":"2026-10-11T07:53:00Z"} or {} when unknown.
const STATION = 'KLGB'; // Long Beach Airport, NWS
const ORIGINS = ['https://siddharthshah.me', 'https://www.siddharthshah.me', 'https://siddharthshah-me.onrender.com'];
const CONDITIONS = [
  [/thunder/i, 'stormy'], [/drizzle/i, 'drizzly'], [/rain|showers/i, 'rainy'],
  [/fog|mist/i, 'foggy'], [/haze|smoke/i, 'hazy'], [/partly|mostly clear/i, 'partly cloudy'],
  [/overcast|cloudy/i, 'cloudy'], [/clear|fair|sunny/i, 'clear'],
];

export function summarize(obs, now = Date.now()) {
  const p = obs && obs.properties;
  if (!p || !p.temperature || typeof p.temperature.value !== 'number') return {};
  if (!p.timestamp || now - Date.parse(p.timestamp) > 2 * 3600e3) return {};
  const out = { t: Math.round(p.temperature.value * 9 / 5 + 32), at: p.timestamp };
  const hit = CONDITIONS.find(([re]) => re.test(p.textDescription || ''));
  let c = hit ? hit[1] : null;
  const kmh = p.windSpeed && p.windSpeed.value;
  if (typeof kmh === 'number' && kmh > 40 && (!c || ['clear', 'partly cloudy', 'cloudy'].includes(c))) c = 'windy';
  if (c) out.c = c;
  return out;
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin');
    const cors = { 'Access-Control-Allow-Origin': ORIGINS.includes(origin) ? origin : ORIGINS[0], Vary: 'Origin' };
    if (url.pathname !== '/now.json') return new Response('Not found', { status: 404 });
    const key = new Request('https://card-weather.internal/now.json');
    const cache = caches.default;
    let res = await cache.match(key);
    if (!res) {
      let body = {}, ttl = 60;
      try {
        const r = await fetch(`https://api.weather.gov/stations/${STATION}/observations/latest`, {
          headers: { 'User-Agent': 'siddharthshah.me card weather (https://siddharthshah.me)', Accept: 'application/geo+json' },
        });
        if (r.ok) { body = summarize(await r.json()); if (body.t !== undefined) ttl = 900; }
      } catch (e) {}
      res = new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${ttl}` } });
      ctx.waitUntil(cache.put(key, res.clone()));
    }
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(cors)) out.headers.set(k, v);
    out.headers.set('Cache-Control', 'public, max-age=300');
    return out;
  },
};
