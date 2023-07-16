import { AuthProvider } from "react-auth-kit";
import RouteComponent from "./RouteComponent";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <RouteComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
