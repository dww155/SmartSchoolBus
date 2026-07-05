import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminPage() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* 🔹 Quan trọng: phải có Outlet để render nested routes */}
        </main>
      </div>
    </div>
  );
}



