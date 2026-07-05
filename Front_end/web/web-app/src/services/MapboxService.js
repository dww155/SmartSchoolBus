const MAPBOX_TOKEN = import.meta.env.VITE_MAP_API_KEY;

export async function getDistanceFromMapbox(points) {
  if (points.length < 2) return 0;

  const coords = points
    .map(p => `${p.longitude},${p.latitude}`)
    .join(";");

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?overview=full&geometries=geojson&access_token=${MAPBOX_TOKEN}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes || data.routes.length === 0) return 0;

  return data.routes[0].distance / 1000; // km
}
