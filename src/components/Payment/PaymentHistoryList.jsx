import React, { useState } from "react";

import { isPastDate, getDDMMYY } from "../../utils/convertDatetime.js";
import { Icon } from "@iconify/react";
import QRCODE from "../../assets/images/Trips/QRCODE.png";
import { addDot } from "../../utils/currencyFormat.js";

const PaymentHistoryList = ({ orderInfo }) => {
  const [viewMoreDetails, setViewMoreDetails] = useState(false);

  return (
    <div className="shadow-[0px_4px_6px_3px_#00000024] ">
      <div className={`flex bg-white ${viewMoreDetails ? "pb-[20px]" : ""}  `}>
        <div className=" pt-6 px-14 pb-10 border-b-2 ">
          <div className="w-full flex justify-between gap-16 items-center">
            <div
              className="flex items-center justify-center font-Ballo text-[1.5rem] 
            gap-3 font-bold text-[#535354]"
            >
              <span>{orderInfo?.from} </span>
              <span>
                <Icon
                  icon="material-symbols:arrow-right-alt"
                  width="45"
                  className=" font-thin"
                />
              </span>
              <span>{orderInfo?.to}</span>
            </div>
            <div className=" w-1/3 text-[0.625rem] text-my-text-gray-third font-Ballo">
              Booking ID: {orderInfo?.uid}
            </div>
          </div>
          <div className="flex flex-col justify-between text-[#535354]">
            <p className=" font-Ballo text-sm mb-2">
              <span>Date: {orderInfo?.date} - </span>
              <span>{orderInfo?.departureTime}</span>
            </p>

            {/* Details */}
          </div>
          <div className="mt-[15px] flex justify-between items-center ">
            {!isPastDate(getDDMMYY(orderInfo?.date)) ? (
              <div
                className="flex h-full py-[8px] px-[20px] tracking-wide
               bg-[#4CAF50] font-semibold text-white text-lg"
              >
                Purchase Successful
              </div>
            ) : (
              <div className="flex h-full py-[12px] px-[12px] tracking-wide bg-[#cccc] text-white text-[1rem]">
                <p>TICKET USED</p>
              </div>
            )}
            <p className=" font-Ballo text-3xl font-semibold text-[#1D7ED8]">
              {" "}
              {addDot(orderInfo.totalPrice)}
            </p>
            {console.log(orderInfo)}
          </div>
          <div
            onClick={() => setViewMoreDetails(!viewMoreDetails)}
            className=" flex flex-row-reverse items-center cursor-pointer hover:border ease-linear duration-300 hover:border-[#1D7ED8] "
          >
            <Icon
              icon="material-symbols:keyboard-arrow-down"
              width="27"
              height="27"
              className="text-[#6A6A6B]"
            />
            <span className="underline text-[#1D7ED8] underline-offset-2 text-xs">
              View more details
            </span>
          </div>
        </div>
      </div>

      {viewMoreDetails && (
        <>
          <div className="flex gap-[20px] py-[30px]">
            <div className="mx-auto">
              <div className="px-14 pb-10 ">
                <div
                  onClick={() => setViewMoreDetails(!viewMoreDetails)}
                  className="flex flex-row-reverse  -translate-y-8"
                >
                  <Icon icon="ic:outline-close" className="text-[#6A6A6B]" />
                </div>
                <p className="font-Ballo text-lg text-[#6A6A6B] mb-2">
                  <span className="font-medium mr-2 ">Transaction ID: </span>
                  <span className="uppercase">{orderInfo?.user_id}</span>
                </p>
                <p className="font-Ballo text-lg text-[#6A6A6B] mb-2">
                  <span className="font-medium mr-2">Purchase on: </span>
                  <span className="uppercase">
                    {orderInfo?.date} - {orderInfo?.final.time}
                  </span>
                </p>

                <p className="font-Ballo text-lg text-[#6A6A6B] mb-2">
                  <span className="font-medium mr-2">Payment Method:</span>
                  <span className="font-normal">Credit Card</span>
                </p>
              </div>

              {/* Optional Buttons */}
              <div className="flex justify-between gap-5 px-14">
                <button className="flex items-center border border-[#C0BEBE] p-2  ease-linear duration-300 hover:bg-[#D9D9D94D] hover:border-none">
                  <Icon
                    icon="material-symbols:download"
                    className="text-[#E04141]"
                  />
                  <span className="font-Ballo text-base font-semibold text-[#E04141] pl-[5px]">
                    SEND RECEIPT TO EMAIL
                  </span>
                </button>
                <button className="flex items-center border border-[#C0BEBE] p-2 ease-linear duration-300 hover:bg-[#D9D9D94D] hover:border-none">
                  <Icon
                    icon="material-symbols:mail-outline-sharp"
                    className="text-[#E04141]"
                  />
                  <span className="font-Ballo text-base  font-semibold text-[#E04141] pl-[5px] ">
                    DOWNLOAD RECEIPT
                  </span>
                </button>
                <button className="flex items-center border border-[#C0BEBE] p-2 ease-linear duration-300 hover:bg-[#D9D9D94D] hover:border-none">
                  <Icon
                    icon="material-symbols:print"
                    className="text-[#E04141]"
                  />
                  <span className="font-Ballo text-base font-semibold text-[#E04141] pl-[5px]">
                    ASK FOR REFUND
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistoryList;
