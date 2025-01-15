import React, { useEffect, useState } from "react";
import { Page, Navbar, BlockTitle, Block } from "framework7-react";
import { ToastContainer, toast } from "react-toastify";
import { use } from "react";
import axios from "axios";

const HajiDetail = (props) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  const { id } = props;
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
      <Navbar title="Haji Detail" backLink="Back" />
      <ToastContainer />
      <div
        className="m-4"
        dangerouslySetInnerHTML={createMarkup(data.content)}
      ></div>
    </Page>
  );
};

export default HajiDetail;
