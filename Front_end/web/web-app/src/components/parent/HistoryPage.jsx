import React, { useEffect, useState } from "react";
import { fetchHistory } from "../../services/parentApi";

export default function ParentHistory() {
  const [childId, setChildId] = useState("child-1");
  const [keyword, setKeyword] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  async function load(p = 1) {
    const { rows, total } = await fetchHistory({ childId, keyword, dateFrom, dateTo, page: p, pageSize: 10 });
    setRows(rows);
    setTotal(total);
    setPage(p);
  }

  useEffect(() => { load(1); }, [childId]);

  return(
    <section style={{ display: "grid", gap: 16 }}>
      <header>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Lịch sử chuyến đi</h1>
        <p style={{ margin: "4px 0 0", color: "#64748b" }}>
          Xem lại các chuyến gần đây, thời gian đón/trả và trạng thái.
        </p>
      </header>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select value={childId} onChange={(e)=>setChildId(e.target.value)} style={input}>
          <option value="child-1">Trần Minh K</option>
          <option value="child-2">Nguyễn Gia H</option>
        </select>
        <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Từ khoá tuyến…" style={input} />
        <input type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} style={input} />
        <input type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)} style={input} />
        <button onClick={()=>load(1)} style={btn}>Lọc</button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", fontSize: 14, borderCollapse: "separate", borderSpacing: 0 }}>
          <thead style={{ background: "#f8fafc", color: "#334155" }}>
            <tr>
              <th style={th}>Ngày</th>
              <th style={th}>Tuyến</th>
              <th style={th}>Đón</th>
              <th style={th}>Trả</th>
              <th style={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={td}>{r.date}</td>
                <td style={td}>{r.route}</td>
                <td style={td}>{r.pickup}</td>
                <td style={td}>{r.drop}</td>
                <td style={td}>
                  <span style={badgeSuccess}>{r.status}</span>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={5} style={{ padding: 16, textAlign: "center", color: "#64748b" }}>Không có dữ liệu.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (demo) */}
      <div style={{ display: "flex", gap: 8 }}>
        <button disabled={page<=1} onClick={()=>load(page-1)} style={btnOutline}>Trang trước</button>
        <button disabled={(page*10)>=total} onClick={()=>load(page+1)} style={btnOutline}>Trang sau</button>
        <div style={{ lineHeight: "36px", color: "#334155" }}>Tổng: {total}</div>
      </div>
    </section>
  );
}

const th = { textAlign: "left", padding: "10px 12px", fontWeight: 700, borderBottom: "1px solid #e2e8f0" };
const td = { padding: "10px 12px", color: "#334155" };
const badgeSuccess = { display: "inline-block", padding: "4px 8px", borderRadius: 8, background: "#ecfdf5", color: "#065f46", fontWeight: 600, fontSize: 12 };
const input = { padding: "8px 10px", borderRadius: 8, border: "1px solid #cbd5e1" };
const btn = { padding: "8px 12px", borderRadius: 8, border: "1px solid #2563eb", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" };
const btnOutline = { padding: "8px 12px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#fff", color: "#334155", cursor: "pointer" };
