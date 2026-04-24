import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParent } from "../../contexts/ParentContext";
import { uploadToCloudinary } from "../../services/CloudinaryService";

export default function AddParentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { createParent } = useParent();
  const navigate = useNavigate();

  // Xem trước ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = URL.createObjectURL(file);
      setFile(file);
      setPreviewUrl(url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate
    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    let uploadedImageUrl = "";

    // Upload ảnh nếu có
    if (file) {
      try {
        uploadedImageUrl = await uploadToCloudinary(file);
      } catch (err) {
        console.error(err);
        setError("Không thể upload ảnh lên Cloudinary!");
        return;
      }
    }

    // Tạo object parent
    const newParent = {
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob || null,
      address: address.trim(),
      gender,
      imageUrl: uploadedImageUrl // nếu không upload thì để rỗng
    };

    // Gọi context tạo parent
    try {
      setLoading(true);
      const ok = await createParent(newParent);
      if (ok) navigate("/admin/parent");
    } catch (err) {
      console.error("Error adding parent:", err);
      setError("Không thể thêm phụ huynh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Thêm Phụ Huynh Mới</h2>
      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm mb-1">Họ</label>
          <input className="w-full border rounded px-3 py-2" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1">Tên</label>
          <input className="w-full border rounded px-3 py-2" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1">Số điện thoại</label>
          <input className="w-full border rounded px-3 py-2" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1">Ngày sinh</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={dob} onChange={e => setDob(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1">Địa chỉ</label>
          <input className="w-full border rounded px-3 py-2" value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1">Giới tính</label>
          <select className="w-full border rounded px-3 py-2" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ảnh</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}
          {previewUrl && <img src={previewUrl} className="w-24 h-24 rounded mt-2 object-cover border" alt="Preview" />}
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => navigate("/admin/parent")} className="bg-gray-400 text-white px-4 py-2 rounded">Hủy</button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {(loading || uploading) ? "Đang thêm..." : "Thêm Phụ Huynh"}
          </button>
        </div>

      </form>
    </div>
  );
}
