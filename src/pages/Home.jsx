import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import SearchTrip from "../components/SearchTrip";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const testToast = () => {
    toast.success("Hello there");
  };

  return (
    <MainLayout>
      <div className="">
        <section className="relative  flex flex-col items-center justify-center bg-banner-home bg-no-repeat bg-cover h-[427px] after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-banner-opacity after:z-[-1] z-0">
          <div className="flex justify-center flex-col items-center max-w-screen-xl w-full mx-auto">
            <h1 className="text-white font-Achivo text-4xl mb-10">
              START YOUR TRIP WITH US HERE
            </h1>
            <SearchTrip />
          </div>
        </section>
        <button
          className="bg-blue-400 px-3 py-2 rounded-lg"
          onClick={goToLogin}
        >
          Login
        </button>
        <button
          className="bg-blue-400 px-3 py-2 rounded-lg"
          onClick={testToast}
        >
          Show toast
        </button>
        <h1 className="text-black text-4xl">
          Hello there <br />
          My name is Jeo peo
        </h1>
        <h2>Here is an icon example</h2>
        <Icon
          icon="simple-icons:hellofresh"
          color="#888"
          width="32"
          height="32"
        />
        <h3>This is link to trips</h3>
        <Link className="bg-blue-400 px-3 py-2 rounded-lg my-4" to="/trips">
          Qua trang Trips
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;
