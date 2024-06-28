import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  
} from "@mui/material";
import axios from "axios";
import BreadcrumbsComponent from "../../components/BreadcrumbsComponent";

export default function AddProductGroup() {
  const [productGroupName, setProductGroupName] = React.useState("");
  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const submit = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/api/product-group/add", {
        category: productGroupName,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.result) {
          setResult("success");
          setMessage(res.data.message);
          setIsLoading(false);
        } else {
          setResult("error");
          setMessage(res.data.message);
          setIsLoading(false);
        }
      });
  };
  return (
    <>
      <DrawerComponent title="Add Product Group">
    <BreadcrumbsComponent />
       
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Add Product Group</h1>
        </div>
        <div
          style={{
            width: "80%",
            marginInline: "auto",
            backgroundColor: "#EEE8A9",
            padding: "3rem",
            paddingInline: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              marginTop: "1rem",
              gap: "1rem",
              alignItems: "flex-end",
            }}
          >
            <Alert
              style={{
                width: "100%",
                display: result.length === 0 ? "none" : "",
              }}
              severity={result}
            >
              {message}
            </Alert>
            <TextField
              onChange={(e) => setProductGroupName(e.target.value)}
              style={{ width: "100%" }}
              label="Product Group Name"
              value={productGroupName}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={submit}
                disabled={isLoading}
                size="large"
                variant="contained"
                // style={{ flex: "2" }}
              >
                {isLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                onClick={() => {
                  setProductGroupName("");
                }}
                disabled={isLoading}
                size="large"
                variant="contained"
                color="warning"
                // style={{ flex: "2" }}
              >
                {isLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Reset"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DrawerComponent>
    </>
  );
}
