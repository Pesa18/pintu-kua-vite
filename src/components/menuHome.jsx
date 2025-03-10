import { Button, Link, Segmented, Tab, Tabs } from "framework7-react";
import { HiBookOpen, HiClock } from "react-icons/hi2";
import { GiCalculator } from "react-icons/gi";
import {
  FaRegCompass,
  FaKaaba,
  FaCalculator,
  FaHandshake,
  FaRegIdCard,
} from "react-icons/fa";
import { MdOutlineMosque } from "react-icons/md";
import { GiPublicSpeaker } from "react-icons/gi";
import { BiSolidBookReader } from "react-icons/bi";
import { CgRing } from "react-icons/cg";
import { GoLaw } from "react-icons/go";
import { useState, useEffect } from "react";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return `<span class="${className}"><div class="w-full h-full bg-primary rounded-full"></div></span>`;
  },
};
export const MenuHome = (kota) => {
  const [activeTab, setActiveTab] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const setActived = (index) => {
    swiper.slideTo(index);
    setActiveTab(index);
  };

  return (
    <>
      <div className="p-2 mb-4">
        <Segmented strong tag="p">
          <Button
            small
            color="teal"
            active={activeTab === 0}
            onClick={() => {
              setActived(0);
            }}
            tabLink={"#tab-1"}
          >
            Keislaman
          </Button>
          <Button
            small
            active={activeTab === 1}
            onClick={() => {
              setActived(1);
            }}
            tabLink={"#tab-2"}
            color="teal"
          >
            Pernikahan
          </Button>
          <Button
            small
            active={activeTab === 2}
            onClick={() => {
              setActived(2);
            }}
            color="teal"
            tabLink={"#tab-3"}
          >
            Layanan
          </Button>
        </Segmented>

        <Swiper
          modules={[Pagination]}
          pagination={pagination}
          slidesPerView={"auto"}
          spaceBetween={10}
          className=" !w-full !h-40  "
          onSwiper={setSwiper}
        >
          <SwiperSlide>
            <div className="grid grid-cols-4 gap-4  ">
              <Link
                href="shalat"
                className="text-greenday h-full "
                routeProps={kota}
              >
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <HiClock className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen">
                    Jadwal Shalat
                  </div>
                </div>
              </Link>
              <Link href="quran" className="text-greenday h-full">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <HiBookOpen className="text-4xl bg-bluegreen rounded-lg p-1 mb-1  " />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Al-Qur'an
                  </div>
                </div>
              </Link>
              <Link
                className="text-greenday h-full"
                href="https://qiblafinder.withgoogle.com/"
                external
              >
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaRegCompass className="text-4xl bg-bluegreen rounded-xl p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Qiblat
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="haji">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaKaaba className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Haji
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <GoLaw className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Kalkulator Waris
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="/kalkulator-zakat">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaCalculator className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Kalkulator Zakat
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="/khutbah">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <GiPublicSpeaker className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Khutbah
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="masjid">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <MdOutlineMosque className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs text-bluegreen font-semibold flex-1">
                    Info Masjid
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full active-slide">
            <div className="grid grid-cols-4 gap-4   ">
              <Link className="text-greenday h-full">
                <div className="flex flex-col  h-full justify-between items-center  text-center">
                  <CgRing className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs  text-bluegreen  font-semibold">
                    Daftar Nikah Online
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="/panduan">
                <div className="flex flex-col  h-full justify-between items-center  text-center">
                  <BiSolidBookReader className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold  text-bluegreen flex-grow">
                    Panduan Pendaftaran
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="/ijabqabul">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaHandshake className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen">
                    Bacaan Ijab Qabul
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full" href="/kartu-nikah">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaRegIdCard className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen">
                    Kartu Nikah Digital
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center gap-4">
              <img src="/images/hourglass.png" className="h-12 w-12 " alt="" />
              <div className="text-center">
                Fitur ini masih dalam tahap pengembangan. Nantikan segera!🚀
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
