// Fetches the image base URL from Firebase RTDB via REST API (works server-side)
const RTDB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://adoptme-7b50c-default-rtdb.firebaseio.com';

let cachedImageBase: string | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchImageBaseUrl(): Promise<string> {
  const now = Date.now();
  if (cachedImageBase && now - cacheTime < CACHE_DURATION) {
    return cachedImageBase;
  }

  try {
    const res = await fetch(`${RTDB_URL}/image_url.json`, { next: { revalidate: 300 } });
    if (res.ok) {
      const val = await res.json();
      cachedImageBase = String(val).replace(/"/g, '').replace(/\/$/, '');
      cacheTime = now;
      return cachedImageBase;
    }
  } catch (err) {
    console.error('Error fetching image base URL:', err);
  }

  return cachedImageBase || 'https://elvebredd.com';
}
