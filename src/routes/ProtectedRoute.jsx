import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateUserToken } from "../apis/users";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await validateUserToken();
      setIsAuthenticated(result.success);
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
