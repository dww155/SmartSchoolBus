import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDriver } from "../../contexts/DriverContext";

export default function DriverAccount() {
  const navigate = useNavigate();
  const { currentDriver } = useDriver();

  const handleEditClick = () => {
    navigate("/driver/update-info");
  };

  const wrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px",
    minHeight: "calc(100vh - 96px)",
    boxSizing: "border-box",
  };

  const sectionStyle = {
    display: "grid",
    gap: 16,
    maxWidth: 640,
    width: "100%",
    margin: 0,
  };

  return (
    <div style={wrapper}>
      <section style={sectionStyle}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Thông tin tài khoản</h1>
            <p style={{ margin: "4px 0 0", color: "#64748b" }}>Xem thông tin cá nhân và công việc</p>
          </div>
          <button
            onClick={handleEditClick}
            style={btnEdit}
          >
            <i className="fas fa-edit" style={{ marginRight: 6 }}></i>
            Chỉnh sửa thông tin
          </button>
        </header>

        {/* Thông tin cá nhân */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#1f2937" }}>Thông tin cá nhân</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={infoRow}>
              <span style={infoLabel}>Họ và tên</span>
              <span style={infoValue}>{`${currentDriver?.user.lastName} ${currentDriver?.user.firstName}`}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Ngày sinh</span>
              <span style={infoValue}>{currentDriver?.user.dob}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Giới tính</span>
              <span style={infoValue}>Nam</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Số điện thoại</span>
              <span style={infoValue}>{currentDriver?.user.phoneNumber}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Email</span>
              <span style={infoValue}>{currentDriver?.user.email}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Bằng lái xe</span>
              <span style={infoValue}>{currentDriver?.driverLicense}</span>
            </div>
          </div>
        </div>

        {/* Ghi chú */}
        <div style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 8,
          padding: 12,
          fontSize: 13,
          color: "#1e40af"
        }}>
          <i className="fas fa-info-circle" style={{ marginRight: 6 }}></i>
          Bạn chỉ có thể chỉnh sửa <strong>Số điện thoại</strong> và <strong>Email</strong>.
          Các thông tin khác chỉ được thay đổi bởi quản trị viên.
        </div>
      </section>
    </div>
  );
}

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #f1f5f9"
};
const infoLabel = {
  fontSize: 14,
  color: "#64748b",
  fontWeight: 500
};
const infoValue = {
  fontSize: 14,
  color: "#1f2937",
  fontWeight: 600
};
const btnEdit = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "none",
  background: "#3b82f6",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 14,
  display: "flex",
  alignItems: "center"
};

