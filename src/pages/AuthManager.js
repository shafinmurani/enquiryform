import React from "react";
import { Navigate } from "react-router-dom";
export default function AuthManager() {
  const [jwtToken, setJwtToken] = React.useState(
    localStorage.getItem("jwt-token"),
  );
  if (jwtToken == null) {
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/dashboard" />;
  }
}
