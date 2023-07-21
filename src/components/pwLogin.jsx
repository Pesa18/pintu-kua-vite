import React from "react";
import { RxEyeOpen, RxEyeClosed, RxLockClosed } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PwLogin = (props) => {
  const navigate = useNavigate();
  const PasswordChange = async () => {
    props.verification("true");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        {
          email: props.formik.values.email,
        },
        {
          headers: {
            accept: "application/json",
            Authenticated: import.meta.env.VITE_API_KEY,
          },
        }
      );
      if (!response.data.success) {
        props.verification("false");
        toast.error("User Tidak terdaftar");
      }
      return navigate(`/auth/otp/${response.data.uuid}`, {
        state: { token: response.data.token,email: props.formik.values.email ,mode: "forgot-password" },
      });
    } catch (error) {
      props.verification("false");
      toast.error("Ada kesalahan");
      throw error;
    }
  };

  return (
    <>
      <div className="flex -mx-3 ">
        <div className="w-full px-3">
          <span className="p-1 dark:text-white  font-semibold text-primary">
            Password
          </span>
          <div className="flex mt-1">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <RxLockClosed className="text-primary" />
            </div>
            <input
              type={props.showPwd ? "text" : "password"}
              id="password"
              name="password"
              onChange={props.formik.handleChange}
              className=" dark:text-light bg-light bg-opacity-10 text-third w-full placeholder:text-sm placeholder:text-light  -ml-10 -mr-10  pl-10 pr-3 py-2 rounded-lg ring-2 ring-light focus:ring-second outline-none "
              placeholder="Password"
            />
            <div className="w-10 z-30 pl-1 text-center cursor-pointer flex items-center justify-center">
              <button type="button" onClick={props.togglePassword}>
                {props.showPwd ? (
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
        </div>
      </div>
      {props.formik.errors.password && props.formik.touched.password && (
        <div className="text-xs px-1 mt-1 text-pink-800 dark:text-pink-500">
          {props.formik.errors.password}
        </div>
      )}
      <div
        className="mb-1 text-xs dark:text-light font-semibold text-primary mt-3 text-right cursor-pointer  w-full"
        onClick={() => {
          PasswordChange();
        }}
      >
        Lupa Password?
      </div>
    </>
  );
};

export default PwLogin;
