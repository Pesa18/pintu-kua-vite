import Framework7 from "framework7/lite/bundle";
import Framework7React, { f7 } from "framework7-react";
import { f7ready, App, View, Toolbar, Link } from "framework7-react";
import routes from "../Routes/Routes";
import { useNavigate, useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";

Framework7.use(Framework7React);
const f7params = {
  routes,
  name: "Pintu KUA",
  theme: "md",
  view: {
    pushState: true,
  },
};

export default function HomeView() {
  const { slug } = useParams();

  const location = useLocation();
  const [page, setPage] = useState(slug ? "detail-berita" : "/");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(page);

    if (f7ready) {
      f7ready(() => {
        import("framework7/css/bundle");
      });
    }
  }, []);

  useEffect(() => {
    // console.log(f7.views);
    // f7.views.main.router.navigate(page);
  }, [page]);

  return (
    <App {...f7params} className=" max-w-4xl mx-auto font-poppins">
      <View main url={page}>
        <Toolbar
          bottom
          tabbar
          color="teal"
          className="rounded-t-2xl pb-16    shadow-xl !bg-white"
        >
          <Link href="/" className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-63-home.png"
              className="h-8"
              alt=""
            />
            <div className="text-primary text-xs">Home</div>
          </Link>
          <Link href="/quran" ignoreCache={true} className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-112-book-morph.gif"
              className="h-8"
              alt=""
            />
            <div className="text-xs">Al-qur'an</div>
          </Link>

          <Link href="/konsultasi" className="flex flex-col">
            <img
              src="/icons/tabbar/wired-outline-981-consultation.gif"
              className="h-8"
              alt=""
            />
            <div className="text-xs">Konsultasi</div>
          </Link>
          <Link
            className="flex flex-col"
            href="/user"
            // routeProps={{
            //   openDialog: openDialog,
            //   setOpenDialog: setOpenDialog,
            // }}
          >
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
