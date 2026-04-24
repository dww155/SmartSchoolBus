import React, { useEffect, useState } from "react";
import { getBuses } from "../../services/BusService";
import dayjs from "dayjs";
import { useBus } from "../../contexts/BusContext";
import { Link } from "react-router-dom";

export default function BusesPage() {
  const { buses, loading, error, refresh } = useBus(); // lấy từ context
  const [q, setQ] = useState("");

  const filtered = buses.filter(
    (bus) =>
      bus.licensePlate.toLowerCase().includes(q.toLowerCase()) ||
      bus.id.toString().includes(q)
  );

  const rows = filtered.map(bus =>
    <tr key={bus.id} className="border-t hover:bg-gray-50">
      <td className="p-3 font-semibold">{bus.id}</td>
      <td className="p-3">{bus.licensePlate}</td>
      <td className="p-3">{bus.capacity}</td>
      <td className="p-3">{bus.available ? "ok" : "ban"}</td>
      <td className="p-3">{dayjs(bus.createdAt).format("DD/MM/YYYY HH:mm")}</td>
      <td className="p-3 text-right">
        <button className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded mr-1">
          <i className="fas fa-eye" />
        </button>
        <button className="px-2 py-1 text-amber-600 hover:bg-amber-50 rounded mr-1">
          <i className="fas fa-pen" />
        </button>
        <button className="px-2 py-1 text-red-600 hover:bg-red-50 rounded">
          <i className="fas fa-trash" />
        </button>
      </td>
    </tr>
  )

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý xe buýt</h2>
          <p className="text-gray-600 text-sm">
            Tổng số: <b>{filtered.length}</b> xe
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo mã / biển số / tuyến..."
            className="bg-white border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/admin/bus/add" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
            <i className="fas fa-user-plus mr-2" />Thêm xe buýt
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
                <th className="text-left p-3">Mã xe</th>
                <th className="text-left p-3">Biển số</th>
                <th className="text-left p-3">Số ghế</th>
                <th className="text-left p-3">Có sẵn</th>
                <th className="text-left p-3">created_at</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.length > 0 ? rows :
                  <tr>
                    <td colSpan="9" className="text-center text-gray-500 py-3">
                      Không tìm thấy xe phù hợp
                    </td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
