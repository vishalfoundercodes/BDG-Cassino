import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import apis from "../utils/apis";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tokenChecker, setTokenChecker] = useState(null);
  const isAuthenticated = localStorage.getItem("userId");

  const MyProfileFn = async (userid) => {
    const loginTokenFromLocalStorage = localStorage.getItem("login_token");
    try {
      const response = await axios.get(`${apis.profile}${userid}`);
      const profileToken = response?.data?.data?.login_token;
      if (response?.data?.success === 423) {
        // console.log("blocked")
        handleLogout();
      } else if (response?.data?.success === 200 && profileToken === loginTokenFromLocalStorage) {
        // console.log("not blocked")
        setTokenChecker(true);
      } else {
        // console.log('something went wrong')
        handleLogout();
      }
    } catch (e) {
      console.error(e);
      toast.error(e?.message || "An error occurred while fetching profile data");
      handleLogout();
    }
  };

  const handleLogout = () => {
    // console.log("Logging out...");
    localStorage.removeItem("userId");
    localStorage.removeItem("login_token");
    sessionStorage.clear();
    setTokenChecker(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const checkUser = async () => {
      const userid = localStorage.getItem("userId");
      if (userid) {
        setTokenChecker(null);
        await MyProfileFn(userid);
      } else {
        handleLogout();
      }
    };

    checkUser();
  }, [location.pathname]);

  if (!isAuthenticated || tokenChecker === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

