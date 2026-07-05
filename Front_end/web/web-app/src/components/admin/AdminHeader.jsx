// src/components/admin/AdminHeader.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../services/LocalStorageService";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    const u = setInterval(() => setLastUpdate(new Date()), 30000);
    return () => {
      clearInterval(t);
      clearInterval(u);
    };
  }, []);

  const onLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất không?")) {
      removeToken();
      toast.success("Đăng xuất thành công.");
      navigate("/login");
    }
  };

  const fmt = (d) =>
    d.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      alert(`🔍 Đang tìm kiếm: "${searchQuery}"\n\nTìm theo:\n• Mã xe: BUS-XXX\n• Tài xế: Tên/SĐT\n• Tuyến: Tên tuyến\n• Học sinh: Tên/Mã số`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white shadow-xl border-b border-gray-200">
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
              <span className="text-white text-2xl">🚌</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart School Bus</h1>
              <p className="text-xs text-gray-600 font-medium">Hệ thống quản lý xe đưa đón học sinh</p>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                placeholder="🔍 Tìm xe (BUS-001), tài xế, tuyến, học sinh..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              {searchOpen && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-500 rounded-xl shadow-lg z-50 p-4">
                  <p className="text-xs text-gray-600 mb-3 font-semibold">💡 GỢI Ý TÌM KIẾM:</p>
                  <div className="space-y-2 text-sm">
                    <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition text-gray-700">
                      🚌 <strong>Xe buýt:</strong> BUS-001, BUS-015...
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition text-gray-700">
                      👨‍✈️ <strong>Tài xế:</strong> Nguyễn Văn A, 0987654321...
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition text-gray-700">
                      🛣️ <strong>Tuyến:</strong> Cầu Giấy - Đống Đa, Tuyến A...
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition text-gray-700">
                      👧 <strong>Học sinh:</strong> Trần Ngọc Linh, STD0123...
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Stats + Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg border border-green-200">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Online</span>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-4 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-gray-600 font-medium">Xe hoạt động</p>
                <p className="text-lg font-bold text-blue-600">18/24</p>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <p className="text-xs text-gray-600 font-medium">Học sinh</p>
                <p className="text-lg font-bold text-purple-600">856</p>
              </div>
            </div>

            {/* Notifications */}
            <button
              className="relative p-2.5 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition duration-200"
              onClick={() =>
                toast.info("📢 3 thông báo mới:\n• BUS-001 trễ 15 phút\n• BUS-007 sắp đến\n• Hoàn tuyến sáng")
              }
              title="Thông báo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 grid place-items-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button
              className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200"
              title="Cài đặt"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User Profile + Logout */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Quản trị viên</p>
                <p className="text-xs text-gray-600">admin@school.edu</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold grid place-items-center shadow-md text-lg">
                Q
              </div>
              <button
                onClick={onLogout}
                className="ml-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition duration-200 hidden sm:block"
                title="Đăng xuất"
              >
                🚪 Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2.5 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6z" />
              </svg>
              <span className="font-semibold text-gray-800">{fmt(now)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
              </svg>
              <span className="font-medium text-green-700">Kết nối tốt</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="font-medium text-blue-700">Cập nhật: {lastUpdate.toLocaleTimeString("vi-VN")}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">
              📊 Xuất báo cáo
            </button>
            <button className="px-3 py-1 text-green-600 font-medium hover:bg-green-50 rounded-lg transition">
              💾 Sao lưu dữ liệu
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
