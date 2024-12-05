import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Countdown, { zeroPad } from "react-countdown";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function OtpPages() {
  const [resend, setResend] = useState(false);
  const params = useParams();
  const location = useLocation();
  const [expireOtp, setExpireOtp] = useState(new Date().getTime() + 120000);
  const state = location.state;
  const navigate = useNavigate();
  const skemaValidasi = Yup.object().shape({
    otpvalue: Yup.string().min(4, "Semua Kolom harus diisi").required(""),
  });
  const formik = useFormik({
    initialValues: {
      otpvalue: "",
    },
    validateOnChange: true,
    validationSchema: skemaValidasi,
    onSubmit: async (values) => {
      setResend(true);
      let uuid = location.state.uuid;
      let otp = values.otpvalue;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/verifyotp`,
          {
            uuid,
            otp,
          },
          {
            headers: {
              accept: "application/json",
              Authenticated: import.meta.env.VITE_API_KEY,
              Authorization: `Bearer ${location.state.token}`,
            },
          }
        );

        if (!response.data.isverified) {
          return setResend(false), toast.error(response.data.message);
        }

        setResend(false);
        // if (location.state.mode === "forgot-password") {
        //   return navigate(`/auth/forgot-password/${params}`, {
        //     state: { token: location.state.token },
        //   });
        // }
        return navigate("/auth");
      } catch (error) {
        setResend(false);
        throw error;
      }
    },
  });

  const resendOtp = async () => {
    setResend(true);
    formik.setFieldValue("otpvalue", "");
    const { uuid, email } = state;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resendotp`,
        {
          uuid,
          email,
        },
        {
          headers: {
            accept: "application/json",
            Authenticated: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${location.state.token}`,
          },
        }
      );

      if (!response.data.success) {
        return toast.error("Gagal Authentikasi");
      }
      return setExpireOtp(new Date().getTime() + 120000), setResend(false);
    } catch (error) {
      toast.error("Gagal Authentikasi");
      setResend(false);
    }
  };
  useEffect(() => {
    if (formik.isValid) {
      formik.submitForm();
    }
  }, [formik.isValid]);

  useEffect(() => {
    if (!state) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className=" relative mt-6 mx-auto text-third dark:text-light  flex flex-col items-center justify-between">
      <div className="text-center text-lg">Kode OTP terkirim </div>
      <div>
        Cek email <span className="font-bold">{location.state.email}</span>
      </div>
      <Countdown
        date={expireOtp}
        key={expireOtp}
        renderer={({ minutes, seconds }) => {
          return (
            <span className="text-lg font-bold">
              {minutes}:{zeroPad(seconds)}
            </span>
          );
        }}
      />
      <form action="" onSubmit={formik.handleSubmit}>
        <OTPInput
          value={formik.values.otpvalue}
          onChange={(e) => {
            formik.setFieldValue("otpvalue", e);
          }}
          numInputs={4}
          renderSeparator={
            <span className="mx-auto text-center  text-xl font-bold">-</span>
          }
          containerStyle={"mt-9 w-full text-center"}
          inputStyle={`!w-16 dark:bg-light dark:text-third text-center font-bold text-2xl mx-2  h-20 rounded-xl ring-2 ring-primary ${
            formik.errors.otpvalue ? "ring-pink-600" : ""
          }`}
          renderInput={(props) => <input {...props} />}
        />
      </form>{" "}
      <div className="flex flex-row pt-8 items-center">
        <div className="text-sm mr-2">Tidak menerima OTP?</div>
        <div className="font-bold cursor-pointer" onClick={resendOtp}>
          Kirim OTP lagi
        </div>
      </div>
      <div
        className={`absolute ${
          resend ? "" : "hidden"
        } bg-white bg-opacity-60 z-10 h-full w-full items-center flex justify-center`}
      >
        <div className="flex items-center">
          <span className="text-3xl mr-4">Loading</span>
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
