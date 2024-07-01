import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { useLocation } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function EditCompany() {
  const [rows, setRows] = React.useState([]);
  const [increment, setIncrement] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const getData = async (id) => {
    return await axios
      .post("http://localhost:3001/api/company/get-specific", { id: id })
      .then((res) => {
        setRows(res.data.list);
        setValue(res.data.list[0].vCompanyName);
      });
  };
  const location = useLocation();
  if (location.state === null) {
    return (
      <>
        <DrawerComponent title="Edit Company">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h1>Edit Service Group</h1>
            <Typography paragraph>
              There was an error recieving the data. Please try again
            </Typography>
          </div>
        </DrawerComponent>
      </>
    );
  }
  const { id } = location.state;
  if (increment === 0) {
    getData(id);
    setIncrement(1);
  }

  const submit = () => {
    if (value.length === 0) {
      setResult("warning");
      setMessage("Cannot insert blank company Name");
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/api/company/edit", {
          category: value,
          id: id,
        })
        .then(async (res) => {
          if (res.data.result) {
            setResult("success");
            setMessage(res.data.message);
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
      <DrawerComponent title="Edit Company">
        <div
          style={{
            backgroundColor: "white",
            marginTop: "2rem",
            paddingBottom: "3rem",
            borderStyle: "outset",
            borderColor: "#eceff4",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Edit Company</h1>
            <br />
            <Alert
              style={{
                width: "100%",
                display: result.length === 0 ? "none" : "",
              }}
              severity={result}
            >
              {message}
            </Alert>
          </div>
          {rows.map((row) => (
            <div
              style={{
                display: "flex",
                width: "80%",
                marginInline: "auto",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                label="Company Name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
                >
                  {isLoading ? <CircularProgress /> : "Save"}
                </Button>
                <Button
                  onClick={() => {
                    setValue(row.Company);
                  }}
                  disabled={isLoading}
                  size="large"
                  variant="contained"
                  color="warning"
                >
                  Reset
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DrawerComponent>
    </>
  );
}
