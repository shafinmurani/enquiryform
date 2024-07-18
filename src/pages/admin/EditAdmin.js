import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function EditAdmin() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [isPasswordVIsible, setIsPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [increment, setIncrement] = React.useState(0);

  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(true);

  async function clearMessage() {
    await timeout(1500);
    setResult("");
    setResult("");
  }
  const validateEmail = (e) => {
    /**
     * Validates an email address.
     *
     * @param {Event} e - The event object containing the email value.
     * @return {void} This function does not return a value.
     */
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (e && e.match(isValidEmail)) {
      setIsValidEmail(true);
      setEmail(e);
    } else {
      setIsValidEmail(false);
    }
  };

  const getData = async (id) => {
    return await axios
      .post("http://localhost:3001/api/admin/get-specific", { id: id })
      .then((res) => {
        setRows(res.data.list);
        setFirstName(res.data.list[0].vFirstName);
        setLastName(res.data.list[0].vLastName);
        setRole(res.data.list[0].eRole);
        setStatus(res.data.list[0].eStatus);
        setEmail(res.data.list[0].vEmail);
        setPassword(res.data.list[0].vPassword);
      });
    validateEmail(email);
  };
  const location = useLocation();
  if (location.state === null) {
    return (
      <>
        <DrawerComponent title="Edit User">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h1>Edit User</h1>
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
    if (isValidEmail) {
      if (
        firstName === 0 ||
        lastName.length === 0 ||
        role.length === 0 ||
        email.length === 0 ||
        status.length === 0
      ) {
        setResult("warning");
        setMessage("Cannot insert blank party information");
      } else if (password.length < 8) {
        setMessage("Password should be atleast 8 chatacters");
      } else {
        setIsLoading(true);
        axios
          .post("http://localhost:3001/api/admin/edit", {
            firstName,
            lastName,
            role,
            email,
            password,
            id,
            status,
          })
          .then(async (res) => {
            if (res.data.result) {
              setResult("success");
              setMessage(res.data.message);
              setIsLoading(false);
              await timeout(1500);
              setResult("");
              setResult("");
              navigate("/admin");
            } else {
              setResult("error");
              setMessage(res.data.message);
              setIsLoading(false);
            }
          });
      }
    } else {
      setResult("error");
      setMessage("Invalid Email");
      clearMessage();
    }
  };

  return (
    <>
      <DrawerComponent title="Edit User">
        <div>
          <div
            className="add-product-container"
            style={{
              marginTop: "1rem",
              width: "80%",
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
                    flexDirection: "row",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%" }}
                    label="First Name"
                    value={firstName}
                  />
                  <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ width: "100%" }}
                    label="Last Name"
                    value={lastName}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  <TextField
                    onChange={(e) => {
                      validateEmail(e);
                      setEmail(e.target.value);
                    }}
                    style={{ width: "100%" }}
                    label="Email address"
                    value={email}
                  />
                  <TextField
                    type={isPasswordVIsible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%" }}
                    label="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            variant="text"
                            color="inherit"
                            onClick={() => {
                              setIsPasswordVisible(!isPasswordVIsible);
                            }}
                          >
                            {isPasswordVIsible ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={password}
                  />
                </div>
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
                    id="combo-box-demo"
                    value={role}
                    onChange={(e, newVal) => setRole(newVal)}
                    options={["Admin", "Executive"]}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Role" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={status}
                    onChange={(e, newVal) => setStatus(newVal)}
                    options={["Active", "Inactive"]}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
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
                  onClick={() => {
                    var data = { firstName, lastName, password, email, role };
                    console.log(data);
                    submit();
                  }}
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
                    setFirstName("");
                    setLastName("");
                    setRole("");
                    setEmail("");
                    setPassword("");
                    setStatus("");
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
