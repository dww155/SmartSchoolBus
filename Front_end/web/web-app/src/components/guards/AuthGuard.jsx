import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthGuard() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated)
    return <Outlet />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
