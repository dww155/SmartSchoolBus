import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getBusStops, addBusStop, deleteBusStop } from "../services/BusStopService";
import { useAuth } from "./AuthContext";

const BusStopContext = createContext();

export function useBusStop() {
  const context = useContext(BusStopContext);
  if (!context) {
    throw new Error("useBusStop must be used within a BusStopProvider");
  }
  return context;
}

export const BusStopProvider = ({ children }) => {
  const [busStops, setBusStops] = useState([]);
  const [selectedBusStop, setSelectedBusStop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, isAdmin } = useAuth();

  // --- Load danh sách bus stop ---
  const fetchBusStops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBusStops();
      if (data && data.data) {
        setBusStops(data.data);
      } else {
        throw new Error("Không thể tải dữ liệu điểm dừng.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Thêm một bus stop ---
  const handleAddBusStop = useCallback(async (busStopJson) => {
    try {
      const response = await addBusStop(busStopJson);
      if (response.success) {
        await fetchBusStops();
      }
      return response;
    } catch (err) {
      setError(err.message);
    }
  }, [fetchBusStops]);

  // --- Xóa một bus stop ---
  const handleDeleteBusStop = useCallback(async (id) => {
    try {
      const response = await deleteBusStop(id);
      if (response.success) {
        setBusStops(prev => prev.filter(bs => bs.id !== id));
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchBusStops();
    }
  }, [isAuthenticated, fetchBusStops]);

  return (
    <BusStopContext.Provider
      value={{
        busStops,
        selectedBusStop,
        setSelectedBusStop,
        fetchBusStops,
        handleAddBusStop,
        handleDeleteBusStop,
        loading,
        error,
      }}
    >
      {children}
    </BusStopContext.Provider>
  );
};
