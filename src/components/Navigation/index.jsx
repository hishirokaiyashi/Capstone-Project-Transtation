import React, { useState } from "react";
import { useSelector } from "react-redux";
import { signout } from "../../firebase/auth";

import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await signout();
      toast.success("You have been logged out!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <nav className="h-16 sticky z-10 top-0 left-0 right-0 bg-indigo-400 flex items-center justify-between text-xl font-bold">
      <h1>Nav bar</h1>
      {isAuthenticated ? (
        <div className="flex items-center gap-4 pr-2">
          <img
            src={user.photoURL}
            className="w-12 h-12 rounded-full cursor-pointer"
          />
          <p>{user.userName}</p>
          <h3 onClick={handleLogout} className="cursor-pointer">
            Sign out
          </h3>
        </div>
      ) : (
        <h3>Chưa đăng nhập á</h3>
      )}
    </nav>
  );
};

export default Navbar;
