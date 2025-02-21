import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Button,
  Card,
  PageContent,
  Sheet,
  SkeletonBlock,
} from "framework7-react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { MdArrowForwardIos } from "react-icons/md";

export const InfoGraph = ({ banner }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"><div class="w-full h-full bg-primary rounded-full"></div></span>`;
    },
  };
  return (
    <div className="px-2 mb-2">
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="  font-semibold ">
          <span className=" bg-greenday p-0.5 mr-1"></span>Info KUA
        </div>
        <div className="text-xs text-primary">Lihat Semua</div>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={pagination}
        slidesPerView={"auto"}
        spaceBetween={10}
        className=" !w-full  "
      >
        {banner.map((item) => (
          <SwiperSlide className=" !w-[80%] !h-44" key={item.id}>
            <img
              src={`${import.meta.env.VITE_APP_FILE + item.image_path}`}
              alt=""
              className=" !object-cover w-full !h-36 rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const InfoKlik = () => {
  return (
    <>
      <div className="w-full  bg-yellow-100 bg-cover mb-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col p-2 gap-2">
            <div className="font-extrabold text-lg text-bluegreen">
              Konsultasi tentang keluarga?
            </div>
            <div className="text-[10px] font-light">
              Tanya KUA aja! yuk lihat apa saja yang bisa di konsultasikan di
              KUA.
            </div>
            <div className="">
              <Button
                fill
                sheetOpen={".sheet-konsul"}
                className="!bg-bluegreen"
              >
                Konsultasi
              </Button>
            </div>
          </div>
          <img src="/images/3d-konsul.png" className="h-40" alt="" />
        </div>
      </div>

      <Sheet
        backdrop={true}
        className="sheet-konsul"
        style={{ height: "auto" }}
        swipeToClose
        push
      >
        <div className="w-10 h-1.5 rounded-full mx-auto bg-slate-600 mt-0.5"></div>
        <PageContent className="!h-72">
          <div className="p-4">
            <div>Ada Apa saja</div>
            <Button fill href="/konsultasi" sheetClose>
              Mulai Konsultasi
            </Button>
          </div>
        </PageContent>
      </Sheet>
    </>
  );
};

export const SkeletonBanner = () => {
  return (
    <>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className=" !w-full  ">
        <SwiperSlide className=" !w-[80%] !h-40">
          <SkeletonBlock className="!h-36 rounded-xl skeleton-effect-wave" />
        </SwiperSlide>
        <SwiperSlide className=" !w-[80%] !h-40">
          <SkeletonBlock className="!h-36 rounded-xl skeleton-effect-wave" />
        </SwiperSlide>
        ;
      </Swiper>
    </>
  );
};
