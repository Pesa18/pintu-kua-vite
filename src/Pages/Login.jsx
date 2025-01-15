import { useState, useEffect } from "react";
import { RxSun, RxMoon } from "react-icons/rx";
import { getItem, setItem, removeItem } from "../components/storageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const Login = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    const darkModeLs = getItem("darkMode");
    if (darkModeLs === null) {
      setDarkMode(props.darkMode);
    } else {
      setDarkMode(darkModeLs);
    }
  }, []);

  return (
    <>
      <div
        className={`font-quicksand ${
          darkMode ? "dark" : "bg-slate-50"
        }  max-w-4xl mx-auto flex flex-col justify-between w-full min-h-screen  `}
      >
        <div className=" px-4 pt-3 flex flex-col  h-full w-full">
          <div className="h-10 flex flex-row justify-between items-center">
            <img
              src={
                darkMode
                  ? "/logo/logo-pintu-white_UPP.png"
                  : "/logo/logo-pintu_UPP.png"
              }
              alt=""
              className="h-full"
            />
            {darkMode ? (
              <RxMoon
                className="text-xl mr-2 dark:text-white text-third cursor-pointer"
                onClick={toggleDarkMode}
              />
            ) : (
              <RxSun
                className="text-xl mr-2 dark:text-white text-third cursor-pointer"
                onClick={toggleDarkMode}
              />
            )}
          </div>
          <div className="mt-4 bg-bluegreen rounded-lg dark:bg-light w-full flex flex-row h-1/3 border">
            <div className="w-full p-2 mb-5 text-white dark:text-bluegreen  flex flex-col  ">
              <div className="font-extrabold tracking-tight text-xl">
                Selamat Datang Kembali 👋
              </div>{" "}
              <div className="text-xs">Silahkan Login</div>
            </div>
            <div className="w-full h-full relative">
              <img
                src="/images/casual-3d.png"
                className="h-36 absolute right-0 -top-7"
                alt=""
              />
            </div>
          </div>
          <Outlet />
        </div>
        <div className="mx-auto flex flex-col text-[9px]  dark:text-light text-third  text-center px-8  items-start mb-2">
          {" "}
          <div className="flex justify-center items-center w-full">
            <img src="/logo/kemenag-logo.png" alt="" className="w-6 h-6 mr-1" />{" "}
            <img src="/logo/bimas.png" alt="" className="w-7 h-7 mr-1" />{" "}
          </div>
          <div className="flex flex-col">
            <span>Kementerian Agama Kab.Kuningan © 2023</span>{" "}
            <span> Seksi Bimas Islam. All Right Reserved</span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
