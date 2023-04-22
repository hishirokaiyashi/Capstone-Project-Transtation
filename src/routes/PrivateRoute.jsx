import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (!isLoading) {
    return (
      <>
        {isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />}
      </>
    );
  } else {
    if (isAuthenticated) {
      <>{children}</>;
    } else {
      <h1 className="text-black">Đang load chờ chút </h1>;
    }
  }
};

export default PrivateRoute;
