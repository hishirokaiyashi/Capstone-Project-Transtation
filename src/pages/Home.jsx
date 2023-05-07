import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import MainLayout from "../layouts/MainLayout";
import SearchTrip from "../components/SearchTrip";

import CanThoBanner from "../assets/images/Home/CanTho-Banner.png";
import DongThapBanner from "../assets/images/Home/DongThap-Banner.png";
import BenTreBanner from "../assets/images/Home/BenTre-Banner.png";
import AnGiangBanner from "../assets/images/Home/AnGiang-Banner.png";
import MeKongBanner from "../assets/images/Home/MeKong-Banner.png";
import FloatingMarketBanner from "../assets/images/Home/FloatingMarket-Banner.png";

import AliceCarousel from "react-alice-carousel";

const Home = () => {
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const popularResponsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 4,
      itemsFit: "contain",
    },
  };

  const exclusiveResponsive = {
    0: {
      items: 1,
      itemsFit: "contain",
    },
    870: {
      items: 1,
      itemsFit: "contain",
    },
    1024: {
      items: 2,
      itemsFit: "contain",
    },
  };

  const popularRoutes = [
    {
      id: 1,
      imageURL: CanThoBanner,
      code: "SAI GON - CAN THO",
      price: "From: 180,000 VND",
      color: "bg-[#59608B]",
    },
    {
      id: 2,
      imageURL: DongThapBanner,
      code: "SAI GON - DONG THAP",
      price: "From: 200,000 VND",
      color: "bg-[#A57E0B]",
    },
    {
      id: 3,
      imageURL: BenTreBanner,
      code: "SAI GON - BEN TRE",
      price: "From: 190,000 VND",
      color: "bg-[#8C902B]",
    },
    {
      id: 4,
      imageURL: AnGiangBanner,
      code: "SAI GON - AN GIANG",
      price: "From: 210,000 VND",
      color: "bg-[#99789F]",
    },
    {
      id: 5,
      imageURL: AnGiangBanner,
      code: "SAI GON - AN GIANG",
      price: "From: 210,000 VND",
      color: "bg-[#99789F]",
    },
    {
      id: 6,
      imageURL: AnGiangBanner,
      code: "SAI GON - AN GIANG",
      price: "From: 210,000 VND",
      color: "bg-[#99789F]",
    },
  ];

  const handleAvoidClick = (e) => {
    if (popularResponsive.lenght) {
    }
  };

  //Animation framer motion

  return (
    <MainLayout>
      <section className="search-trip relative  flex flex-col items-center justify-center bg-banner-home bg-no-repeat bg-cover h-[427px] after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-banner-opacity after:z-[-1] z-0">
        <div className="flex justify-center flex-col items-center max-w-screen-xl w-full mx-auto">
          <h1 className="text-white text-4xl mb-10 font-semibold">
            START YOUR TRIP WITH US HERE
          </h1>
          <SearchTrip />
        </div>
      </section>
      <section
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="00"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        className="popular-routes"
      >
        <hr className="w-[311px] bg-primaryRed h-[8px] my-14" />
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-4xl  font-extrabold mb-8">
            POPULAR <span className="text-btnRed">ROUTES</span>
          </h2>
          <AliceCarousel
            keyboardNavigation
            mouseTracking
            disableDotsControls
            responsive={popularResponsive}
            onSlideChanged={(e) => handleAvoidClick(e)}
            items={popularRoutes.map((item) => (
              <div key={item.id} className="carousel-item flex flex-col p-4">
                <img src={item.imageURL} alt={item.code} className="w-full" />
                <div className={`${item.color} p-3`}>
                  <h3 className="text-lg text-white font-medium">
                    {item.code}
                  </h3>
                  <h5 className="text-base text-white">{item.price}</h5>
                </div>
              </div>
            ))}
            renderNextButton={({ isDisabled }) => (
              <div className="bg-white shadow-lg p-2 w-12 h-12 right-0 flex cursor-pointer">
                <Icon
                  icon="ic:sharp-keyboard-arrow-right"
                  width="35"
                  height="35"
                  className="self-center"
                />
              </div>
            )}
            renderPrevButton={({ isDisabled }) => (
              <div className="bg-white shadow-lg p-2 w-12 h-12 left-0 flex cursor-pointer">
                <Icon
                  icon="ic:sharp-keyboard-arrow-left"
                  width="35"
                  height="35"
                  className="self-center"
                />
              </div>
            )}
          />
        </div>
      </section>
      <section
        data-aos="flip-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="00"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        className="exclusive-routes mt-10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center">
            <h2 className="text-4xl  font-extrabold mr-4">
              <span className="text-btnRed">EXCLUSIVE</span> SERVICES
            </h2>
            <hr className="w-[204PX] bg-primaryRed h-[8px] my-14" />
          </div>
          <AliceCarousel
            keyboardNavigation
            mouseTracking
            responsive={exclusiveResponsive}
            items={[
              <div className="relative carousel-item mx-4 flex flex-col bg-free-banner h-[300px] bg-cover after:bg-gradient-to-r after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:from-[rgba(24,50,74,0.6)] after:to-[rgba(139,196,248,0.31)] after:z-[-1] z-0">
                <div
                  className={`p-8 mt-4 h-full flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="text-5xl font-bold text-white">
                      FREE PICKUP
                    </h3>
                    <h5 className="text-base text-white mt-2">
                      For all locations in Ho Chi Minh <br /> City, Can Tho City
                    </h5>
                  </div>
                  <button className="float-end py-4 px-4 text-white bg-black rounded-lg w-fit mb-4">
                    View details
                  </button>
                </div>
              </div>,
              <div className="relative carousel-item mx-4 flex flex-col bg-transit-banner h-[300px] bg-cover after:bg-gradient-to-r after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:from-[rgba(66,90,27,0.78)] after:to-[rgba(255,255,255,0.17)] after:z-[-1] z-0">
                <div
                  className={`p-8 mt-4 h-full flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="text-5xl  font-bold text-white">
                      TRANSIT PROVIDED
                    </h3>
                    <h5 className="text-base  text-white mt-2">
                      Transit service is available for <br /> all destinations
                      in 14 areas, <br />
                      cities and provinces
                    </h5>
                  </div>
                  <button className="float-end py-4 px-4 text-white bg-black rounded-lg w-fit mb-4">
                    View details
                  </button>
                </div>
              </div>,
            ]}
            renderNextButton={({ isDisabled }) => (
              <div className="bg-white shadow-lg p-2 w-12 h-12 left-0 flex cursor-pointer">
                <Icon
                  icon="ic:sharp-keyboard-arrow-right"
                  width="35"
                  height="35"
                  className="self-center"
                />
              </div>
            )}
            renderPrevButton={({ isDisabled }) => (
              <div className="bg-white shadow-lg p-2 w-12 h-12 left-0 flex cursor-pointer">
                <Icon
                  icon="ic:sharp-keyboard-arrow-left"
                  width="35"
                  height="35"
                  className="self-center"
                />
              </div>
            )}
          />
        </div>
      </section>
      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="00"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        className="checkout bg-[#EEEDED] py-4 pb-10"
      >
        <hr className="w-[311px] bg-primaryRed h-[8px] my-14" />
        <div className="w-[1280px] mx-auto flex">
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-btnRed flex flex-col">
              <span className="text-black mb-2">ALSO</span>
              CHECK OUT
            </h1>
            <p className=" text-sm text-[#6A6A6B] mt-4 leading-8">
              Vietnam is a beautiful country in Southeast Asia, known for its
              rich history, vibrant culture, and breathtaking natural scenery.
              The country has become a popular tourist hub over the years, with
              millions of visitors flocking to its shores to experience its
              beauty and charm. If you're planning a trip to Vietnam, there are
              several must-visit destinations that you should not miss. In this
              article, we will take a closer look at the most famous Vietnam
              tour places that you should include in your itinerary.
            </p>
            <button className="float-end mt-2 py-4 px-4 text-[#414242]  bg-white shadow-lg rounded-lg w-fit mb-4">
              View details
            </button>
          </div>
          <div className="flex-1 flex">
            <article className="shadow-lg w-full mr-8 flex flex-col">
              <img src={MeKongBanner} alt="An Giang" className="w-[371px]" />
              <div className="flex-1 bg-white p-4  flex flex-col">
                <h6 className="text-primaryRed text-[11px]">Mekong Delta</h6>
                <h5 className="text-[#5B5D60] text-xl font-semibold">
                  An Giang
                </h5>
                <p className="mt-2 text-[11px] relative after:bg-gradient-to-t after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-10 after:from-[rgba(255,255,255,1)] after:to-[rgba(255,255,255,0.1)] z-0">
                  An Giang is a province in southern Vietnam, bordering
                  Cambodia. It lies in the Mekong Delta and tributaries of the
                  vast Mekong River run through its fertile landscape. It's
                  known for its agricultural traditions, c
                </p>
                <Link className="self-end text-[12px]" to="/">
                  See More
                </Link>
              </div>
            </article>
            <article className="shadow-lg w-full flex flex-col">
              <img
                src={FloatingMarketBanner}
                alt="Floating Market"
                className="w-[371px]"
              />
              <div className="flex-1 bg-white p-4  flex flex-col">
                <h6 className="text-primaryRed text-[11px]">Mekong Delta</h6>
                <h5 className="text-[#5B5D60] text-xl font-semibold">
                  Floating Market
                </h5>
                <p className="mt-2 text-[11px] relative after:bg-gradient-to-t after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-10 after:from-[rgba(255,255,255,1)] after:to-[rgba(255,255,255,0.1)] z-0">
                  In this article, you can find insight details about Cai Rang
                  floating market and Phong Dien floating market in Can Tho,
                  Vietnam: How to get, when to go, what to see & eat at Can Tho
                  floating markets. To get the spirit
                </p>
                <Link className="self-end text-[12px]" to="/">
                  See More
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
