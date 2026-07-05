import React, { useState } from "react";
import MapBoxView from "../map/MapBoxView"; // đường dẫn tùy vào cấu trúc project của bạn
import { useBusStop } from "../../contexts/BusStopContext"; 

export default function AddBusStopPage() {
  const [form, setForm] = useState({
    address: "",
    latitude: 10.762622, // ví dụ: HCM
    longitude: 106.660172,
  });
  const { handleAddBusStop } = useBusStop();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "latitude" || name === "longitude"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse latitude & longitude thành số, trán h NaN
    const latitude = parseFloat(form.latitude);
    const longitude = parseFloat(form.longitude);

    // Validation đơn giản
    if (!form.address.trim()) {
      alert("Vui lòng nhập địa chỉ");
      return;
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      alert("Vui lòng nhập tọa độ hợp lệ");
      return;
    }

    const busStopData = {
      address: form.address.trim(),
      latitude,
      longitude,
    };

    try {
      const response = await handleAddBusStop(busStopData);
      if (response && response.success) {
        alert("Thêm bus stop thành công!");
        setForm({ address: "", latitude: "", longitude: "" }); // reset form
      } else {
        alert(response?.message || "Thêm bus stop thất bại");
      }
    } catch (err) {
      console.error("Lỗi thêm bus stop:", err);
      alert("Có lỗi xảy ra khi thêm bus stop");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* ===== Form nhập ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Thêm điểm dừng mới
        </h2>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ điểm dừng"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Vĩ độ (Latitude)
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Kinh độ (Longitude)
            </label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow"
        >
          ➕ Thêm điểm dừng
        </button>
      </form>

      {/* ===== Bản đồ hiển thị vị trí ===== */}
      <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow">
        <MapBoxView
          center={[form.longitude, form.latitude]}
          marker={[form.longitude, form.latitude]}
          zoom={14}
        />
      </div>
    </div>
  );
}