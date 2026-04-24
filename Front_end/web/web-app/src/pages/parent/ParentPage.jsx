// src/parent/ParentPage.jsx
import React from "react";
import ParentLayout from "../../components/parent/ParentLayout.jsx";
import "./Parent.css"; // giữ nếu file này nằm cùng thư mục src/parent

export default function ParentPage() {
  // ParentLayout đã có <Outlet />, chỉ cần render layout
  return <ParentLayout />;
}
