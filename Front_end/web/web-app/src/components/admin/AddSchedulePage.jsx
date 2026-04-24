import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { useDriver } from "../../contexts/DriverContext";
import { useBus } from "../../contexts/BusContext";
import { useRoute } from "../../contexts/RouteContext";
import { useSchedule } from "../../contexts/ScheduleContext";

export default function AddSchedulePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { drivers } = useDriver();
  const { buses } = useBus();
  const { routes } = useRoute();
  const { createSchedule } = useSchedule();

  // Form state
  const [form, setForm] = useState({
    busId: "",
    driverId: "",
    routeId: "",
    day: "",
    startTime: "0:0:0:0",
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý thay đổi thời gian
  const handleTimeInputChange = (timeType, timeString) => {
    const [hour, minute] = timeString.split(':').map(v => parseInt(v) || 0);

    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    // Cập nhật form
    setForm(prev => ({
      ...prev,
      startTime: formattedTime
    }));
  };

  // Chuyển đổi từ object time sang string HH:mm để hiển thị
  const getTimeString = (timeObj) => {
    const h = String(timeObj.hour).padStart(2, '0');
    const m = String(timeObj.minute).padStart(2, '0');
    return `${h}:${m}`;
  };

  // Validate form
  const validateForm = () => {
    if (!form.busId) {
      setError("Vui lòng chọn xe buýt!");
      return false;
    }
    if (!form.driverId) {
      setError("Vui lòng chọn tài xế!");
      return false;
    }
    if (!form.routeId) {
      setError("Vui lòng chọn tuyến đường!");
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // Gọi API tạo lịch trình ở đây
      await createSchedule(form);
      // Điều hướng về trang danh sách lịch trình
      navigate("/admin/schedule");
    } catch (err) {
      setError("Không thể thêm lịch trình. Vui lòng thử lại.");
      console.error("❌ Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thêm Lịch Trình Mới</h1>
          <p className="text-gray-600">Tạo lịch trình cho xe buýt trên tuyến đường cụ thể</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">

            {/* Row 1: Bus - Driver */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Xe buýt */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  <i className="fas fa-bus mr-2 text-blue-500"></i>
                  Xe buýt <span className="text-red-500">*</span>
                </label>
                <select
                  name="busId"
                  value={form.busId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">-- Chọn xe buýt --</option>
                  {buses.map(bus => (
                    <option key={bus.id} value={bus.id}>{bus.licensePlate}</option>
                  ))}
                </select>
              </div>

              {/* Tài xế */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  <i className="fas fa-user-tie mr-2 text-green-500"></i>
                  Tài xế <span className="text-red-500">*</span>
                </label>
                <select
                  name="driverId"
                  value={form.driverId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">-- Chọn tài xế --</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.id}>{driver.user.phoneNumber} - {driver.user.lastName + ' ' + driver.user.firstName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Route */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <i className="fas fa-route mr-2 text-purple-500"></i>
                Tuyến đường <span className="text-red-500">*</span>
              </label>
              <select
                name="routeId"
                value={form.routeId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">-- Chọn tuyến đường --</option>
                {routes.map(route => (
                  <option key={route.id} value={route.id}>{route.name}</option>
                ))}
              </select>
            </div>

            {/* Day of week */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <i className="fas fa-calendar-day mr-2 text-indigo-500"></i>
                Ngày <span className="text-red-500">*</span>
              </label>
              <select
                name="day"
                value={form.day}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">-- Chọn ngày --</option>
                {[
                  "MONDAY", "TUESDAY", "WEDNESDAY",
                  "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
                ].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <i className="fas fa-clock mr-2 text-orange-500"></i>
                Thời gian chạy <span className="text-red-500">*</span>
              </label>

              <input
                type="time"
                value={form.startTime}
                onChange={(e) => handleTimeInputChange("startTime", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <strong>Chi tiết:</strong>
                {form.startTime.hour}h {form.startTime.minute}m {form.startTime.second}s
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate("/admin/schedule")}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
                disabled={loading}
              >
                <i className="fas fa-times mr-2"></i>
                Hủy
              </button>

              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang thêm...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    Thêm lịch trình
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
