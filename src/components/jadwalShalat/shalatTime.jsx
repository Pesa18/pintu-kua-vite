import axios from "axios";
import {
  Navbar,
  Page,
  List,
  ListItem,
  Icon,
  NavLeft,
  NavRight,
  Link,
  f7,
} from "framework7-react";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  WiCelsius,
  WiCloudy,
  WiDayCloudy,
  WiDayLightWind,
  WiDaySunny,
  WiNightAltCloudy,
  WiNightClear,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import {
  TbLocation,
  TbShare,
  TbCloud,
  TbChevronLeft,
  TbChevronRight,
  TbHazeMoon,
  TbPin,
  TbMapPinFilled,
  TbInfoCircle,
} from "react-icons/tb";
import CountDownShalat from "./countdownShalat";

const JadwalShalat = ({ kota }) => {
  const alertInfo = () => {
    f7.dialog.alert(
      "Waktu shalat pada aplikasi ini hanya membantu. Untuk mastikan akurasi waktu, silahkan cek perhitungan jadwal shalat di daerah masing-masing"
    );
  };
  const [skeleton, setSkeleton] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [jadwal, setJadwal] = useState(null);
  const datePlus = () => {
    setCurrentDate(moment(currentDate).add(1, "days").format("YYYY-MM-DD"));
    console.log(currentDate);
  };
  const dateMin = () => {
    setCurrentDate(moment(currentDate).add(-1, "days").format("YYYY-MM-DD"));
    console.log(currentDate);
  };

  const fetchJadwalShalat = async () => {
    try {
      const response = await axios.get(
        `https://api.myquran.com/v2/sholat/jadwal/${kota.id}/${currentDate}`
      );

      console.log(response.data);
      setJadwal(response.data.data.jadwal);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJadwalShalat();
  }, [kota, currentDate]);

  const formatJadwal = (jadwal) => {
    if (!jadwal) return ""; // Jika jadwal belum ada

    return `Imsak: ${jadwal.imsak}\nSubuh: ${jadwal.subuh}\nTerbit: ${jadwal.terbit}\nDhuha: ${jadwal.dhuha}\nDzuhur: ${jadwal.dzuhur}\nAshar: ${jadwal.ashar}\nMaghrib: ${jadwal.maghrib}\nIsya: ${jadwal.isya}
    \n ______\n Cek Selengkapnya di https://mobile.pintukua.site
    `;
  };

  const shareContent = {
    title: "Jadwal Shalat Hari Ini",
    text: `Jadwal Shalat untuk hari ${currentDate}:\n${formatJadwal(jadwal)}`,
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share(shareContent)
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share API is not supported on this device.");
    }
  };

  return (
    <Page name="shalat" className="!bg-primary">
      <Navbar
        sliding
        transparent
        textColor="white"
        colorTheme="white"
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
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Jadwal Shalat</span>
          </div>
        </NavLeft>
        <NavRight>
          <div className=" mr-2 flex flex-row gap-5">
            <TbShare className="cursor-pointer text-2xl" onClick={shareLink} />
            <TbInfoCircle
              className="cursor-pointer text-2xl"
              onClick={alertInfo}
            />
          </div>
        </NavRight>
      </Navbar>
      <div className="relative h-1/4 mx-auto my-auto flex items-center justify-center bg-cover bg-opacity-90 bg-center mb-10 ">
        <img
          src="/images/bg-masjid.png"
          className="absolute bg-cover opacity-15"
          alt=""
        />
        <div className=" z-50 flex flex-col gap-1 drop-shadow-sm  items-center text-white ">
          <CountDownShalat dataKota={kota} setSkeleton={setSkeleton} />
        </div>
      </div>

      <div className=" h-full rounded-t-2xl  bg-white shadow-inner px-4 py-8 relative drop-shadow-lg">
        <div className="flex flex-row justify-between items-center w-3/4 absolute gap-10 p-3 border  bg-white -top-5 rounded-lg  -translate-x-1/2 left-1/2">
          <TbChevronLeft className="text-xl cursor-pointer" onClick={dateMin} />
          <div>{moment(currentDate).locale("id").format("DD MMMM YYYY")}</div>
          <TbChevronRight
            className="text-xl cursor-pointer"
            onClick={datePlus}
          />
        </div>

        {jadwal ? (
          <List dividersIos outlineIos strongIos>
            <ListItem title="Imsak" after={jadwal.imsak}>
              <WiNightAltCloudy slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Subuh" after={jadwal.subuh}>
              <WiCloudy slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Terbit" after={jadwal.terbit}>
              <WiSunrise slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Dhuha" after={jadwal.dhuha}>
              <WiDayLightWind slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Dzuhur" after={jadwal.dzuhur}>
              <WiDaySunny slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Ashar" after={jadwal.ashar}>
              <WiDayCloudy slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Maghrib" after={jadwal.maghrib}>
              <WiSunset slot="media" className="text-xl" />
            </ListItem>
            <ListItem title="Isya" after={jadwal.isya}>
              <WiNightClear slot="media" className="text-xl" />
            </ListItem>
          </List>
        ) : (
          <>
            <div>Tidak ada jadwal</div>
          </>
        )}

        <div className="mt-11 container mx-auto text-center">
          <div>
            {" "}
            Data ini diambil dari API{" "}
            <span>
              <Link href="https://api.myquran.com/" external>
                myquran.com
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default JadwalShalat;
