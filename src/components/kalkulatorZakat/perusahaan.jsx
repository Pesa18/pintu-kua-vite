import { f7 } from "framework7-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { TbInfoCircle, TbTrash } from "react-icons/tb";
import { NumericFormat } from "react-number-format";

const ZakataPerusahaan = (props) => {
  const { metalprices } = props;
  const [modal, setModal] = useState("");
  const [simpanan, setSimpanan] = useState("");
  const [piutang, setPiutang] = useState("");
  const [utang, setUtang] = useState("");
  const [wajibZakat, setWajibZakat] = useState(0);
  const nihsab = {
    emas: "77.5 gram",
    rupiah: metalprices.emas * 77.5,
  };
  const openInfo = () => {
    f7.dialog
      .create({
        title: "Nishab Zakat Perusahaan",
        text: `Karena zakat perusahaan merupakan kelompok zakat tijarah, maka standar nishab zakat adalah senilai nishab emas yaitu 20 Dinar (setara dengan 77,5 gram menurut mazhab Syafi'i, Maliki, dan Hanbali).
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

  const hitungZakat = () => {
    const jumlahUang =
      parseFloat(modal || 0) +
      parseFloat(simpanan || 0) +
      parseFloat(piutang || 0) -
      parseFloat(utang || 0);

    if (parseFloat(jumlahUang) > nihsab.rupiah) {
      const jumlah = parseFloat(jumlahUang) * (2.5 / 100);
      return setWajibZakat(new Intl.NumberFormat("id-ID").format(jumlah));
    }
    return setWajibZakat("Tidak Wajib Zakat");
  };

  useEffect(() => {
    hitungZakat();
  }, [modal, simpanan, piutang, utang]);
  const hapusHitungan = () => {
    setWajibZakat(0);
    setModal("");
    setPiutang("");
    setSimpanan("");
    setUtang("");
  };
  return (
    <div className="h-full">
      <div className=" h-36 bg-white border-b-8 border-gray-100 p-4 ">
        <div className="h-full bg-light rounded-lg p-4 " onClick={openInfo}>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col text-third">
              <div className="text-xs">Nishab Emas {nihsab.emas} </div>
              <div>
                <span className="text-xl font-bold">
                  Rp. {new Intl.NumberFormat("id-ID").format(nihsab.rupiah)}
                </span>
              </div>
            </div>
            <TbInfoCircle className="text-xl" />
          </div>
        </div>
      </div>
      <div className="  bg-white border-b-8 border-gray-100 p-4 ">
        <div className="  font-semibold mx-2 mb-2 ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold">Komponen yang Dihitung</span>
        </div>
        <div className="text-xs font-light mx-4 border-b-[1px] pb-4">
          Lengkapi seluruh isian berikut untuk menampilkan hasil zakat
        </div>
        <div className="mx-4">
          <div className="mt-4 mb-2">Modal Disertakan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={modal}
              onChange={({ target }) => {
                setModal(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
          <div className="mt-4 mb-2">Simpanan Laba Perusahaan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={simpanan}
              onChange={({ target }) => {
                setSimpanan(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
          <div className="mt-4 mb-2">Piutang Perusahaan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={piutang}
              onChange={({ target }) => {
                setPiutang(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
          <div className="mt-4 mb-2">Utang Perusahaan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={utang}
              onChange={({ target }) => {
                setUtang(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
        </div>
      </div>
      <div className="mt-3 mb-24 w-full px-4">
        <div className="  font-semibold mx-2 mb-2  border-b-[1px]  pb-4  ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold ">Besaran Zakat</span>
        </div>
        <div className="mx-4">
          <p>
            (Modal + Simpanan + Piutang (aktiva lancar) - Utang Perusahaan) x
            2,5%
          </p>
        </div>
      </div>
      <div className=" h-32 bg-white border shadow-xl sticky bottom-0  p-4 ">
        <div className="h-full flex flex-row justify-between items-center gap-4">
          <div className="h-2/3 w-full rounded-lg p-4 bg-light">
            <div className="text-lg font-bold text-third">
              <span>{wajibZakat}</span>
            </div>
          </div>
          <div className="bg-primary rounded-lg  p-4" onClick={hapusHitungan}>
            <TbTrash className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ZakataPerusahaan;
