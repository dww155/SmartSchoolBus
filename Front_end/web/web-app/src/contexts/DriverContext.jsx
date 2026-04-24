import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getDrivers } from "../services/DriverService";
import { getToken, setToken } from "../services/LocalStorageService";
import { useAuth } from "./AuthContext";
import { addDriver } from "../services/DriverService";
import { getMyInfo } from "../services/DriverService";

const DriverContext = createContext();

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDriver must be used within a DriverProvider");
  }
  return context;
}

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { isAuthenticated, token, isAdmin, role } = useAuth();
  const [currentDriver, setCurrentDriver] = useState(null);

  const fetchDrivers = useCallback(
    async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDrivers();
        if (data) setDrivers(data.data);
        else throw new Error("Không thể tải dữ liệu tài xế");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  )

  const createDriver = useCallback(async (driverData) => {
    try {
      setLoading(true);
      const res = await addDriver(driverData);

      // Thêm vào list mà không cần reload toàn bộ
      setDrivers((prev) => [...prev, res.data]);

      return res;
    } catch (err) {
      throw err; // cho UI xử lý error
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentDriver = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyInfo();
      if (data) {
        setCurrentDriver(data);
      }
      else throw new Error("Không thể tải dữ liệu phụ huynh");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated)
      return;

    if (isAdmin)
      fetchDrivers();
    else if (role === 'driver')
      getCurrentDriver();

  }, [isAuthenticated]);

  const value = {
    drivers,
    loading,
    error,
    selectedDriver,
    setSelectedDriver,
    currentDriver,
    // thao tác
    refresh: fetchDrivers,
    setDrivers,
    createDriver, // ⭐ thêm vào context
  };

  return (
    <DriverContext.Provider value={value}>
      {children}
    </DriverContext.Provider>
  )
}