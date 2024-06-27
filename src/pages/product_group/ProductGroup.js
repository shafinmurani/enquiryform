import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProductGroup() {
  return (
    <>
      <DrawerComponent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Product Group</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Link to="/product-group/add">
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <Button startIcon={<Delete />} variant="contained" color="error">
            delete
          </Button>
        </div>
      </DrawerComponent>
    </>
  );
}
