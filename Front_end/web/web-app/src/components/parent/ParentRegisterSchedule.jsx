import React, { useState, useEffect } from "react";
import { useParent } from "../../contexts/ParentContext";
import { useSchedule } from "../../contexts/ScheduleContext";
import MapBoxView from "../map/MapBoxView"; // Component bản đồ

export default function ParentRegisterScheduleWithMap() {
  const dayMap = {
    MONDAY: "Thứ Hai",
    TUESDAY: "Thứ Ba",
    WEDNESDAY: "Thứ Tư",
    THURSDAY: "Thứ Năm",
    FRIDAY: "Thứ Sáu",
    SATURDAY: "Thứ Bảy",
    SUNDAY: "Chủ Nhật",
  };

  const { registerSchedule, currentParent } = useParent();
  const { schedules } = useSchedule();

  const [selectedChild, setSelectedChild] = useState(
    currentParent?.students?.[0] || null
  );
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const scheduleIds = {
    scheduleIds: selectedSchedules.map((sch) => sch.id)
  };

  useEffect(() => {
    setSelectedSchedules([]); // reset khi đổi học sinh
  }, [selectedChild]);

  const handleSelect = (sch) => {
    setSelectedSchedules((prev) => {
      const isSelected = prev.some((s) => s.id === sch.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== sch.id);
      } else {
        return [...prev, sch];
      }
    });
  };

  const isScheduleSelected = (sch) => {
    return selectedSchedules.some((s) => s.id === sch.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChild) return alert("Vui lòng chọn học sinh");

    setLoading(true);

    // Đăng ký từng lịch trình
    const response = await registerSchedule(
      selectedChild.id,
      scheduleIds
    );

    setLoading(false);

    if (response) {
      alert(
        `Đăng ký thành công lịch trình cho ${selectedChild.firstName}!`
      );
      setSelectedSchedules([]);
    } else if (successCount > 0) {
      alert(
        `Đăng ký thành công ${successCount}/${selectedSchedules.length} lịch trình. Vui lòng thử lại các lịch còn lại.`
      );
    } else {
      alert("Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  // Hiển thị tuyến đường của lịch trình được chọn cuối cùng
  const routePoints =
    selectedSchedules.length > 0
      ? selectedSchedules[selectedSchedules.length - 1].route.busStops
        // Sắp xếp theo stopOrder
        .sort((a, b) => a.stopOrder - b.stopOrder)
        // Lấy thông tin cần cho bản đồ
        .map((bs) => [bs.busStop.longitude, bs.busStop.latitude])
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="flex gap-6 max-w-[1600px] mx-auto">
        {/* LEFT: Form + Table */}
        <div className="flex-1 max-w-3xl">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <i className="fas fa-calendar-check text-blue-500"></i>
              Đăng ký lịch trình học sinh
            </h1>
            <p className="text-gray-600">
              Chọn học sinh và lịch trình phù hợp từ danh sách bên dưới
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Dropdown chọn học sinh */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm">
                  <i className="fas fa-user-graduate text-blue-500 mr-2"></i>
                  Chọn học sinh
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-800"
                  value={selectedChild?.id || ""}
                  onChange={(e) =>
                    setSelectedChild(
                      currentParent.students.find(
                        (s) => s.id === e.target.value
                      )
                    )
                  }
                >
                  {currentParent?.students?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} — Lớp {s.classRoom}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg transform hover:scale-[1.02] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang đăng ký...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle mr-2"></i>
                    Đăng ký lịch trình
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-list"></i>
                Danh sách lịch trình
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Tổng số: {schedules.length} lịch trình | Đã chọn:{" "}
                {selectedSchedules.length}
              </p>
            </div>

            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-gray-700 sticky top-0 shadow-sm">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold border-b-2 border-gray-200">
                      Chọn
                    </th>
                    <th className="px-4 py-3 text-left font-semibold border-b-2 border-gray-200">
                      Tài xế
                    </th>
                    <th className="px-4 py-3 text-left font-semibold border-b-2 border-gray-200">
                      Xe Bus
                    </th>
                    <th className="px-4 py-3 text-left font-semibold border-b-2 border-gray-200">
                      Thứ
                    </th>
                    <th className="px-4 py-3 text-left font-semibold border-b-2 border-gray-200">
                      Giờ bắt đầu
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.length > 0 ? (
                    schedules.map((sch) => (
                      <tr
                        key={sch.id}
                        onClick={() => handleSelect(sch)}
                        className={`cursor-pointer border-b hover:bg-blue-50 transition duration-150 ${isScheduleSelected(sch)
                          ? "bg-blue-100 border-l-4 border-l-blue-500"
                          : ""
                          }`}
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isScheduleSelected(sch)}
                            onChange={() => handleSelect(sch)}
                            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-user text-gray-400"></i>
                            <span className="font-medium text-gray-800">
                              {`${sch.driver.user.lastName} ${sch.driver.user.firstName}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-bus text-blue-500"></i>
                            <span className="font-semibold text-gray-800">
                              {sch.bus.licensePlate}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                            {dayMap[sch.day]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            <i className="fas fa-clock mr-1 text-xs"></i>
                            {sch.startTime}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-4 py-12 text-center text-gray-500"
                        colSpan={5}
                      >
                        <i className="fas fa-inbox text-4xl text-gray-300 mb-3 block"></i>
                        <p className="text-lg font-semibold">
                          Chưa có lịch trình nào
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Map */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-map-marked-alt"></i>
                Bản đồ tuyến đường
              </h2>
              <p className="text-purple-100 text-sm mt-1">
                {selectedSchedules.length > 0
                  ? `Hiển thị tuyến: ${selectedSchedules[selectedSchedules.length - 1].route
                    .busStops.length
                  } điểm dừng (${selectedSchedules.length} lịch đã chọn)`
                  : "Chọn lịch trình để xem tuyến đường"}
              </p>
            </div>
            <div className="h-[600px]">
              <MapBoxView routePoints={routePoints} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
