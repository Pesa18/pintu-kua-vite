import moment from "moment";
import { useEffect, useState } from "react";

const KartuDigitalBack = () => {
  return (
    <div className="relative w-full h-full  bg-no-repeat object-cover  bg-auto bg-center mx-auto ">
      <img
        src="/images/Blanko_Kartu.jpeg"
        className="object-fill h-full w-full"
        alt=""
      />
      <div className="absolute top-[58px] lg:top-16 w-full mx-2 text-center h-1/2">
        <p className=" text-[10px] w-3/4 mx-auto text-justify italic">
          " Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
          pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa
          tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih
          sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
          tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
        </p>
        <p className="text-[10px] font-bold">(QS. Ar-Rum [30]:21)</p>
      </div>
    </div>
  );
};

export default KartuDigitalBack;
