import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
import AddCompanyComponent from "./AddCompanyComponent";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddCompany() {
  return (
    <>
      <DrawerComponent title="Add Company">
        <AddCompanyComponent />
      </DrawerComponent>
    </>
  );
}
