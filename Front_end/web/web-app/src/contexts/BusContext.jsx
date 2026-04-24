import React, { createContext, useContext, useEffect, useState, useCallback, use } from "react";
import { getBuses } from "../services/BusService"; // đường dẫn của bạn tới BusService
import { getToken, setToken } from "../services/LocalStorageService";
import { useAuth } from "./AuthContext";

// Tạo Context
const BusContext = createContext();

// Hook để sử dụng context dễ dàng
export function useBus() {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error("useBusContext must be used within a BusProvider");
  }
  return context;
}

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const { isAuthenticated, token, isAdmin } = useAuth();
  // Hàm tải danh sách e-bus từ server
  const fetchBuses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBuses();
      if (data) setBuses(data.data);
      else throw new Error("Không thể tải dữ liệu e-bus");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBus = useCallback(async (busData) => {
    setLoading(true);
    setError(null);
    try {
      // Giả sử bạn có hàm addBus trong BusService
      const newBus = await addBus(busData);
      if (newBus) {
        setBuses((prevBuses) => [...prevBuses, newBus]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi tự động khi component mount
  useEffect(() => {
    if (!isAuthenticated || !isAdmin)
      return;

    fetchBuses();
  }, [isAuthenticated]);

  // Cập nhật context
  const value = {
    buses,
    loading,
    error,
    setSelectedBus,
    selectedBus,
    refresh: fetchBuses, // cho phép reload từ component khác
    setBuses,
    fetchBuses
  };

  return (
    <BusContext.Provider value={value}>
      {children}
    </BusContext.Provider>
  );
};