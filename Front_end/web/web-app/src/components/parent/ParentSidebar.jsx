import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { icon: "fas fa-bus", label: "Chuyến xe của con", to: "/parent/tracking", end: true },
  { icon: "fas fa-calendar-plus", label: "Đăng ký lịch trình", to: "/parent/schedule", end: true },
  { icon: "fas fa-history", label: "Lịch sử chuyến", to: "/parent/history", end: true },
  { icon: "fas fa-user", label: "Tài khoản", to: "/parent/account" },
];

export default function ParentSidebar() {
  const location = useLocation();
  // chỉnh nhanh kích thước label
  const LABEL_SIZE = "14px";

  const asideStyle = {
    background: "#fff",
    width: 220,
    minHeight: "100vh",
    boxShadow: "2px 0 8px rgba(53,117,211,0.07)",
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 8,
  };
  const navStyle = { padding: 12 };
  const ulStyle = { listStyle: "none", padding: "0 12px", margin: 0, display: "flex", flexDirection: "column", gap: 8 };

  const linkBase = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  };
  const activeLink = { background: "#3575d3", color: "#fff" };
  const inactiveLink = { color: "#374151", background: "transparent" };

  return (
    <aside style={asideStyle}>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          {items.map(({ icon, label, to, end }) => {
            // Kiểm tra nếu là tab "Tài khoản" và đang ở trang update-info
            const isAccountActive =
              to === "/parent/account" &&
              (location.pathname === "/parent/account" || location.pathname === "/parent/update-info");

            return (
              <li key={label}>
                <NavLink
                  to={to}
                  end={!!end}
                  style={({ isActive }) => ({
                    ...linkBase,
                    ...(isActive || isAccountActive ? activeLink : inactiveLink),
                  })}
                >
                  <i className={icon} />
                  <span style={{
                    fontSize: LABEL_SIZE,
                    display: "inline-block",
                    maxWidth: 140,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}>{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
