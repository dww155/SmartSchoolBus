import React, {useState } from "react";
import MapBoxView from "../map/MapBoxView";
import { useEffect } from "react";
import { adminDisconnect, connectAdminAllDrivers } from "../../services/WebSocketService.js";

export default function TrackingPage() {
  // --- MOCK DATA: drivers ---
  const [drivers, setDrivers] = useState({});
  const [loading, setLoading] = useState(false);
  const error = null;
  const [search, setSearch] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const defaultCenter = [106.660172, 10.762622];
  const driversArray = Object.values(drivers);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([longitude, latitude]); // MapBox dùng [lng, lat]
        },
        (error) => {
          console.error("Lỗi lấy vị trí hiện tại:", error);
        }
      );
    } else {
      console.error("Trình duyệt không hỗ trợ geolocation");
    }
  }, []);

  useEffect(() => {
    // Kết nối WebSocket, nhận dữ liệu tất cả driver
    connectAdminAllDrivers((data) => {
      setDrivers((prev) => ({
        ...prev,
        [data.driverId]: {
          ...prev[data.driverId],
          ...data
        },
      }));
      setLoading(false);
    });

    return () => adminDisconnect();
  }, []);

  // lọc theo biển số hoặc tên tài xế
  const filteredDrivers = driversArray.filter((d) =>
    d &&
    ((d.licensePlate || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.name || "").toLowerCase().includes(search.toLowerCase()))
  );

  // Log filteredDrivers mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Filtered drivers:");
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="grid grid-cols-4 gap-4">
      {/* ================= LEFT: MAP ================= */}
      <div className="col-span-3 space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Theo dõi vị trí tài xế</h1>
            <p className="text-slate-500 text-sm">Real-time tracking (mock).</p>
          </div>

          <div>
            <select
              className="border rounded-lg px-3 py-2"
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              <option value="">Chọn tài xế</option>
              {driversArray.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} — {driver.licensePlate}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="h-[600px] border rounded-xl overflow-hidden">
          <MapBoxView
            center={currentLocation?currentLocation:defaultCenter}
            drivers={driversArray}
            selectedDriver={selectedDriver}
          />
        </div>
      </div>

      {/* ================= RIGHT: DRIVER LIST ================= */}
      <aside className="col-span-1 border rounded-xl p-4 bg-white space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold">Danh sách tài xế</h2>

        <input
          type="text"
          placeholder="Tìm tên hoặc biển số..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <div className="max-h-[520px] overflow-y-auto space-y-2">
          {loading && <p>Đang tải...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {filteredDrivers.map((driver) => (
            <button
              key={driver.driverId}
              onClick={() => setSelectedDriver(driver.driverId)}
              className={`w-full text-left px-3 py-2 rounded-lg border flex items-center gap-3 hover:bg-slate-100 transition ${selectedDriver === driver.driverId
                ? "bg-blue-100 border-blue-400"
                : ""
                }`}
            >
              {/* Icon tài xế */}
              <i className="fa-solid fa-location-dot text-red-500 text-lg"></i>

              <div>
                <div className="font-medium">{driver.driverId}</div>
                <div className="text-sm text-slate-500">
                  {driver.licensePlate}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}
