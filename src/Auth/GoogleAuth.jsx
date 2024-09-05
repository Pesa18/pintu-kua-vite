import { checkEmail } from "./LoginFetch";

export const googleSign = (email) => {
  console.log(email);

  const dataEmail = checkEmail(email).then((value) => {
    if (!value.status) {
      return toast.error("Terjadi Kesalahan Verifikasi");
    }
    return value.data;
  });
  return dataEmail;
};
