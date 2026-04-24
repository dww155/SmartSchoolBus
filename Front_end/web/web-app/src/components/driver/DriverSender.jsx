import { useEffect } from "react";
import { connectDriverLocation, sendDriverLocation, disconnect } from "../../services/WebSocketService.js";
import { getToken } from "../../services/LocalStorageService.js";

export default function DriverSender({ driverId }) {
  useEffect(() => {
    connectDriverLocation(driverId, getToken());

    const watchId = navigator.geolocation.watchPosition((pos) => {
      sendDriverLocation(driverId, pos.coords.latitude, pos.coords.longitude);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      disconnect();
    };
  }, [driverId]);

  return <p>Driver is sending location...</p>;
}

