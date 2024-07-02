import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const [jwtToken, setJwtToken] = React.useState(
    localStorage.getItem("jwt-token"),
  );
  if (jwtToken == null) {
    return <Navigate to="/login" />;
  } else {
    return (
      <DrawerComponent title="Dashboard" isHome="true">
        <Typography>Dashboard</Typography>
      </DrawerComponent>
    );
  }
}
