import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  console.log("isAuthen", isAuthenticated);
  console.log("isLoading", isLoading);

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

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" replace />
//         )
//       }
//     />
//   );
// };
