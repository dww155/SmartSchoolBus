import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDriver } from "../../contexts/DriverContext";
import { uploadToCloudinary } from "../../services/CloudinaryService";

export default function AddDriverPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const [driverLicense, setDriverLicense] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(""); // lưu URL preview
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const { createDriver } = useDriver();
  const navigate = useNavigate();

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate trước
    if (!firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !driverLicense.trim()) {
      setError("Vui lòng nhập đủ thông tin bắt buộc!");
      return;
    }

    if (!file) {
      setError("Vui lòng chọn ảnh tài xế!");
      return;
    }

    let uploadedImageUrl = "";

    // Upload ảnh
    try {
      uploadedImageUrl = await uploadToCloudinary(file);
    } catch (err) {
      console.error(err);
      setError("Không thể upload ảnh lên Cloudinary!");
      return;
    }

    // Tạo object driver
    const newDriver = {
      user: {
        phoneNumber: phone,
        email: email || "",
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dob: dob || null,
        address: address || "",
        gender: gender,
        imageUrl: uploadedImageUrl,
      },
      driverLicense: driverLicense.trim(),
    };

    console.log("New Driver:", newDriver);

    // Gọi API
    try {
      setLoading(true);
      await createDriver(newDriver);
      navigate("/admin/drivers");
    } catch (err) {
      console.error("Error adding driver:", err);
      setError("Không thể thêm tài xế.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Thêm Tài Xế Mới</h2>
      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">Họ</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Tên</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1">Số điện thoại</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm mb-1">Ngày sinh</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm mb-1">Địa chỉ</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={address}
            onChange={
              e => setAddress(e.target.value)
            }
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm mb-1">Giới tính</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={gender}
            onChange={e => {
              console.log(e.target.value);
              setGender(e.target.value)
            }}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Ảnh</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {uploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}

          {previewUrl && (
            <img src={previewUrl} className="w-24 h-24 rounded mt-2 object-cover border" alt="Preview" />
          )}
        </div>

        {/* Driver License */}
        <div>
          <label className="block text-sm mb-1">Số bằng lái</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={driverLicense}
            onChange={e => setDriverLicense(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/drivers")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Đang thêm..." : "Thêm Tài Xế"}
          </button>
        </div>

      </form>
    </div>
  );
}
