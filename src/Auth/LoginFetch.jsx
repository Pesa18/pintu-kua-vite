import axios from "axios";

export const checkEmail = async (email) => {
  try {
    const response = await axios.post(
      "http://apibimas.test/api/ceklogin",
      {
        email,
      },
      {
        headers: {
          accept: "application/json",
          Authenticated: 123124542354235,
        },
      }
    );
    const loginTrue = response.data.login;
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
