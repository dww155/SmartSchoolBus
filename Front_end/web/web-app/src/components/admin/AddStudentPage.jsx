import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../contexts/StudentContext";
import { useParent } from "../../contexts/ParentContext";
import { uploadToCloudinary } from "../../services/CloudinaryService";

export default function AddStudentPage() {
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showParentModal, setShowParentModal] = useState(false);
  const [searchParent, setSearchParent] = useState("");

  const { createStudent } = useStudent();
  const { parents } = useParent();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(""); // lưu URL preview
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // --- Upload ảnh ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = URL.createObjectURL(file);
      setFile(file);
      setPreviewUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // --- Submit form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!studentId || !firstName || !lastName || !dob || !classRoom || !parentId) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    let uploadedImageUrl = "";

    try {
      uploadedImageUrl = await uploadToCloudinary(file);
    } catch (err) {
      console.error(err);
      setError(err.message || "Không thể thêm học sinh.");
      return;
    }

    const newStudent = {
      id: studentId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob,
      gender,
      address: address.trim(),
      classRoom: classRoom.trim(),
      parentId: parentId.trim(),
      imageUrl: uploadedImageUrl,
    };

    try {
      setLoading(true);
      await createStudent(newStudent);
      navigate("/admin/students");
    } catch (err) {
      console.error(err);
      setError(err.message || "Không thể thêm học sinh.");
    } finally {
      setLoading(false);
    }
  };

  // --- Lọc phụ huynh ---
  const filteredParents = (parents || []).filter((p) => {
    if (!searchParent.trim()) return true;

    const fullName = `${p.user?.firstName || ""} ${p.user?.lastName || ""}`.toLowerCase();
    const phone = p.user?.phoneNumber || "";

    return (
      fullName.includes(searchParent.toLowerCase()) ||
      phone.includes(searchParent)
    );
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg relative">
      <h2 className="text-xl font-semibold mb-4">Thêm Học Sinh Mới</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Mã học sinh" className="w-full border rounded px-3 py-2" />

        <div className="flex gap-2">
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Họ" className="flex-1 border rounded px-3 py-2" />
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Tên" className="flex-1 border rounded px-3 py-2" />
        </div>

        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full border rounded px-3 py-2" />

        <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border rounded px-3 py-2">
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>

        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Địa chỉ" className="w-full border rounded px-3 py-2" />
        <input type="text" value={classRoom} onChange={e => setClassRoom(e.target.value)} placeholder="Lớp" className="w-full border rounded px-3 py-2" />

        {/* Parent chọn */}
        <div className="flex gap-2 items-center">
          <input type="text" value={parentId} readOnly placeholder="ID phụ huynh" className="flex-1 border rounded px-3 py-2" />
          <button type="button" onClick={() => setShowParentModal(true)} className="bg-blue-500 text-white px-3 py-2 rounded">
            Chọn
          </button>
        </div>

        {/* Upload ảnh */}
        <div>
          <label className="block mb-1 font-medium">Ảnh học sinh</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {uploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}

          {previewUrl && (
            <img src={previewUrl} className="w-24 h-24 rounded mt-2 object-cover border" alt="Preview" />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => navigate("/admin/students")} className="bg-gray-400 text-white px-4 py-2 rounded">
            Hủy
          </button>
          <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
            {loading ? "Đang lưu..." : "Thêm học sinh"}
          </button>
        </div>
      </form>

      {/* Popup phụ huynh */}
      {showParentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-96 max-h-[70vh] overflow-y-auto relative">
            <h3 className="text-lg font-semibold mb-3">Chọn phụ huynh</h3>

            <input type="text" value={searchParent} onChange={e => setSearchParent(e.target.value)} placeholder="Tìm theo tên hoặc SĐT" className="w-full border rounded px-3 py-2 mb-3" />

            <ul>
              {filteredParents.map((p) => (
                <li key={p.id} className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setParentId(p.id);
                    setShowParentModal(false);
                  }}
                >
                  {p.user?.firstName} {p.user?.lastName} - {p.user?.phoneNumber}
                </li>
              ))}
            </ul>

            <button onClick={() => setShowParentModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
