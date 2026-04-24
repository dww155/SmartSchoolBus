import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { addSchedule, getSchedules } from "../services/Schedule";

import { useAuth } from "./AuthContext";

// 1️⃣ Tạo Context
const ScheduleContext = createContext();

// 2️⃣ Custom Hook
export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};

// 3️⃣ Provider
export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);         // Danh sách lịch
  const [loading, setLoading] = useState(false);          // Loading
  const [error, setError] = useState(null);               // Lỗi
  const [selectedSchedule, setSelectedSchedule] = useState(null); // Lịch đang chọn

  const { isAuthenticated, isAdmin } = useAuth();

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getSchedules();
      if (result && result.data) {
        setSchedules(result.data);
      } else {
        throw new Error("Không thể tải dữ liệu lịch chạy");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSchedule = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const newSchedule = await addSchedule(payload);

      if (newSchedule && newSchedule.data) {
        setSchedules((prev) => [...prev, newSchedule.data]);
        return newSchedule;
      } else {
        throw new Error("Không thể tạo lịch mới");
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchSchedules();
  }, [isAuthenticated]);

  const value = {
    schedules,
    loading,
    error,
    selectedSchedule,
    setSelectedSchedule,
    refresh: fetchSchedules,
    setSchedules,
    createSchedule,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
