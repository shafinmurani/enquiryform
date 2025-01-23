import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
import AddDealerComponent from "./AddDealerComponent";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddDealer() {
  return (
    <>
      <DrawerComponent title="Add Dealer">
        <AddDealerComponent />
      </DrawerComponent>
    </>
  );
}
