import { Block } from "framework7-react";
import PrayerTime from "./prayerTime";

export const ShalatCard = ({ kota }) => {
  return (
    <>
      <Block
        className=" w-[90%] translate-y-7 !bg-[#22577a] sm:translate-y-9  h-1/2 "
        strong
        inset
        style={{
          position: "absolute",
          margin: "0px",
          opacity: "10%",
        }}
      ></Block>
      <Block
        className=" w-[94%] translate-y-8 !bg-[#22577a]  sm:translate-y-8 h-1/2 "
        strong
        inset
        style={{
          position: "absolute",
          margin: "0px",
          opacity: "20%",
        }}
      ></Block>
      <Block
        className=" w-[98%] translate-y-9 !bg-[#22577a]  sm:translate-y-7 h-1/2 "
        strong
        inset
        style={{
          position: "absolute",
          margin: "0px",
          opacity: "30%",
        }}
      ></Block>

      <Block
        className="bg-cover relative !bg-bluegreen bg-center rounded-xl overflow-hidden shadow-xl  justify-around w-full   h-40 "
        strong
      >
        <img
          className="absolute object-cover  w-full h-full  inset-0 mix-blend-multiply opacity-30    "
          src="/images/bg-shalat.jpg"
          alt=""
        />

        <div className="flex flex-col justify-between h-full text-white mix-blend-screen">
          <PrayerTime dataKota={kota} />
        </div>
      </Block>
      <div className="absolute z-50  -top-9 -right-10">
        <img src="/images/3d-masjid2.png" alt="" className="h-64" />
      </div>
    </>
  );
};
