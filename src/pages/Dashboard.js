import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/logout">Logout</Link>
    </>
  );
}
