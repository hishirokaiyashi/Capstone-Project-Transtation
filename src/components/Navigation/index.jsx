import React, { useState } from "react";
import { useSelector } from "react-redux";
import { signout } from "../../firebase/auth";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const navList = [
  { name: "Home", href: "/" },
  { name: "Promotion", href: "/promotion" },
  { name: "My Booking", href: "order-history" },
  { name: "About us", href: "/about-us" },
];

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
    <nav className="sticky z-10 top-0 left-0 right-0 bg-white h-32 ">
      {/* Container */}
      <div className=" max-w-screen-xl mx-auto py-4">
        {/* Layout */}
        <div className="px-4 py-4 flex items-center justify-between text-xl font-bold">
          {/* Logo */}
          <div className="flex gap-2">
            <svg
              width="61"
              height="61"
              viewBox="0 0 61 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="30.5"
                cy="30.5"
                r="28"
                stroke="#F07272"
                strokeWidth="5"
              />
              <path
                d="M30.729 26.1441C30.729 27.3201 30.4117 28.3841 29.777 29.3361C29.1424 30.2881 28.2184 30.9881 27.005 31.4361L31.289 39.5001H24.345L20.929 32.4721H18.633V39.5001H12.445V20.2361H24.233C25.6144 20.2361 26.7904 20.5068 27.761 21.0481C28.7504 21.5708 29.4877 22.2895 29.973 23.2041C30.477 24.1001 30.729 25.0801 30.729 26.1441ZM24.429 26.3961C24.429 25.8921 24.261 25.4721 23.925 25.1361C23.589 24.8001 23.1784 24.6321 22.693 24.6321H18.633V28.1881H22.693C23.1784 28.1881 23.589 28.0201 23.925 27.6841C24.261 27.3295 24.429 26.9001 24.429 26.3961ZM45.0799 25.1641V39.5001H38.8919V25.1641H32.5639V20.2361H51.3799V25.1641H45.0799Z"
                fill="#E04141"
              />
            </svg>
            <div>
              <div className="font-Besley text-2xl font-normal pb-[6px] border-b-[1px] border-b-red-400">
                Vietnam Roadtrip
              </div>
              <p className="font-Besley text-xs pt-1 font-thin ">
                ANYWHERE, ANYTIME
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4 ">
            {navList.map((item, index) => (
              <div
                key={index}
                className="text-base px-2 py-2 font-Amata font-normal 
            hover:text-red-400 hover:border-b-2 hover:border-b-red-400 "
              >
                <Link to={item.href}>{item.name}</Link>
              </div>
            ))}

            {/* Setting Currency & Language */}
            <div className="group flex items-center">
              <select
                defaultValue="VND"
                className="font-Amata font-normal text-base group-hover:opacity-50 group-hover:cursor-pointer"
              >
                <option>VND</option>
                <option>USD</option>
              </select>
            </div>
            <div className="group flex items-center">
              <select
                defaultValue="EN"
                className="font-Amata font-normal text-base group-hover:opacity-50 group-hover:cursor-pointer"
              >
                <option>EN</option>
                <option>VN</option>
              </select>
            </div>
            {/* Search info */}
            <div className=" flex gap-2 justify-center items-center group hover:opacity-50 hover:cursor-pointer ">
              <p className="group-hover:opacity-50 group-hover:cursor-pointer ml-2 font-Amata font-normal text-base ">
                Search
              </p>
              <Icon
                icon="material-symbols:search"
                className="group-hover:opacity-50 group-hover:cursor-pointer"
              />
            </div>
          </div>
          {/* Account */}
          {isAuthenticated ? (
            <div className="relative flex items-center gap-4 pr-2">
              <img
                src={user.photoURL}
                className="peer w-12 h-12 rounded-full cursor-pointer"
              />
              <div className="hidden top-[100%] -left-[150px] absolute peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div>{user.displayName}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <Link
                  className="px-4 py-3 text-[1rem] hover:bg-gray-200 font-normal"
                  to="/my-account"
                >
                  My account
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-start text-[1rem] hover:bg-gray-200 font-normal"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex gap-1 items-center group">
              <Icon
                icon="ic:baseline-account-circle"
                className=" text-5xl text-gray-500 group-hover:opacity-50 group-hover:cursor-pointer"
              />
              <p className="font-Amata font-normal text-base group-hover:opacity-50 group-hover:cursor-pointer">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
