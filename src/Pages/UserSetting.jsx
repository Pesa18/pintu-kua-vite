import {
  f7,
  Navbar,
  Page,
  Card,
  CardContent,
  List,
  ListItem,
  BlockTitle,
  NavLeft,
  SkeletonBlock,
} from "framework7-react";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { MdSystemUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  TbChevronRight,
  TbKey,
  TbLogout,
  TbNews,
  TbShare2,
  TbShield,
  TbStarFilled,
} from "react-icons/tb";

const UserSetting = () => {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const showDialog = () => {
    if (isAuthenticated) {
      return;
    }
    f7.dialog
      .create({
        title: "Peringatan!",
        text: "Anda Belum Login",
        cssClass: "!bg-light",
        buttons: [
          {
            text: "Nanti",
            cssClass: "!bg-red-500 !text-white",
            onClick: () => {
              f7.dialog.close();
              f7.views.main.router.navigate("/");
            },
          },
          {
            text: "Login",
            cssClass: "!bg-primary !text-white",
            onClick: () => {
              f7.dialog.close();
              navigate("/auth");
            },
          },
        ],
      })
      .open();
  };
  useEffect(() => {
    // if (!isAuthenticated) {
    //   showDialog();
    // }
  }, []);

  useEffect(() => {
    const navbarBg = document.querySelector(".navbar .navbar-bg");

    if (navbarBg) {
      navbarBg.classList.add("!bg-second");
    }
  }, []);
  return (
    <Page name="user" onPageAfterIn={showDialog}>
      <Navbar
        transparent
        color="primary"
        innerClass="!bg-second !flex !justify-center !items-center !font-bold !text-lg"
        textColor="white"
        backLink={false}
      >
        Akun
      </Navbar>
      <div className="absolute w-full h-1/6 top-0 bg-second rounded-b-3xl"></div>
      <div className="  flex justify-center  items-center mx-auto">
        <Card raised className="w-3/4 !z-50 bg-light ">
          <CardContent className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center grow gap-5 w-[50%] row-span-">
              {!isAuthenticated ? (
                <>
                  <SkeletonBlock
                    className="!h-12 !w-16 !rounded-full"
                    effect="wave"
                  ></SkeletonBlock>
                  <SkeletonBlock className=" !h-6 rounded-lg" effect="wave" />
                </>
              ) : (
                <>
                  <img
                    src={`https://avatar.iran.liara.run/public/boy?username=${user.user.name}`}
                    className="aspect-square h-14 object-cover rounded-full bg-cover"
                    alt=""
                  />
                  <div className="w-full">{user.user.name}</div>
                </>
              )}
            </div>
            <TbChevronRight className="flex-none" />
          </CardContent>
        </Card>
      </div>
      <BlockTitle className="!text-primary ">Pengaturan</BlockTitle>
      <List dividersIos outlineIos strongIos strong inset>
        <ListItem title="Ubah Password" link="#">
          <TbKey slot="media" />
        </ListItem>
        <ListItem title="Kebijakan Privasi" link="#">
          <TbShield slot="media" />
        </ListItem>
        <ListItem title="Ketentuan Layanan" link="#">
          <TbNews slot="media" />
        </ListItem>
      </List>
      <BlockTitle className="!text-primary ">Info Aplikasi</BlockTitle>
      <List dividersIos outlineIos strongIos strong inset>
        <ListItem title="Periksa Pembaruan" link="#">
          <MdSystemUpdate slot="media" />
        </ListItem>
        <ListItem title="Bagikan Aplikasi" link="#">
          <TbShare2 slot="media" />
        </ListItem>
        <ListItem title="Berikan Rating" link="#">
          <TbStarFilled slot="media" />
        </ListItem>
      </List>
      <List dividersIos dividers strong inset>
        <ListItem
          textColor="red"
          link="#"
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          <div>Logout</div>
          <TbLogout slot="media" />
        </ListItem>
      </List>
      <div className="flex justify-center">
        <div>Versi 1.0.0</div>
      </div>
    </Page>
  );
};

export default UserSetting;
