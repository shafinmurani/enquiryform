import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import "../../styles/AddProductGroup.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { serviceGroup } from "../../services/services_export";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddPartyComponent() {
  //Text Editing controllers
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPasswordVIsible, setIsPasswordVisible] = React.useState(false);
  const [groupList, setGroupList] = React.useState([]);
  const [groupItem, setGroupItem] = React.useState([]);
  async function clearMessage() {
    await timeout(1500);
    setResult("");
    setResult("");
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGroupItem(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const getServiceGroupList = () => {
    serviceGroup.get().then((res) => {
      setGroupList(res);
    });
  };

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
        firstName === 0 ||
        lastName.length === 0 ||
        password.length < 8 ||
        role.length === 0 ||
        email.length === 0
      ) {
        setResult("warning");
        setMessage(
          "Cannot insert blank party information, Password should be at least 8 characters ",
        );
      } else {
        setIsLoading(true);
        axios
          .post("http://localhost:3001/api/admin/add", {
            firstName,
            lastName,
            password,
            email,
            role,
            iAddedBy: groupItem.join(","),
          })
          .then(async (res) => {
            if (res.data.result) {
              if (res.data.affectedRows === 0) {
                setResult("warning");
                setMessage("No User added, Data already exists");
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

  useEffect(() => {
    getServiceGroupList();
  }, []);
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
                        {isPasswordVIsible ? <Visibility /> : <VisibilityOff />}
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
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e, newVal) => setRole(newVal)}
                options={["Admin", "Executive"]}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Role" />}
              />
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={groupItem}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
              >
                {groupList.map((name) => (
                  <MenuItem key={name} value={name.id}>
                    <ListItemText primary={name.label} />
                  </MenuItem>
                ))}
              </Select>
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
                var data = {
                  firstName,
                  lastName,
                  password,
                  email,
                  role,
                  iAddedBy: groupItem.join(","),
                };
                // console.log(data);
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
