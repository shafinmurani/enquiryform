/* eslint-disable no-useless-escape */
import React from "react";
import axios from "axios";
import "../styles/Login.css";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import {
  BadgeRounded,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [isPasswordVIsible, setIsPasswordVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorField, setErrorField] = React.useState("");
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
  const submit = (props) => {
    if (isValidEmail && password.length !== 0) {
      axios
        .post("http://localhost:3001/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.result) {
            localStorage.setItem("jwt-token", res.data.token);
            navigate("/service-group");
          } else {
            setErrorField("Invalid Email or Password");
          }
        });

      setErrorField("");
    } else {
      if (isValidEmail === false && password.length !== 0) {
        setErrorField("Email");
      } else if (password.length === 0 && isValidEmail === true) {
        setErrorField("Password");
      } else {
        setErrorField("Email and Password");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="box">
        <h1 className="title">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BadgeRounded style={{ fontSize: "2rem" }} /> Login
          </div>
        </h1>
        <Alert
          sx={{ color: "red" }}
          style={{
            width: "90%",
            display: errorField.length === 0 ? "none" : "",
          }}
          severity="error"
          variant="standard"
        >
          Enter a valid {errorField}
        </Alert>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <TextField
            required
            className="input"
            label="Email"
            type="email"
            InputProps={{
              sx: { borderRadius: "50px" },
            }}
            onChange={(e) => {
              validateEmail(e);
            }}
          />
          <TextField
            required
            className="input"
            label="Password"
            type={isPasswordVIsible ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              sx: { borderRadius: "100px" },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVIsible);
                    }}
                  >
                    {isPasswordVIsible ? <Visibility /> : <VisibilityOff />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{
              borderRadius: 50,
              width: "60%",
              alignSelf: "center",
            }}
            onClick={submit}
            className="login-btn"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
