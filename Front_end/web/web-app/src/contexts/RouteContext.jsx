import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { addRoute, getRoutes } from "../services/RouteService";
import { useAuth } from "./AuthContext";
// --- 1️⃣ Tạo Context ---
const RouteContext = createContext();

// --- 2️⃣ Custom Hook để sử dụng dễ hơn ---
export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
};

// --- 3️⃣ Provider bọc quanh các component cần dữ liệu ---
export const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]); // Danh sách tuyến đường
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(null); // Lỗi
  const [selectedRoute, setSelectedRoute] = useState(null); // Tuyến đường đang chọn
  const { isAuthenticated, isAdmin } = useAuth();

  // --- 🧠 Hàm tải danh sách tuyến đường ---
  const fetchRoutes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoutes();
      if (data && data.data) {
        setRoutes(data.data);
      } else {
        throw new Error("Không thể tải dữ liệu tuyến đường");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- 🔁 Gọi tự động khi component mount ---
  useEffect(() => {
    if (!isAuthenticated || !isAdmin)
      return;

    fetchRoutes();
  }, [isAuthenticated]);

  const createRoute = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const newRoute = await addRoute(payload);
      if (newRoute) {
        // Cập nhật danh sách tuyến đường ngay lập tức
        setRoutes((prev) => [...prev, newRoute.data]);
        return newRoute;
      } else {
        throw new Error("Không thể tạo tuyến đường mới");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- 📦 Cập nhật context value ---
  const value = {
    routes,
    loading,
    error,
    selectedRoute,
    setSelectedRoute,
    refresh: fetchRoutes,
    setRoutes,
    createRoute,
  };



  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};
