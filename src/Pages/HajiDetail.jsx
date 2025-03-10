import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Link,
  NavLeft,
} from "framework7-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { TbChevronLeft } from "react-icons/tb";

const HajiDetail = (props) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  const { id, title } = props;
  const [data, setData] = useState([]);
  const getDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://kontenpusaka.kemenag.go.id/api/haji/${id}`
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
      <div
        className="m-4"
        dangerouslySetInnerHTML={createMarkup(data.content)}
      ></div>
    </Page>
  );
};

export default HajiDetail;
