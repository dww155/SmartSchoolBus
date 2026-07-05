import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBus } from "../../services/BusService";
import { useBus } from "../../contexts/BusContext";

export default function AddBusPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchBuses } = useBus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!licensePlate.trim() || !capacity) {
      setError("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      await addBus({ licensePlate, capacity: Number(capacity) });
      fetchBuses();
      navigate("/admin/buses");
    } catch (err) {
      setError("Không thể thêm xe bus. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Thêm Xe Bus Mới</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Biển số xe
          </label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="VD: 51B-12345"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Sức chứa (số ghế)
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="VD: 40"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Đang lưu..." : "Thêm xe bus"}
          </button>
        </div>
      </form>
    </div>
  );
}
