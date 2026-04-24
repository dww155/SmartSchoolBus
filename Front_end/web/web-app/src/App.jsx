// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// 🔹 Chỉ cần import AppProviders thôi, bỏ các import riêng lẻ
import AppProviders from "./AppProviders.jsx";

// ===== Public pages =====
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/login/LoginPage.jsx";

// ===== Admin =====
import AdminPage from "./pages/AdminPage.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import BusesPage from "./components/admin/BusesPage.jsx";
import DriversPage from "./components/admin/DriversPage.jsx";
import StudentsPage from "./components/admin/StudentsPage.jsx";
import RoutesPage from "./components/admin/RoutesPage.jsx";
import SchedulePage from "./components/admin/SchedulePage.jsx";
import TrackingPage from "./components/admin/TrackingPage.jsx";
import AddBusPage from "./components/admin/AddBusPage.jsx";
import AddBusStopPage from "./components/admin/AddBusStopPage.jsx";
import AddDriverPage from "./components/admin/AddDriverPage.jsx";
import AddStudentPage from "./components/admin/AddStudentPage.jsx";
import AddParentPage from "./components/admin/AddParentPage.jsx";
import AddRoutePage from "./components/admin/AddRoutePage.jsx";
import AddSchedulePage from "./components/admin/AddSchedulePage.jsx";
import MessagesPage from "./components/admin/MessagesPage.jsx";

// ===== Parent layout + pages =====
import ParentPage from "./pages/parent/ParentPage.jsx";
import ParentTracking from "./components/parent/TrackingPage.jsx";
import ParentHistory from "./components/parent/HistoryPage.jsx";
import ParentAccount from "./components/parent/AccountPage.jsx";
import UpdateInfoParent from "./components/parent/UpdateInfoParent.jsx";

// ===== Driver pages/components =====
import DriverPage from "./pages/driver/DriverPage.jsx";
import DriverAccount from "./components/driver/DriverAccount.jsx";
import DriverHistory from "./components/driver/DriverHistory.jsx";
import DriverSchedule from "./components/driver/DriverSchedule.jsx";

// ===== Guards =====
import AuthGuard from "./components/guards/AuthGuard.jsx";
import ParentsPage from "./components/admin/ParentPage.jsx";
import BusStopPage from "./components/admin/BusStopPage.jsx";
import ParentRegisterSchedule from "./components/parent/ParentRegisterSchedule.jsx";
import DriverMap from "./components/driver/DriverMap.jsx";

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* ===== Public ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<Login role="admin" />} />
          <Route path="/driver/login" element={<Login role="driver" />} />
          <Route path="/login" element={<Login role="parent" />} />

          {/* ===== Admin ===== */}
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bus" element={<BusesPage />} />
            <Route path="bus/add" element={<AddBusPage />} />

            <Route path="driver" element={<DriversPage />} />
            <Route path="driver/add" element={<AddDriverPage />} />

            <Route path="student" element={<StudentsPage />} />
            <Route path="student/add" element={<AddStudentPage />} />

            <Route path="route" element={<RoutesPage />} />
            <Route path="route/add" element={<AddRoutePage />} />

            <Route path="schedule" element={<SchedulePage />} />
            <Route path="schedule/add" element={<AddSchedulePage />} />

            <Route path="tracking" element={<TrackingPage />} />

            <Route path="parent" element={<ParentsPage />} />
            <Route path="parent/add" element={<AddParentPage />} />

            <Route path="bus-stop" element={<BusStopPage />} />
            <Route path="bus-stop/add" element={<AddBusStopPage />} />

            <Route path="messages" element={<MessagesPage />} />

            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* ===== Parent ===== */}
          <Route path="/parent" element={<ParentPage />}>
            <Route index element={<Navigate to="tracking" replace />} />
            <Route path="tracking" element={<ParentTracking />} />
            <Route path="history" element={<ParentHistory />} />
            <Route path="account" element={<ParentAccount />} />
            <Route path="update-info" element={<UpdateInfoParent />} />
            <Route path="schedule" element={<ParentRegisterSchedule />} />
            <Route path="*" element={<Navigate to="/parent" replace />} />
          </Route>

          {/* ===== Driver ===== */}
          <Route path="/driver" element={<DriverPage />}>
            <Route index element={<Navigate to="account" replace />} />
            <Route path="account" element={<DriverAccount />} />
            <Route path="schedule" element={<DriverSchedule />} />
            <Route path="reports" element={<DriverAccount />} />
            <Route path="history" element={<DriverHistory />} />
            <Route path="map" element={<DriverMap />} />
            <Route path="*" element={<Navigate to="/driver" replace />} />
          </Route>

          {/* ===== 404 ===== */}
          <Route
            path="*"
            element={<div className="p-6 text-sm">404 – Page Not Found</div>}
          />
        </Routes>
      </Router>
    </AppProviders>
  );
}
