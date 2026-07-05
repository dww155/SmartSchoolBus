import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDriver } from "../../contexts/DriverContext";

export default function DriverHeader() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const { currentDriver } = useDriver();

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "username") setUsername(e.newValue || "");
      if (e.key === "role") setRole(e.newValue || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  const roleLabel = "tài xế";

  return (
    <header
      style={{
        background: "#3575d3",
        color: "#fff",
        padding: "12px 32px",
        boxShadow: "0 2px 8px rgba(53,117,211,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 87,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* logo container has fixed box (keeps header padding) but allows visual overflow */}
        <div style={{ width: 55, height: 55, position: "relative", overflow: "visible", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* scale the image so it appears larger without affecting layout/padding */}
          <img
            src="/assets/LogoBusApp3.png"
            alt="logo"
            style={{ width: 55, height: 55, objectFit: "contain", transform: "scale(1.5)", transformOrigin: "center" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Smart School Bus</span>
            {/* Busflix icon (bên cạnh tiêu đề) */}
            {/* <img src="/assets/BusflixIcon.png" alt="Busflix" style={{ width: 28, height: 20, objectFit: "contain" }} /> */}
          </div>
          {/* <div style={{ fontSize: 13, color: "#e0e7ff" }}>Phụ huynh học sinh</div> */}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Username display */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", color: "#3575d3", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
            {username ? username.charAt(0).toUpperCase() : <i className="fas fa-user" style={{ color: "#3575d3" }}></i>}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 700 }}>{`${currentDriver?.user.lastName} ${currentDriver?.user.firstName}`}</div>
            <div style={{ fontSize: 12, color: "#e0e7ff" }}>{roleLabel}</div>
          </div>
        </div>

        {/* Logout button */}
        <button onClick={logout} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(224,231,255,0.25)", color: "#fff", background: "transparent" }}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
