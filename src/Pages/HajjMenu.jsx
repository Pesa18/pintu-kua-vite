import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Card,
  Link,
  NavLeft,
  NavTitle,
} from "framework7-react";
import { TbChevronLeft } from "react-icons/tb";

const HajjMenu = () => {
  return (
    <Page>
      <Navbar innerClass="!bg-second !text-white">
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Haji & Umroh</span>
          </div>
        </NavLeft>
      </Navbar>
      <div className="grid grid-cols-2 gap-2 gap-y-4 p-2">
        <Link
          href="/hajilist"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/haji?category=perjalanan-ibadah&limit=100",
            title: "Perjalanan Ibadah Haji & Umroh",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Perjalanan Ibadah Haji & Umroh</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img
                  src="/icons/passport.png"
                  alt="haji"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </Card>
        </Link>
        <Link
          href="/hajilist"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/haji?category=manasik&limit=100",
            title: "Manasik Haji & Umroh",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Manasik Haji & Umroh</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img src="/icons/hajj.png" alt="haji" className="w-10 h-10" />
              </div>
            </div>
          </Card>
        </Link>
        <Link
          href="/hajilist"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/haji?category=pelaksanaan&limit=100",
            title: "Pelaksanaan Haji & Umroh",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Pelaksanaan Haji & Umroh</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img
                  src="/icons/islamic.png"
                  alt="haji"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </Card>
        </Link>
        <Link
          href="/hajilist"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/haji?category=hikmah&limit=100",
            title: "Hikmah Ibadah Haji & Umroh",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Hikmah Ibadah Haji & Umroh</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img
                  src="/icons/religion.png"
                  alt="haji"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </Card>
        </Link>
        <Link
          href="/doahaji"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/doa/haji?&limit=100&page=1",
            title: "Doa-doa Haji & Umroh",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Doa-doa Haji & Umroh</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img src="/icons/doa.png" alt="haji" className="w-10 h-10" />
              </div>
            </div>
          </Card>
        </Link>
        <Link
          href="/ziarahhaji"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/ziarah",
            title: "Destinasi Ziarah di Tanah Suci",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Destinasi Ziarah di Tanah Suci</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img src="/icons/route.png" alt="haji" className="w-10 h-10" />
              </div>
            </div>
          </Card>
        </Link>
        <Link
          href="/hajilist"
          routeProps={{
            url: "https://kontenpusaka.kemenag.go.id/api/haji?category=kemudahan-lansia&limit=100",
            title: "Kemudahan Haji Bagi Lansia & Risti",
          }}
        >
          <Card className="!bg-white !m-0 !p-0 !shadow-lg w-full">
            <div className="flex flex-col m-4 ">
              <div className="">Kemudahan Haji Bagi Lansia & Risti</div>
              <div className="flex flex-row justify-end items-center gap-1">
                <img src="/icons/hajj-1.png" alt="haji" className="w-10 h-10" />
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </Page>
  );
};

export default HajjMenu;
