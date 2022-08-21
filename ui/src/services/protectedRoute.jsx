import { useLocation, Outlet, Navigate } from "react-router-dom";
import { getFromStorage } from "./localstorage";

export const ProtectedRoute = () => {
  const isAuth = getFromStorage("isAuth", true);
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ location }} />
  );
};
