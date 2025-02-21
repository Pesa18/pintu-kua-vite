import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Button,
  Link,
  NavLeft,
} from "framework7-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbChevronLeft, TbLocation, TbLocationFilled } from "react-icons/tb";

const ZiarahDetail = (props) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  const { id, title } = props;
  const [data, setData] = useState([]);
  const getData = async (id) => {
    try {
      const response = await axios(
        `https://kontenpusaka.kemenag.go.id/api/ziarah/${id}`,
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
      {data.image && (
        <div className="w-full h-80 mx-auto">
          <img
            src={data.image.full}
            className="h-full w-full mx-auto object-fill"
            alt={data.name}
          />
        </div>
      )}
      <Block strong>
        <div dangerouslySetInnerHTML={createMarkup(data.description)}></div>
      </Block>

      <Button className="!mx-4 !mb-7 !bg-second" fill external href={data.maps}>
        <TbLocationFilled /> Lokasi
      </Button>
    </Page>
  );
};

export default ZiarahDetail;
