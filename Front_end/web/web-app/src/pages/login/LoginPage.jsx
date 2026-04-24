import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";

export default function Login({ role: roleProp }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const { login, currentUser, setCurrentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginFail(false);
    setErrorMessage("");

    try {
      const response = await login(username, password, roleProp);
      setLoading(false);

      if (response) {
        // điều hướng theo role
        if (roleProp === "admin") navigate("/admin", { replace: true });
        else if (roleProp === "driver")  navigate("/driver", { replace: true });
        else navigate("/parent", { replace: true });
      } else {
        console.error("❌ receivedToken = null/undefined");
        setLoginFail(true);
        setErrorMessage("Sai tên đăng nhập hoặc mật khẩu");
      }

    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);
      console.error("❌ Error stack:", error.stack);
      setLoading(false);
      setLoginFail(true);
      setErrorMessage(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="relative flex h-[100vh]">
        <div className="m-auto slide-in flex bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-gray-800 rounded-2xl relative bus-shadow p-8 h-[600px] w-[900px] mx-auto">

          <div className="absolute top-4 left-4 w-12 h-12 border-2 border-gray-700 rounded bg-sky-200"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-2 border-gray-700 rounded bg-sky-200"></div>
          <div className="absolute top-4 left-20 w-8 h-10 border-2 border-gray-700 rounded bg-sky-200"></div>
          <div className="absolute top-4 right-20 w-8 h-10 border-2 border-gray-700 rounded bg-sky-200"></div>

          <div className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-200 rounded-full border-2 border-gray-700"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-red-400 rounded-full border-2 border-gray-700"></div>

          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full floating-animation"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full floating-animation" style={{ animationDelay: "-2s" }}></div>
            <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full floating-animation" style={{ animationDelay: "-4s" }}></div>
            <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-white bg-opacity-10 rounded-full floating-animation" style={{ animationDelay: "-1s" }}></div>
          </div>

          {/* Login Card */}
          <div className="m-auto w-full max-w-md relative z-10">
            <div className="glass-effect rounded-2xl p-5">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-user mr-2"></i>Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-focus w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    placeholder="admin / parent / driver"
                    required
                  />
                </div>
                {/* 🔹 Hiển thị error message chi tiết hơn */}
                {loginFail && (
                  <p className="text-red-100 bg-red-500 bg-opacity-20 border border-red-300 rounded-lg px-3 py-2 text-sm text-center">
                    {errorMessage || "Sai thông tin đăng nhập"}
                  </p>
                )}
                {/* Password */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-lock mr-2"></i>Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-focus w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 pr-12"
                      placeholder="123456"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white text-opacity-70 hover:text-opacity-100"
                      aria-label="Hiện/ẩn mật khẩu"
                    >
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  disabled={loading}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {/* Back to Home */}
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full mt-3 bg-white bg-opacity-10 border border-white border-opacity-30 text-white py-3 px-4 rounded-lg font-semibold hover:bg-opacity-20 transition-all"
                >
                  Quay lại trang chủ
                </button>
              </form>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-700 rounded px-3 py-1">
            <span className="text-sm font-mono font-bold">SSSB0.1-Super smart school bus</span>
          </div>

          {/* Bánh xe */}
          <div className="absolute -bottom-6 left-8 w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-600">
            <div className="w-[70%] h-[70%] bg-gray-400 rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute -bottom-6 right-8 w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-600">
            <div className="w-[70%] h-[70%] bg-gray-400 rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="absolute -bottom-2 left-4 right-4 h-6 bg-gray-600 opacity-20 rounded-full blur-sm"></div>

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-700">Đang đăng nhập...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Đăng nhập thất bại');
    }

    const data = await response.json();
    return data.token || data.accessToken || data.access_token;
  } catch (error) {
    console.error("Login service error:", error);
    throw error; // 🔹 Quan trọng: phải throw để catch bên ngoài
  }
}
