import Framework7 from "framework7/lite/bundle";
import Framework7React from "framework7-react";
import { f7, f7ready, App, View, Toolbar, Link } from "framework7-react";
import routes from "../Routes/Routes";
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useSignOut } from "react-auth-kit";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { setItem, getItem, removeItem } from "../components/storageUtils";

const f7params = {
  routes,
  name: "Pintu KUA",
  theme: "md",
};

Framework7.use(Framework7React);

export default function HomeView() {
  let { uuid } = useParams();
  const user = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();

  const LogOut = useSignOut();
  f7ready(() => {
    import("framework7/css/bundle");
    f7.init(f7params);
  });

  useEffect(() => {
    const checklogin = async () => {
      try {
        const response = await axios.get("http://apibimas.test/api/user", {
          headers: {
            accept: "application/json",
            Authenticated: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${user().token}`,
          },
        });

        if (response.data.user.uuid === uuid) {
          return setItem(`user_${uuid}`, { data: response.data.user });
        }
        return LogOut();
      } catch (error) {
        return LogOut();
      }
    };

    checklogin();
  }, []);
  return (
    <App {...f7params} className=" max-w-4xl mx-auto font-poppins">
      <View main url="/">
        <Toolbar
          bottom
          tabbar
          color="teal"
          className="rounded-t-2xl pb-20   shadow-xl"
        >
          <Link className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-63-home.png"
              className="h-8"
              alt=""
            />
            <div className="text-primary text-xs">Home</div>
          </Link>
          <Link className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-112-book-morph.gif"
              className="h-8"
              alt=""
            />
            <div className="text-xs">Al-qur'an</div>
          </Link>

          <Link className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-981-consultation.gif"
              className="h-8"
              alt=""
            />
            <div className="text-xs">Konsultasi</div>
          </Link>
          <Link className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-21-avatar.gif"
              className="h-8"
              alt=""
            />
            <div className="text-xs">User</div>
          </Link>
        </Toolbar>
      </View>
    </App>
  );
}
