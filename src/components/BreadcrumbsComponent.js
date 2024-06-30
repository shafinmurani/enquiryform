import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography, Link } from "@mui/material";

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
  });
}

export default function BreadcrumbsComponent() {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs separator=">" aria-label="Breadcrumb">
      <Link style={{ color: "black" }} component={RouterLink} to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography style={{ color: "black" }} color="textPrimary" key={to}>
            {toTitleCase(value)}
          </Typography>
        ) : (
          <Link
            style={{ color: "black" }}
            color="inherit"
            component={RouterLink}
            to={to}
            key={to}
          >
            {toTitleCase(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
