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
import { useState, useEffect } from "react";

export const MenuHome = (kota) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="p-2 mb-4">
        <Segmented strong tag="p">
          <Button
            small
            color="teal"
            active={activeTab === 0}
            onClick={() => {
              setActiveTab(0);
            }}
            tabLink={"#tab-1"}
          >
            Keislaman
          </Button>
          <Button
            small
            active={activeTab === 1}
            onClick={() => {
              setActiveTab(1);
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
              setActiveTab(2);
            }}
            color="teal"
            tabLink={"#tab-3"}
          >
            Layanan
          </Button>
        </Segmented>

        <Tabs swipeable>
          <Tab id={"tab-1"} tabActive={activeTab === 0}>
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
              <Link className="text-greenday h-full">
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
                  <GiCalculator className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Kalkulator Waris
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaCalculator className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen flex-1">
                    Kalkulator Zakat
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full">
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
          </Tab>
          <Tab id={"tab-2"} tabActive={activeTab === 1}>
            <div className="grid grid-cols-4 gap-4  ">
              <Link className="text-greenday h-full">
                <div className="flex flex-col  h-full justify-between items-center  text-center">
                  <CgRing className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs  text-bluegreen  font-semibold">
                    Daftar Nikah Online
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full">
                <div className="flex flex-col  h-full justify-between items-center  text-center">
                  <BiSolidBookReader className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold  text-bluegreen flex-grow">
                    Panduan Pendaftaran
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaHandshake className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen">
                    Bacaan Ijab Qabul
                  </div>
                </div>
              </Link>
              <Link className="text-greenday h-full">
                <div className="flex flex-col h-full justify-between items-center  text-center">
                  <FaRegIdCard className="text-4xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-xs font-semibold text-bluegreen">
                    Kartu Nikah Digital
                  </div>
                </div>
              </Link>
            </div>
          </Tab>
          <Tab id={"tab-3"} tabActive={activeTab === 2}>
            <div className="grid grid-cols-4 gap-4  ">
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <CgRing className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    Wakaf
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <CgRing className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    Legalisir
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <CgRing className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    ID Masjid
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <CgRing className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    Cek Register
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <CgRing className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    Zakat
                  </div>
                </div>
              </Link>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
