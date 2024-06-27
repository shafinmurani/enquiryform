/* eslint-disable no-useless-escape */
import React from "react";
import "../styles/Login.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function Login() {
  const [isPasswordVIsible, setIsPasswordVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(true);

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
    if (isValidEmail && password.length !== 0) {
      //TODO:  Email and password are valid, perform login logic here
    } else {
      //TODO: Implement error logic here
      //Email or password is invalid/empty
    }
  };
  return (
    <div className="wrapper">
      <div className="box">
        <h1 className="title">Login</h1>
        <TextField
          required
          className="input"
          label="Email"
          type="email"
          onChange={(e) => {
            validateEmail(e);
            console.log(isValidEmail);
            console.log(email);
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
          onClick={submit}
          className="login-btn"
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
