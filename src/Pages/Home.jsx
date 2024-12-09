import { useState, useRef, useEffect } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavRight,
  f7,
  Block,
  Sheet,
  BlockTitle,
  PageContent,
  Button,
} from "framework7-react";
import { TbBell } from "react-icons/tb";
import { ShalatCard } from "../components/shalatCard";
import { MenuHome } from "../components/menuHome";
import { InfoGraph, InfoKlik, SkeletonBanner } from "../components/info";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import HeadlineNews, {
  SkletonHeadlines,
} from "../components/berita/BeritaHome";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const user = useAuthUser();

  const signOut = useSignOut();
  const logOut = () => {
    signOut();
    window.location.reload();
  };

  const [dataApp, setDataApp] = useState(null);
  const [infoApp, setInfoApp] = useState(null);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/app/mobile`,
          {
            headers: {
              accept: "application/json",
              Authenticated: import.meta.env.VITE_API_KEY,
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // setInfoApp(response.data.banner);
        setDataApp(response.data.data);
        setInfoApp(response.data.data.banner);
      } catch (error) {}
    };

    fetchApp();
  }, []);

  return (
    <Page
      name="home"
      ptr
      onPtrRefresh={() => {
        window.location.reload();
      }}
      ptrMousewheel={true}
      onPageInit={f7.preloader.showIn("<Nabar></Navbar>")}
      className="!bg-primary"
    >
      <Navbar
        transparent
        onNavbarTransparentShow={() => {
          var bgNav = document.getElementsByClassName("navbar-bg");
          for (var i = 0; i < bgNav.length; i++) {
            bgNav[i].setAttribute(
              "style",
              "background-color: #38a3a5 !important;"
            );
          }
        }}
      >
        <NavLeft className="pl-3">
          {/* <TbLogin className="text-xl text-white" /> */}
          <div className="flex">
            <div
              className="w-10 h-10 rounded-full bg-cover border border-second"
              style={{ backgroundImage: "url('/images/avatar-1.jpg')" }}
            ></div>
            <div className="flex text-white flex-col ml-2 justify-center">
              <div className="text-xs ">Assalamualaikum..👏</div>
              <div className="text-sm  font-bold">{user.user.name}</div>
            </div>
          </div>
        </NavLeft>
        <NavRight className="pr-3 !text-white">
          <TbBell
            className="text-xl"
            onClick={() => {
              logOut();
            }}
          />
        </NavRight>
      </Navbar>
      <div className="h-52   px-3">
        <div className="w-full h-full flex justify-center relative items-center overflow-hidden">
          <ShalatCard />
        </div>
      </div>
      <div className="w-full dark:bg-teal-950 bg-white mt-2 rounded-t-2xl ">
        <MenuHome />
        <div className="p-1 !bg-slate-100 my-2"></div>

        {infoApp ? <InfoGraph banner={infoApp} /> : <SkeletonBanner />}

        <InfoKlik />

        {dataApp ? <HeadlineNews dataApp={dataApp} /> : <SkletonHeadlines />}
      </div>
    </Page>
  );
};

export default HomePage;
