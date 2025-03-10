import Framework7 from "framework7/lite/bundle";
import Framework7React, { f7 } from "framework7-react";
import { f7ready, App, View, Toolbar, Link } from "framework7-react";
import routes from "../Routes/Routes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

Framework7.use(Framework7React);
const f7params = {
  routes,
  name: "Pintu KUA",
  theme: "md",
};

export default function HomeView() {
  // const { slug } = useParams();

  // const [page, setPage] = useState(slug ? "detail-berita" : "/");

  useEffect(() => {
    // console.log(page);

    if (f7ready) {
      f7ready(() => {
        import("framework7/css/bundle");
      });
    }
  }, []);

  // useEffect(() => {
  //   // console.log(f7.views);
  //   // f7.views.main.router.navigate(page);
  // }, [page]);

  return (
    <>
      <ToastContainer closeButton={false} />
      <App {...f7params} className=" max-w-4xl mx-auto font-poppins">
        <View main url="/" mdSwipeBack>
          <Toolbar
            bottom
            tabbar
            color="teal"
            className="rounded-t-2xl pb-16    shadow-xl !bg-white"
          >
            <Link
              href="/"
              onClick={() => {
                window.history.pushState({}, "", "/");
              }}
              className="flex flex-col"
            >
              <img
                src="/icons/tabbar/wired-outline-63-home.png"
                className="h-8"
                alt=""
              />
              <div className="text-primary text-xs">Home</div>
            </Link>
            <Link
              href="/quran"
              onClick={() => {
                window.history.pushState({}, "", "/");
              }}
              ignoreCache={true}
              className="flex flex-col"
            >
              <img
                src="/icons/tabbar/wired-outline-112-book-morph.gif"
                className="h-8"
                alt=""
              />
              <div className="text-xs">Al-qur'an</div>
            </Link>

            <Link
              href="/konsultasi"
              onClick={() => {
                window.history.pushState({}, "", "/");
              }}
              className="flex flex-col"
            >
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
              onClick={() => {
                window.history.pushState({}, "", "/");
              }}
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
    </>
  );
}
