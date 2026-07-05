import { createContext, useContext, useState, useEffect, useCallback, use } from "react";
import { getToken, setToken, removeToken } from "../services/LocalStorageService";
import { introspect } from "../services/AuthService"; // thêm dòng này
import { login as loginService } from "../services/AuthService";
const AuthContext = createContext();

// Hook tiện lợi
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

// Provider
export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // true khi đang kiểm tra token
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);

  // 🔹 Kiểm tra token ngay khi App load
  useEffect(() => {
    async function validateToken() {
      const storedToken = getToken();
      if (!storedToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const valid = await introspect(storedToken);
        if (valid) {
          setTokenState(storedToken);
          setIsAuthenticated(true);

          const role = location.pathname.includes("admin") ? "admin" : location.pathname.includes("driver") ? "driver" : "parent";
          if (role === "admin") {
            setIsAdmin(true);
          } else if (role === "driver") {
            setRole("driver");
          } else {
            setRole("parent");
          }
        } else {
          removeToken();
          setTokenState(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        removeToken();
        setTokenState(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    validateToken();
  }, []);

  // 🔹 Khi login thành công
  const login = useCallback(async (username, password, role) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginService(username, password);
      if (result) {
        setTokenState(result);
        setToken(result); // lưu vào localStorage
        setIsAuthenticated(true);
        if (role === "admin")
          setIsAdmin(true);

        return true;
      } else {
        throw new Error("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      setError(err.message);
      return null; // 🔹 Trả về null nếu thất bại
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Khi logout
  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
