import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { RxLockClosed } from "react-icons/rx";
import Loader from "../components/preloader";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LupaPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [onVerification, setOnVerification] = useState(false);

  const skemaValidasi = Yup.object().shape({
    password: Yup.string()
      .required("Password wajib diisi")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/,
        "Password harus mengandung huruf besar, huruf kecil, angka, dan setidaknya satu simbol"
      ),
    confirm_password: Yup.string()
      .required("Konfirmasi Password harus diisi")
      .oneOf([Yup.ref("password"), null], "Password harus sama"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: skemaValidasi,
    onSubmit: async (values) => {
      setOnVerification(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/new-password`,
          {
            values,
          },
          {
            headers: {
              accept: "application/json",
              Authenticated: import.meta.env.VITE_API_KEY,
              Authorization: `Bearer ${location.state.token}`,
            },
          }
        );
        if (response.status === 200) {
          setOnVerification(false);
          return navigate("/auth");
        }

        setOnVerification(false);
        toast.error("Gagal Merubah Data");
      } catch (error) {
        setOnVerification(false);
        toast.error("Terjadi Kesalahan!");
      }
    },
  });
  return (
    <>
      <div className="relative mt-6">
        <Loader hidden={onVerification ? false : true}></Loader>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mt-3">
            <div className="w-full px-3">
              <span className="p-1 dark:text-white text-sm font-semibold text-primary">
                Password Baru
              </span>
              <div className="flex mt-1">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <RxLockClosed className="text-primary" />
                </div>
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.password}
                  type="password"
                  name="password"
                  id="password"
                  className="   border-[2px] border-second invalid:focus:border-pink-800   dark:bg-light  w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                  placeholder="Masukkan password baru"
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                  {formik.errors.password} !
                </div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full px-3">
              <span className="p-1 dark:text-white text-sm font-semibold text-primary">
                Ulangi password
              </span>
              <div className="flex mt-1">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <RxLockClosed className="text-primary" />
                </div>
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.confirm_password}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="   border-[2px] border-second invalid:focus:border-pink-800   dark:bg-light  w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                  placeholder="Ulangi password"
                />
              </div>
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                    {formik.errors.confirm_password} !
                  </div>
                )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary mt-6 p-3 text-sm text-white font-bold drop-shadow-sm w-full rounded-lg"
          >
            {onVerification ? (
              <div className="custom-loader mx-auto "></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default LupaPassword;
