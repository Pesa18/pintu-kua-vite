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

const HeadlineNews = ({ dataApp }) => {
  return (
    <div className="px-2 pt-3  bg-slate-100">
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="  font-semibold ">
          <span className=" bg-greenday p-0.5 mr-1"></span>Berita
        </div>
        <div className="text-xs text-primary">Lihat Semua</div>
      </div>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className=" !w-full  ">
        {dataApp.articles.map((item) => (
          <SwiperSlide className="!w-1/2 md:!w-1/3 !h-52 !mb-2" key={item.id}>
            {" "}
            <Card color="white" className="!mx-0 !mt-0 !mb-24  shadow-lg ">
              <Link
                href="/detail-berita"
                className="w-full overflow-hidden"
                routeProps={item}
              >
                <div className="!text-bluegreen w-full ">
                  <CardHeader
                    className=" !mx-3 w-full  !top-2 !rounded-lg !h-28   !bg-cover"
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
                  <CardContent className="">
                    <p className="date line-clamp-2">{item.title}</p>
                  </CardContent>
                </div>
              </Link>
            </Card>
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
