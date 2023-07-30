import { Navbar, Page } from "framework7-react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useEffect, useRef } from "react";
import { f7 } from "framework7-react";
export const ChatSupport = ({ f7route, f7router }) => {
  const tawkMessengerRef = useRef();
  const notificationFull = useRef(null);
  const onChatMinimized = () => {
    // place your code here

    f7router.back();
  };
  const onLoad = () => {
    tawkMessengerRef.current.maximize();
  };
  const onChatMessageAgent = (message) => {
    console.log(message);

    if (!notificationFull.current) {
      notificationFull.current = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: "Framework7",
        titleRightText: "now",
        subtitle: "This is a subtitle",
        text: "This is a simple notification message",
        closeTimeout: 3000,
      });
    }
    notificationFull.current.open();
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

  useEffect(() => {
    // const openChat = () => {
    //   if (tawkMessengerRef.current) {
    //     return tawkMessengerRef.current.maximize();
    //   }
    // };
    // openChat();
  }, []);
  return (
    <Page name="konsultasi">
      <Navbar backLink title="Tanya KUA"></Navbar>
      <TawkMessengerReact
        propertyId="61efb8da9bd1f31184d930de"
        widgetId="1fq86k63a"
        onLoad={onLoad}
        onChatMinimized={onChatMinimized}
        customStyle={customStyle}
        onChatMessageAgent={onChatMessageAgent}
        ref={tawkMessengerRef}
      />
    </Page>
  );
};
