// PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
