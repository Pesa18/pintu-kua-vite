import { useEffect } from "react";
import "./assets/css/app.css";
import Login from "./Pages/Login";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  let navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
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
    if (isAuthenticated) {
      console.log("dev");

      navigate("/");
    }
  }, []);

  if (isAuthenticated) {
    return null;
  }
  return <Login darkMode={isDarkMode} />;
};

export default Auth;
