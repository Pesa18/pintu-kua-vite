import axios from "axios";
import {
  AccordionContent,
  Button,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  Page,
  SkeletonBlock,
} from "framework7-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineSwipeLeft } from "react-icons/md";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import KartuDigital from "../components/KartuDigital";
import { getItem, removeItem, setItem } from "../components/storageUtils";
import { toast, ToastContainer } from "react-toastify";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { f7 } from "framework7-react";
import { useNavigate } from "react-router-dom";
import KartuDigitalBack from "../components/KartuDigitalBack";
import { TbChevronLeft } from "react-icons/tb";
const KartuNikah = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dataNikah, setDataNikah] = useState("");
  const getDataNikah = async (no_daftar) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.kong-gateway.impstudio.id/simkah4/api/daftarnikah/cekmonitoring",
        {
          token: import.meta.env.VITE_TOKEN_PUSAKA,
          no_daftar: no_daftar,
        }
      );
      if (response.data.code == 200) {
        if (response.data.data.status_validasi === "SUDAH TERCATAT") {
          return (
            setDataNikah(response.data.data),
            setItem("kartunikah", response.data.data),
            setLoading(false)
          );
        }
        return toast.error("Belum Tercatat");
      }
      return toast.error("Data Tidak Ditemukan");
    } catch (error) {
      console.log(error);
    }
  };
  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      if (getItem("kartunikah")) {
        setDataNikah(getItem("kartunikah"));
      }
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      if (inputRef) {
        if (dataNikah) {
          inputRef.current.value = dataNikah.no_daftar;
        }
      }
    }
  }, [dataNikah]);

  const cekAuth = () => {
    f7.dialog.preloader("Loading...");
    setTimeout(() => {
      f7.dialog.close();
    }, 1000);
    if (!isAuth) {
      return f7.dialog
        .create({
          title: "Peringatan!",
          text: "Anda Belum Login",
          cssClass: "!bg-light",
          buttons: [
            {
              text: "Nanti",
              cssClass: "!bg-red-500 !text-white",
              onClick: () => {
                f7.dialog.close();
                f7.views.main.router.navigate("/");
              },
            },
            {
              text: "Login",
              cssClass: "!bg-primary !text-white",
              onClick: () => {
                f7.dialog.close();
                navigate("/auth");
              },
            },
          ],
        })
        .open();
    }
  };

  return (
    <>
      <ToastContainer />
      <Page onPageAfterIn={cekAuth}>
        <Navbar innerClass="!bg-second !text-white">
          <NavLeft>
            <div className="flex flex-row items-center">
              <Link back color="white">
                <TbChevronLeft className="text-2xl" />
              </Link>

              <span className="font-bold text-xl">Kartu Nikah</span>
            </div>
          </NavLeft>
        </Navbar>

        {isAuth ? (
          <div className="mt-4 flex flex-col gap-2 mx-4 ">
            {dataNikah ? (
              <>
                {loading ? (
                  <>
                    <SkeletonBlock
                      height="250px"
                      width="50%"
                      className="rounded-lg mx-auto !w-full lg:!w-1/2"
                      effect="wave"
                    />
                  </>
                ) : (
                  <>
                    <Swiper
                      effect={"flip"}
                      grabCursor={true}
                      modules={[EffectFlip, Pagination, Navigation]}
                      className="mySwiper w-full sm:w-1/2 h-56 sm:h-64 "
                    >
                      <SwiperSlide className="w-full h-full">
                        <KartuDigital datanikah={dataNikah} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <KartuDigitalBack />
                      </SwiperSlide>
                    </Swiper>
                    <div className="flex flex-row gap-1 w-full justify-center text-primary font-bold">
                      Geser Untuk Memutar{" "}
                      <span className="text-lg">
                        <MdOutlineSwipeLeft />
                      </span>
                    </div>
                    <List strong accordionList color="green">
                      <ListItem accordionItem title={"Detail"}>
                        <AccordionContent>
                          <div className="w-full mx-4 my-2">
                            <div className="flex flex-row mx-auto w-full">
                              <div className="flex flex-col w-full gap-2  ">
                                <div>No Akta :</div>
                                <div>No Daftar :</div>
                                <div>Tanggal Akad :</div>
                                <div>Status :</div>
                                <div>NIK Suami :</div>
                                <div>Nama Suami :</div>
                                <div>NIK Istri :</div>
                                <div>Nama Istri :</div>
                              </div>
                              <div className="flex flex-col gap-2 w-full">
                                <div>{dataNikah.no_akta}</div>
                                <div>{dataNikah.no_daftar}</div>
                                <div>{dataNikah.tgl_akad}</div>
                                <div>{dataNikah.status_validasi}</div>
                                <div>{dataNikah.nik_suami}</div>
                                <div>{dataNikah.nama_suami}</div>
                                <div>{dataNikah.nik_istri}</div>
                                <div>{dataNikah.nama_istri}</div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </ListItem>
                    </List>
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            <div className="w-full  rounded-lg ring-primary ring-1 relative bg-slate-100">
              <input
                disabled={dataNikah}
                ref={inputRef}
                placeholder="NO DAFTAR"
                className="  w-full !text-lg    font-bold !bg-slate-100 !py-2 !px-2  !rounded-lg  !ring-0 !outline-none  !appearance-none placeholder:text-xs  "
              />
            </div>
            {dataNikah ? (
              <div className="mb-32 flex flex-col gap-2">
                <Button
                  fill
                  color="red"
                  onClick={() => {
                    setDataNikah("");
                    removeItem("kartunikah");
                  }}
                >
                  Generate Ulang
                </Button>
                <Button
                  fill
                  color="blue"
                  href={`https://simkah4.kemenag.go.id/qrCodeCard/download?no_daftar=${dataNikah.no_daftar}`}
                  external
                >
                  Download
                </Button>
              </div>
            ) : (
              <div>
                {" "}
                <Button
                  fill
                  color="green"
                  onClick={() => {
                    getDataNikah(inputRef.current.value);
                  }}
                >
                  Generate
                </Button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </Page>
    </>
  );
};

export default KartuNikah;
