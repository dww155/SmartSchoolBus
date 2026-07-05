import React, { useEffect, useMemo, useRef, useState } from "react";

const messageTemplates = [
  "Xe sắp đến điểm đón của bé.",
  "Xe trễ dự kiến 5–7 phút.",
  "Có sự cố từ tài xế, vui lòng chờ thông báo.",
];

const initialThreads = [
  {
    id: "route-21",
    title: "Route 21 - Xe 45",
    routeCode: "R21",
    vehicle: "51F-123.45",
    driver: "Nguyễn Văn A",
    group: "drivers",
    status: "warning",
    lastMessage: "Xe trễ dự kiến 5 phút",
    lastTime: "07:32",
    unread: 3,
    lastLocation: "Điểm đón Lê Văn Việt",
    passengers: 28,
  },
  {
    id: "route-05",
    title: "Route 05 - Phụ huynh",
    routeCode: "R05",
    vehicle: "50B-778.99",
    driver: "Trần Công D",
    group: "parents",
    status: "normal",
    lastMessage: "Xe sắp đến điểm trường",
    lastTime: "07:18",
    unread: 0,
    lastLocation: "Cổng sau SGU",
    passengers: 34,
  },
  {
    id: "system-alerts",
    title: "Tin nhắn hệ thống",
    routeCode: "ALL",
    vehicle: "-",
    driver: "System",
    group: "system",
    status: "critical",
    lastMessage: "Phát hiện dừng xe vượt quá 10 phút",
    lastTime: "07:10",
    unread: 1,
    lastLocation: "Kho tổng",
    passengers: 0,
  },
];

const initialMessages = {
  "route-21": [
    { sender: "driver", text: "Xe vừa bị kẹt khi rẽ Cầu Sài Gòn", time: "07:25" },
    { sender: "me", text: "Đã ghi nhận. Vui lòng cập nhật mỗi 3 phút.", time: "07:26" },
    { sender: "driver", text: "Dự kiến trễ 5 phút.", time: "07:27" },
  ],
  "route-05": [
    { sender: "parent", text: "Xe đã rời điểm đón chưa ạ?", time: "07:14" },
    { sender: "me", text: "Xe đang đến điểm số 2, khoảng 3 phút nữa.", time: "07:16" },
  ],
  "system-alerts": [
    { sender: "system", text: "Route 14 đứng yên vượt giới hạn 10 phút.", time: "07:09" },
    { sender: "me", text: "Đã chuyển tiếp cho đội điều hành.", time: "07:10" },
  ],
};

const activityFeed = [
  { id: 1, time: "07:35", title: "Geofence Alert", detail: "Route 21 lệch khỏi tuyến 300m." },
  { id: 2, time: "07:28", title: "Speed Alert", detail: "Route 12 vượt 45km/h trên đường Trần Não." },
  { id: 3, time: "07:15", title: "Maintenance", detail: "Xe 50B-778.99 cần kiểm tra định kỳ." },
];

const statusStyle = {
  normal: "text-emerald-600 bg-emerald-50",
  warning: "text-amber-600 bg-amber-50",
  critical: "text-rose-600 bg-rose-50",
};

const groupLabels = {
  system: "Tin nhắn hệ thống",
  drivers: "Tài xế",
  parents: "Phụ huynh",
};

