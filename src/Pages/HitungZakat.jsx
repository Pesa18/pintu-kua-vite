import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  NavLeft,
  Link,
} from "framework7-react";
import ZakatPertanian from "../components/kalkulatorZakat/pertanian";
import ZakatPerdagangan from "../components/kalkulatorZakat/perdagangan";
import ZakatEmas from "../components/kalkulatorZakat/emasperakperhiasan";
import ZakatTambak from "../components/kalkulatorZakat/tambak";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ZakatTanaman from "../components/kalkulatorZakat/tanamanproduktif";
import ZakatTernak from "../components/kalkulatorZakat/ternak";
import ZakataPerusahaan from "../components/kalkulatorZakat/perusahaan";
import ZakatProperti from "../components/kalkulatorZakat/properti";
import ZakatProfesi from "../components/kalkulatorZakat/profesi";
import { TbChevronLeft } from "react-icons/tb";

const HitungZakat = (props) => {
  const [hargaMetal, setHargaMetal] = useState(null);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://gold.g.apised.com/v1/latest?metals=XAU,XAG&base_currency=IDR&currencies=IDR&weight_unit=gram",
    headers: {
      "x-api-key": import.meta.env.VITE_METAL_API,
    },
  };
  const getMetalPrice = async () => {
    try {
      const response = await axios(config);

      setHargaMetal({
        emas: response.data.data.metal_prices.XAU.price,
        perak: response.data.data.metal_prices.XAG.price,
      });
    } catch (error) {
      toast.error("Ada Kesalahan");
    }
  };
  const { type } = props;

  useEffect(() => {
    getMetalPrice();
  }, []);

  const renderComponent = () => {
    switch (type) {
      case "pertanian":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Pertanian</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatPertanian />
          </>
        );
      case "perdagangan":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Perdagangan</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatPerdagangan
              metalprices={hargaMetal}
              title={"Zakat Perdagangan"}
            />
          </>
        );
      case "emas":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Emas & Perak</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatEmas metalprices={hargaMetal} title={"Zakat Emas & Perak"} />
          </>
        );
      case "tambak":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Tambak</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatTambak metalprices={hargaMetal} title={"Zakat Tambak"} />
          </>
        );
      case "tanaman":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">
                    Zakat Tanaman Produktif
                  </span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatTanaman
              metalprices={hargaMetal}
              title={"Zakat Tanaman Produktif"}
            />
          </>
        );
      case "ternak":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Peternakan</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatTernak metalprices={hargaMetal} title={"Zakat Peternakan"} />
          </>
        );
      case "perusahaan":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Perusahaan</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakataPerusahaan
              metalprices={hargaMetal}
              title={"Zakat Perusahaan"}
            />
          </>
        );
      case "properti":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Properti</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatProperti metalprices={hargaMetal} title={"Zakat Properti"} />
          </>
        );
      case "profesi":
        return (
          <>
            <Navbar innerClass="!bg-second !text-white">
              <NavLeft>
                <div className="flex flex-row items-center">
                  <Link back color="white">
                    <TbChevronLeft className="text-2xl" />
                  </Link>

                  <span className="font-bold text-xl">Zakat Profesi</span>
                </div>
              </NavLeft>
            </Navbar>
            <ZakatProfesi metalprices={hargaMetal} title={"Zakat Profesi"} />
          </>
        );
      default:
        return <div>Pilih jenis zakat.</div>;
    }
  };

  if (!hargaMetal) {
    return (
      <Page>
        <div className="h-full mx-auto my-auto">Loading...</div>
      </Page>
    );
  }

  return <Page>{renderComponent()}</Page>;
};

export default HitungZakat;
