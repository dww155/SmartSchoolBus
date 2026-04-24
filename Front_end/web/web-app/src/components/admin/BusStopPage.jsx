import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import MapBoxView from "../map/MapBoxView.jsx";
import { useBusStop } from "../../contexts/BusStopContext";
import { Link } from "react-router-dom";

export default function BusStopPage() {
  const { busStops, loading, error, selectedBusStop, setSelectedBusStop, refresh } = useBusStop();
  const [q, setQ] = useState("");
  const [userLocation, setUserLocation] = useState([106.660172, 10.762622]); // Default: TP.HCM

  // --- Lấy vị trí hiện tại của người dùng (nếu có) ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.longitude, pos.coords.latitude]);
        },
        (err) => console.warn("Không thể lấy vị trí hiện tại:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // --- Lọc bus stop theo từ khóa ---
  const filtered = busStops.filter((bs) =>
    bs.address?.toLowerCase().includes(q.toLowerCase())
  );

  // --- Tạo điểm marker cho map ---
  const routePoints = selectedBusStop
    ? [[selectedBusStop.longitude, selectedBusStop.latitude]]
    : [];

  // --- Xử lý nút thu nhỏ bản đồ ---
  const onResetView = () => {
    setSelectedBusStop(null);
  }
  return (
    <section>
      {/* 🗺️ Bản đồ hiển thị vị trí bus stop được chọn */}
      <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapBoxView
          center={
            selectedBusStop
              ? [selectedBusStop.longitude, selectedBusStop.latitude] // center phải là [lng, lat]
              : userLocation
          }
          markers={
            selectedBusStop
              ? [{
                longitude: selectedBusStop.longitude,
                latitude: selectedBusStop.latitude,
                label: selectedBusStop.address
              }] // chỉ đánh dấu bus stop được chọn
              : busStops.map(stop => ({
                longitude: stop.longitude,
                latitude: stop.latitude,
                label: stop.address
              })) // đánh dấu toàn bộ bus stop
          }
          onResetView={onResetView}
        />
      </div>


      <div className="mb-6 flex items-center justify-between mt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý điểm dừng</h2>
          <p className="text-gray-600 text-sm">
            Tổng số: <b>{filtered.length}</b> điểm dừng
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo địa chỉ..."
            className="bg-white border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Link to="/admin/bus-stop/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <i className="fas fa-plus mr-2" />
              Thêm điểm dừng
            </button>
          </Link>
        </div>
      </div>

      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">Mã</th>
                <th className="text-left p-3">Địa chỉ</th>
                <th className="text-center p-3">Vĩ độ</th>
                <th className="text-center p-3">Kinh độ</th>
                <th className="text-right p-3">Ngày tạo</th>
                <th className="text-right p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((bs) => (
                  <tr
                    key={bs.id}
                    className={`border-t hover:bg-green-50 cursor-pointer ${selectedBusStop?.id === bs.id ? "bg-green-100" : ""}`}
                    onClick={() => setSelectedBusStop(bs)}
                  >
                    <td className="p-3 font-semibold">{bs.id}</td>
                    <td className="p-3">{bs.address}</td>
                    <td className="p-3 text-center">{bs.latitude.toFixed(5)}</td>
                    <td className="p-3 text-center">{bs.longitude.toFixed(5)}</td>
                    <td className="p-3 text-right">{dayjs(bs.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td className="p-3 text-right">
                      <button className="px-2 py-1 text-amber-600 hover:bg-amber-50 rounded mr-1">
                        <i className="fas fa-pen" />
                      </button>
                      <button
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Bạn có chắc muốn xóa điểm dừng này không?")) {
                            alert("TODO: gọi hàm xóa từ context ở đây");
                          }
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Không có điểm dừng phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
