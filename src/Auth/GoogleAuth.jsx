import { checkEmail } from "./LoginFetch";

export const googleSign = (email) => {
  checkEmail(email).then((value) => {
    if (!value.status) {
      return toast.error("Terjadi Kesalahan Verifikasi");
    }
    return value.data ? history("/") : history("/daftar", { state: email });
  });
};
