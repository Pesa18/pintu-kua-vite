import { useEffect } from "react";
import "./assets/css/app.css";
import Login from "./Pages/Login";
import { redirect, useNavigate } from "react-router";
import { useIsAuthenticated } from "react-auth-kit";

const Auth = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const isDarkMode = () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true; // Browser dalam mode gelap
    } else {
      return false; // Browser dalam mode terang
    }
  };
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  if (isAuthenticated()) {
    return null;
  }
  return <Login darkMode={isDarkMode} />;
};

export default Auth;
