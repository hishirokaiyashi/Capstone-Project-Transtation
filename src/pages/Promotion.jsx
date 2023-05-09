import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Banner1 from "../assets/images/Trips/Banner1.png";
import Banner2 from "../assets/images/Trips/Banner2.png";
import Banner3 from "../assets/images/Trips/Banner3.png";
import Banner4 from "../assets/images/Trips/Banner4.png";
import discovere from "../assets/images/Trips/discovere.png";
import explore from "../assets/images/Trips/explore.png";
import summersale from "../assets/images/Trips/summersale.png";
import timetotravel from "../assets/images/Trips/timetotravel.png";

import CanTho from "../assets/images/Home/CanTho-Banner.png";
import HCM from "../assets/images/Home/HCM-Banner.png";
import AnGiang from "../assets/images/Home/AnGiang-Banner.png";
import BenTre from "../assets/images/Home/BenTre-Banner.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.min.css";
import "swiper/css/effect-coverflow";

import MainLayout from "../layouts/MainLayout";

const Promotion = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const bannerPromition = [
    {
      image: Banner1,
    },
    {
      image: Banner2,
    },
    {
      image: Banner3,
    },
  ];
  const hotDestionation = [
    {
      name: "Can Tho",
      image: CanTho,
    },
    {
      name: "Ho Chi Minh",
      image: HCM,
    },
    {
      name: "An Giang",
      image: AnGiang,
    },
    {
      name: "Ben Tre",
      image: BenTre,
    },
  ];
  const discount = [
    {
      name: "Hot summer sale - life is either a daring adventure or nothing ",
      image: discovere,
    },
    {
      name: "Time to travel explore new journey",
      image: explore,
    },
    {
      name: "Summer sale up to 50% off",
      image: summersale,
    },
    {
      name: "Time to travel with us - 40% only off today book now",
      image: timetotravel,
    },
  ];
  return (
    <MainLayout>
      <section className="w-full relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {bannerPromition.map((slide) => (
            <SwiperSlide key={slide.image}>
              <img src={slide.image} alt="" className="w-full h-[500px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="max-w-screen-xl mx-auto flex flex-col">
        <div className="">
          <p className="text-[2rem] mb-[20px] mt-[20px] font-semibold text-[#E04141]">
            HOT DESTINATIONS
          </p>
          <div className="grid grid-cols-4 gap-[30px] ">
            {hotDestionation.map((item, index) => {
              return (
                <div key={index} className="relative rounded-[10px]">
                  <img
                    src={item.image}
                    alt={item.image}
                    className="h-[400px] w-full rounded-[10px] shadow-lg  object-cover after:bg-[rgba(0,0,0,0.5)] "
                  />
                  <div className="w-full flex justify-center p-2 text-center z-2 absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-[1.875rem] text-white font-semibold">
                    <span className="bg-[#ccc] p-4 text-black bg-opacity-70">
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full">
        <p className="max-w-screen-xl mx-auto text-[2rem] mb-[20px] mt-[20px] font-semibold text-[#E04141]">
          TRAVELING
        </p>
        <img src={Banner4} alt={Banner4} className="w-full" />
      </section>
      <section className="max-w-screen-xl mx-auto flex flex-col">
        <p className="text-[2rem] mb-[20px] mt-[20px] font-semibold text-[#E04141]">
          HOT NEWS
        </p>
        <div className="grid grid-cols-2 gap-[10px] ">
          {discount.map((item, index) => {
            return (
              <div key={index} className="relative">
                <img
                  src={item.image}
                  alt={item.image}
                  className="h-[300px] w-full rounded-[10px] object-cover"
                />
                <p className="mt-[10px] font-semibold text-[1rem]">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </MainLayout>
  );
};

export default Promotion;
