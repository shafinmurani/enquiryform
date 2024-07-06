import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
import AddGroupComponent from "./AddGroupComponent";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddProductGroup() {
  const [productGroupName, setProductGroupName] = React.useState("");
  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const submit = () => {
    if (productGroupName.length === 0) {
      setResult("warning");
      setMessage("Cannot insert blank service group");
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/api/service-group/add", {
          category: productGroupName,
        })
        .then(async (res) => {
          if (res.data.result) {
            if (res.data.affectedRows === 0) {
              setResult("warning");
              setMessage("No service group added, Data already exists");
            } else {
              setResult("success");
              setMessage(res.data.message);
            }
            setIsLoading(false);
            await timeout(1500);
            setResult("");
            setResult("");
          } else {
            setResult("error");
            setMessage(res.data.message);
            setIsLoading(false);
          }
        });
    }
  };
  return (
    <>
      <DrawerComponent title="Add Service Group">
        <AddGroupComponent />
      </DrawerComponent>
    </>
  );
}
