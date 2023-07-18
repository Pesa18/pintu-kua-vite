import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function OtpPages() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const skemaValidasi = Yup.object().shape({
    otpvalue: Yup.string().min(4, "Semua Kolom harus diisi"),
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

        navigate("/auth");
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    if (!state) {
      navigate("/auth");
    }
  }, []);
  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div>{location.state.email}</div>
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
    </form>
  );
}
