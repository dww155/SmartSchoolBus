import React from "react";

export default function AlertsPanel() {
  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Cảnh báo & Thông báo</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
          <i className="fas fa-exclamation-triangle text-red-500 mt-1" />
          <div>
            <p className="text-sm font-semibold text-red-800">Xe BUS-001 trễ 15 phút</p>
            <p className="text-xs text-red-600">Tuyến Cầu Giấy - Đống Đa</p>
            <p className="text-xs text-gray-500">5 phút trước</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <i className="fas fa-clock text-yellow-500 mt-1" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">Xe BUS-007 sắp đến điểm đón</p>
            <p className="text-xs text-yellow-600">THCS Nguyễn Du</p>
            <p className="text-xs text-gray-500">2 phút trước</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
          <i className="fas fa-check-circle text-green-500 mt-1" />
          <div>
            <p className="text-sm font-semibold text-green-800">Hoàn thành tuyến sáng</p>
            <p className="text-xs text-green-600">BUS-012 - 45 học sinh</p>
            <p className="text-xs text-gray-500">10 phút trước</p>
          </div>
        </div>
      </div>
      <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Xem tất cả thông báo
      </button>
    </section>
  );
}
