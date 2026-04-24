import React, { useState } from "react";
import dayjs from "dayjs";
import { useParent } from "../../contexts/ParentContext";
import { useStudent } from "../../contexts/StudentContext";
import { useBus } from "../../contexts/BusContext";
import { useDriver } from "../../contexts/DriverContext";
import { useRoute } from "../../contexts/RouteContext";
import { Link } from "react-router-dom";

export default function ParentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' | 'table'
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingParent, setEditingParent] = useState(null);

  const { parents, loading, error } = useParent();
  const { students } = useStudent();
  const { buses } = useBus();
  const { drivers } = useDriver();
  const { routes } = useRoute();

  // Filter parents
  const filtered = parents.filter((parent) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      parent.user?.id.toString().includes(searchTerm) ||
      parent.user?.firstName?.toLowerCase().includes(searchLower) ||
      parent.user?.lastName?.toLowerCase().includes(searchLower) ||
      parent.user?.phoneNumber?.includes(searchTerm) ||
      parent.user?.email?.toLowerCase().includes(searchLower)
    );
  });

  // Get students of a parent
  const getStudentsByParent = (parentId) => {
    return students.filter((student) => student.parentId === parentId);
  };

  // Get bus/driver/route info
  const getBusInfo = (busId) => buses.find((b) => b.id === busId);
  const getDriverInfo = (driverId) => drivers.find((d) => d.id === driverId);
  const getRouteInfo = (routeId) => routes.find((r) => r.id === routeId);

  // Selected parent and students for detail view
  const selectedParent = parents.find((p) => p.id === selectedParentId);
  const selectedStudents = selectedParentId ? getStudentsByParent(selectedParentId) : [];

  // Handle actions
  const handleViewDetail = (parentId) => {
    setSelectedParentId(parentId);
    setShowDetailModal(true);
  };

  const handleEdit = (parent) => {
    setEditingParent({
      id: parent.id,
      firstName: parent.user?.firstName || "",
      lastName: parent.user?.lastName || "",
      phoneNumber: parent.user?.phoneNumber || "",
      email: parent.user?.email || "",
      address: parent.user?.address || "",
      dob: parent.user?.dob || "",
    });
    setShowEditModal(true);
    setShowDetailModal(false);
  };

  const handleSaveEdit = () => {
    // TODO: Call API to update parent
    console.log("Saving parent:", editingParent);
    alert("✅ Đã cập nhật thông tin phụ huynh!");
    setShowEditModal(false);
    setEditingParent(null);
  };

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-4xl"></span> Quản lý Phụ huynh
          </h2>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin phụ huynh và con cái
          </p>
        </div>
        <Link
          to="/admin/parents/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium shadow-lg hover:shadow-xl transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> Thêm phụ huynh
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tổng phụ huynh</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{parents.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tổng học sinh</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{students.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Đang tìm kiếm</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{filtered.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">TB con/phụ huynh</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {parents.length > 0 ? (students.length / parents.length).toFixed(1) : 0}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search & View Mode */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Tìm theo tên, SĐT, email..."
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "cards"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📇 Cards
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📋 Table
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-center py-12 text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-center py-12 text-red-500">{error}</p>}

      {/* Cards View */}
      {!loading && !error && viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md">
              <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500">Không tìm thấy phụ huynh nào</p>
            </div>
          ) : (
            filtered.map((parent) => {
              const parentStudents = getStudentsByParent(parent.id);
              
              return (
                <div
                  key={parent.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur rounded-full w-14 h-14 flex items-center justify-center">
                          <span className="text-2xl">👤</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            {parent.user?.firstName} {parent.user?.lastName}
                          </h3>
                          <p className="text-xs text-blue-100">ID: {parent.id}</p>
                        </div>
                      </div>
                      <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                        {parentStudents.length} con
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-700 font-medium">{parent.user?.phoneNumber || "N/A"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700 truncate">{parent.user?.email || "N/A"}</span>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700 text-xs">{parent.user?.address || "Chưa cập nhật"}</span>
                      </div>
                    </div>

                    {/* Children List */}
                    <div className="border-t pt-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Con cái ({parentStudents.length}):</p>
                      {parentStudents.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">Chưa có học sinh nào</p>
                      ) : (
                        <div className="space-y-2">
                          {parentStudents.slice(0, 2).map((student) => {
                            const bus = getBusInfo(student.busId);
                            const driver = getDriverInfo(student.driverId);
                            const route = getRouteInfo(student.routeId);

                            return (
                              <div key={student.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-gray-800 text-sm">
                                      👧🏻 {student.firstName} {student.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500">Lớp: {student.grade || "N/A"}</p>
                                  </div>
                                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                                    {student.status || "Hoạt động"}
                                  </span>
                                </div>

                                {(bus || driver || route) && (
                                  <div className="space-y-1 text-xs">
                                    {bus && (
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <span>🚌</span>
                                        <span>Xe: <strong>{bus.licensePlate}</strong></span>
                                      </div>
                                    )}
                                    {driver && (
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <span>👨‍✈️</span>
                                        <span>TX: <strong>{driver.firstName} {driver.lastName}</strong></span>
                                      </div>
                                    )}
                                    {route && (
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <span>🗺️</span>
                                        <span>Tuyến: <strong>{route.name}</strong></span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {parentStudents.length > 2 && (
                            <button
                              onClick={() => handleViewDetail(parent.id)}
                              className="text-xs text-blue-600 hover:underline font-medium"
                            >
                              + Xem thêm {parentStudents.length - 2} con nữa...
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="border-t bg-gray-50 px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleViewDetail(parent.id)}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                    >
                      👁️ Xem chi tiết
                    </button>
                    <button
                      onClick={() => handleEdit(parent)}
                      className="flex-1 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm font-medium"
                    >
                      ✏️ Sửa
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Table View */}
      {!loading && !error && viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Mã</th>
                <th className="p-4 text-left font-semibold">Họ tên</th>
                <th className="p-4 text-left font-semibold">SĐT</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-center font-semibold">Số con</th>
                <th className="p-4 text-center font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    Không tìm thấy phụ huynh nào
                  </td>
                </tr>
              ) : (
                filtered.map((parent) => {
                  const parentStudents = getStudentsByParent(parent.id);

                  return (
                    <tr key={parent.id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-4 font-semibold text-blue-600">#{parent.id}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {parent.user?.firstName} {parent.user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{parent.user?.address || "N/A"}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{parent.user?.phoneNumber || "N/A"}</td>
                      <td className="p-4 text-gray-700">{parent.user?.email || "N/A"}</td>
                      <td className="p-4 text-center">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {parentStudents.length} con
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetail(parent.id)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(parent)}
                            className="text-amber-600 hover:text-amber-800 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedParent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Chi tiết Phụ huynh</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Parent Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span> Thông tin phụ huynh
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Họ tên</p>
                    <p className="font-semibold text-gray-800">
                      {selectedParent.user?.firstName} {selectedParent.user?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-semibold text-gray-800">{selectedParent.user?.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">{selectedParent.user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày sinh</p>
                    <p className="font-semibold text-gray-800">
                      {dayjs(selectedParent.user?.dob).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p className="font-semibold text-gray-800">{selectedParent.user?.address || "Chưa cập nhật"}</p>
                  </div>
                </div>
              </div>

              {/* Students List */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👧🏻</span> Danh sách con cái ({selectedStudents.length})
                </h4>
                {selectedStudents.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Chưa có học sinh nào</p>
                ) : (
                  <div className="space-y-4">
                    {selectedStudents.map((student) => {
                      const bus = getBusInfo(student.busId);
                      const driver = getDriverInfo(student.driverId);
                      const route = getRouteInfo(student.routeId);

                      return (
                        <div key={student.id} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 transition">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h5 className="font-bold text-lg text-gray-800">
                                {student.firstName} {student.lastName}
                              </h5>
                              <p className="text-sm text-gray-600">
                                Lớp: {student.grade || "N/A"} • Mã: #{student.id}
                              </p>
                            </div>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                              {student.status || "Hoạt động"}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">Xe bus</p>
                              <p className="font-bold text-blue-600">{bus?.licensePlate || "Chưa phân"}</p>
                              <p className="text-xs text-gray-500">{bus?.model || "N/A"}</p>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">Tài xế</p>
                              <p className="font-bold text-purple-600">
                                {driver ? `${driver.firstName} ${driver.lastName}` : "Chưa phân"}
                              </p>
                              <p className="text-xs text-gray-500">{driver?.phoneNumber || "N/A"}</p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">Tuyến đường</p>
                              <p className="font-bold text-green-600 truncate">{route?.name || "Chưa phân"}</p>
                              <p className="text-xs text-gray-500">{route?.stops?.length || 0} điểm dừng</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedParent);
                }}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition"
              >
                ✏️ Sửa thông tin
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingParent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">✏️ Sửa thông tin Phụ huynh</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ</label>
                  <input
                    type="text"
                    value={editingParent.lastName}
                    onChange={(e) => setEditingParent({...editingParent, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tên</label>
                  <input
                    type="text"
                    value={editingParent.firstName}
                    onChange={(e) => setEditingParent({...editingParent, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={editingParent.phoneNumber}
                  onChange={(e) => setEditingParent({...editingParent, phoneNumber: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingParent.email}
                  onChange={(e) => setEditingParent({...editingParent, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
                <textarea
                  value={editingParent.address}
                  onChange={(e) => setEditingParent({...editingParent, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition"
                >
                  ✓ Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}