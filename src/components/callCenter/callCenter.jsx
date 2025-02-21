import { Button, Navbar, Page } from "framework7-react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { f7 } from "framework7-react";
import { use } from "react";
export const ChatSupport = ({ f7route, f7router }) => {
  const tawkMessengerRef = useRef();
  const notificationFull = useRef(null);
  const [disbleButton, setDisableButton] = useState(true);
  const navigate = useNavigate();
  const onChatMinimized = () => {
    // place your code here
    tawkMessengerRef.current.hideWidget();
    f7router.back();
  };
  const onLoad = () => {
    tawkMessengerRef.current.maximize();
  };
  const onChatMessageAgent = (message) => {
    f7.notification
      .create({
        icon: '<i class="icon icon-f7"></i>',
        title: "Pesan Baru",
        titleRightText: "now",
        subtitle: "Pesan Dari Admin",
        text: message.message,
        closeTimeout: 3000,
      })
      .open();
  };
  const customStyle = {
    visibility: {
      desktop: {
        xOffset: "15",
        yOffset: "15",
        position: "cr",
      },
      mobile: {
        xOffset: 10,
        yOffset: 80,
        position: "br",
      },
    },
  };
  const openChat = () => {
    f7.dialog.preloader("Loading...");
    setTimeout(() => {
      f7.dialog.close();
    }, 1000);
    if (!isAuthenticated) {
      return f7.dialog
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
    }
    setTimeout(() => {
      if (tawkMessengerRef.current) {
        tawkMessengerRef.current.maximize();
      } else {
        f7.dialog.alert("Chat Support tidak bisa diakses");
      }
    }, 1000); // Tunggu 1 detik sebelum memanggil `maximize`
  };
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    // openChat()
  }, []);
  return (
    <Page name="konsultasi" onPageAfterIn={openChat}>
      {isAuthenticated ? (
        <TawkMessengerReact
          propertyId="67ac24833a842732607dadde"
          widgetId="1ijs6t93o"
          onLoad={onLoad}
          onChatMinimized={onChatMinimized}
          customStyle={customStyle}
          onChatMessageAgent={onChatMessageAgent}
          ref={tawkMessengerRef}
        />
      ) : (
        <></>
      )}
    </Page>
  );
};
