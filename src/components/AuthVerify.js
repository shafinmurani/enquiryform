import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwt } from "../services/services_export";

const AuthVerify = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("jwt-token");
    if (user) {
      const decodedJwt = jwt.parse(user);

      if (decodedJwt.exp * 1000 < Date.now()) {
        sessionStorage.clear();
        navigate("/");
      }
    }
  }, [location]);

  return;
};

export default AuthVerify;