export default function MessagesPage() {
  const [threads, setThreads] = useState(initialThreads);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedThreadId, setSelectedThreadId] = useState(initialThreads[0]?.id || null);
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const routeOptions = useMemo(
    () => Array.from(new Set(threads.map((t) => t.routeCode).filter((code) => code !== "ALL"))),
    [threads]
  );

  useEffect(() => {
    if (!selectedThreadId && threads.length) {
      setSelectedThreadId(threads[0].id);
    }
  }, [selectedThreadId, threads]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedThreadId]);

  const selectedThread = threads.find((t) => t.id === selectedThreadId) || null;

  const filteredThreads = threads.filter((thread) => {
    const matchesAudience = audienceFilter === "all" || thread.group === audienceFilter;
    const matchesRoute = routeFilter === "all" || thread.routeCode === routeFilter;
    const keyword = `${thread.title} ${thread.driver} ${thread.vehicle}`.toLowerCase();
    const matchesSearch = keyword.includes(searchTerm.toLowerCase());
    return matchesAudience && matchesRoute && matchesSearch;
  });

  const groupedThreads = groupThreads(filteredThreads);

  function groupThreads(list) {
    return list.reduce(
      (acc, thread) => {
        acc[thread.group] = [...(acc[thread.group] || []), thread];
        return acc;
      },
      { system: [], drivers: [], parents: [] }
    );
  }

  const handleThreadSelect = (thread) => {
    setSelectedThreadId(thread.id);
    setThreads((prev) =>
      prev.map((item) => (item.id === thread.id ? { ...item, unread: 0 } : item))
    );
  };

  const simulateReply = (threadId) => {
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [threadId]: [
          ...(prev[threadId] || []),
          {
            sender: "them",
            text: "Đã nhận, tôi sẽ cập nhật thêm.",
            time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }));
    }, 1500);
  };

  const handleSend = () => {
    if (!selectedThread || !input.trim()) return;

    const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => ({
      ...prev,
      [selectedThread.id]: [...(prev[selectedThread.id] || []), { sender: "me", text: input, time }],
    }));
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === selectedThread.id ? { ...thread, lastMessage: input, lastTime: time } : thread
      )
    );
    setInput("");
    simulateReply(selectedThread.id);
  };

  const handleInsertTemplate = (text) => {
    setInput((prev) => (prev ? `${prev} ${text}` : text));
  };

  const selectedMessages = selectedThread ? messages[selectedThread.id] || [] : [];

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-slate-900">Messaging Center</h1>
            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live &lt; 3s
            </span>
          </div>
          <p className="text-sm text-slate-500">Phát sóng thông báo cho tài xế và phụ huynh theo tuyến.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-xs text-slate-500">
              <label htmlFor="route-filter">Tuyến</label>
              <select
                id="route-filter"
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 bg-white"
              >
                <option value="all">Tất cả</option>
                {routeOptions.map((route) => (
                  <option key={route} value={route}>
                    {route}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col text-xs text-slate-500">
              <label htmlFor="audience-filter">Nhóm</label>
              <select
                id="audience-filter"
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 bg-white"
              >
                <option value="all">Tất cả</option>
                <option value="drivers">Tài xế</option>
                <option value="parents">Phụ huynh</option>
                <option value="system">Hệ thống</option>
              </select>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm">
            Compose Alert
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Thread list */}
        <aside className="w-1/4 min-w-[260px] bg-white border-r flex flex-col">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
              <span className="text-slate-400">🔍</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tuyến, tài xế..."
                className="text-sm bg-transparent outline-none flex-1"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {Object.keys(groupLabels).map((groupKey) => {
              const threadsInGroup = groupedThreads[groupKey] || [];
              if (!threadsInGroup.length) return null;
              return (
                <div key={groupKey}>
                  <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-slate-400">
                    {groupLabels[groupKey]}
                  </div>
                  <ul className="space-y-2 px-3 pb-4">
                    {threadsInGroup.map((thread) => (
                      <li
                        key={thread.id}
                        onClick={() => handleThreadSelect(thread)}
                        className={`rounded-xl border px-3 py-3 cursor-pointer transition-colors ${
                          selectedThreadId === thread.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-100 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-slate-900">{thread.title}</p>
                          {thread.unread > 0 && (
                            <span className="text-xs bg-rose-500 text-white rounded-full px-2 py-0.5">
                              {thread.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                          <span>{thread.routeCode}</span>
                          <span>{thread.lastTime}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-1">{thread.lastMessage}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Conversation */}
        <section className="flex-1 flex flex-col bg-slate-50">
          {selectedThread ? (
            <>
              <div className="px-6 py-4 bg-white border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-slate-900">{selectedThread.title}</h2>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          statusStyle[selectedThread.status] || statusStyle.normal
                        }`}
                      >
                        {selectedThread.status === "critical"
                          ? "Khẩn cấp"
                          : selectedThread.status === "warning"
                          ? "Cảnh báo"
                          : "Ổn định"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      {selectedThread.driver !== "System" ? `Tài xế: ${selectedThread.driver}` : "Automated alerts"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 text-xs font-medium border rounded-lg text-slate-600 hover:bg-slate-100">
                      Xem bản đồ
                    </button>
                    <button className="px-3 py-2 text-xs font-medium border rounded-lg text-slate-600 hover:bg-slate-100">
                      Gọi tài xế
                    </button>
                    <button className="px-3 py-2 text-xs font-medium border rounded-lg text-rose-600 border-rose-200 hover:bg-rose-50">
                      Escalate
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4 text-xs text-slate-500">
                  <div>
                    <p className="uppercase tracking-wide">Vehicle</p>
                    <p className="text-sm text-slate-900">{selectedThread.vehicle}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide">Route</p>
                    <p className="text-sm text-slate-900">{selectedThread.routeCode}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide">Last location</p>
                    <p className="text-sm text-slate-900">{selectedThread.lastLocation}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide">Passengers</p>
                    <p className="text-sm text-slate-900">{selectedThread.passengers}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                {selectedMessages.map((msg, index) => (
                  <div
                    key={`${msg.time}-${index}`}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-lg text-sm shadow-sm ${
                        msg.sender === "me"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : msg.sender === "system"
                          ? "bg-slate-800 text-white rounded-bl-none"
                          : "bg-white text-slate-800 rounded-bl-none"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-medium capitalize">
                          {msg.sender === "me"
                            ? "Admin"
                            : msg.sender === "system"
                            ? "Hệ thống"
                            : msg.sender === "driver"
                            ? "Tài xế"
                            : "Phụ huynh"}
                        </p>
                        <span className="text-xs opacity-70">{msg.time}</span>
                      </div>
                      <p className="mt-2 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t bg-white px-6 py-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {messageTemplates.map((template) => (
                    <button
                      key={template}
                      onClick={() => handleInsertTemplate(template)}
                      className="text-xs border border-dashed px-3 py-1.5 rounded-full text-slate-500 hover:border-blue-400 hover:text-blue-600"
                    >
                      {template}
                    </button>
                  ))}
                </div>
                <div className="flex items-end gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Nhập thông điệp, hỗ trợ xuống dòng Shift + Enter..."
                    className="flex-1 border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[60px]"
                  />
                  <div className="flex flex-col gap-2">
                    <button className="h-10 w-10 rounded-full border border-dashed text-slate-500 hover:text-blue-600">
                      📎
                    </button>
                    <button
                      onClick={handleSend}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-sm"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Chọn một cuộc hội thoại để bắt đầu
            </div>
          )}
        </section>

        {/* Utilities */}
        <aside className="w-[28%] min-w-[280px] border-l bg-white flex flex-col">
          <div className="px-5 py-4 border-b">
            <p className="text-sm font-semibold text-slate-900">Thư viện template</p>
            <p className="text-xs text-slate-500">Chỉnh sửa trước khi gửi nếu cần.</p>
            <div className="mt-3 space-y-2">
              {messageTemplates.map((template) => (
                <button
                  key={`template-${template}`}
                  onClick={() => handleInsertTemplate(template)}
                  className="w-full text-left text-sm border rounded-xl px-3 py-2 hover:border-blue-400"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-4 border-b">
            <p className="text-sm font-semibold text-slate-900">Đính kèm / ảnh sự cố</p>
            <div className="mt-3 border-2 border-dashed rounded-2xl p-4 text-center text-xs text-slate-500">
              Kéo & thả tệp vào đây hoặc nhấn để tải lên.
            </div>
          </div>

          <div className="px-5 py-4 flex-1 overflow-y-auto">
            <p className="text-sm font-semibold text-slate-900">Real-time activity</p>
            <ol className="mt-4 space-y-4 text-sm text-slate-600">
              {activityFeed.map((item) => (
                <li key={item.id} className="border rounded-xl px-3 py-3 bg-slate-50">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{item.title}</span>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
