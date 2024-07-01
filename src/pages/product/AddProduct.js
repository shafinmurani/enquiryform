import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
import Autocomplete from "@mui/material/Autocomplete";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddProduct() {
  const [service, setService] = React.useState("");
  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [serviceGroup, setServiceGroup] = React.useState("");
  const [serviceGroupList, setServiceGroupList] = React.useState([]);
  const submit = () => {
    if (serviceGroup.length === 0 || service.length === 0) {
      setResult("warning");
      setMessage("Cannot insert blank service group and service name");
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/api/service/add", {
          serviceGroup: serviceGroup,
          service: service,
        })
        .then(async (res) => {
          if (res.data.result) {
            if (res.data.affectedRows === 0) {
              setResult("warning");
              setMessage("No product group added, Data already exists");
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
  const getGroupList = async () => {
    await axios
      .post("http://localhost:3001/api/service-group/get", {})
      .then((res) => {
        var array = [];
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vCategory,
              id: res.data.list[i].iCategoryID,
            });
          }
        }
        setServiceGroupList(array);
      });
  };
  useEffect(() => {
    getGroupList();
  }, []);
  return (
    <>
      <DrawerComponent title="Add Service">
        <div>
          <div
            className="add-product-container"
            style={{
              marginTop: "1rem",
              width: "80%",
              marginInline: "auto",
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              paddingInline: "2rem",
            }}
          >
            <h1>Add Service</h1>

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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                <Autocomplete
                  disablePortal
                  options={serviceGroupList}
                  label="vCategory"
                  style={{ flex: "1" }}
                  onChange={(event, newInputValue) => {
                    setServiceGroup(newInputValue.id);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Service Group" />
                  )}
                />
                <TextField
                  style={{ flex: "2" }}
                  onChange={(e) => setService(e.target.value)}
                  label="Service Name"
                  value={service}
                />
              </div>
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
                    setService("");
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
      </DrawerComponent>
    </>
  );
}
