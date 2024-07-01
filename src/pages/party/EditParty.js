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

export default function EditParty() {
  const [partyName, setPartyName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const [rows, setRows] = React.useState([]);
  const [increment, setIncrement] = React.useState(0);

  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const getData = async (id) => {
    return await axios
      .post("http://localhost:3001/api/party/get-specific", { id: id })
      .then((res) => {
        setRows(res.data.list);
        setPartyName(res.data.list[0].vParty);
        setAddress(res.data.list[0].tAddress);
        setCity(res.data.list[0].vCity);
        setName(res.data.list[0].vCName);
        setMobileNo(res.data.list[0].vCMobileno);
        setEmail(res.data.list[0].vCEmail);
      });
  };
  const location = useLocation();
  if (location.state === null) {
    return (
      <>
        <DrawerComponent title="Edit Party">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h1>Edit Party</h1>
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
    if (
      partyName === 0 ||
      address.length === 0 ||
      city.length === 0 ||
      mobileNo.length === 0 ||
      email.length === 0 ||
      name.length === 0
    ) {
      setResult("warning");
      setMessage("Cannot insert blank party information ");
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/api/party/edit", {
          id: id,
          partyName,
          address,
          city,
          mobileNo,
          email,
          name,
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
      <DrawerComponent title="Edit Party">
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
            <h1>Edit Party</h1>

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
                  gap: "1rem",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextField
                    onChange={(e) => setPartyName(e.target.value)}
                    style={{ width: "100%" }}
                    label="Party Name"
                    value={partyName}
                  />
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%" }}
                    label="Contact Person Name"
                    value={name}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextField
                    type="number"
                    onChange={(e) => setMobileNo(e.target.value)}
                    style={{ width: "100%" }}
                    label="Mobile Number"
                    value={mobileNo}
                  />
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%" }}
                    label="Email address"
                    value={email}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextField
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%" }}
                    label="City"
                    value={city}
                  />
                  <TextField
                    multiline
                    rows={3}
                    maxRows={4}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "100%" }}
                    label="Address"
                    value={address}
                  />
                </div>
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
                    setCity("");
                    setName("");
                    setEmail("");
                    setAddress("");
                    setMobileNo("");
                    setPartyName("");
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
