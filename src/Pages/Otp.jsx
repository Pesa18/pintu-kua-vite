import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Countdown, { zeroPad } from "react-countdown";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function OtpPages() {
  const [resend, setResend] = useState(false);
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
    validationSchema: skemaValidasi,
    onSubmit: async (values) => {
      let email = location.state.email;
      let otp = values.otpvalue;
      try {
        const response = await axios.post(
          "http://apibimas.test/api/email-verification",
          {
            email,
            otp,
          },
          {
            headers: {
              accept: "application/json",
              Authenticated: 123124542354235,
              Authorization: `Bearer ${location.state.token}`,
            },
          }
        );

        if (response.data.error) {
          return setResend(true), toast.error(response.data.error.message);
        }
        return navigate("/auth");
      } catch (error) {
        throw error;
      }
    },
  });

  const resendOtp = async () => {
    const response = await axios.get(
      "http://apibimas.test/api/send-verification",
      {
        headers: {
          accept: "application/json",
          Authenticated: 123124542354235,
          Authorization: `Bearer ${location.state.token}`,
        },
      }
    );

    if (response.data.success) {
      setExpireOtp(new Date().getTime() + 120000);
      return setResend(false);
    }

    return null;
  };
  useEffect(() => {
    if (!state) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className="mx-auto">
      <div>{location.state.email}</div>
      <Countdown
        date={expireOtp}
        key={expireOtp}
        onComplete={() => {
          setResend(true);
        }}
        renderer={({ minutes, seconds }) => {
          return (
            <span>
              {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
          );
        }}
      />
      <form action="" onSubmit={formik.handleSubmit}>
        <OTPInput
          className=""
          value={formik.values.otpvalue}
          onChange={(e) => {
            formik.setFieldValue("otpvalue", e);
          }}
          numInputs={4}
          renderSeparator={<span>-</span>}
          inputStyle={`w-30 h-20 ml-5  ring-1 ${
            formik.errors.otpvalue ? "ring-pink-600" : ""
          }`}
          renderInput={(props) => <input {...props} />}
        />

        <button
          type="submit"
          className="p-3 mt-10 bg-slate-800 text-white rounded-lg"
        >
          {" "}
          Submit
        </button>
      </form>{" "}
      {resend && (
        <button
          onClick={() => {
            resendOtp();
          }}
          className="p-3 mt-10 bg-slate-800 text-white rounded-lg"
        >
          {" "}
          Resend
        </button>
      )}
    </div>
  );
}
