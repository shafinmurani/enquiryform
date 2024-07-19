import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("jwt-token");
    if (user) {
      const decodedJwt = parseJwt(user);

      if (decodedJwt.exp * 1000 < Date.now()) {
        sessionStorage.clear();
        navigate("/");
      }
    }
  }, [location]);

  return;
};

export default AuthVerify;
