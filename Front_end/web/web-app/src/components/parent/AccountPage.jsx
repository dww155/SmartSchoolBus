import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useParent } from "../../contexts/ParentContext";

export default function ParentAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentParent } = useParent();

  const handleEditClick = () => {
    navigate("/parent/update-info");
  };

  // wrapper style để canh giữa
  const wrapper = {
    display: "flex",
    justifyContent: "center",         // canh ngang giữa
    alignItems: "flex-start",         // nếu muốn căn dọc giữa => "center"
    padding: "24px",
    minHeight: "calc(100vh - 96px)",  // điều chỉnh nếu header cao/ thấp khác
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
            <p style={{ margin: "4px 0 0", color: "#64748b" }}>Xem thông tin cá nhân và con em</p>
          </div>
          <button
            onClick={handleEditClick}
            style={btnEdit}
          >
            <i className="fas fa-edit" style={{ marginRight: 6 }}></i>
            Chỉnh sửa thông tin
          </button>
        </header>

        {/* Thông tin phụ huynh */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#1f2937" }}>Thông tin phụ huynh</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={infoRow}>
              <span style={infoLabel}>Họ và tên</span>
              <span style={infoValue}>  {`${currentParent?.user.lastName} ${currentParent?.user.firstName}`}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Số điện thoại</span>
              <span style={infoValue}>{currentParent?.user.phoneNumber}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Email</span>
              <span style={infoValue}>{currentParent?.user.email}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>Địa chỉ</span>
              <span style={infoValue}>{currentParent?.user.address}</span>
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
          Bạn chỉ có thể chỉnh sửa <strong>Số điện thoại</strong>, <strong>Email</strong> và <strong>Địa chỉ</strong>.
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