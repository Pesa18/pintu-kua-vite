import { f7 } from "framework7-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { TbInfoCircle, TbTrash } from "react-icons/tb";
import { NumericFormat } from "react-number-format";

const ZakatProfesi = (props) => {
  const { metalprices } = props;
  const [gaji, setGaji] = useState("");

  const [wajibZakat, setWajibZakat] = useState(0);
  const nihsab = {
    emas: "77.5 gram",
    rupiah: metalprices.emas * 77.5,
  };
  const openInfo = () => {
    f7.dialog
      .create({
        title: "Nishab Zakat Profesi",
        text: `Karena zakat profesi merupakan kelompok zakat tijarah, maka standar nishab zakat adalah senilai nishab emas yaitu 20 Dinar (setara dengan 77,5 gram menurut mazhab Syafi'i, Maliki, dan Hanbali).
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
    const jumlahUang = parseFloat(gaji || 0);

    if (parseFloat(jumlahUang) > nihsab.rupiah) {
      const jumlah = parseFloat(jumlahUang) * (2.5 / 100);
      return setWajibZakat(new Intl.NumberFormat("id-ID").format(jumlah));
    }
    return setWajibZakat("Tidak Wajib Zakat");
  };

  useEffect(() => {
    hitungZakat();
  }, [gaji]);
  const hapusHitungan = () => {
    setWajibZakat(0);
    setGaji("");
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
          <span className="font-bold">Akumulasi Gaji</span>
        </div>
        <div className="text-xs font-light mx-4 border-b-[1px] pb-4">
          Lengkapi seluruh isian berikut untuk menampilkan hasil zakat
        </div>
        <div className="mx-4">
          <div className="mt-4 mb-2">
            Nilai Akhir Gaji Bulanan dan Terkumpul dalam 1 tahun
          </div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              //   getInputRef={targetValue}
              value={gaji}
              onChange={({ target }) => {
                setGaji(target.value.replace(/Rp\.|,/g, "") || "0");
              }}
              thousandSeparator
              prefix="Rp."
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>
        </div>
      </div>
      <div className="mt-3 mb-24 w-full px-4 h-1/3">
        <div className="  font-semibold mx-2 mb-2  border-b-[1px]  pb-4  ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold ">Besaran Zakat</span>
        </div>
        <div className="mx-4">
          <p>
            Total Nilai Akumulasi Gaji / pendapatan yang terkumpul dalam 1 tahun
            karier dan masih tersimpan dalam tabungan x 2,5%
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
export default ZakatProfesi;
