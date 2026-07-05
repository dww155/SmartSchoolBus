import { Client } from "@stomp/stompjs";

let client = null;
let adminClient = null;
const WS_URL = import.meta.env.VITE_API_WS_URL;

export function connectDriverLocation(driverId, onReceive, jwtToken) {
  client = new Client({
    brokerURL: WS_URL, // WebSocket server
    connectHeaders: { Authorization: `Bearer ${jwtToken}` },
    reconnectDelay: 3000, // thử reconnect sau 3 giây nếu ngắt kết nối
    debug: (str) => console.log("[STOMP]", str),
  });

  client.onConnect = () => {
    console.log("STOMP Connected");

    client.subscribe(`/topic/driver/${driverId}/location`, (msg) => {
      const data = JSON.parse(msg.body);
      onReceive && onReceive(data);
    });
  };

  client.activate();
}

export function sendDriverLocation(driverId, latitude, longitude) {
  if (!client || !client.connected) return;

  client.publish({
    destination: `/app/driver/${driverId}/location.update`,
    body: JSON.stringify({
      driverId: driverId,
      latitude: latitude,
      longitude: longitude,
    }),
  });
}

export function disconnect() {
  if (client) client.deactivate();
}

export function adminDisconnect() {
  if (adminClient) adminClient.deactivate();
}

export function connectAdminAllDrivers(onReceive) {
  adminClient = new Client({
    brokerURL: WS_URL,
    reconnectDelay: 3000,
    debug: (str) => console.log("[STOMP]", str),
  });

  adminClient.onConnect = () => {
    console.log("Admin connected to all drivers");
    adminClient.subscribe("/topic/driver/location", (msg) => {
      const data = JSON.parse(msg.body);
      onReceive && onReceive(data);
    });
  };

  adminClient.activate();
}