import Framework7 from "framework7/lite/bundle";
import Framework7React, { f7 } from "framework7-react";
import { Page, Navbar, Block, View, App, f7ready } from "framework7-react";
import { useEffect } from "react";

Framework7.use(Framework7React);
const f7params = {
  routes: {
    name: "404",
  },
  name: "Pintu KUA",
  theme: "md",
};
const NotFoundPage = () => {
  useEffect(() => {
    if (f7ready) {
      f7ready(() => {
        import("framework7/css/bundle");
      });
    }
  }, []);
  return (
    <App {...f7params} className=" max-w-4xl mx-auto font-poppins">
      <View>
        <Page>
          <Navbar title="Page Not Found" />
          <Block strong>
            <h1>404</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
          </Block>
        </Page>
      </View>
    </App>
  );
};

export default NotFoundPage;
