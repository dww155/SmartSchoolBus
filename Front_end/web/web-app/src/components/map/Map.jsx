import { useState, useRef, useEffect } from "react";
import MapboxGl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import locationIcon from "../../assets/location.png";

MapboxGl.accessToken = import.meta.env.VITE_MAP_API_KEY;

export default function Map({ lat = 10.762622, lng = 106.660172, zoom = 15 }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isFull, setIsFull] = useState(false);
  const marker = useRef(null);

  // 🎯 Initialize Mapbox
  useEffect(() => {
    if (map.current) return; // Prevent re-initialization

    if (!MapboxGl.accessToken) {
      console.error("❌ Mapbox token not found. Please set VITE_MAP_API_KEY in .env");
      return;
    }

    map.current = new MapboxGl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // ✅ Add marker
    const el = document.createElement("div");
    el.style.backgroundImage = `url('${locationIcon}')`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";

    marker.current = new MapboxGl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map.current);

    // ✅ Add recenter button
    const recenterBtn = document.createElement("button");
    recenterBtn.innerHTML = `<img src="${locationIcon}" alt="Recenter" style="width: 20px; height: 20px; filter: invert(1);">`;
    recenterBtn.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 20px;
      padding: 10px 12px;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 3px 10px rgba(0,0,0,0.25);
      z-index: 3000;
      transition: transform 0.15s ease;
    `;

    recenterBtn.onmouseenter = () => (recenterBtn.style.transform = "scale(1.05)");
    recenterBtn.onmouseleave = () => (recenterBtn.style.transform = "scale(1.0)");
    recenterBtn.onclick = () => {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 15,
        duration: 1500,
      });
    };

    mapContainer.current.appendChild(recenterBtn);

    return () => {
      if (map.current) map.current.remove();
    };
  }, [lat, lng, zoom]);

  // � Update marker position when lat/lng changes
  useEffect(() => {
    if (marker.current && map.current) {
      marker.current.setLngLat([lng, lat]);
      map.current.flyTo({
        center: [lng, lat],
        duration: 1000,
      });
    }
  }, [lat, lng]);

  return (
    <div
      style={{
        position: isFull ? "fixed" : "relative",
        top: isFull ? 0 : "auto",
        left: isFull ? 0 : "auto",
        width: isFull ? "100vw" : "100%",
        height: isFull ? "100vh" : 360,
        zIndex: isFull ? 2000 : 1,
        borderRadius: isFull ? 0 : 12,
        overflow: "hidden",
        border: isFull ? "none" : "1px solid #e2e8f0",
        transition: "all 0.3s ease",
        background: "#f8fafc",
      }}
    >
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      />

      {/* ⤡ Nút phóng to / thu nhỏ */}
      <button
        onClick={() => setIsFull(!isFull)}
        style={{
          position: "absolute",
          top: 16,
          right: 25,
          padding: "10px 12px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
          zIndex: 3001,
          transition: "transform 0.15s ease",
        }}
        title={isFull ? "Thu nhỏ" : "Phóng to"}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        {isFull ? "⤢ Thu nhỏ" : "⤡ Phóng to"}
      </button>
    </div>
  );
}
