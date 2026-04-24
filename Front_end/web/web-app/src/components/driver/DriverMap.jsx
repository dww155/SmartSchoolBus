import React, { useState, useEffect, useRef } from 'react';
import MapBoxView from '../map/MapBoxView';
import { connectDriverLocation, sendDriverLocation, disconnect } from '../../services/WebSocketService';
import { useDriver } from "../../contexts/DriverContext";

export default function DriverMap() {
  // --- Fake coordinates (lng, lat) around HCM for demo/testing ---
  const fakeCoordsRef = useRef([
    [106.7009, 10.7769],
    [106.7050, 10.7785],
    [106.7080, 10.7802],
    [106.7120, 10.7820],
    [106.7160, 10.7840],
    [106.7200, 10.7860],
    [106.7250, 10.7875],
    [106.7300, 10.7885],
  ]);
  const fakeIndexRef = useRef(0);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const { currentDriver } = useDriver();
  const driverId = currentDriver?.id;

  const jwtToken = import.meta.env.VITE_MAP_API_KEY;

  const schedules = currentDriver?.schedules || [];

  const locationRef = useRef(null);
  locationRef.current = currentLocation;

  const routePoints =
    selectedSchedule?.route?.busStops
      ?.sort((a, b) => a.stopOrder - b.stopOrder)
      ?.map((bp) => [bp.busStop.longitude, bp.busStop.latitude]) || [];

  // --- Lấy vị trí lần đầu ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation([pos.coords.longitude, pos.coords.latitude]);
        },
        () => {
          setCurrentLocation([106.7009, 10.7769]);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setCurrentLocation([106.7009, 10.7769]);
    }
  }, []);

  // --- WebSocket khi bắt đầu làm việc ---
  useEffect(() => {
    if (!isWorking || !driverId || !jwtToken) return;

    connectDriverLocation(driverId, (data) => {
      console.log("WS Received:", data);
    }, jwtToken);

    // gửi vị trí mỗi 3 giây
    const interval = setInterval(() => {
      if (locationRef.current) {
        sendDriverLocation(driverId, locationRef.current[1], locationRef.current[0]);
      }
    }, 3000);
    //     const interval = setInterval(() => {
    //   // nếu dùng fake coords thì gửi theo mảng giả, đồng thời update currentLocation để map hiển thị
    //   if (fakeCoordsRef.current && fakeCoordsRef.current.length) {
    //     const idx = fakeIndexRef.current % fakeCoordsRef.current.length;
    //     const coord = fakeCoordsRef.current[idx]; // [lng, lat]
    //     setCurrentLocation(coord);
    //     // gửi lên server: (driverId, lat, lng) — giữ theo thứ tự cũ của sendDriverLocation
    //     sendDriverLocation(driverId, coord[1], coord[0]);
    //     fakeIndexRef.current = 1;
    //   } else if (locationRef.current) {
    //     sendDriverLocation(driverId, locationRef.current[1], locationRef.current[0]);
    //   }
    // }, 3000);

    return () => {
      clearInterval(interval);
      disconnect();
    };
  }, [isWorking, driverId, jwtToken]);

  return (
    <div className="flex gap-4">

      {/* LEFT: MAP */}
      <div className="w-2/3 h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapBoxView center={currentLocation} routePoints={routePoints} />
      </div>

      {/* RIGHT: SCHEDULE LIST */}
      <div className="w-1/3 h-[500px] bg-white rounded-xl shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">📅 Lịch trình hôm nay</h2>

        {schedules.length === 0 ? (
          <p className="text-gray-500">Không có lịch trình nào.</p>
        ) : (
          schedules.map((item, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 border rounded-lg cursor-pointer ${selectedSchedule?.id === item.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
              onClick={() => setSelectedSchedule(item)}  // <--- đã sửa
            >
              <div className="font-semibold text-blue-600">{item.route?.name || "Chuyến xe"}</div>
              <div className="text-sm text-gray-600">📌 ID: {item.id}</div>
              <div className="text-sm text-gray-600">📅 {item.day}</div>
              <div className="text-sm text-gray-600">⏰ {item.startTime}</div>
            </div>
          ))
        )}

        {/* WORKING BUTTON */}
        <div className="mt-6">
          {!isWorking ? (
            <button
              onClick={() => setIsWorking(true)}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold"
            >
              Bắt đầu làm việc
            </button>
          ) : (
            <button
              onClick={() => setIsWorking(false)}
              className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold"
            >
              Kết thúc làm việc
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
