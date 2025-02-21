import { f7 } from "framework7-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { TbInfoCircle, TbTrash } from "react-icons/tb";
import { NumericFormat } from "react-number-format";

const ZakatProperti = (props) => {
  const { metalprices } = props;
  const [tanahdanBangunan, setTanahdanBangunan] = useState("");
  const [tanah, setTanah] = useState("");
  const [bahan, setBahan] = useState("");
  const [cash, setCash] = useState("");
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
        title: "Nishab Zakat Properti",
        text: `Karena zakat properti merupakan kelompok zakat tijarah, maka standar nishab zakat adalah senilai nishab emas yaitu 20 Dinar (setara dengan 77,5 gram menurut mazhab Syafi'i, Maliki, dan Hanbali).
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
      parseFloat(tanahdanBangunan || 0) +
      parseFloat(tanah || 0) +
      parseFloat(cash || 0) +
      parseFloat(bahan || 0) +
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
  }, [tanah, tanahdanBangunan, cash, bahan, piutang, utang]);
  const hapusHitungan = () => {
    setWajibZakat(0);
    setTanah("");
    setBahan("");
    setTanahdanBangunan("");
    setCash("");
    setPiutang("");
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
          <div className="mt-4 mb-2">Tanah dan Bangunan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={tanahdanBangunan}
              onChange={({ target }) => {
                setTanahdanBangunan(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
          <div className="mt-4 mb-2">Tanah</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={tanah}
              onChange={({ target }) => {
                setTanah(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
          <div className="mt-4 mb-2">Bahan Material Bangunan</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={bahan}
              onChange={({ target }) => {
                setBahan(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
          <div className="mt-4 mb-2">Uang Cash</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={cash}
              onChange={({ target }) => {
                setCash(target.value.replace(/Rp\.|,/g, "") || "0");
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
            (Nilai Tanah dan Properti + Nilai Tanah tanpa properti + Nilai bahan
            baku bangunan + Uang Cash Simpanan +Piutang Perusahaan - Utang
            Perusahaan) x 2,5%
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
export default ZakatProperti;
