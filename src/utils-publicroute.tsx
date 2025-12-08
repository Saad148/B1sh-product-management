import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
