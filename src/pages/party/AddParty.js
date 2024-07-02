import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddParty() {
  //Text Editing controllers
  const [partyName, setPartyName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function clearMessage() {
    await timeout(1500);
    setResult("");
    setResult("");
  }

  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const validateEmail = (e) => {
    /**
     * Validates an email address.
     *
     * @param {Event} e - The event object containing the email value.
     * @return {void} This function does not return a value.
     */
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setIsValidEmail(true);
      setEmail(e.target.value);
    } else {
      setIsValidEmail(false);
    }
  };

  const submit = () => {
    if (isValidEmail) {
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
          .post("http://localhost:3001/api/party/add", {
            partyName,
            address,
            city,
            mobileNo,
            email,
            name,
          })
          .then(async (res) => {
            if (res.data.result) {
              if (res.data.affectedRows === 0) {
                setResult("warning");
                setMessage("No party added, Data already exists");
                await clearMessage();
              } else {
                setResult("success");
                setMessage(res.data.message);
                await clearMessage();
              }
              setIsLoading(false);
              await clearMessage();
            } else {
              setResult("error");
              setMessage(res.data.message);
              setIsLoading(false);
              await clearMessage();
            }
          });
      }
    } else {
      setResult("error");
      setMessage("Invalid Email");
      setIsLoading(false);
      clearMessage();
    }
  };
  return (
    <>
      <DrawerComponent title="Add Party">
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
            <h1>Add Party</h1>

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
                    onChange={(e) => setMobileNo(e.target.value)}
                    style={{ width: "100%" }}
                    label="Mobile Number"
                    inputProps={{
                      maxlength: 10,
                    }}
                    helperText={`${mobileNo.length}/${10}`}
                    value={mobileNo}
                  />
                  <TextField
                    onChange={(e) => {
                      validateEmail(e);
                      setEmail(e.target.value);
                    }}
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
