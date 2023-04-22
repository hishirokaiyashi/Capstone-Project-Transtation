import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../components/Navigation";
import Footer from "../components/Footer";
import Messager from "../components/ChatSection/Messager";

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      {children}
      {isAuthenticated && <Messager />}
      <Footer />
    </>
  );
};

export default MainLayout;
