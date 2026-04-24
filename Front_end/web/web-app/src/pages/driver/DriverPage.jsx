import React, { use } from "react";
import DriverLayout from "../../components/driver/DriverLayout.jsx";
import "./Driver.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import DriverSender from "../../components/driver/DriverSender.jsx";
import { useDriver } from "../../contexts/DriverContext.jsx";

export default function DriverPage() {
  const { currentDriver } = useDriver();
  const currentUser = currentDriver;
  return (
    <>
      <DriverLayout />
    </>
  );
}
