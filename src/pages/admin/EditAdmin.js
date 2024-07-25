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
  OutlinedInput,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { serviceGroup } from "../../services/services_export";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

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

export default function EditAdmin() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [increment, setIncrement] = React.useState(0);
  const [result, setResult] = React.useState("0");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [groupList, setGroupList] = React.useState([]);
  const [groupItem, setGroupItem] = React.useState([]);

  const handleChange = (event) => {
    console.log(groupItem);
    const {
      target: { value },
    } = event;

    const newSelection = typeof value === "string" ? value.split(",") : value;
    const lastSelectedItem = newSelection[newSelection.length - 1];

    setGroupItem((prevGroupItem) =>
      prevGroupItem.indexOf(String(lastSelectedItem)) != -1
        ? prevGroupItem.filter(
            (item) => String(item) !== String(lastSelectedItem),
          )
        : [...prevGroupItem, String(lastSelectedItem)],
    );
  };

  const getServiceGroupList = () => {
    serviceGroup.get().then((res) => {
      setGroupList(res);
    });
  };

  async function clearMessage() {
    await timeout(1500);
    setResult("");
    setMessage("");
  }

  const validateEmail = (e) => {
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
        setGroupItem(res.data.list[0].iAddedBy.split(","));
      });
    validateEmail(email);
  };

  const location = useLocation();
  if (location.state === null) {
    return (
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
            There was an error receiving the data. Please try again
          </Typography>
        </div>
      </DrawerComponent>
    );
  }

  const { id } = location.state;
  if (increment === 0) {
    getData(id);
    getServiceGroupList();
    setIncrement(1);
  }

  const submit = () => {
    if (isValidEmail) {
      if (
        firstName.length === 0 ||
        lastName.length === 0 ||
        role.length === 0 ||
        email.length === 0 ||
        status.length === 0 ||
        groupItem.length === 0
      ) {
        setResult("warning");
        setMessage("Cannot insert blank party information");
      } else if (password.length < 8) {
        setMessage("Password should be at least 8 characters");
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
            iAddedBy: groupItem.join(","),
          })
          .then(async (res) => {
            if (res.data.result) {
              setResult("success");
              setMessage(res.data.message);
              setIsLoading(false);
              await timeout(1500);
              setResult("");
              setMessage("");
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
                    validateEmail(e.target.value);
                    setEmail(e.target.value);
                  }}
                  style={{ width: "100%" }}
                  label="Email address"
                  value={email}
                />
                <TextField
                  type={isPasswordVisible ? "text" : "password"}
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
                            setIsPasswordVisible(!isPasswordVisible);
                          }}
                        >
                          {isPasswordVisible ? (
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={groupItem}
                  onChange={handleChange}
                  input={<OutlinedInput label="Service Group" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {groupList.map((name) => (
                    <MenuItem key={name} value={name.id}>
                      <ListItemText primary={name.label} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <Button
                  variant="contained"
                  onClick={submit}
                  style={{ width: "50%" }}
                >
                  Submit
                </Button>
              </div>
              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DrawerComponent>
  );
}
