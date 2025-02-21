import { Textarea, TextInput } from "flowbite-react";
import { List, ListItem, ListInput, f7 } from "framework7-react";
import { useEffect, useRef, useState } from "react";
import { TbInfoCircle, TbTrash } from "react-icons/tb";
import { NumericFormat } from "react-number-format";

const ZakatPertanian = () => {
  const nishab = [
    {
      beras_putih: 815.758,
      padi_gagang: 1631.516,
      padi_kretek: 1323.132,
      kacang_hijau: 780.036,
      kacang_tunggak: 756.697,
    },
  ];
  const targetValue = useRef(null);
  const JenisValue = useRef(null);
  const [thisNishab, setThisNishab] = useState(nishab[0].beras_putih);
  const [inputValue, setInputValue] = useState(0);
  const [jenisPengairan, setJenisPengairan] = useState(5);
  const [jenisPertanian, setJenisPertanian] = useState(null);
  const [satuanBerat, setSatuanBerat] = useState("Kg");
  const [Jumlah, setJumlah] = useState("0");
  let tonToKg = (ton) => {
    const cleanedKuintal = ton.replace(/,/g, "");
    return parseFloat(cleanedKuintal) * 1000;
  };
  let kuintalToKg = (kuintal) => {
    const cleanedKuintal = kuintal.replace(/,/g, "");
    return parseFloat(cleanedKuintal) * 100;
  };
  const jumlahJenisPengairan = (value) => {
    const cleanedKuintal = value.replace(/,/g, "");
    let Jumlah =
      parseFloat(cleanedKuintal) * (parseFloat(jenisPengairan) / 100);
    return Jumlah.toFixed(2);
  };
  const hitungZakat = (value) => {
    switch (satuanBerat) {
      case "Kuintal":
        if (kuintalToKg(value) > thisNishab) {
          const jumlah = jumlahJenisPengairan(value);
          return setJumlah(jumlah + satuanBerat);
        }
        return setJumlah("Tidak Wajib Zakat");
      case "Ton":
        if (tonToKg(value) > thisNishab) {
          const jumlah = jumlahJenisPengairan(value);
          return setJumlah(jumlah + satuanBerat);
        }
        return setJumlah("Tidak Wajib Zakat");
      default:
        const cleanedKuintal = value.replace(/,/g, "");
        const kg = parseFloat(cleanedKuintal);
        if (kg > thisNishab) {
          let Jumlah =
            parseFloat(cleanedKuintal) * (parseFloat(jenisPengairan) / 100);
          return setJumlah(Jumlah.toFixed(2) + satuanBerat);
        }
        return setJumlah("Tidak Wajib Zakat");
    }
  };

  const openInfo = () => {
    f7.dialog
      .create({
        title: "Nishab Zakat Pertanian",
        text: `Kadar nishab zakat zuru' (pertanian), adalah 5 wasaq. 1 wasaq adalah setara 60 sha'. 1 sha' sama dengan 4 mud. Berdasarkan Kitab Fathu al-Qadir fi 'Ajaib al-Maqadir, Karya Mbah Kyai Ma'shum, Kwaron, Diwek Jombang, diketahui pendekatan berat 1 mud, adalah sebagai berikut: \n
- 1 Mud beras putih = 679,79 gram - 1 sha' beras putih = 2718,19 gram = 2,72 kg 
- 1 Nishab Beras Putih = 815,758 kg - 1 Nishab Kacang Hijau = 780,036 kg - 1 Nishab Kacang Tunggak = 756,697 kg
- 1 Nishab Padi = 1631,516 kg Gabah Kering
- 1 Nishab Padi Kretek = 1323,132 Gabah Kering`,
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
  useEffect(() => {
    if (inputValue) {
      hitungZakat(inputValue);
    }
  }, [jenisPertanian, jenisPengairan, inputValue, satuanBerat, thisNishab]);
  useEffect(() => {
    if (JenisValue) {
      setJenisPertanian(JenisValue.current.value);
    }
  }, []);
  return (
    <div className="h-full">
      <div className=" h-36 bg-white border-b-8 border-gray-100 p-4 ">
        <div className="h-full bg-light rounded-lg p-4 " onClick={openInfo}>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col text-third">
              <div className="text-xs">Nishab {jenisPertanian}</div>
              <div>
                <span className="text-xl font-bold">{thisNishab}</span> Kg{" "}
                {jenisPertanian}
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
        <List className="!z-0">
          <ListItem
            title="Jenis Pertanian"
            smartSelect
            smartSelectParams={{ openIn: "sheet" }}
            className="bg-slate-100 rounded-lg"
            color="green"
            colorTheme="green"
          >
            <select
              color="green"
              name="jenis-pertanian"
              onChange={({ target }) => {
                switch (target.value) {
                  case "Beras Putih":
                    setJenisPertanian(target.value);
                    setThisNishab(nishab[0].beras_putih);
                    break;
                  case "Padi Gagang":
                    setJenisPertanian(target.value);
                    setThisNishab(nishab[0].padi_gagang);
                    break;
                  case "Padi Kretek":
                    setJenisPertanian(target.value);
                    setThisNishab(nishab[0].padi_kretek);
                    break;
                  case "Kacang Hijau":
                    setJenisPertanian(target.value);
                    setThisNishab(nishab[0].kacang_hijau);
                    break;
                  case "Kacang Tunggak":
                    setJenisPertanian(target.value);
                    setThisNishab(nishab[0].kacang_tunggak);
                    break;

                  default:
                    break;
                }
              }}
              ref={JenisValue}
              defaultValue={"Beras Putih"}
            >
              <option value="Beras Putih">Beras Putih</option>
              <option value="Padi Gagang">Padi Gagang (Bertangkai)</option>
              <option value="Padi Kretek">Padi Kretek (Gabah)</option>
              <option value="Kacang Hijau">Kacang Hijau</option>
              <option value="Kacang Tunggak">Kacang Tunggak</option>
            </select>
          </ListItem>
        </List>

        <div className="mx-2">
          <div className="font-light mb-2">Satuan Berat</div>
          <div className="flex flex-row gap-4 mb-4">
            <div
              className={
                satuanBerat == "Kg"
                  ? "bg-light p-2 font-semibold rounded-full border border-primary text-xs cursor-pointer"
                  : "bg-white p-2 font-semibold rounded-full border border-primary text-xs cursor-pointer"
              }
              onClick={() => {
                setSatuanBerat("Kg");
              }}
            >
              Kilogram
            </div>
            <div
              className={
                satuanBerat == "Kuintal"
                  ? "bg-light p-2 font-semibold rounded-full border border-primary text-xs cursor-pointer"
                  : "bg-white p-2 font-semibold rounded-full border border-primary text-xs cursor-pointer"
              }
              onClick={() => {
                setSatuanBerat("Kuintal");
              }}
            >
              Kuintal
            </div>
            <div
              className={
                satuanBerat == "Ton"
                  ? "bg-light p-2 font-semibold rounded-full border border-primary text-xs cursor-pointer"
                  : "bg-white p-2 font-semibold rounded-full border border-primary text-xs cursor-pointer"
              }
              onClick={() => {
                setSatuanBerat("Ton");
              }}
            >
              Ton
            </div>
          </div>
          <div className="font-light mb-2">{`Jumlah ${jenisPertanian} yang Dipanen`}</div>
          <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
            <NumericFormat
              getInputRef={targetValue}
              onChange={({ target }) => {
                setInputValue(target.value);
              }}
              thousandSeparator
              suffix={` ${satuanBerat}`}
              className="  w-full !text-lg text-right  !mr-5 font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none "
            />
          </div>

          <div className="font-light my-2">Jenis Pengairan</div>
          <List className="!z-0">
            <ListItem
              onChange={({ target }) => {
                setJenisPengairan(parseInt(target.value));
              }}
              color="green"
              radio
              selected
              title={"Irigasi Berbayar"}
              value={5}
              name="demo-radio-start"
            />
            <ListItem
              color="green"
              onChange={({ target }) => {
                setJenisPengairan(parseInt(target.value));
              }}
              tooltip={
                "Irigasi tadah hujan atau berasal dari saluran irigasi tidak berbayar"
              }
              radio
              title={
                "Irigasi tadah hujan atau berasal dari saluran irigasi tidak berbayar"
              }
              value={10}
              name="demo-radio-start"
            />
          </List>
        </div>
      </div>
      <div className="mt-3 mb-24 w-full px-4">
        <div className="  font-semibold mx-2 mb-2  border-b-[1px]  pb-4  ">
          <span className=" bg-greenday p-0.5 mr-1"></span>
          <span className="font-bold ">Besaran Zakat</span>
        </div>

        <div className="flex flex-col gap-4 mx-2 mt-5">
          <div className="flex flex-col">
            <div className="font-bold text-lg">Irigasi Berbayar</div>
            <div className="font-light text-lg">Hasil Panen X 5%</div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-lg">Irigasi Tidak Berbayar</div>
            <div className="font-light text-lg">Hasil Panen X 10%</div>
          </div>
        </div>
      </div>
      <div className=" h-32 bg-white border shadow-xl sticky bottom-0  p-4 ">
        <div className="h-full flex flex-row justify-between items-center gap-4">
          <div className="h-2/3 w-full rounded-lg p-4 bg-light">
            <div className="text-lg font-bold text-third">
              <span>{Jumlah}</span>
            </div>
          </div>
          <div
            className="bg-primary rounded-lg  p-4"
            onClick={() => {
              setJumlah(0);
              targetValue.current.value = "";
            }}
          >
            <TbTrash className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatPertanian;
