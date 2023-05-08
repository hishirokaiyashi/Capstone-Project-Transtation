import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const MyTicket = () => {
  return (
    <MainLayout>
      <div className=" mb-10">
        <div className="bg-[#F3F3F3]">
          <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
            FREE TRANSIT SERVICE FOR EVERY DESTINATION
          </p>

          <div className="  mx-auto max-w-screen-xl px-60 pt-20 pb-20  ">
            <div className=" rounded-[5px] bg-no-repeat bg-cover bg-white ">
              <div className="border-2 rounded-t-[10px] ">
                <h2 className="text-center font-bold text-[2rem] mt-20 mb-10 uppercase text-[#E04141] ">
                  Vietnam Road Trip
                </h2>
                {/* Ticket */}
                <div className="mx-14 ">
                  <div className="flex justify-between items-center gap-[5px] p-[20px] border-b-2 mt-5">
                    <p className="text-slate-400 text-xl uppercase font-bold">
                      Ticket Price
                    </p>
                    <p className="font-semibold text-[1.375rem]">180.000 đ</p>
                  </div>
                  <div className="grid grid-cols-3 gap-7 border-b-2 py-8">
                    <div>
                      <p className="mb-[10px] text-slate-400">Travel Date</p>
                      <p className="font-semibold text-justify">08/05/2023</p>
                    </div>
                    <div className="">
                      <p className="mb-[10px] text-slate-400">Booking ID</p>
                      <p className="font-semibold text-justify">071D2JQ7</p>
                    </div>
                    <div className=" ">
                      <p className="mb-[10px] text-slate-400">Pickup Point</p>
                      <p className="font-semibold text-justify">
                        395 Hùng Vương, P.12, Q.4, TP.HCM
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-7 py-8">
                    <div>
                      <p className="mb-[10px] text-slate-400">Passager Name</p>
                      <p className="font-semibold text-justify">Le Tuyen</p>
                    </div>
                    <div>
                      <p className="mb-[10px] text-slate-400">Seat number</p>
                      <p className="font-semibold text-justify">A03</p>
                    </div>
                    <div>
                      <p className="mb-[10px] text-slate-400">Address</p>
                      <p className="font-semibold text-justify">
                        43 Suong Nguyet Anh, Chau Doc city, An Giang province
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="z-[10] ticket-test"></div>
                <p className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-semibold text-[white] p-[10px] text-[1.675rem]  w-full text-center">
                  Boarding Pass
                </p>
              </div>
              <div className="flex flex-col items-center rounded-b-[10px] pb-8 border-b-2 border-l-2 border-r-2">
                <img
                  src="src/assets/images/Trips/QRCODE.png"
                  alt=""
                  className="w-[200px] h-[200px] mt-[20px]"
                />
              </div>
            </div>

            {/* Optional Buttons */}
            <div className="flex justify-between mt-3">
              <Link
                to="/"
                className="font-Ballo text-lg font-semibold text-[#1D7ED8] underline "
              >
                Back to Home
              </Link>
              <Link
                to="/order-history"
                className="font-Ballo text-lg font-semibold text-[#1D7ED8] underline "
              >
                View My Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyTicket;
