import React, { useEffect, useState } from "react";
import { Page, Navbar, List, ListItem } from "framework7-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const HajiList = (props) => {
  const { url } = props;

  const [data, setData] = useState([]);
  const getData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer TZbJfLLHN6ZOIAd0QRbY8zvQoREdlE07jnEIDMtD",
        },
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Ada Kesalahan");
    }
  };
  useEffect(() => {
    getData(url);
  }, []);
  return (
    <>
      <ToastContainer />
      <Page>
        <Navbar title="Haji List" backLink />
        <List>
          {data.map((item) => (
            <ListItem
              link={`/hajidetail`}
              className="border-b"
              key={item.id}
              routeProps={{ id: item.id }}
            >
              <div>{item.title ?? item.name}</div>
              <img slot="media" src="/icons/hajj.png" width="30" />
            </ListItem>
          ))}
        </List>
      </Page>
    </>
  );
};

export default HajiList;
