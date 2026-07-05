import React, { useState } from "react";
import dayjs from "dayjs";
import { useParent } from "../../contexts/ParentContext";
import { Link } from "react-router-dom";

export default function ParentsPage() {
  const [q, setQ] = useState("");
  const [modalParent, setModalParent] = useState(null); // ← Thêm state modal
  const { parents, loading, error } = useParent();

  // lọc theo từ khóa
  const filtered = parents.filter(
    (parent) =>
      parent.user.firstName.toLowerCase().includes(q.toLowerCase()) ||
      parent.user.lastName.toLowerCase().includes(q.toLowerCase()) ||
      parent.user.phoneNumber.includes(q) ||
      parent.user.email.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-4xl">👨‍👩‍👧‍👦</span> Quản lý Phụ huynh
          </h2>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin phụ huynh và con cái
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍 Tìm theo tên, SĐT, email..."
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link
            to="/admin/parent/add"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <i className="fas fa-user-plus mr-2" /> Thêm phụ huynh
          </Link>
        </div>
      </div>

      {loading && <p className="text-center py-12 text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-center py-12 text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left p-3">Ảnh</th>
                <th className="text-left p-3">Mã</th>
                <th className="text-left p-3">Họ</th>
                <th className="text-left p-3">Tên</th>
                <th className="text-left p-3">SĐT</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Ngày sinh</th>
                <th className="text-left p-3">Địa chỉ</th>
                <th className="text-right p-3">Ngày tạo</th>
                <th className="text-right p-3">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((parent) => (
                  <tr
                    key={parent.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setModalParent(parent)} // ← mở modal
                  >
                    <td className="p-3">
                      {parent.user.imageUrl ? (
                        <img
                          src={parent.user.imageUrl}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <i className="fas fa-user" />
                        </div>
                      )}
                    </td>

                    <td className="p-3 font-semibold">{parent.id}</td>
                    <td className="p-3">{parent.user.lastName}</td>
                    <td className="p-3">{parent.user.firstName}</td>
                    <td className="p-3">{parent.user.phoneNumber}</td>
                    <td className="p-3">{parent.user.email}</td>
                    <td className="p-3">
                      {dayjs(parent.user.dob).format("DD/MM/YYYY")}
                    </td>
                    <td className="p-3">{parent.user.address}</td>
                    <td className="p-3 text-right">
                      {dayjs(parent.user.createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
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
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    Không có phụ huynh nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔥 Modal chi tiết phụ huynh */}
      {modalParent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative animate-fadeIn">

            {/* nút đóng */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setModalParent(null)}
            >
              <i className="fas fa-times text-xl" />
            </button>

            {/* Header thông tin + avatar */}
            <div className="flex items-center gap-4">
              {modalParent.user.imageUrl ? (
                <img
                  src={modalParent.user.imageUrl}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
                  <i className="fas fa-user" />
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold">
                  {modalParent.user.lastName} {modalParent.user.firstName}
                </h3>
                <p className="text-gray-500">{modalParent.user.email}</p>
                <p className="text-gray-500">{modalParent.user.phoneNumber}</p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Chi tiết phụ huynh */}
            <div className="space-y-2 text-sm">
              <p>
                <strong>Mã phụ huynh:</strong> {modalParent.id}
              </p>
              <p>
                <strong>Ngày sinh:</strong>{" "}
                {dayjs(modalParent.user.dob).format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {modalParent.user.address}
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {dayjs(modalParent.user.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
