import axios from "axios";

export const checkEmail = async (email) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/ceklogin`,
      {
        email,
      },
      {
        headers: {
          accept: "application/json",
          Authenticated: import.meta.env.VITE_API_KEY,
        },
      }
    );
    const loginTrue = response.data.data.login;
    const fetchData = {
      status: true,
      data: loginTrue,
    };

    return fetchData;
  } catch (error) {
    const fetchData = {
      status: false,
      data: error,
    };
    return fetchData;
  }
};
