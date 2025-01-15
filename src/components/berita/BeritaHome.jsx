import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Sheet,
  Button,
  PageContent,
  Block,
  BlockTitle,
  SkeletonBlock,
  Link,
} from "framework7-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import moment from "moment";
import "moment/dist/locale/id";

moment.localeData("id");

const HeadlineNews = ({ dataApp }) => {
  return (
    <div className="px-2 pt-3  bg-slate-100  ">
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="  font-semibold ">
          <span className=" bg-greenday p-0.5 mr-1"></span>Artikel & Berita
        </div>
        <Link href="berita">
          <div className="text-xs text-primary">Lihat Semua</div>
        </Link>
      </div>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className=" !w-full  ">
        {dataApp.articles.map((item) => (
          <SwiperSlide
            className="!w-2/3 md:!w-1/3 !h-60 !mb-44"
            key={item.uuid}
          >
            {" "}
            <Link
              href={`/berita/${item.slug}`}
              className="w-full h-full mt-10"
              routeProps={item}
              external
            >
              <Card
                color="white"
                className="!mx-0 !mt-0 !h-full !w-full   shadow-lg "
              >
                <CardHeader
                  className="!h-2/3 !bg-cover bg-center !bg-no-repeat "
                  valign="bottom"
                  style={{
                    backgroundImage: `url(${
                      import.meta.env.VITE_APP_FILE + item.image
                    })`,
                  }}
                >
                  <div className="bg-bluegreen text-white py-0.5 px-1 text-[9px] rounded-lg absolute top-2 left-1 ">
                    {item.categories.name}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-[10px] font-extralight">
                    {moment(item.published_at).format("D MMMM YYYY")}
                  </div>
                  <div className="line-clamp-1">{item.title}</div>
                  <div className="font-extralight text-xs line-clamp-2">
                    {item.description}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const SkletonHeadlines = () => {
  return (
    <>
      <div className="flex flex-row">
        <Card className="!mx-2 !mt-0 !bg-slate-50 !mb-24 w-1/2 shadow-lg ">
          <CardHeader
            className="  !top-2 !rounded-lg   !bg-cover"
            valign="bottom"
          >
            <SkeletonBlock className="!h-24 ml-2  rounded-xl  skeleton-effect-wave" />
          </CardHeader>
          <CardContent>
            <SkeletonBlock className="!h-4 ml-2 skeleton-effect-wave rounded-sm mb-1 " />
            <SkeletonBlock className="!h-4 ml-2 !w-1/2 skeleton-effect-wave rounded-sm " />
          </CardContent>
        </Card>
        <Card className="!mx-2 !mt-0 !bg-slate-50 !mb-24 w-1/2 shadow-lg ">
          <CardHeader
            className="  !top-2 !rounded-lg   !bg-cover"
            valign="bottom"
          >
            <SkeletonBlock className="!h-24 ml-2  rounded-xl  skeleton-effect-wave" />
          </CardHeader>
          <CardContent>
            <SkeletonBlock className="!h-4 ml-2 skeleton-effect-wave rounded-sm mb-1 " />
            <SkeletonBlock className="!h-4 ml-2 !w-1/2 skeleton-effect-wave rounded-sm " />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HeadlineNews;
