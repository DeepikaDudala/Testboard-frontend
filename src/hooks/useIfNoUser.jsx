import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useIfNoUser() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user, navigate]);
}

export default useIfNoUser;
