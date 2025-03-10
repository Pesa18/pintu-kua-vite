import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  NavLeft,
  Link,
} from "framework7-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { use } from "react";
import { TbChevronLeft } from "react-icons/tb";

const DoaHajiDetail = (props) => {
  const { id, title } = props;
  const [data, setData] = useState([]);
  const getDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://kontenpusaka.kemenag.go.id/api/doa/contents/${id}?limit=20&page=1`,
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
      toast.error("Ada Kesalahan");
    }
  };
  useEffect(() => {
    getDetail(id);
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
      <div className="m-4 flex flex-col justify-center items-center gap-4">
        {data.map((item) => (
          <>
            {" "}
            <div className="font-lateef leading-relaxed text-3xl text-center">
              {item.arabic}
            </div>
            <div className="text-justify text-base">{item.translation}</div>
          </>
        ))}
      </div>
    </Page>
  );
};

export default DoaHajiDetail;
