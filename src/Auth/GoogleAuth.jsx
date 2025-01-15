import axios from "axios";
import { toast } from "react-toastify";
import refresh from "./RefreshToken";
export const googleSign = async (token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/loginwithgoogle`,
      {
        token: token.credential,
      },
      {
        headers: {
          accept: "application/json",
          Authenticated: import.meta.env.VITE_API_KEY,
        },
      }
    );

    if (response.data.status === "Gagal") {
      const responseData = {
        status: response.data.status,
        message: response.data.message,
        data: {
          login: false,
          email: response.data.data.user.email,
          uuid: response.data.data.uuid,
        },
      };
      return responseData;
    }

    const responseData = {
      status: response.data.status,
      message: "Berhasil mendapatkan akun",
      data: {
        login: true,
        token: response.data.data.token,
        user: response.data.data.user,
        refreshToken: response.data.data.refreshToken,
      },
    };
    return responseData;
  } catch (error) {
    toast.error(`Terjadi Kesalahan Verifikasi error: ${error}`);
  }
};
