import React, { useEffect, useState } from "react";
import { Page, Navbar, List, ListItem, NavLeft, Link } from "framework7-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { TbChevronLeft } from "react-icons/tb";

const DoaHaji = (props) => {
  const { url, title } = props;

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
      <Page>
        <Navbar innerClass="!bg-second !text-white">
          <NavLeft>
            <div className="flex flex-row items-center">
              <Link back color="white">
                <TbChevronLeft className="text-2xl" />
              </Link>

              <span className="font-bold text-xl">{title}</span>
            </div>
          </NavLeft>
        </Navbar>
        <List>
          {data.map((item) => (
            <ListItem
              link={`/doa-haji-list`}
              routeProps={{ id: item.id, title: item.name }}
              className="border-b"
            >
              <div>{item.name}</div>
              <img slot="media" src="/icons/quran.png" width="30" />
            </ListItem>
          ))}
        </List>
      </Page>
    </>
  );
};

export default DoaHaji;
