import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useBusStop } from "../../contexts/BusStopContext";
import "./MapBoxView.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || import.meta.env.VITE_MAP_API_KEY;

export default function MapBoxView({ center, routePoints = [], markers = [], drivers = [], onResetView }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const routeMarkersRef = useRef([]);
  const customMarkersRef = useRef([]);
  const { busStops } = useBusStop();

  // --- Khởi tạo bản đồ ---
  useEffect(() => {
    // 🔹 Kiểm tra token trước khi khởi tạo map
    if (!MAPBOX_TOKEN) {
      console.warn("⚠️ Mapbox token chưa được cấu hình. Map sẽ không hoạt động.");
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: center || [106.660172, 10.762622],
        zoom: 13,
      });
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    } else if (center) {
      mapRef.current.setCenter(center);
    }
    const markerRef = { current: null }; // giữ reference để xóa sau nếu cần

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.longitude, position.coords.latitude];
          const el = document.createElement("div");
          el.style.width = "20px";
          el.style.height = "20px";
          el.style.border = "4px solid #1E90FF"; // viền xanh
          el.style.backgroundColor = "#fff";    // nền trắng
          el.style.borderRadius = "50%";        // hình tròn
          el.style.boxSizing = "border-box";
          el.style.boxShadow = "0 0 4px rgba(0,0,0,0.3)";

          // tạo marker
          markerRef.current = new mapboxgl.Marker({ element: el })
            .setLngLat(userCoords)
            .addTo(mapRef.current);

          // set center tới vị trí hiện tại
          mapRef.current.setCenter(userCoords);
        },
        (error) => {
          console.warn("Không thể lấy vị trí hiện tại:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.warn("Trình duyệt không hỗ trợ Geolocation API");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // --- Vẽ tuyến đường thực tế (Mapbox Directions API) ---
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Nếu không có đủ 2 điểm thì chỉ xóa layer cũ (nếu có)
    if (!routePoints || routePoints.length < 2) {
      if (map.getLayer("routeLine")) map.removeLayer("routeLine");
      if (map.getSource("routeLine")) map.removeSource("routeLine");
      routeMarkersRef.current.forEach((m) => m.remove());
      routeMarkersRef.current = [];
      return;
    }

    const abortController = new AbortController();

    async function drawRoute() {
      try {
        // Xóa layer/source/marker cũ
        if (map.getLayer("routeLine")) map.removeLayer("routeLine");
        if (map.getSource("routeLine")) map.removeSource("routeLine");
        routeMarkersRef.current.forEach((m) => m.remove());
        routeMarkersRef.current = [];

        const coordinatesString = routePoints.map((p) => p.join(",")).join(";");
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`,
          { signal: abortController.signal }
        );

        if (!response.ok) throw new Error("Lỗi gọi Directions API");
        const data = await response.json();

        if (!data.routes?.length) return;

        const route = data.routes[0].geometry;

        // --- Vẽ tuyến ---
        map.addSource("routeLine", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
          },
        });

        map.addLayer({
          id: "routeLine",
          type: "line",
          source: "routeLine",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#1E90FF", "line-width": 5 },
        });

        // --- Marker các điểm ---
        routePoints.forEach((coord, index) => {
          const el = document.createElement("div");
          el.className = "route-point-marker";
          el.innerText = index + 1;

          // màu tùy loại điểm
          if (index === 0) el.style.backgroundColor = "green";
          else if (index === routePoints.length - 1) el.style.backgroundColor = "red";
          else el.style.backgroundColor = "#FFA500";

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(coord)
            .addTo(map);

          routeMarkersRef.current.push(marker);
        });

        // --- Fit map ---
        const bounds = route.coordinates.reduce(
          (b, coord) => b.extend(coord),
          new mapboxgl.LngLatBounds(route.coordinates[0], route.coordinates[0])
        );
        map.fitBounds(bounds, { padding: 60 });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Lỗi vẽ route:", err);
      }
    }

    drawRoute();

    return () => abortController.abort();
  }, [routePoints]);

  // --- Vẽ các marker tùy chỉnh (bus stop, vị trí đặc biệt,...) ---
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Xóa marker cũ
    customMarkersRef.current.forEach((m) => m.remove());
    customMarkersRef.current = [];

    // Thêm marker mới
    markers.forEach((m) => {
      if (typeof m.longitude !== "number" || typeof m.latitude !== "number") return;

      // Tạo div HTML cho marker
      const el = document.createElement("div");
      el.className = "bus-stop-marker";

      // Icon 🚏 (bus stop)
      el.innerHTML = `
          <div class = "marker-circle">

          <i class="fa-solid fa-map-pin bus-stop-marker"></i>
    </div>
      `;
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([m.longitude, m.latitude])
        .setPopup(new mapboxgl.Popup().setText(m.label || "Điểm dừng"))
        .addTo(map);

      customMarkersRef.current.push(marker);
    });

    // Nếu chỉ có marker mà không có route → fit bounds theo marker
    if (markers.length && (!routePoints || routePoints.length < 2)) {
      const bounds = markers.reduce(
        (b, m) =>
          b.extend([m.longitude, m.latitude]),
        new mapboxgl.LngLatBounds(
          [markers[0].longitude, markers[0].latitude],
          [markers[0].longitude, markers[0].latitude]
        )
      );
      map.fitBounds(bounds, { padding: 60 });
    }
  }, [markers]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Xoá marker cũ
    // customMarkersRef.current.forEach((m) => m.remove());
    // customMarkersRef.current = [];
    const bounds = new mapboxgl.LngLatBounds();

    if (!drivers || drivers.length === 0) return;

    drivers.forEach((driver) => {
      if (!driver.longitude || !driver.latitude) return;

      // Tạo custom marker
      const el = document.createElement("div");

      el.innerHTML = `
        <div style="
          width: 42px;
          height: 42px;
          background: white;
          border-radius: 50%;
          border: 3px solid #f1c40f;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        ">
          <i class="fa-solid fa-bus" 
            style="font-size: 22px; color: #2ecc71;">
          </i>
        </div>
      `;

      el.style.cursor = "pointer";
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat([driver.longitude, driver.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
          <div style="font-size:14px">
            <b>Tài xế:</b> ${driver.name || "Không tên"}<br/>
            <b>Lat:</b> ${driver.latitude}<br/>
            <b>Lng:</b> ${driver.longitude}
          </div>
        `)
        )
        .addTo(mapRef.current);

      customMarkersRef.current.push(marker);
      bounds.extend([driver.longitude, driver.latitude]);
    });


  }, [drivers]);

  return (
    <div className="relative mb-6 h-full">
      {/* Bản đồ */}
      <div
        ref={mapContainerRef}
        className="w-full h-full rounded-xl shadow overflow-hidden"
      />

      {/* Nút thu nhỏ bản đồ */}
      <button
        onClick={() => {
          onResetView?.();  // bỏ selectedBusStop

          if (!mapRef.current || !busStops) return;

          const longs = busStops.map(b => b.longitude);
          const lats = busStops.map(b => b.latitude);

          const minLng = Math.min(...longs);
          const maxLng = Math.max(...longs);
          const minLat = Math.min(...lats);
          const maxLat = Math.max(...lats);

          mapRef.current.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat]
            ],
            { padding: 60, duration: 600 }
          );
        }}
        className="absolute top-4 left-4 z-20 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200"
        title="Thu nhỏ bản đồ"
      >
        <i className="fas fa-compress"></i>
      </button>
    </div>
  );

}
