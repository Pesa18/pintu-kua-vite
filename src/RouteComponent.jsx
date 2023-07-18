import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import FormLogin from "./components/Login";
import FormRegistration from "./components/Registration";
import HomeView from "./Pages/HomeView";
import OtpPages from "./Pages/Otp";
import { RequireAuth } from "react-auth-kit";

const RouteComponent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/auth">
            <HomeView />
          </RequireAuth>
        }
      />
      <Route path="/auth" element={<Auth />}>
        <Route index element={<FormLogin />}></Route>
        <Route path="daftar" element={<FormRegistration />}></Route>
      </Route>
      <Route path="/otp/" element={<OtpPages />} />
    </Routes>
  );
};

export default RouteComponent;
