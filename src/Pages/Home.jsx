import { useState, useRef } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavRight,
  f7,
  Link,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "framework7-react";
import { TbBell } from "react-icons/tb";
import { ShalatCard } from "../components/shalatCard";
import { MenuHome } from "../components/menuHome";
import { InfoGraph } from "../components/info";
import { useSignOut } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";

const HomePage = () => {
  const user = useAuthUser();

  const signOut = useSignOut();
  const logOut = () => {
    signOut();
    window.location.reload();
  };
  const sheet = useRef(null);
  const onPageBeforeOut = () => {
    // Close opened sheets on page out
    f7.sheet.close();
  };
  const onPageBeforeRemove = () => {
    // Destroy sheet modal when page removed
    if (sheet.current) sheet.current.destroy();
  };
  return (
    <Page
      name="home"
      ptr
      onPtrRefresh={() => {
        window.location.reload();
      }}
      ptrMousewheel={true}
      onPageInit={f7.preloader.showIn("<Nabar></Navbar>")}
      onPageBeforeOut={onPageBeforeOut}
      onPageBeforeRemove={onPageBeforeRemove}
      style={{ backgroundColor: "#65afa6" }}
    >
      <Navbar transparent onNavbarTransparentShow={() => {}}>
        <NavLeft className="pl-3">
          {/* <TbLogin className="text-xl text-white" /> */}
          <div className="flex">
            <div
              className="w-10 h-10 rounded-full bg-cover border border-second"
              style={{ backgroundImage: "url('/images/avatar-1.jpg')" }}
            ></div>
            <div className="flex flex-col ml-2 justify-center">
              <div className="text-xs text-light">Assalamualaikum..👏</div>
              <div className="text-sm text-light font-bold">{user().name}</div>
            </div>
          </div>
        </NavLeft>
        <NavRight textColor="white" className="pr-3">
          <TbBell
            className="text-xl"
            onClick={() => {
              logOut();
            }}
          />
        </NavRight>
      </Navbar>
      <div className="h-60   px-3">
        <div className="w-full h-full flex justify-center relative items-center overflow-hidden">
          <ShalatCard />
        </div>
      </div>
      <div className="w-full dark:bg-teal-950 bg-white -mt-4 rounded-t-3xl ">
        <MenuHome />
        <InfoGraph />

        <div className="flex flex-row mt-6">
          <Card color="teal" className="!mb-24">
            <CardHeader
              className="!relative !mx-3 !top-2 !rounded-lg !h-40  !bg-cover"
              valign="bottom"
              style={{
                backgroundImage:
                  "url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)",
              }}
            >
              Journey To Mountains
            </CardHeader>
            <CardContent>
              <p className="date">Posted on January 21, 2015</p>
            </CardContent>
            <CardFooter>
              <Link>Like</Link>
              <Link>Read more</Link>
            </CardFooter>
          </Card>
          <Card color="teal" className="!mb-24">
            <CardHeader
              className="!relative !mx-3 !top-2 !rounded-lg !h-40  !bg-cover"
              valign="bottom"
              style={{
                backgroundImage:
                  "url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)",
              }}
            >
              Journey To Mountains
            </CardHeader>
            <CardContent>
              <p className="date">Posted on January 21, 2015</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
