// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { useBus } from "../../contexts/BusContext";
import { useDriver } from "../../contexts/DriverContext";
import { useStudent } from "../../contexts/StudentContext";
import { useRoute } from "../../contexts/RouteContext";
import { Link } from "react-router-dom";
import MapBoxView from "../map/MapBoxView.jsx";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const now = new Date().toLocaleString("vi-VN");
  const { buses } = useBus();
  const { drivers } = useDriver();
  const { students } = useStudent();
  const { routes } = useRoute();

  // 📊 Mock data cho biểu đồ
  const [lineChartData] = useState([
    { date: "T2", trips: 24 },
    { date: "T3", trips: 28 },
    { date: "T4", trips: 32 },
    { date: "T5", trips: 29 },
    { date: "T6", trips: 35 },
    { date: "T7", trips: 31 },
    { date: "CN", trips: 18 },
  ]);

  const [barChartData] = useState([
    { route: "Tuyến A", buses: 3 },
    { route: "Tuyến B", buses: 4 },
    { route: "Tuyến C", buses: 2 },
    { route: "Tuyến D", buses: 5 },
    { route: "Tuyến E", buses: 3 },
  ]);

  // 📈 Tính toán Stats
  const activeBuses = buses.filter((b) => b.available === true).length;
  const pickupStudents = Math.floor(students.length * 0.75);
  const remainingStudents = students.length - pickupStudents;
  const gpsStable = Math.floor(activeBuses * 0.95);
  const gpsLost = activeBuses - gpsStable;

  // ⚠️ Mock Alerts Data
  const [alerts] = useState([
    {
      id: 1,
      type: "delay",
      bus: "BUS-001",
      msg: "Xe trễ 15 phút",
      route: "Tuyến Cầu Giấy - Đống Đa",
      time: "5 phút trước",
      severity: "high",
    },
    {
      id: 2,
      type: "gps",
      bus: "BUS-007",
      msg: "Mất tín hiệu GPS",
      route: "Tuyến Hai Bà Trưng",
      time: "3 phút trước",
      severity: "critical",
    },
    {
      id: 3,
      type: "incident",
      bus: "BUS-012",
      msg: "Sự cố từ tài xế: Hỏng phanh",
      route: "Tuyến Cầu Giấy",
      time: "8 phút trước",
      severity: "critical",
    },
    {
      id: 4,
      type: "student",
      bus: "BUS-005",
      msg: "5 học sinh chưa được đón",
      route: "Tuyến Đống Đa",
      time: "12 phút trước",
      severity: "medium",
    },
    {
      id: 5,
      type: "delay",
      bus: "BUS-010",
      msg: "Xe sắp trễ",
      route: "Tuyến Ba Đình",
      time: "2 phút trước",
      severity: "medium",
    },
  ]);

  // 🎨 Alert colors
  const getAlertColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 border-red-500 text-red-900";
      case "high":
        return "bg-orange-50 border-orange-500 text-orange-900";
      case "medium":
        return "bg-yellow-50 border-yellow-500 text-yellow-900";
      default:
        return "bg-blue-50 border-blue-500 text-blue-900";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "delay":
        return "⏱️";
      case "gps":
        return "📡";
      case "incident":
        return "⚠️";
      case "student":
        return "👧";
      default:
        return "🔔";
    }
  };
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* 📌 Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            📊 Bảng Điều Khiển
          </h1>
          <p className="text-gray-600 mt-1">
            Cập nhật lúc: <span className="font-semibold">{now}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700">
            Hệ thống đang hoạt động
          </span>
        </div>
      </div>

      {/* 🎯 TOP CARDS - 4 Thẻ Chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 🚍 Xe đang hoạt động */}
        <Link to="/admin/bus" className="block">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  🚍 Xe đang hoạt động
                </p>
                <p className="text-4xl font-bold mt-2">
                  {activeBuses}/{buses.length}
                </p>
                <p className="text-blue-100 text-sm mt-2">
                  {((activeBuses / buses.length) * 100).toFixed(1)}% hoạt động
                </p>
              </div>
              <div className="text-6xl opacity-30">🚌</div>
            </div>
            <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-2">
              <div className="flex justify-between text-xs">
                <span>Tổng xe: {buses.length}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* 👨‍✈️ Tài xế đang làm việc */}
        <Link to="/admin/driver" className="block">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  👨‍✈️ Tài xế đang làm việc
                </p>
                <p className="text-4xl font-bold mt-2">{drivers.length}</p>
                <p className="text-green-100 text-sm mt-2">
                  {drivers.length} tài xế có việc
                </p>
              </div>
              <div className="text-6xl opacity-30">👔</div>
            </div>
            <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-2">
              <div className="flex justify-between text-xs">
                <span>Có bằng lái: {Math.floor(drivers.length * 0.95)}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* 🧒 Học sinh đã đón */}
        <Link to="/admin/student" className="block">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  🧒 Học sinh
                </p>
                <p className="text-4xl font-bold mt-2">
                  {pickupStudents}/{students.length}
                </p>
                <p className="text-purple-100 text-sm mt-2">
                  {remainingStudents} học sinh còn lại
                </p>
              </div>
              <div className="text-6xl opacity-30">👨‍🎓</div>
            </div>
            <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-2">
              <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5">
                <div
                  className="bg-white rounded-full h-1.5"
                  style={{
                    width: `${(pickupStudents / students.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Link>

        {/* 📡 GPS Signal */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">📡 GPS Signal</p>
              <p className="text-4xl font-bold mt-2">
                {gpsStable}/{activeBuses}
              </p>
              <p className="text-pink-100 text-sm mt-2">
                {gpsLost} mất tín hiệu
              </p>
            </div>
            <div className="text-6xl opacity-30">📡</div>
          </div>
          <div className="mt-4 flex gap-2 text-xs">
            <span className="bg-green-400 bg-opacity-30 px-2 py-1 rounded">
              ✓ Ổn định: {gpsStable}
            </span>
            <span className="bg-red-400 bg-opacity-30 px-2 py-1 rounded">
              ✕ Mất: {gpsLost}
            </span>
          </div>
        </div>
      </div>

      {/* 📈 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Số chuyến theo ngày */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            📈 Số chuyến theo ngày (Tuần)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="trips"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
                activeDot={{ r: 7 }}
                name="Số chuyến"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Xe theo tuyến */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            📊 Phân bố xe theo tuyến
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="route" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="buses"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                name="Số xe"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🗺️ Map + Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Map - 70% (7 phần) */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🗺️ Bản đồ Real-time
          </h3>
          <div className="relative rounded-xl overflow-hidden h-[450px]">
            <MapBoxView />
            
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm z-10">
              <p className="font-semibold">🟢 {activeBuses} xe đang chạy</p>
              <p className="text-gray-600 text-xs mt-1">Cập nhật: Mỗi 3s</p>
            </div>
          </div>
        </div>

        {/* Alerts Table - 30% (3 phần) */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              ⚠️ Cảnh báo & Sự cố
            </h3>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
              {alerts.filter((a) => a.severity === "critical").length} Nghiêm
              trọng
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 rounded-lg p-4 ${getAlertColor(
                  alert.severity
                )} transition hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {getAlertIcon(alert.type)}
                      </span>
                      <div>
                        <p className="font-bold text-sm">
                          {alert.bus} - {alert.msg}
                        </p>
                        <p className="text-xs opacity-75 mt-1">{alert.route}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">{alert.time}</p>
                    <button className="text-xs font-semibold mt-1 underline hover:no-underline">
                      Chi tiết →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📋 Hoạt động gần đây */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📋 Hoạt động gần đây
        </h3>
        <div className="space-y-3">
          {[
            {
              emoji: "✅",
              title: "BUS-015 hoàn thành tuyến chiều",
              sub: "Tài xế: Nguyễn Văn A • Tuyến C",
              time: "5 phút trước",
            },
            {
              emoji: "📍",
              title: "Tài xế Trần Thị B check-in",
              sub: "BUS-008 • Tuyến B • 45 học sinh",
              time: "12 phút trước",
            },
            {
              emoji: "🚍",
              title: "45 học sinh đã được đón thành công",
              sub: "Tuyến A • Hoàn thành 98%",
              time: "18 phút trước",
            },
            {
              emoji: "🔧",
              title: "Bảo dưỡng định kỳ BUS-003",
              sub: "Trạng thái: Bảo dưỡng",
              time: "25 phút trước",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition"
            >
              <div className="text-3xl">{item.emoji}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                  {item.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">{item.sub}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🎯 Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: "🚌", title: "Thêm xe buýt", desc: "Đăng ký xe mới" },
          { icon: "📅", title: "Tạo lịch trình", desc: "Lập lịch cho xe" },
          { icon: "👨‍✈️", title: "Thêm tài xế", desc: "Đăng ký tài xế mới" },
          { icon: "📢", title: "Gửi thông báo", desc: "Nhắn tin tới tất cả" },
        ].map((action) => (
          <button
            key={action.title}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="text-4xl group-hover:scale-110 transition mb-3">
              {action.icon}
            </div>
            <h4 className="font-bold text-gray-800">{action.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
