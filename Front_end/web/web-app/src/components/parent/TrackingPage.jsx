import React, { useEffect, useState, useMemo } from "react";
import { useParent } from "../../contexts/ParentContext";
import { useSchedule } from "../../contexts/ScheduleContext";
import MapBoxView from "../map/MapBoxView";
import { adminDisconnect, connectAdminAllDrivers, disconnect } from "../../services/WebSocketService.js";

export default function ParentTracking() {
  const dayMap = {
    MONDAY: "Thứ Hai",
    TUESDAY: "Thứ Ba",
    WEDNESDAY: "Thứ Tư",
    THURSDAY: "Thứ Năm",
    FRIDAY: "Thứ Sáu",
    SATURDAY: "Thứ Bảy",
    SUNDAY: "Chủ Nhật",
  };

  const { currentParent } = useParent();
  const { schedules } = useSchedule();

  const [selectedChild, setSelectedChild] = useState(null);
  const [filterWeekday, setFilterWeekday] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    if (currentParent?.students?.length > 0) {
      setSelectedChild(currentParent.students[0]);
    }
  }, [currentParent]);

  const filteredSchedules = useMemo(() => {
    const baseSchedules = selectedChild?.schedules || [];

    if (!filterWeekday) {
      return baseSchedules;
    }

    return baseSchedules.filter((sch) => sch.day === filterWeekday);
  }, [selectedChild, filterWeekday]);

  const routePoints = selectedSchedule
    ? selectedSchedule.route?.busStops
      ?.sort((a, b) => a.stopOrder - b.stopOrder)
      .map((bs) => [bs.busStop.longitude, bs.busStop.latitude]) || []
    : [];

  // websocket
  const [drivers, setDrivers] = useState({});
  const driversArray = Object.values(drivers);

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



  return (
    <section className="grid gap-4 p-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold m-0">Theo dõi chuyến xe của con</h1>
          <p className="mt-1 text-slate-600">
            Vị trí xe buýt, các điểm dừng và lịch trình.
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={selectedChild ? JSON.stringify(selectedChild) : ""}
            onChange={(e) => {
              setSelectedChild(JSON.parse(e.target.value));
              setSelectedSchedule(null);
            }}
            className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {currentParent?.students?.map((st) => (
              <option key={st.id} value={JSON.stringify(st)}>
                {st.firstName} {st.lastName} Lớp {st.classRoom}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="h-[600px] border rounded-xl overflow-hidden shadow-md">
        <MapBoxView routePoints={routePoints} drivers={driversArray} />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold m-0">Danh sách lịch trình</h2>

          <div className="flex gap-2 items-center">
            <label className="text-sm font-semibold text-slate-600">
              Lọc theo thứ:
            </label>
            <select
              value={filterWeekday}
              onChange={(e) => {
                setFilterWeekday(e.target.value);
                setSelectedSchedule(null);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Tất cả</option>
              <option value="MONDAY">Thứ Hai</option>
              <option value="TUESDAY">Thứ Ba</option>
              <option value="WEDNESDAY">Thứ Tư</option>
              <option value="THURSDAY">Thứ Năm</option>
              <option value="FRIDAY">Thứ Sáu</option>
              <option value="SATURDAY">Thứ Bảy</option>
              <option value="SUNDAY">Chủ Nhật</option>
            </select>
            {filterWeekday && (
              <button
                onClick={() => {
                  setFilterWeekday("");
                  setSelectedSchedule(null);
                }}
                className="px-3 py-1.5 rounded-lg border border-red-500 bg-red-500 text-white text-sm font-semibold cursor-pointer hover:bg-red-600 transition"
              >
                Xóa lọc
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="p-3 text-left font-semibold text-slate-600">
                  Thứ
                </th>
                <th className="p-3 text-left font-semibold text-slate-600">
                  Tuyến đường
                </th>
                <th className="p-3 text-left font-semibold text-slate-600">
                  Tài xế
                </th>
                <th className="p-3 text-left font-semibold text-slate-600">
                  Xe Bus
                </th>
                <th className="p-3 text-left font-semibold text-slate-600">
                  Giờ
                </th>
                <th className="p-3 text-left font-semibold text-slate-600">
                  Điểm dừng
                </th>
                <th className="p-3 text-center font-semibold text-slate-600">
                  Xem
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((sch) => (
                  <tr
                    key={sch.id}
                    className={`border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition ${selectedSchedule?.id === sch.id ? "bg-blue-50" : ""
                      }`}
                    onClick={() => setSelectedSchedule(sch)}
                  >
                    <td className="p-3">
                      <span className="inline-block px-3 py-1 rounded-xl bg-indigo-100 text-indigo-800 text-xs font-semibold">
                        {dayMap[sch.day]}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {sch.route?.name || "N/A"}
                    </td>
                    <td className="p-3 text-slate-600">
                      {sch.driver?.user?.lastName} {sch.driver?.user?.firstName}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {sch.bus?.licensePlate}
                    </td>
                    <td className="p-3 text-slate-600">
                      {sch.startTime} - {sch.endTime}
                    </td>
                    <td className="p-3 text-slate-600">
                      {sch.route?.busStops?.length || 0}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSchedule(sch);
                        }}
                        className={`px-4 py-1.5 rounded-md border-none text-white text-xs font-semibold cursor-pointer transition ${selectedSchedule?.id === sch.id
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                          }`}
                      >
                        {selectedSchedule?.id === sch.id
                          ? "Đang xem"
                          : "Xem tuyến"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    {filterWeekday ? (
                      <div>
                        <div className="text-base font-semibold mb-1">
                          Không có lịch trình nào trong ngày đã chọn
                        </div>
                        <div className="text-sm">
                          Vui lòng chọn ngày khác hoặc xóa bộ lọc
                        </div>
                      </div>
                    ) : (
                      "Chưa có lịch trình nào"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
