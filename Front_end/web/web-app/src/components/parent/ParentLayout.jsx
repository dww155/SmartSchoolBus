/*import React from "react";
import ParentSidebar from "./ParentSidebar";
import ParentHeader from "./ParentHeader";

export default function ParentLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <ParentHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <div className="parent-sidebar">
          <ParentSidebar />
        </div>
        <main className="parent-main">{children}</main>
      </div>
    </div>
  );
}*/

// components/parent/ParentLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ParentSidebar from "./ParentSidebar";
import ParentHeader from "./ParentHeader";

export default function ParentLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <ParentHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <div className="parent-sidebar">
          <ParentSidebar />
        </div>
        <main className="parent-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

