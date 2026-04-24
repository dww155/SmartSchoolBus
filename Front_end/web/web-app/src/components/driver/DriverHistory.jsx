import React, { useState } from "react";

const mockHistory = [
  { id: 1, date: "2025-11-08", route: "Tuyến A - Quận 1", status: "Hoàn thành", students: 25, time: "07:30 - 09:00" },
  { id: 2, date: "2025-11-07", route: "Tuyến B - Quận 3", status: "Hoàn thành", students: 30, time: "07:30 - 09:15" },
  { id: 3, date: "2025-11-06", route: "Tuyến A - Quận 1", status: "Trễ", students: 28, time: "07:45 - 09:30" },
  { id: 4, date: "2025-11-05", route: "Tuyến C - Quận 7", status: "Hoàn thành", students: 22, time: "07:30 - 08:45" },
];

export default function DriverHistory() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" 
    ? mockHistory 
    : mockHistory.filter(h => h.status === filter);

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
    maxWidth: 900,
    width: "100%",
    margin: 0,
  };

  return (
    <div style={wrapper}>
      <section style={sectionStyle}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Lịch sử chuyến đi</h1>
            <p style={{ margin: "4px 0 0", color: "#64748b" }}>Xem lại các chuyến đã hoàn thành.</p>
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #cbd5e1" }}
          >
            <option value="all">Tất cả</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Trễ">Trễ</option>
          </select>
        </header>

        <div style={{ display: "grid", gap: 12 }}>
          {filtered.length > 0 ? (
            filtered.map((h) => (
              <div 
                key={h.id} 
                style={{ 
                  background: "#fff", 
                  padding: 16, 
                  borderRadius: 12, 
                  border: "1px solid #e2e8f0",
                  display: "grid",
                  gap: 8
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{h.route}</div>
                    <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>
                      {h.date} • {h.time}
                    </div>
                  </div>
                  <div 
                    style={{ 
                      padding: "4px 12px", 
                      borderRadius: 20, 
                      fontSize: 13,
                      fontWeight: 600,
                      background: h.status === "Hoàn thành" ? "#dcfce7" : "#fee2e2",
                      color: h.status === "Hoàn thành" ? "#16a34a" : "#dc2626"
                    }}
                  >
                    {h.status}
                  </div>
                </div>
                <div style={{ color: "#475569", fontSize: 14 }}>
                  Số học sinh: <strong>{h.students}</strong>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
              Không có lịch sử chuyến đi
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
