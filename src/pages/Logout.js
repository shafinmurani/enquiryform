import React from "react";
import { Navigate } from "react-router-dom";
export default function Logout() {
  localStorage.removeItem("jwt-token");
  return <Navigate to="/" />;
}
