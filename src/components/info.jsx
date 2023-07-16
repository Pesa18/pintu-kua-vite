import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card } from "framework7-react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export const InfoGraph = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"><div class="w-full h-full bg-primary rounded-full"></div></span>`;
    },
  };
  return (
    <>
      <div className=" ml-4 font-semibold">Info</div>
      <Swiper
        modules={[Pagination]}
        pagination={pagination}
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        className="h-52"
      >
        <SwiperSlide className=" w-1/2 h-1/2 overflow-hidden rounded-lg">
          <img
            src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/discovery-desktop/promo/2023/06/07/a1c3ba1f-04d4-41ee-9590-b2378309988f-1686121774997-c303a3e0b75d8fd702a89bcd64d39dd5.png"
            alt=""
            className=" object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className=" w-[50%]">
          <img
            src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/discovery-desktop/promo/2023/06/07/a1c3ba1f-04d4-41ee-9590-b2378309988f-1686121774997-c303a3e0b75d8fd702a89bcd64d39dd5.png"
            alt=""
            className="w-full h-full "
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
