import React from "react";
import QRCODE from "../../assets/images/Trips/QRCODE.png";

const TripTicket = () => {
  return (
    <div className="px-[200px]">
      <div className=" rounded-[5px] bg-ticket bg-no-repeat bg-cover">
        <div className="border-2 rounded-t-[10px]">
          <h2 className="text-center font-semibold text-[2rem] pt-[20px]">
            Vietnam Road Trip
          </h2>
          <div className="flex flex-col gap-[5px] p-[20px] border-b-2">
            <p className="text-slate-400 mb-[5px]">Ticket Price</p>
            <p className="font-semibold text-[1.375rem]">180.000 đ</p>
          </div>
          <div className="grid grid-cols-3 p-[20px] border-b-2">
            <div>
              <p className="mb-[10px] text-slate-400">Travel Date</p>
              <p className="font-semibold">08/05/2023</p>
            </div>
            <div>
              <p className="mb-[10px] text-slate-400">Pickup Point</p>
              <p className="font-semibold">
                395 Kinh Dương Vương, P.An Lạc, Q.Bình Tân, TP.HCM
              </p>
            </div>
            <div>
              <p className="mb-[10px] text-slate-400">Booking_Id</p>
              <p className="font-semibold">
                071d2da7-5bbe-4f40-aaf3-e84f64b38ac7
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[20px] p-[20px]">
            <div>
              <p className="mb-[10px] text-slate-400">Passager Name</p>
              <p className="font-semibold">Le Tuyen</p>
            </div>
            <div>
              <p className="mb-[10px] text-slate-400">Address</p>
              <p className="font-semibold">
                43 Suong Nguyet Anh, Chau Doc city, An Giang province
              </p>
            </div>
            <div>
              <p className="mb-[10px] text-slate-400">Seat number</p>
              <p className="font-semibold">A03</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="z-[10] ticket-test"></div>
          <p className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 font-semibold text-[white] p-[10px] text-[1.675rem]  w-full text-center">
            Boarding Pass
          </p>
        </div>
        <div className="flex flex-col items-center rounded-b-[10px] pb-[20px] border-b-2 border-l-2 border-r-2">
          <img
            src={QRCODE}
            alt={QRCODE}
            className="w-[200px] h-[200px] mt-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default TripTicket;
