import { checkEmail } from "./LoginFetch";

export const googleSign = (email) => {
  checkEmail(email).then((value) => {
    setOnVerification(true);
    if (!value.status) {
      return (
        setOnVerification(false),
        toast.error("Terjadi Kesalahan Verifikasi"),
        console.error("Login gagal")
      );
    }
    return value.data ? history("/home") : history("/daftar", { state: email });
  });
};
