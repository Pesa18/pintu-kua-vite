import { Button, Link, Segmented, Tab, Tabs } from "framework7-react";
import {
  HiAcademicCap,
  HiArchiveBox,
  HiBookOpen,
  HiClock,
  HiUser,
} from "react-icons/hi2";
import { useState, useEffect } from "react";

export const MenuHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="p-4">
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
            Islam
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
            Nikah
          </Button>
          <Button
            small
            active={activeTab === 2}
            onClick={() => {
              setActiveTab(2);
            }}
            color="teal"
          >
            Layanan
          </Button>
        </Segmented>

        <Tabs animated>
          <Tab id={"tab-1"} tabActive={activeTab === 0}>
            <div className="grid grid-cols-4 gap-4  ">
              <Link
                className="text-primary"
                href="/quran"
                routeProps={{ Name: "asep" }}
              >
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiClock className="text-4xl bg-light rounded-lg p-1 mb-1" />
                  <div className="text-xs">Shalat</div>
                </div>
              </Link>
              <Link className="text-primary">
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiBookOpen className="text-4xl bg-light rounded-lg p-1 mb-1" />
                  <div className="text-xs">Al-Qur'an</div>
                </div>
              </Link>
              <Link className="text-primary">
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiUser className="text-4xl bg-light rounded-lg p-1 mb-1" />
                  <div className="text-xs">Al-Qur'an</div>
                </div>
              </Link>
            </div>
          </Tab>
          <Tab id={"tab-2"} tabActive={activeTab === 1}>
            <div className="grid grid-cols-4 gap-4  ">
              <Link
                className="text-primary"
                href="/quran"
                routeProps={{ Name: "asep" }}
              >
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiArchiveBox className="text-4xl bg-light rounded-lg p-1 mb-1" />
                  <div className="text-xs">Shalata</div>
                </div>
              </Link>
              <Link className="text-primary">
                <div className="flex flex-col justify-center items-center  text-center">
                  <HiBookOpen className="text-4xl bg-light rounded-lg p-1 mb-1" />
                  <div className="text-xs">Al-Qur'an</div>
                </div>
              </Link>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
