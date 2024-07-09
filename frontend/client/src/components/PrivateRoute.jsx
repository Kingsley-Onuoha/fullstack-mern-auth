import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Profile from "../pages/Profile";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Profile /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
