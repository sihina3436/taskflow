import { Navigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
  
  const isLoggedIn = localStorage.getItem("token"); 

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthWrapper;