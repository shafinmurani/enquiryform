import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddGroupComponent() {
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
    <div>
      <div
        className="add-product-container"
        style={{
          width: "100%",
          marginInline: "auto",
          backgroundColor: "#FFFFFF",
          paddingBlockEnd: "2rem",
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
            label="Service Group Name"
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
    </div>
  );
}
