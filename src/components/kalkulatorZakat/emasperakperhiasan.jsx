import { useEffect, useRef, useState } from "react";
import { TbInfoCircle, TbTrash } from "react-icons/tb";
import { NumericFormat } from "react-number-format";
import { f7 } from "framework7-react";
import moment from "moment";
const ZakatEmas = (props) => {
  const targetValueEmas = useRef(null);
  const targetValuePerak = useRef(null);

  const clearValue = () => {
    if (targetValueEmas.current) {
      targetValueEmas.current.value = ""; // Kosongkan input emas
    }
    if (targetValuePerak.current) {
      targetValuePerak.current.value = ""; // Kosongkan input perak
    }
  };

  const { metalprices } = props;
  const nishab = {
    emas: {
      gram: 77.5,
      rupiah: metalprices.emas * 77.5,
      pergram: metalprices.emas,
    },
    perak: {
      gram: 543.35,
      rupiah: metalprices.perak * 543.35,
      pergram: metalprices.perak,
    },
  };
  const [wajibEmas, setWajibEmas] = useState({
    rupiah: 0,
  });
  const [wajibPerak, setWajibPerak] = useState({
    rupiah: 0,
  });
  const [wajibZakat, setWajibZakat] = useState(0);
  const openInfoEmas = () => {
    f7.dialog
      .create({
        title: "Nishab Zakat Perdagangan",
        text: ` Nishab emas adalah 20 Dinar (setara dengan 77,5 gram menurut mazhab Syafi'i, Maliki, dan Hanbali).
Harga emas senilai Rp. 1426220/gr (pertanggal ${moment().format(
          " dddd DD MMMM YYYY"
        )}).`,
        buttons: [
          {
            text: "Oke",
            cssClass: "!bg-primary !text-white !mx-auto !rounded-lg !w-2/3",
          },
        ],
        cssClass: "!rounded-lg !bg-light",
        closeByBackdropClick: true,
      })
      .open();
  };
  const openInfoPerak = () => {
    f7.dialog
      .create({
        title: "Nishab Zakat Perdagangan",
        text: ` Nishab perak adalah 200 Dirham (setara dengan 543,35 gram menurut mazhab Syafi'i, Maliki, dan Hanbali).
Harga emas senilai Rp. 16179/gr (pertanggal ${moment().format(
          " dddd DD MMMM YYYY"
        )}).`,
        buttons: [
          {
            text: "Oke",
            cssClass: "!bg-primary !text-white !mx-auto !rounded-lg !w-2/3",
          },
        ],
        cssClass: "!rounded-lg !bg-light",
        closeByBackdropClick: true,
      })
      .open();
  };
  const hitungEmas = (value) => {
    const emas = parseFloat(value);

    if (emas > nishab.emas.gram) {
      const wajibZakatEmas = emas * (2.5 / 100);

      const wajibZakatRupiah = wajibZakatEmas * nishab.emas.pergram;

      return setWajibEmas({
        emas: wajibZakatEmas.toFixed(2),
        rupiah: wajibZakatRupiah.toFixed(2),
      });
    }
    return setWajibEmas({
      emas: 0,
      rupiah: 0,
    });
  };
  const hitungPerak = (value) => {
    const perak = parseFloat(value);

    if (perak > nishab.perak.gram) {
      const wajibZakatPerak = perak * (2.5 / 100);

      const wajibZakatRupiah = wajibZakatPerak * nishab.perak.pergram;

      return setWajibPerak({
        perak: wajibZakatPerak.toFixed(2),
        rupiah: wajibZakatRupiah.toFixed(2),
      });
    }
    return setWajibPerak({
      perak: 0,
      rupiah: 0,
    });
  };

  useEffect(() => {
    setWajibZakat(
      parseFloat(
        parseFloat(wajibPerak.rupiah) + parseFloat(wajibEmas.rupiah)
      ) || 0
    );
  }, [wajibEmas, wajibPerak]);

  // useEffect(() => {
  //   if (metalprices) {
  //     setMetalprice({
  //       emas: {
  //         nishab: metalprices.emas * nishab.emas.gram,
  //         pergram: metalprices.emas,
  //       },
  //       perak: {
  //         nishab: metalprices.perak * nishab.perak.pergram,
  //         pergram: metalprices.perak,
  //       },
  //     });
  //   }
  // }, [metalprices]);
  return (
    <div className="h-full w-full">
      <div className="h-36 w-full bg-white border-b-8 border-gray-100 p-4 flex gap-2">
        {/* Nishab Emas */}
        <div
          className="h-full bg-light rounded-lg p-4 flex-1 min-w-0 flex flex-col justify-between overflow-hidden"
          onClick={openInfoEmas}
        >
          <div className="text-xs text-third">
            Nishab Emas {nishab.emas.gram} gram
          </div>
          <div>
            <span className="text-lg font-bold">
              Rp.
              {new Intl.NumberFormat("id-ID").format(
                metalprices.emas * nishab.emas.gram
              )}
            </span>
          </div>
        </div>

        {/* Nishab Perak */}
        <div
          className="h-full bg-light rounded-lg p-4 flex-1 min-w-0 flex flex-col justify-between overflow-hidden"
          onClick={openInfoPerak}
        >
          <div className="text-xs text-third">
            Nishab Perak {nishab.perak.gram} gram
          </div>
          <div>
            <span className="text-lg font-bold">
              Rp.
              {new Intl.NumberFormat("id-ID").format(
                metalprices.perak * nishab.perak.gram
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="  bg-white border-b-8 border-gray-100 p-4 ">
        <div className="  font-semibold mx-2 mb-2  border-b-[1px]  pb-4  ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold ">Emas</span>
        </div>
        <div className="mx-4">
          <div className="mt-4 mb-2">Jumlah Emas yang Tersimpan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              getInputRef={targetValueEmas}
              onChange={({ target }) => {
                hitungEmas(target.value.replace(/,|gram/g, "") || "0");
              }}
              thousandSeparator
              suffix="gram"
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
        </div>
        <div className="mx-4 my-4">
          <div>Zakat yang Wajib Dibayarkan</div>
          <div>
            <span>
              {wajibEmas.emas ?? 0} gram emas = Rp. {wajibEmas.rupiah ?? 0}
            </span>
          </div>
        </div>
      </div>
      <div className="  bg-white border-b-8 border-gray-100 p-4 ">
        <div className="  font-semibold mx-2 mb-2  border-b-[1px]  pb-4  ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold ">Perak </span>
        </div>
        <div className="mx-4">
          <div className="mt-4 mb-2">Jumlah Emas yang Tersimpan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              getInputRef={targetValuePerak}
              onChange={({ target }) => {
                hitungPerak(target.value.replace(/,|gram/g, "") || "0");
              }}
              thousandSeparator
              suffix="gram"
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
        </div>
        <div className="mx-4 my-4">
          <div>Zakat yang Wajib Dibayarkan</div>
          <div>
            <span>
              {wajibPerak.perak ?? 0} gram emas = Rp. {wajibPerak.rupiah ?? 0}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-24 w-full px-4 hf bg-white">
        <div className="  font-semibold mx-2 mb-2  border-b-[1px]  pb-4  ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold ">Besaran Zakat</span>
        </div>

        <div className="flex flex-col gap-4 mx-2 mt-5">
          <div className="flex flex-col">
            <div className="font-bold text-lg">Emas</div>
            <div className="font-light text-lg">
              Jumlah emas yang tersimpan selama 1 tahun x 2,5%
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-lg">Perak</div>
            <div className="font-light text-lg">
              Jumlah perak yang tersimpan selama 1 tahun x 2,5%
            </div>
          </div>
        </div>
      </div>
      <div className=" h-32 bg-white border shadow-xl sticky bottom-0  p-4 ">
        <div className="h-full flex flex-row justify-between items-center gap-4">
          <div className="h-2/3 w-full rounded-lg p-4 bg-light">
            <div className="text-lg font-bold text-third">
              <span>
                Rp.{new Intl.NumberFormat("id-ID").format(wajibZakat)}
              </span>
            </div>
          </div>
          <div
            className="bg-primary rounded-lg  p-4"
            onClick={() => {
              setWajibZakat(0);
              clearValue();
            }}
          >
            <TbTrash className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatEmas;
