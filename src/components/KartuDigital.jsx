import moment from "moment";
import { useEffect, useState } from "react";

const KartuDigital = (props) => {
  const { datanikah } = props;
  const [dataKartu, setDataKartu] = useState("");
  useEffect(() => {
    if (datanikah) {
      setDataKartu(datanikah);
    }
  }, [datanikah]);
  return (
    <div className="relative w-full h-full bg-no-repeat object-cover  bg-auto bg-center mx-auto ">
      <img
        src="/images/Blanko_Kartu.jpeg"
        className="object-fill h-full w-full"
        alt=""
      />
      <div className="absolute top-[69px] lg:top-20 w-full mx-2">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2">
            <div className="h-16">
              <img src="/images/blank.png" className="h-full" alt="" />
            </div>
            <div className="h-16">
              <img src="/images/blank.png" className="h-full" alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-1 font-sans">
            <div className="text-xs">
              Nama Suami <br />{" "}
              <span className="font-bold ">{dataKartu.nama_suami}</span>
            </div>
            <div className="text-xs">
              Nama Istri <br />{" "}
              <span className="font-bold ">{dataKartu.nama_istri}</span>
            </div>
            <div className="text-xs">
              Tanggal Akad <br />{" "}
              <span className="font-bold ">
                {moment(dataKartu.tgl_akad).format("DD MMMM YYYY")}
              </span>
            </div>
            <div className="text-xs">
              No Akta
              <br /> <span className="font-bold ">{dataKartu.no_akta}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-4 h-12 sm:h-16 ">
        <img className="h-full" src={dataKartu.qrcode} alt="" />
      </div>
    </div>
  );
};

export default KartuDigital;
