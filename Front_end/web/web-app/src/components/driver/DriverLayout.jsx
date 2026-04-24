// components/driver/DriverLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DriverSidebar from "./DriverSidebar";
import DriverHeader from "./DriverHeader"; // file header riêng cho driver

export default function DriverLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <DriverHeader />
      <div style={{ display: "flex", flex: 1, paddingTop: "87px" }}>
        <div className="driver-sidebar">
          <DriverSidebar />
        </div>
        <main className="driver-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
