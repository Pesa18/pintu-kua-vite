import React, { useState, useEffect } from "react";
import { RxEnvelopeClosed, RxCheckCircled, RxRocket } from "react-icons/rx";
import { TbShieldLock } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import PwLogin from "./pwLogin";
import jwt_decode from "jwt-decode";
import { googleSign } from "../Auth/GoogleAuth";
import * as Yup from "yup";
import { replace, useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../Auth/LoginFetch";
import { useSignIn } from "react-auth-kit";
import axios from "axios";

const FormLogin = () => {
  const LogIn = useSignIn();
  const history = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const togglePassword = () => {
    setShowPwd(!showPwd);
  };
  const [isLogin, setLogin] = useState(false);
  const [isRegistrasi, setRegistrasi] = useState(false);
  const [onVerification, setOnVerification] = useState(false);
  console.log(onVerification);
  function handleCallback(response) {
    const userData = jwt_decode(response.credential);
    console.log(userData);
    const data = googleSign(userData.email);
  }

  const skemaValidasi = Yup.object().shape({
    email: Yup.string()
      .email("email harus valid")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "Email harus memiliki domain yang valid"
      )
      .required("email harus diisi"),
    password: isLogin
      ? Yup.string().required("Password harus diisi")
      : Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: skemaValidasi,
    onSubmit: async (values) => {
      setOnVerification(true);
      if (isLogin) {
        let email = values.email;
        let password = values.password;
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
              email,
              password,
            },
            {
              headers: {
                accept: "application/json",
                Authenticated: import.meta.env.VITE_API_KEY,
              },
            }
          );
          if (response.data.data.login) {
            setOnVerification(false);
            LogIn({
              token: response.data.data.token,
              tokenType: "Bearer",
              expiresIn: 36000,
              authState: {
                token: response.data.data.token,
                user: response.data.data.user,
              },
            });

            history(`/${response.data.data.user.uuid}/`);
          } else {
            if (!response.data.data.isVerified) {
              return history(`/auth/otp/${response.data.data.user.uuid}`, {
                state: {
                  email: response.data.data.user.email,
                },
              });
            }
            setOnVerification(false);
            formik.setErrors({ password: "Password Salah" });
          }
        } catch (error) {
          setOnVerification(false), toast.error("Terjadi Kesalahan Verifikasi");
          throw error;
        }
      } else {
        if (isRegistrasi) {
          history("/auth/daftar", { state: values.email });
        }
        checkEmail(values.email).then((value) => {
          setOnVerification(false);
          if (!value.status) {
            return (
              setOnVerification(false),
              toast.error("Terjadi Kesalahan Verifikasi")
            );
          }
          return value.data ? setLogin(true) : setRegistrasi(true);
        });
      }
    },
  });

  useEffect(() => {
    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCallback,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signinDiv"),
        { theme: "outline", size: "large" }
      );
    } catch (error) {
      console.error("Error initializing Google Sign-In:", error);
    }
  }, []);

  return (
    <>
      <div className=" mt-8 w-full">
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="flex -mx-3 mb-4">
            <div className="w-full px-3">
              <span className="p-1 dark:text-white font-semibold text-primary">
                Email
              </span>
              <div className="flex mt-1">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <RxEnvelopeClosed className="text-primary" />
                </div>
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    setLogin(false);
                    setRegistrasi(false);
                    setOnVerification(false);
                  }}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  id="email"
                  className="  border-[2px] focus:ring-primary border-light invalid:focus:border-pink-800  dark:text-light bg-light bg-opacity-10 w-full text-third placeholder:text-light -ml-10 -mr-10  pl-10 pr-3 py-2 rounded-lg outline-none  focus:border-primary placeholder:text-sm "
                  placeholder="Masukkan alamat email"
                />
                {isLogin && (
                  <div className="w-10 z-30 pl-1 text-center cursor-pointer flex items-center justify-center text-primary">
                    <RxCheckCircled />
                  </div>
                )}
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
                  {formik.errors.email} !
                </div>
              )}
            </div>
          </div>
          {isLogin && (
            <PwLogin
              showPwd={showPwd}
              togglePassword={togglePassword}
              formik={formik}
              verification={setOnVerification}
            />
          )}
          <div className="flex w-full text-third dark:text-light pr-16">
            <TbShieldLock className=" text-lg" />
            <div className="ml-1 text-[10px] ">
              Kami akan melindungi datamu untuk mencegah dari risiko keamanan.
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary mt-3 p-3 text-sm text-white font-bold drop-shadow-sm w-full rounded-lg"
          >
            {isLogin ? (
              onVerification ? (
                <div className="custom-loader mx-auto "></div>
              ) : (
                "Login"
              )
            ) : isRegistrasi ? (
              "Daftar"
            ) : onVerification ? (
              <div className="custom-loader mx-auto "></div>
            ) : (
              "Lanjutkan"
            )}
          </button>
        </form>
      </div>

      <div className="h-full  flex flex-col  justify-between mt-4">
        <div className="w-full flex flex-col items-center">
          <div className="w-2/3 mx-auto flex justify-around items-center">
            <div className="h-[1px] rounded-xl w-1/2 bg-gray-300"></div>
            <div className="font-medium text-xs w-full text-center text-gray-400">
              Atau gunakan
            </div>
            <div className="h-[1px] rounded-xl w-1/2 bg-gray-300"></div>
          </div>

          <div id="signinDiv" className="mt-3"></div>

          <div className="text-[10px] px-8 text-center mt-3 dark:text-light text-third">
            Dengan login kamu menyetujui{" "}
            <span className="text-primary font-bold cursor-pointer">
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="text-primary font-bold cursor-pointer">
              Kebijakan Privasi
            </span>{" "}
            Pintu KUA
          </div>

          <div className="dark:text-light flex items-center text-third  text-sm mt-7">
            {" "}
            Males bikin akun?
            <span
              className="ml-1 font-extrabold flex justify-center items-center text-primary cursor-pointer "
              onClick={() => {
                history("home");
              }}
            >
              Lewati
              <RxRocket className="ml-1 font-extrabold text-primary" />
            </span>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
