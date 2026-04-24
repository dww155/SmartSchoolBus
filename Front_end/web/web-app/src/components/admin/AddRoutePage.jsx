import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { useBusStop } from "../../contexts/BusStopContext";
import MapBoxView from "../map/MapBoxView";
import { useRoute } from "../../contexts/RouteContext";

const MAPBOX_TOKEN = import.meta.env.VITE_MAP_API_KEY || import.meta.env.VITE_MAPBOX_TOKEN;

export default function AddRoutePage() {
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [stops, setStops] = useState([]); // Danh sách điểm dừng
  const [history, setHistory] = useState([]); // Lịch sử để undo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { createRoute } = useRoute();
  const [form, setForm] = useState({
    address: "",
    latitude: 10.762622, // ví dụ: HCM
    longitude: 106.660172,
  });

  const navigate = useNavigate();
  const { busStops } = useBusStop();
  const [loadingBusStops, setLoadingBusStops] = useState(false);

  // Xóa điểm dừng
  const removeStop = (index) => {
    setHistory([...history, stops]);
    setStops(stops.filter((_, i) => i !== index));
  };

  // Undo
  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setStops(lastState);
      setHistory(history.slice(0, -1));
    }
  };

  // Xóa tất cả
  const clearAll = () => {
    if (stops.length > 0) {
      setHistory([...history, stops]);
      setStops([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!routeName.trim()) {
      setError("Vui lòng nhập tên tuyến!");
      return;
    }

    if (stops.length < 2) {
      setError("Tuyến đường phải có ít nhất 2 điểm dừng!");
      return;
    }

    try {
      setLoading(true);

      // Tạo data tuyến đường
      const routeData = {
        name: routeName,
        description: description || "Chưa có mô tả",
        distance: 0,
        busStopsOrder: stops.map((stop, index) => ({
          stopOrder: index + 1,
          busStopId: stop.id,
        })),
      };

      await createRoute(routeData);

      navigate("/admin/route");
    } catch (err) {
      setError("Không thể thêm tuyến đường. Vui lòng thử lại.");
      console.error("❌ Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  const routePoints = stops.map(s => [s.lng, s.lat]);
  return (
    <div className="h-[calc(80vh)] flex gap-4">
      {/* Left Panel - Form */}
      <div className="w-1/5 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tạo Tuyến Mới</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên tuyến */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tên tuyến <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Tuyến A - Quận 1"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Mô tả ngắn gọn về tuyến đường..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={clearAll}
              disabled={stops.length === 0}
              className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
            >
              🗑️ Xóa tất cả
            </button>
            <button
              type="button"
              onClick={undo}
              disabled={history.length === 0}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
            >
              ↩️ Hoàn tác
            </button>
          </div>

          {/* Danh sách điểm dừng */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Điểm dừng ({stops.length})
              </label>
              <span className="text-xs text-gray-500">Click vào map để thêm</span>
            </div>

            {stops.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600 text-sm font-medium">Chưa có điểm dừng</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className={`p-3 border rounded-lg cursor-move hover:bg-gray-50 transition ${index === 0
                      ? "border-green-300 bg-green-50"
                      : index === stops.length - 1
                        ? "border-red-300 bg-red-50"
                        : "border-blue-300 bg-blue-50"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0
                          ? "bg-green-500"
                          : index === stops.length - 1
                            ? "bg-red-500"
                            : "bg-blue-500"
                          }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {index === 0 ? "🚩 Điểm đầu" : index === stops.length - 1 ? "🏁 Điểm cuối" : `Điểm ${index + 1}`}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{stop.address}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {stop.lat.toFixed(5)}, {stop.lng.toFixed(5)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStop(index)}
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/route")}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || stops.length < 2}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
            >
              {loading ? "Đang lưu..." : "✓ Tạo tuyến"}
            </button>
          </div>
        </form>
      </div>

      {/* Middle Panel - Bus Stops List */}
      <div className="w-1/5 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Điểm dừng có sẵn</h2>

        {loadingBusStops ? (
          <p className="text-gray-500 text-sm">Đang tải...</p>
        ) : busStops.length === 0 ? (
          <p className="text-gray-500 text-sm">Không có dữ liệu.</p>
        ) : (
          <div className="space-y-3">
            {busStops.map((stop) => (
              <div
                key={stop.id}
                className="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition"
                onClick={() => {
                  setStops((prev) => [...prev, {
                    id: stop.id,
                    address: stop.address,
                    lat: stop.latitude,
                    lng: stop.longitude
                  }])
                }
                }
              >
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {stop.address}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stop.latitude.toFixed(5)}, {stop.longitude.toFixed(5)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden relative h-full">
        <MapBoxView
          center={[form.longitude, form.latitude]}
          marker={[form.longitude, form.latitude]}
          zoom={14}
          routePoints={routePoints}
        />
      </div>
    </div>
  );
}
