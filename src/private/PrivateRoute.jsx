import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token"); // Check for authentication token
  console.log(token)
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
