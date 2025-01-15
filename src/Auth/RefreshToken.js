import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";

const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refreshtoken`,
        param,
        {
          headers: { Authorization: `Bearer ${param.refreshToken}` },
        }
      );
      console.log(response.data.accessToken);
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: 100,
        newRefreshTokenExpiresIn: 120,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
export default refresh;
