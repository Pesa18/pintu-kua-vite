import { Button, Link, Segmented, Tab, Tabs } from "framework7-react";
import {
  HiAcademicCap,
  HiArchiveBox,
  HiBookOpen,
  HiClock,
  HiUser,
} from "react-icons/hi2";

import {
  FaRegCompass,
  FaKaaba,
  FaMoon,
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

        <Tabs animated>
          <Tab id={"tab-1"} tabActive={activeTab === 0}>
            <div className="grid grid-cols-4 gap-4  ">
              <Link href="shalat" className="text-greenday" routeProps={kota}>
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiClock className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Jadwal Shalat</div>
                </div>
              </Link>
              <Link href="quran" className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiBookOpen className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Al-Qur'an</div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <FaRegCompass className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Qiblat</div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <FaKaaba className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Haji</div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <FaMoon className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Ramadhan</div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <FaCalculator className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">
                    Kalkulator Zakat
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <GiPublicSpeaker className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Khutbah</div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <MdOutlineMosque className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">Info Masjid</div>
                </div>
              </Link>
            </div>
          </Tab>
          <Tab id={"tab-2"} tabActive={activeTab === 1}>
            <div className="grid grid-cols-4 gap-4  ">
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <CgRing className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    Daftar Nikah Online
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col  justify-center items-center  text-center">
                  <BiSolidBookReader className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px]  text-bluegreen flex-grow">
                    Panduan Pendaftaran
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <FaHandshake className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">
                    Bacaan Ijab Qabul
                  </div>
                </div>
              </Link>
              <Link className="text-greenday">
                <div className="flex flex-col justify-center items-center  text-center">
                  <FaRegIdCard className="text-3xl bg-bluegreen rounded-lg p-1 mb-1" />
                  <div className="text-[9px] text-bluegreen">
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
