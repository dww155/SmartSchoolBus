import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useRoute } from "../../contexts/RouteContext";
import MapBoxView from "../map/MapBoxView.jsx";
import { Link } from "react-router-dom";

export default function RoutePage() {
  const { routes, loading, error, selectedRoute, setSelectedRoute } =
    useRoute();

  const [q, setQ] = useState("");
  const [userLocation, setUserLocation] = useState([106.660172, 10.762622]);

  // Lấy vị trí hiện tại
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.longitude,
            position.coords.latitude,
          ]);
        },
        (err) => {
          console.error("Không thể lấy vị trí hiện tại:", err);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Lọc tuyến
  const filtered = routes.filter(
    (route) =>
      route.id.toString().includes(q) ||
      route.name?.toLowerCase().includes(q.toLowerCase())
  );

  // Tạo routePoints cho MapBox
  const routePoints =
    selectedRoute?.busStops
      ?.sort((a, b) => a.stopOrder - b.stopOrder)
      ?.map((bs) => [bs.busStop.longitude, bs.busStop.latitude]) || [];

  return (
    <section className="space-y-6">
      {/* 🗺️ Bản đồ */}
      <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapBoxView center={userLocation} routePoints={routePoints} />
      </div>

      {/* Header & nút thêm */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý tuyến đường</h2>
          <p className="text-gray-600 text-sm">
            Tổng số: <b>{filtered.length}</b> tuyến
          </p>
        </div>

        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên / mã tuyến..."
            className="bg-white border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link
            to="/admin/route/add"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <i className="fas fa-plus mr-2" />
            Thêm tuyến đường
          </Link>
        </div>
      </div>

      {/* 📌 Chi tiết tuyến + bảng */}
      <div className="bg-white shadow rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">
          Chi tiết tuyến: {selectedRoute?.name || "Chưa chọn"}
        </h3>

        {selectedRoute && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              <span className="mr-4">
                <strong>Xe hoạt động:</strong> {selectedRoute.bus}
              </span>
              <span>
                <strong>Tài xế:</strong> {selectedRoute.driver}
              </span>
            </p>
          </>
        )}

        {/* Bảng danh sách tuyến */}
        {!loading && !error && (
          <div className="max-h-[400px] overflow-y-auto mt-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 sticky top-0">
                <tr>
                  <th className="text-left p-3">Mã</th>
                  <th className="text-left p-3">Tên</th>
                  <th className="text-left p-3">Mô tả</th>
                  <th className="text-left p-3">Khoảng cách</th>
                  <th className="text-right p-3">Ngày tạo</th>
                  <th className="text-right p-3">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((route) => (
                    <tr
                      key={route.id}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedRoute(route)}
                    >
                      <td className="p-3 font-semibold">{route.id}</td>
                      <td className="p-3">{route.name}</td>
                      <td className="p-3">{route.description}</td>
                      <td className="p-3">{route.distance}</td>
                      <td className="p-3 text-right">
                        {dayjs(route.createdAt).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded">
                          <i className="fas fa-eye" />
                        </button>
                        <button className="px-2 py-1 text-amber-600 hover:bg-amber-50 rounded">
                          <i className="fas fa-pen" />
                        </button>
                        <button className="px-2 py-1 text-red-600 hover:bg-red-50 rounded">
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Không có tuyến nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}