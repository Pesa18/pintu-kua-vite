import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import FormLogin from "./components/Login";
import FormRegistration from "./components/Registration";
import HomeView from "./Pages/HomeView";
import OtpPages from "./Pages/Otp";
import NotFound from "./Pages/Notfound404";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import LupaPassword from "./Pages/ForgotPwd";
import NotFoundPage from "./Pages/404";
import { MetaProvider, useMeta } from "./MetaContext";
import { Helmet } from "react-helmet";
function App() {
  const { meta } = useMeta();
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>
      <Routes>
        <Route
          path="/:uuid"
          element={
            <RequireAuth fallbackPath={"/auth"}>
              <HomeView />
            </RequireAuth>
          }
        />
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/404" element={<NotFoundPage />}></Route>
        <Route path="/berita/:slug" element={<HomeView />}></Route>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<FormLogin />}></Route>
          <Route
            path="forgot-password/:uuid"
            element={<LupaPassword />}
          ></Route>
          <Route path="daftar" element={<FormRegistration />}></Route>
          <Route path="otp/:uuid" element={<OtpPages />}></Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default () => (
  <MetaProvider>
    <App />
  </MetaProvider>
);
