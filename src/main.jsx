import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import refresh from "./Auth/RefreshToken.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      store={createStore({
        authName: "_auth",
        authType: "cookie",
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === "https:",
        refresh: refresh,
      })}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
