import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/${user.user.uuid}/`);
    } else {
      navigate("/");
    }
  }, []);
  return <div>Not Found</div>;
};

export default NotFound;
