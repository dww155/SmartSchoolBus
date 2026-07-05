import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function UpdateInfoDriver() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    phone: "",
    email: ""
  });

  useEffect(() => {
    // Load thông tin hiện tại
    setForm({
      phone: user?.phone || "0901234567",
      email: user?.email || "driver@example.com"
    });
  }, [user]);

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Call API to update driver info
    console.log("Cập nhật thông tin:", form);
    alert("Đã lưu thông tin thành công!");
    navigate("/driver/account");
  };

  const onCancel = () => {
    navigate("/driver/account");
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
        <header>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Chỉnh sửa thông tin</h1>
          <p style={{ margin: "4px 0 0", color: "#64748b" }}>
            Cập nhật số điện thoại và email của bạn
          </p>
        </header>

        {/* Thông báo hướng dẫn */}
        <div style={{ 
          background: "#fef3c7", 
          border: "1px solid #fbbf24", 
          borderRadius: 8, 
          padding: 12,
          fontSize: 13,
          color: "#92400e"
        }}>
          <i className="fas fa-exclamation-triangle" style={{ marginRight: 6 }}></i>
          Bạn chỉ có thể chỉnh sửa <strong>Số điện thoại</strong> và <strong>Email</strong>. 
          Các thông tin khác cần liên hệ quản trị viên.
        </div>

        <form onSubmit={onSubmit} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label htmlFor="phone" style={label}>
                Số điện thoại <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input 
                id="phone" 
                name="phone" 
                type="tel"
                value={form.phone} 
                onChange={onChange} 
                style={input}
                placeholder="Nhập số điện thoại"
                required 
              />
            </div>

            <div>
              <label htmlFor="email" style={label}>
                Email <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={onChange} 
                style={input}
                placeholder="Nhập địa chỉ email"
                required 
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button type="submit" style={btnPrimary}>
                <i className="fas fa-save" style={{ marginRight: 6 }}></i>
                Lưu thay đổi
              </button>
              <button type="button" style={btnSecondary} onClick={onCancel}>
                <i className="fas fa-times" style={{ marginRight: 6 }}></i>
                Hủy
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

const label = { 
  display: "block", 
  marginBottom: 8, 
  fontWeight: 600, 
  color: "#334155",
  fontSize: 14
};

const input = { 
  width: "100%", 
  padding: "12px 14px", 
  borderRadius: 8, 
  border: "1px solid #cbd5e1", 
  outline: "none",
  fontSize: 14,
  boxSizing: "border-box",
  transition: "border-color 0.2s"
};

const btnPrimary = { 
  flex: 1,
  padding: "12px 16px", 
  borderRadius: 8, 
  border: "none", 
  background: "#3b82f6", 
  color: "#fff", 
  fontWeight: 600, 
  cursor: "pointer",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s"
};

const btnSecondary = { 
  flex: 1,
  padding: "12px 16px", 
  borderRadius: 8, 
  border: "1px solid #cbd5e1", 
  background: "#fff", 
  color: "#64748b", 
  fontWeight: 600, 
  cursor: "pointer",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s"
};
