import { Page, Navbar, List, ListItem, NavLeft, Link } from "framework7-react";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { TbChevronLeft } from "react-icons/tb";

const DoaHajiList = (props) => {
  const [data, setData] = useState([]);
  const { id, title } = props;
  const getData = async (id) => {
    try {
      const response = await axios(
        `https://kontenpusaka.kemenag.go.id/api/doa/haji/${id}?limit=20&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer TZbJfLLHN6ZOIAd0QRbY8zvQoREdlE07jnEIDMtD",
          },
        }
      );

      console.log(response.data.data);

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("DoaHajiList");
    getData(id);
  }, []);
  return (
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
        {data.map((item, index) => (
          <ListItem
            link={`/doa-haji-detail`}
            routeProps={{ id: item.id, title: item.name }}
            className="border-b"
            key={item.id}
          >
            <div>{item.name}</div>
            <div
              slot="media"
              className="h-7 w-8 bg-contain bg-no-repeat bg-center flex justify-center items-center"
              style={{ backgroundImage: "url('/icons/ayat.svg')" }}
            >
              <div className="text-center   text-xs text-third">
                <div>{index + 1}</div>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Page>
  );
};

export default DoaHajiList;
