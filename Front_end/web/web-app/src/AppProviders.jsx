// src/AppProviders.jsx
import React from "react";
import { BusProvider } from "./contexts/BusContext";
import { DriverProvider } from "./contexts/DriverContext";
import { StudentProvider } from "./contexts/StudentContext";
import { ParentProvider } from "./contexts/ParentContext";
import { Route } from "react-router-dom";
import { RouteProvider } from "./contexts/RouteContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BusStopProvider } from "./contexts/BusStopContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ScheduleProvider>
        <BusStopProvider>
          <RouteProvider>
            <ParentProvider>
              <StudentProvider>
                <DriverProvider>
                  <BusProvider>
                    {children}
                  </BusProvider>
                </DriverProvider>
              </StudentProvider>
            </ParentProvider>
          </RouteProvider>
        </BusStopProvider>
      </ScheduleProvider>
    </AuthProvider>
  );
}
