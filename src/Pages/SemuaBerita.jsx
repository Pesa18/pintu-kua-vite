import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  List,
  ListItem,
  Navbar,
  Page,
} from "framework7-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/css/pagination-bullet.css";
import { Pagination } from "swiper/modules";
import moment from "moment";
const SemuaBerita = () => {
  const [semuaBerita, setSemuaBerita] = useState([]);
  const [beritaTrending, setBeritaTrending] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const getBerita = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/app/getarticles?page=${currentPage}&limit=${currentLimit}`,
        {
          headers: {
            accept: "application/json",
            Authenticated: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const newArticles = response.data.data.articles;
      setSemuaBerita((prevBerita) => {
        const existingIds = prevBerita.map((article) => article.uuid);
        const filteredNewArticles = newArticles.filter(
          (article) => !existingIds.includes(article.uuid)
        );
        return [...prevBerita, ...filteredNewArticles];
      });
      setBeritaTrending(response.data.data.articlesTrending);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getBeritaPagination = async (page, limit) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/app/getarticles?page=${page}&limit=${limit}`,
        {
          headers: {
            accept: "application/json",
            Authenticated: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const newArticles = response.data.data.articles;
      setSemuaBerita((prevBerita) => {
        const existingIds = prevBerita.map((article) => article.uuid);
        const filteredNewArticles = newArticles.filter(
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
    getBerita();
  }, []);
  useEffect(() => {
    getBeritaPagination(currentPage, currentLimit);
  }, [currentPage, currentLimit]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} !bg-white !opacity-100 !w-1.5 !h-1.5 !mx-0.5 " > </span>`;
    },
  };
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <Page name="semua-berita">
      <Navbar backLink title="Berita & Artikel" transparent></Navbar>
      <div className="mx-5 mb-4">Trending</div>
      <Swiper
        className="overflow-hidden rounded-lg !mx-5 h-64 "
        pagination={pagination}
        modules={[Pagination]}
      >
        {beritaTrending ? (
          beritaTrending.map((item) => (
            <SwiperSlide key={item.uuid} className="">
              <Link
                href={`/berita/${item.slug}`}
                routeProps={item}
                className="h-full w-full"
                external
              >
                <Card className="h-full w-full !m-0" padding={false}>
                  <CardContent padding={false} className="h-full w-full">
                    <div
                      style={{
                        background: `url(${
                          import.meta.env.VITE_APP_FILE + item.image
                        }) no-repeat center`,
                        backgroundSize: "cover",
                        height: "100%",
                      }}
                    >
                      <CardHeader textColor="white"></CardHeader>
                      <div className="absolute w-full h-2/5  bottom-0 opacity-60 bg-gradient-to-t from-black from-70% "></div>
                      <div className="absolute bottom-5 text-white  w-full h-2/5 mx-2">
                        <div className="bg-second rounded-md relative inline-block p-1 text-xs">
                          {item.categories.name}
                        </div>
                        <div className="text-lg line-clamp-2 z-auto">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <></>
        )}
      </Swiper>
      <div className="mx-5 my-4"> Berita Terbaru</div>
      {semuaBerita ? (
        semuaBerita.map((item) => (
          <List mediaList className="px-2 !m-2" key={item.uuid}>
            <ListItem
              className="!bg-white border rounded-lg shadow"
              href={`/berita/${item.slug}`}
              routeProps={item}
              noChevron
              external
            >
              <img
                src={import.meta.env.VITE_APP_FILE + item.image}
                slot="media"
                alt=""
                width="80"
                className="!rounded-lg object-cover h-20 w-20"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-second inline-block max-w-max rounded-md p-1 text-white">
                    {item.categories.name}
                  </div>
                  <div className="text-xs font-extralight">
                    {moment(item.published_at).format("D MMMM YYYY")}
                  </div>
                </div>
                <div className="line-clamp-2 ">{item.title}</div>
              </div>
            </ListItem>
          </List>
        ))
      ) : (
        <List>
          <ListItem>
            <div className="text-center">Tidak ada berita</div>
          </ListItem>
        </List>
      )}

      <Button
        outline
        className="!mb-6 !mt-4 !mx-4 !text-primary !border-primary"
        onClick={loadMore}
        disabled={loading}
      >
        {loading ? "Memuat..." : "Lihat Lebih Banyak"}
      </Button>
    </Page>
  );
};

export default SemuaBerita;
