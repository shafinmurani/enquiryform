import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
export default function ListTile({ open, title, icon, page }) {
  return (
    <>
      <Link to={page} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem onClick={onclick} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }}>
              {title}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
}
