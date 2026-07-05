import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSchedule } from "../../contexts/ScheduleContext";
import MapBoxView from "../map/MapBoxView.jsx";
import { Link } from "react-router-dom";

export default function SchedulePage() {
  const { schedules, loading, error } = useSchedule();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [q, setQ] = useState("");
  const [userLocation, setUserLocation] = useState([106.660172, 10.762622]);

  // Lấy vị trí hiện tại của người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.longitude, pos.coords.latitude]);
        },
        (err) => console.error("Không thể lấy vị trí:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Filter lịch trình
  const filtered = schedules.filter(
    (s) =>
      s.id.toString().includes(q) ||
      s.bus?.licensePlate?.toLowerCase().includes(q.toLowerCase()) ||
      s.driver?.user?.lastName?.toLowerCase().includes(q.toLowerCase())
  );

  // Tạo routePoints cho Mapbox (dựa trên route trong schedule)
  const routePoints =
    selectedSchedule?.route?.busStops
      ?.sort((a, b) => a.stopOrder - b.stopOrder)
      ?.map((bp) => [bp.busStop.longitude, bp.busStop.latitude]) || [];

  return (
    <section className="space-y-6">
      {/* 🗺️ Bản đồ */}
      <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapBoxView center={userLocation} routePoints={routePoints} />
      </div>

      {/* Header + search + add */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý lịch trình</h2>
          <p className="text-gray-600 text-sm">
            Tổng số: <b>{filtered.length}</b> lịch trình
          </p>
        </div>

        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo xe / tài xế / mã lịch trình..."
            className="bg-white border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link
            to="/admin/schedule/add"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <i className="fas fa-plus mr-2" />
            Thêm lịch trình
          </Link>
        </div>
      </div>

      {/* Bảng lịch trình */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        {loading && (
          <div className="text-center py-12 text-gray-500">
            Đang tải dữ liệu...
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left p-3">Mã Lịch Trình</th>
                  <th className="text-left p-3">Xe Bus</th>
                  <th className="text-left p-3">Tài Xế</th>
                  <th className="text-left p-3">Tên Tuyến Đường</th>
                  <th className="text-left p-3">Thứ</th>
                  <th className="text-left p-3">Giờ</th>
                  <th className="text-right p-3">Ngày Tạo</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((sch) => (
                    <tr
                      key={sch.id}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedSchedule(sch)}
                    >
                      <td className="p-3 font-semibold">{sch.id}</td>
                      <td className="p-3">{sch.bus?.licensePlate || "N/A"}</td>
                      <td className="p-3">
                        {sch.driver?.user?.firstName} {sch.driver?.user?.lastName}
                      </td>
                      <td className="p-3">{sch.route?.name || "N/A"}</td>
                      <td className="p-3">{sch.day}</td>
                      <td className="p-3">{sch.startTime}</td>
                      <td className="p-3 text-right">
                        {dayjs(sch.createdAt).format("DD/MM/YYYY HH:mm")}
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
                    <td colSpan="8" className="text-center py-12 text-gray-500">
                      Không có lịch trình nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Chi tiết lịch trình được chọn */}
      {selectedSchedule && (
        <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">
              Chi tiết lịch trình #{selectedSchedule.id}
            </h3>
            <button
              onClick={() => setSelectedSchedule(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Xe bus</p>
              <p className="font-semibold">{selectedSchedule.bus?.licensePlate || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Tài xế</p>
              <p className="font-semibold">
                {selectedSchedule.driver?.user?.firstName} {selectedSchedule.driver?.user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Tuyến đường</p>
              <p className="font-semibold">{selectedSchedule.route?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Thời gian</p>
              <p className="font-semibold">
                {selectedSchedule.startTime} → {selectedSchedule.endTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// export default function SchedulePage() {
//   const [view, setView] = useState("calendar"); // calendar | list
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Lịch trình demo
//   const events = [
//     { title: "51F-123.45", start: "2024-07-29", backgroundColor: "#93c5fd" },
//     { title: "51F-678.90", start: "2024-07-30", backgroundColor: "#fde68a" },
//     { title: "51F-123.45", start: "2024-07-30", backgroundColor: "#a7f3d0" },
//   ];

//   // Lịch trình dạng bảng
//   const scheduleList = [
//     { date: "2024-07-30", time: "06:30", route: "Tuyến 1 - Quận 1 & 3", bus: "51F-123.45", driver: "Trần Văn Long", status: "Đang tiến hành" },
//     { date: "2024-07-30", time: "06:45", route: "Tuyến 2 - Quận Phú Nhuận", bus: "51F-678.90", driver: "Lê Thị Hoa", status: "Đã lên lịch" },
//     { date: "2024-07-30", time: "16:30", route: "Tuyến 1 - Quận 1 & 3", bus: "51F-123.45", driver: "Trần Văn Long", status: "Đã lên lịch" },
//     { date: "2024-07-29", time: "16:30", route: "Tuyến 1 - Quận 1 & 3", bus: "51F-123.45", driver: "Trần Văn Long", status: "Hoàn thành" },
//   ];

//   return (
//     <section className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Quản lý Lịch trình</h2>

//       <div className="bg-white rounded-xl shadow p-5">
//         {/* --- Thanh tiêu đề & chuyển tab --- */}
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold">Lịch trình xe</h3>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setView("calendar")}
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 view === "calendar"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//               }`}
//             >
//               📅 Lịch
//             </button>
//             <button
//               onClick={() => setView("list")}
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 view === "list"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//               }`}
//             >
//               📋 Danh sách
//             </button>
//             <button className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
//               + Tạo lịch trình
//             </button>
//           </div>
//         </div>

//         {/* --- View dạng lịch (FullCalendar) --- */}
//         {view === "calendar" ? (
//           <div className="rounded-lg overflow-hidden">
//             <FullCalendar
//               plugins={[dayGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               locale="vi"
//               firstDay={1}
//               height="80vh"
//               events={events}
//               dateClick={(info) => alert(`Ngày: ${info.dateStr}`)}
//               eventClick={(info) => alert(`Xe: ${info.event.title}`)}
//               headerToolbar={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "",
//               }}
//               buttonText={{
//                 today: "Hôm nay",
//               }}
//             />
//           </div>
//         ) : (
//           /* --- View dạng danh sách --- */
//           <table className="w-full border-collapse text-sm">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Ngày</th>
//                 <th className="p-3 text-left">Giờ</th>
//                 <th className="p-3 text-left">Tuyến</th>
//                 <th className="p-3 text-left">Xe</th>
//                 <th className="p-3 text-left">Tài xế</th>
//                 <th className="p-3 text-left">Trạng thái</th>
//                 <th className="p-3 text-center">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {scheduleList.map((s, i) => (
//                 <tr key={i} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{s.date}</td>
//                   <td className="p-3">{s.time}</td>
//                   <td className="p-3">{s.route}</td>
//                   <td className="p-3">{s.bus}</td>
//                   <td className="p-3">{s.driver}</td>
//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-semibold ${
//                         s.status === "Đang tiến hành"
//                           ? "bg-green-100 text-green-700"
//                           : s.status === "Đã lên lịch"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {s.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center space-x-2">
//                     <button className="text-blue-600 hover:underline">👁️</button>
//                     <button className="text-yellow-600 hover:underline">✏️</button>
//                     <button className="text-red-600 hover:underline">🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </section>
//   );
// }
