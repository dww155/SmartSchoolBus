import React, { useState, useEffect } from "react";
import { getStudents } from "../../services/StudentService";
import dayjs from "dayjs";
import { useStudent } from "../../contexts/StudentContext";
import { Link } from "react-router-dom";

export default function StudentsPage() {
  const [q, setQ] = useState("");
  const { students, loading, error } = useStudent();
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // lọc theo từ khóa q
  const filtered = students.filter(
    (student) =>
      student.id.toString().includes(q) ||
      student.firstName.toLowerCase().includes(q.toLowerCase()) ||
      student.lastName.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý học sinh</h2>
          <p className="text-gray-600 text-sm">
            Tổng số: <b>{filtered.length}</b> học sinh
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên / mã / SĐT..."
            className="bg-white border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/admin/student/add" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
            <i className="fas fa-user-plus mr-2" />Thêm học sinh
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
                <th className="p-3">Ảnh</th>
                <th className="text-left p-3">Mã</th>
                <th className="text-left p-3">Họ</th>
                <th className="text-left p-3">Tên</th>
                <th className="text-left p-3">Ngày sinh</th>
                <th className="text-left p-3">Địa chỉ</th>
                <th className="text-right p-3">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((st) => (
                  <tr key={st.id} className="border-t hover:bg-gray-50" onClick={() => {
                    setSelectedStudent(st);
                    setShowStudentModal(true);
                  }}
                  >

                    {/* AVATAR */}
                    <td className="p-3">
                      {st.imageUrl ? (
                        <img
                          src={st.imageUrl}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <i className="fas fa-user" />
                        </div>
                      )}
                    </td>


                    <td className="p-3 font-semibold">{st.id}</td>
                    <td className="p-3">{st.lastName}</td>
                    <td className="p-3">{st.firstName}</td>
                    <td className="p-3">{st.dob}</td>
                    <td className="p-3">{st.address}</td>
                    <td className="p-3">{dayjs(st.createdAt).format("DD/MM/YYYY HH:mm")}</td>

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
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    Không có học sinh nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal hiển thị chi tiết học sinh */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowStudentModal(false)}
          />

          {/* Card modal */}
          <div className="relative z-10 bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Chi tiết học sinh</h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Avatar */}
              <div className="flex flex-col items-center md:items-start md:col-span-1">
                <img
                  src={selectedStudent.imageUrl || "/default-avatar.png"}
                  alt="avatar"
                  className="w-28 h-28 rounded-full object-cover border"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                />
                <p className="mt-3 text-sm text-gray-600">{selectedStudent.firstName} {selectedStudent.lastName}</p>
              </div>

              {/* Thông tin chi tiết */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Mã</p>
                    <p className="font-medium">{selectedStudent.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lớp</p>
                    <p className="font-medium">{selectedStudent.classRoom || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Họ</p>
                    <p className="font-medium">{selectedStudent.lastName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tên</p>
                    <p className="font-medium">{selectedStudent.firstName || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Ngày sinh</p>
                    <p className="font-medium">{selectedStudent.dob ? dayjs(selectedStudent.dob).format("DD/MM/YYYY") : "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Giới tính</p>
                    <p className="font-medium">{selectedStudent.gender || "-"}</p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{selectedStudent.address || "-"}</p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Ngày tạo</p>
                    <p className="font-medium">
                      {selectedStudent.createdAt ? dayjs(selectedStudent.createdAt).format("DD/MM/YYYY HH:mm") : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
