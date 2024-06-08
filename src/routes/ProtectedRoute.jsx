import React, { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateUserToken } from "../apis/users";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { setUserId } = useContext(UserContext);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await validateUserToken();
      setIsAuthenticated(result.success);
      if (result.success) {
        setUserId(result.data.id);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
