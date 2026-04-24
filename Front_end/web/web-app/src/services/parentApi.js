
export async function fetchCurrentTrip(childId) {
  // GET /api/parent/current-trip?childId=...
  // return await fetch(...).then(r => r.json());
  await sleep(300);
  return {
    busCode: "SB-12",
    driverName: "Nguyễn Văn A",
    nextStop: "Trạm Lý Thường Kiệt",
    eta: "07:35",
    childStatus: "Đã lên xe",
    updatedAt: "07:28",
    state: "moving", // moving | stopped
  };
}

export async function fetchHistory({ childId, dateFrom, dateTo, keyword, page=1, pageSize=10 }) {
  await sleep(300);
  const all = [
    { date: "2025-10-16", route: "Tuyến A", pickup: "07:30", drop: "17:05", status: "Hoàn tất" },
    { date: "2025-10-15", route: "Tuyến A", pickup: "07:31", drop: "17:00", status: "Hoàn tất" },
    { date: "2025-10-14", route: "Tuyến A", pickup: "07:28", drop: "16:58", status: "Hoàn tất" },
  ];
  // filter demo
  const filtered = all.filter(r =>
    (!keyword || r.route.toLowerCase().includes(keyword.toLowerCase()))
  );
  const start = (page-1)*pageSize;
  return { rows: filtered.slice(start, start+pageSize), total: filtered.length };
}

export async function updateAccount(payload) {
  // PUT /api/parent/profile
  await sleep(400);
  return { ok: true };
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
