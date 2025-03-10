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
  Panel,
  Link,
} from "framework7-react";
import { TbBell, TbLogin2 } from "react-icons/tb";
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
import { useNavigate } from "react-router-dom";

const HomePage = ({ f7router }) => {
  const user = useAuthUser();
  const navigate = useNavigate();

  const getIdKota = async (kota) => {
    try {
      const response = await axios.get(
        `https://api.myquran.com/v2/sholat/kota/cari/${kota}`
      );
      setLocation({
        id: response.data.data[0].id,
        lokasi: response.data.data[0].lokasi,
      });
    } catch (error) {
      toast.error("Ada Kesalahan");
    }
  };

  const getAddress = async (data) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${data.latitude}%2C${data.longitude}&key=3a53c6738bee456ba50dc02aa0ad0878`,
        { headers: { accept: "application/json" } }
      );

      await getIdKota(
        response.data.results[0].components.city ??
          response.data.results[0].components.county
      );
    } catch (error) {
      toast.error("Ada Kesalahan");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      console.log("Geolocation is supported!");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getAddress({ longitude, latitude });
        },
        (error) => {
          alert("error");
          console.error("Error getting location:", error.message);
        },
        {
          enableHighAccuracy: true, // Pastikan mendapatkan lokasi terbaru
          timeout: 10000, // Maksimal 10 detik untuk mendapatkan lokasi
          maximumAge: 0, // Hindari menggunakan cache
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const [dataApp, setDataApp] = useState(null);
  const [infoApp, setInfoApp] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/app/mobile`,
          {
            headers: {
              accept: "application/json",
              Authenticated: import.meta.env.VITE_API_KEY,
            },
          }
        );
        // setInfoApp(response.data.banner);
        setDataApp(response.data.data);
        setInfoApp(response.data.data.banner);
      } catch (error) {
        toast.error("Terjadi Kesalahan Saat Mengambil Data");
      }
    };
    getLocation();

    fetchApp();
  }, []);

  return (
    <Page
      ptr
      onPtrRefresh={() => {
        f7.views.main.router.refreshPage();
      }}
      ptrMousewheel={true}
      onPageReinit={() => {
        console.log("reinit");

        f7.views.current.router.refreshPage();
      }}
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
          {user ? (
            <Link href="/user">
              <div className="flex">
                <div
                  className="w-10 h-10 rounded-full bg-cover border border-second"
                  style={{
                    backgroundImage: `url('https://avatar.iran.liara.run/public/boy?username=${user.user.name}')`,
                  }}
                ></div>
                <div className="flex text-white flex-col ml-2 justify-center">
                  <div className="text-xs ">Hallo👏</div>
                  <div className="text-sm  font-bold">{user.user.name}</div>
                </div>
              </div>
            </Link>
          ) : (
            <>
              <div
                className="flex flex-row text-white gap-2 items-center cursor-pointer"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                <TbLogin2 className="text-xl" />
                <div className="text-xl font-bold">Login</div>
              </div>
            </>
          )}
        </NavLeft>
        <NavRight className="pr-3 ">
          <Button className="!text-white" panelOpen="right">
            <TbBell className="text-2xl" />
          </Button>
        </NavRight>
      </Navbar>

      <div className="h-52   px-3">
        <div className="w-full h-full flex justify-center relative items-center overflow-hidden">
          <ShalatCard kota={location} />
        </div>
      </div>
      <div className="w-full  dark:bg-teal-950 bg-white mt-2 rounded-t-2xl ">
        <MenuHome kota={location || 1111} />
        <div className="p-1 !bg-slate-100 my-2"></div>

        {infoApp ? <InfoGraph banner={infoApp} /> : <SkeletonBanner />}

        <InfoKlik />

        {dataApp ? <HeadlineNews dataApp={dataApp} /> : <SkletonHeadlines />}
      </div>
    </Page>
  );
};

export default HomePage;
