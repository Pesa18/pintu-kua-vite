import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RxEnvelopeClosed,
  RxPerson,
  RxEyeOpen,
  RxEyeClosed,
  RxMobile,
  RxIdCard,
  RxLockClosed,
} from "react-icons/rx";
import { TbShieldLock } from "react-icons/tb";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
const FormRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [onVerification, setOnVerification] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const togglePassword = () => {
    setShowPwd(!showPwd);
  };
  const variable = location.state;
  const skemaValidasi = Yup.object().shape({
    email: Yup.string()
      .email("Email harus valid")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "Email harus memiliki domain yang valid"
      )
      .required("Email harus diisi"),
    name: Yup.string().required("Nama harus diisi"),
    // nik: Yup.string()
    //   .matches(/^\d{16}$/, "Number must be exactly 16 digits")
    //   .required("NIK wajib diisi"),
    phone: Yup.string()
      .matches(/^[0-9]{10,12}$/, "No hp harus 10 atau 12 digit ")
      .required("No hp wajib diisi"),
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
      email: variable,
      name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: skemaValidasi,
    onSubmit: async (values) => {
      setOnVerification(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            values,
          },
          {
            headers: {
              accept: "application/json",
              Authenticated: import.meta.env.VITE_API_KEY,
            },
          }
        );

        if (response.data.isExists) {
          setOnVerification(false);
          return formik.setErrors({ email: "Email Sudah Terdaftar" });
        }
        return navigate(`/auth/otp/${response.data.data.user.uuid}`, {
          state: {
            email: response.data.data.user.email,
          },
        });
      } catch (error) {
        setOnVerification(false);
        toast.error("Terjadi kesalahan Verifikasi");
      }
    },
  });
  useEffect(() => {
    if (!variable) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mt-3">
          <div className="w-full px-3">
            <span className="p-1 dark:text-white text-sm font-semibold text-primary">
              Email
            </span>
            <div className="flex mt-1">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <RxEnvelopeClosed className="text-primary" />
              </div>
              <input
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.email}
                type="email"
                name="email"
                disabled
                id="email"
                className="   border-[2px] border-second invalid:focus:border-pink-800   bg-light  w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                placeholder="Masukkan alamat email"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                {formik.errors.email} !
              </div>
            )}
          </div>
          <div className="w-full px-3">
            <span className="p-1 dark:text-white text-sm font-semibold text-primary">
              Nama
            </span>
            <div className="flex mt-1">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <RxPerson className="text-primary" />
              </div>
              <input
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.name}
                type="text"
                name="name"
                id="name"
                className="   border-[2px] border-second invalid:focus:border-pink-800  dark:text-light bg-light bg-opacity-10 w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                placeholder="Nama sesuai KTP"
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                {formik.errors.name} !
              </div>
            )}
          </div>
          <div className="w-full px-3">
            <span className="p-1 dark:text-white text-sm font-semibold text-primary">
              No.Hp
            </span>
            <div className="flex mt-1">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <RxMobile className="text-primary" />
              </div>
              <input
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.phone}
                type="text"
                name="phone"
                id="phone"
                className="   border-[2px] border-second invalid:focus:border-pink-800  dark:text-light bg-light bg-opacity-10 w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                placeholder="No Hp yang aktif"
              />
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                {formik.errors.phone} !
              </div>
            )}
          </div>

          <div className="w-full px-3">
            <span className="p-1 text-sm dark:text-white font-semibold text-primary">
              Password
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
                type={showPwd ? "text" : "password"}
                name="password"
                id="password"
                className="  border-[2px] border-second invalid:focus:border-pink-800  dark:text-light bg-light bg-opacity-10 w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                placeholder="Masukkan password"
              />
              <div className="w-10 z-30 pl-1 text-center cursor-pointer flex items-center justify-center">
                <button type="button" onClick={togglePassword}>
                  {showPwd ? (
                    <RxEyeOpen
                      className="text-second cursor-pointer"
                      id="password-eye"
                    />
                  ) : (
                    <RxEyeClosed
                      className="text-second cursor-pointer"
                      id="password-eye"
                    />
                  )}
                </button>
              </div>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                {formik.errors.password} !
              </div>
            )}
          </div>
          <div className="w-full px-3">
            <span className="p-1 text-sm dark:text-white font-semibold text-primary">
              Ulangi Password
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
                type={showPwd ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
                className="  border-[2px] border-second invalid:focus:border-pink-800  dark:text-light bg-light bg-opacity-10 w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-1 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                placeholder="Ulangi password"
              />
              <div className="w-10 z-30 pl-1 text-center cursor-pointer flex items-center justify-center">
                <button type="button" onClick={togglePassword}>
                  {showPwd ? (
                    <RxEyeOpen
                      className="text-second cursor-pointer"
                      id="password-eye"
                    />
                  ) : (
                    <RxEyeClosed
                      className="text-second cursor-pointer"
                      id="password-eye"
                    />
                  )}
                </button>
              </div>
            </div>
            {formik.errors.confirm_password &&
              formik.touched.confirm_password && (
                <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                  {formik.errors.confirm_password} !
                </div>
              )}
          </div>
          <div className="flex w-full mt-3 text-third dark:text-light pr-16">
            <TbShieldLock className=" text-lg" />
            <div className="ml-1 text-[10px] ">
              Kami akan melindungi datamu untuk mencegah dari risiko keamanan.
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary mt-3 p-3 text-sm text-white font-bold drop-shadow-sm w-full rounded-lg"
          >
            {onVerification ? (
              <div className="custom-loader mx-auto "></div>
            ) : (
              "Submit"
            )}
          </button>
          <div className="text-[10px] px-8 text-center mt-3 mb-5 dark:text-light text-third">
            Dengan daftar kamu menyetujui{" "}
            <span className="text-primary font-bold cursor-pointer">
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="text-primary font-bold cursor-pointer">
              Kebijakan Privasi
            </span>{" "}
            Pintu KUA
          </div>
        </div>
      </form>
    </>
  );
};

export default FormRegistration;
