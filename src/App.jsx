import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import FormLogin from "./components/Login";
import FormRegistration from "./components/Registration";
import HomeView from "./Pages/HomeView";
import OtpPages from "./Pages/Otp";
import NotFound from "./Pages/Notfound404";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import LupaPassword from "./Pages/ForgotPwd";
function App() {
  return (
    <Routes>
      <Route
        path="/:uuid"
        element={
          <RequireAuth fallbackPath={"/auth"}>
            <HomeView />
          </RequireAuth>
        }
      />
      <Route path="/auth" element={<Auth />}>
        <Route index element={<FormLogin />}></Route>
        <Route path="forgot-password/:uuid" element={<LupaPassword />}></Route>
        <Route path="daftar" element={<FormRegistration />}></Route>
        <Route path="otp/:uuid" element={<OtpPages />}></Route>
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
