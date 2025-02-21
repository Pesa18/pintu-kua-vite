import axios from "axios";
import {
  Button,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  Page,
  Searchbar,
  SkeletonBlock,
} from "framework7-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { TbChevronLeft } from "react-icons/tb";

const KhutbahList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [dataKhutbah, setDataKhutbah] = useState([]);
  const [loading, setLoading] = useState(false);
  const getKhutbah = async (search) => {
    setLoading;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/app/khutbah?search=${search}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: import.meta.env.VITE_API_KEY,
          },
        }
      );

      setDataKhutbah(response.data.khutbah);
    } catch (error) {
      console.log(error);
    } finally {
      setPage(1);
      setLimit(5);
      setLoading(false);
    }
  };
  const getKhutbahPagination = async (page, limit, search) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/app/khutbah?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const newDataKhutbah = response.data.khutbah;
      setDataKhutbah((prevBerita) => {
        const existingIds = prevBerita.map((article) => article.uuid);
        const filteredNewArticles = newDataKhutbah.filter(
          (article) => !existingIds.includes(article.uuid)
        );
        return [...prevBerita, ...filteredNewArticles];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getKhutbah(search);
  }, [search]);
  useEffect(() => {
    getKhutbahPagination(page, limit, search);
  }, [page, limit]);
  return (
    <Page>
      <Navbar innerClass="!bg-second !text-white">
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Khutbah</span>
          </div>
        </NavLeft>
      </Navbar>
      <Searchbar
        className="mt-5 !rounded-md"
        color="teal"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onClickClear={() => {
          setSearch("");
        }}
        placeholder="Cari Khutbah"
        onClickDisable={() => {
          setSearch("");
        }}
      ></Searchbar>
      <List noChevron inset>
        {dataKhutbah ? (
          dataKhutbah.map((item) => (
            <ListItem
              link={`/khutbah/${item.slug}`}
              routeProps={item}
              className="!border-b"
              key={item.uuid}
            >
              <div className="flex flex-col gap-2">
                <div
                  className="bg-primary inline-block  text-white   text-[9px] rounded-full p-1"
                  style={{ width: "fit-content" }}
                >
                  {item.categories.name}
                </div>
                <div>{item.title}</div>
                <div className="text-xs font-light text-slate-700">
                  {moment(item.published_at).format("dddd, D MMMM YYYY")}
                </div>
              </div>
              <img
                src={import.meta.env.VITE_APP_FILE + item.image}
                alt=""
                className="w-16 h-16 rounded-lg"
              />
            </ListItem>
          ))
        ) : (
          <></>
        )}
        {loading ? (
          <>
            <ListItem link={"#"} className="!border-b skeleton-text">
              <div className="flex flex-col gap-2">
                <div
                  className=" inline-block  text-white   text-[9px] rounded-full p-1"
                  style={{ width: "fit-content" }}
                >
                  khutbah
                </div>
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, ea!
                </div>
                <div className="text-xs font-light text-slate-700">
                  {moment().format("dddd, D MMMM YYYY")}
                </div>
              </div>
              <SkeletonBlock className="!h-16 !w-16 rounded-lg"></SkeletonBlock>
            </ListItem>
            <ListItem link={"#"} className="!border-b skeleton-text">
              <div className="flex flex-col gap-2">
                <div
                  className=" inline-block  text-white   text-[9px] rounded-full p-1"
                  style={{ width: "fit-content" }}
                >
                  khutbah
                </div>
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, ea!
                </div>
                <div className="text-xs font-light text-slate-700">
                  {moment().format("dddd, D MMMM YYYY")}
                </div>
              </div>
              <SkeletonBlock className="!h-16 !w-16 rounded-lg"></SkeletonBlock>
            </ListItem>
            <ListItem link={"#"} className="!border-b skeleton-text">
              <div className="flex flex-col gap-2">
                <div
                  className=" inline-block  text-white   text-[9px] rounded-full p-1"
                  style={{ width: "fit-content" }}
                >
                  khutbah
                </div>
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, ea!
                </div>
                <div className="text-xs font-light text-slate-700">
                  {moment().format("dddd, D MMMM YYYY")}
                </div>
              </div>
              <SkeletonBlock className="!h-16 !w-16 rounded-lg"></SkeletonBlock>
            </ListItem>
          </>
        ) : (
          <></>
        )}
      </List>

      {dataKhutbah.length > 4 && (
        <Button
          fill
          onClick={() => setPage(page + 1)}
          className="!mb-6 !bg-second"
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Lihat Lebih Banyak</div>
          </div>
        </Button>
      )}
    </Page>
  );
};

export default KhutbahList;
