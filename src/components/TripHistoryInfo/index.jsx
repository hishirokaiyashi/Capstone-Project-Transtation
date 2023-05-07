import React, { useState } from "react";

import { isPastDate, getDDMMYY } from "../../utils/convertDatetime.js";
import { Icon } from "@iconify/react";
import BedBus from "../../assets/images/Trips/Bed-Bus.png";
import SeatBus from "../../assets/images/Trips/Seat-Bus.png";
const TripHistoryInfo = ({ orderInfo }) => {
  const [viewMoreDetails, setViewMoreDetails] = useState(false);

  return (
    <div className="shadow-[0px_4px_6px_3px_#00000024] ">
      <div
        className={`flex bg-white ${
          viewMoreDetails ? "pb-[20px]" : ""
        }  border-b-2`}
      >
        <img
          src={orderInfo?.type === "Bed" ? BedBus : SeatBus}
          alt=""
          className="w-[30%] h-full object-cover"
        />
        <div className="pl-[28px] pt-[12px] w-[70%] pr-[18px] ">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center font-Ballo text-[1.5rem] font-bold text-[#535354]">
              <span>{orderInfo?.from} </span>
              <span>
                <Icon icon="material-symbols:arrow-right-alt" width="40" />
              </span>
              <span>{orderInfo?.to}</span>
            </div>
            <p className="text-[0.625rem] text-my-text-gray-third font-Ballo">
              Booking ID: {orderInfo?.uid}
            </p>
          </div>
          <div className="flex flex-col justify-between ">
            <p className="mb-[10px]">
              <span>Date: {orderInfo?.date} - </span>
              <span>{orderInfo?.departureTime}</span>
            </p>
            <ul className="list-disc">
              <li className="font-semibold mb-[10px]">
                Pick up point:{" "}
                <span className="font-normal leading-normal">
                  {orderInfo?.pickUp.location} - {orderInfo?.pickUp.name}
                </span>
              </li>
              <li className="font-semibold">
                Drop off point:{" "}
                <span className="font-normal leading-normal">
                  {orderInfo?.final.location} - {orderInfo?.final.name}
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-[15px] flex justify-between items-center ">
            {!isPastDate(getDDMMYY(orderInfo?.date)) ? (
              <div className="flex h-full py-[12px] px-[12px] tracking-wide bg-[#4CAF50] text-white text-[1rem]">
                <p>TICKET ISSUED</p>
              </div>
            ) : (
              <div className="flex h-full py-[12px] px-[12px] tracking-wide bg-[#cccc] text-white text-[1rem]">
                <p>TICKET USED</p>
              </div>
            )}
            <div
              onClick={() => setViewMoreDetails(!viewMoreDetails)}
              className="flex items-center cursor-pointer p-2 hover:border ease-linear duration-300 hover:border-[#1D7ED8] "
            >
              <span className="underline text-[#1D7ED8] underline-offset-2">
                View more details
              </span>
              <Icon
                icon="material-symbols:keyboard-arrow-down"
                width="26"
                height="26"
              />
            </div>
          </div>
        </div>
      </div>

      {viewMoreDetails && (
        <>
          <div className="flex gap-[20px] py-[30px]  px-[20px]">
            <div className="w-[30%]">
              <img
                src={orderInfo?.qrCode[0]}
                alt={orderInfo?.qrCode[0]}
                className={`${
                  isPastDate(getDDMMYY(orderInfo?.date)) ? "blur-sm" : null
                } object-cover w-full -mt-2.5`}
              />
              <p className="text-center text-[0.625rem] text-[#535354]">
                Please show the bus driver or bus assistant this QR code when
                onboarding
              </p>
              {orderInfo?.type === "Bed" && (
                <div className="p-[10px]  ">
                  <p className="text-[1.5rem] text-center mb-[10px] mt-[5px] text-[#6A6A6B] font-semibold font-Ballo">
                    Upstairs
                  </p>
                  <div className="bg-my-bg-seat p-[5px] rounded-[10px]">
                    <div className="flex items-center justify-between mb-[5px] ">
                      <div className="flex items-center">
                        <Icon
                          width="35"
                          height="35"
                          className="mr-[5px]"
                          icon="ph:steering-wheel"
                        />
                        <span>Driver</span>
                      </div>
                      <div className="border-r-2 border-[#535354] pr-[5px]">
                        Entrance
                      </div>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-3">
                        {new Array(15)
                          .fill(
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(204, 204, 204, 0.8)"
                              className="cursor-pointer"
                            />
                          )
                          .map((element, index) => {
                            let justifyClass = "";
                            if (index % 3 === 0) {
                              justifyClass = "justify-self-start";
                            } else if (index % 3 === 1) {
                              justifyClass = "justify-self-center";
                            } else if (index % 3 === 2) {
                              justifyClass = "justify-self-end";
                            }
                            let idSeat = `A${(index + 1)
                              .toString()
                              .padStart(2, "0")}`;
                            return orderInfo.tickets.includes(idSeat) ? (
                              <span key={index} className={justifyClass}>
                                <Icon
                                  width="40"
                                  height="40"
                                  icon="material-symbols:bedroom-child"
                                  color="green"
                                  className={` cursor-pointer`}
                                  id={idSeat}
                                />
                              </span>
                            ) : (
                              <span key={index} className={justifyClass}>
                                <Icon
                                  width="40"
                                  height="40"
                                  icon="material-symbols:bedroom-child"
                                  color="rgba(204, 204, 204, 0.8)"
                                  className={` cursor-pointer`}
                                  id={idSeat}
                                />
                              </span>
                            );
                          })}
                      </div>

                      <div className="grid grid-cols-5 mt-[10px]">
                        {new Array(5)
                          .fill(
                            <Icon
                              width="40"
                              height="40"
                              className="overflow-hidden"
                              icon="material-symbols:bedroom-child"
                              color="rgba(204, 204, 204, 0.8)"
                            />
                          )
                          .map((element, index) => {
                            let idSeat = `A${(index + 16)
                              .toString()
                              .padStart(2, "0")}`;
                            return orderInfo.tickets.includes(idSeat) ? (
                              <span
                                key={index}
                                className={
                                  index === 4
                                    ? "flex justify-self-end"
                                    : "flex justify-center"
                                }
                              >
                                <Icon
                                  width="40"
                                  height="40"
                                  icon="material-symbols:bedroom-child"
                                  color="green"
                                  className="cursor-pointer"
                                  id={idSeat}
                                />
                              </span>
                            ) : (
                              <span
                                key={index}
                                className={
                                  index === 4
                                    ? "flex justify-self-end"
                                    : "flex justify-center"
                                }
                              >
                                <Icon
                                  width="40"
                                  height="40"
                                  icon="material-symbols:bedroom-child"
                                  color="rgba(204, 204, 204, 0.8)"
                                  className="cursor-pointer"
                                  id={idSeat}
                                />
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <p className="text-[1.5rem] text-center mb-[10px] mt-[10px] text-[#6A6A6B] font-semibold font-Ballo">
                    Downstairs
                  </p>
                  <div className="bg-my-bg-seat p-[5px] rounded-[10px]">
                    <div className="grid grid-cols-3 ">
                      {new Array(15)
                        .fill(
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="rgba(204, 204, 204, 0.8)"
                            className="cursor-pointer"
                          />
                        )
                        .map((element, index) => {
                          let justifyClass = "";
                          if (index % 3 === 0) {
                            justifyClass = "justify-self-start";
                          } else if (index % 3 === 1) {
                            justifyClass = "justify-self-center";
                          } else if (index % 3 === 2) {
                            justifyClass = "justify-self-end";
                          }
                          let idSeat = `B${(index + 1)
                            .toString()
                            .padStart(2, "0")}`;
                          return orderInfo.tickets.includes(idSeat) ? (
                            <span key={index} className={justifyClass}>
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="green"
                                className={` cursor-pointer`}
                                id={idSeat}
                              />
                            </span>
                          ) : (
                            <span key={index} className={justifyClass}>
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="rgba(204, 204, 204, 0.8)"
                                className={` cursor-pointer`}
                                id={idSeat}
                              />
                            </span>
                          );
                        })}
                    </div>

                    <div className="grid grid-cols-5 mt-[10px]">
                      {new Array(5)
                        .fill(
                          <Icon
                            width="40"
                            height="40"
                            className="overflow-hidden"
                            icon="material-symbols:bedroom-child"
                            color="rgba(204, 204, 204, 0.8)"
                          />
                        )
                        .map((element, index) => {
                          let idSeat = `A${(index + 16)
                            .toString()
                            .padStart(2, "0")}`;
                          return orderInfo.tickets.includes(idSeat) ? (
                            <span
                              key={index}
                              className={
                                index === 4
                                  ? "flex justify-self-end"
                                  : "flex justify-center"
                              }
                            >
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                className="cursor-pointer"
                                id={idSeat}
                                color="green"
                              />
                            </span>
                          ) : (
                            <span
                              key={index}
                              className={
                                index === 4
                                  ? "flex justify-self-end"
                                  : "flex justify-center"
                              }
                            >
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="rgba(204, 204, 204, 0.8)"
                                className="cursor-pointer"
                                id={idSeat}
                              />
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
              {orderInfo.type === "Seat" && (
                <div className=" p-[10px] rounded-[10px] bg-my-bg-seat">
                  <div className="flex items-center justify-between mb-[5px]">
                    <div className="flex items-center">
                      <Icon
                        width="35"
                        height="35"
                        className="mr-[5px]"
                        icon="ph:steering-wheel"
                      />
                      <span>Driver</span>
                    </div>
                    <div className="border-r-2 border-[#535354] pr-[5px]">
                      Entrance
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <div className="grid grid-rows-10 grid-cols-4">
                        {new Array(40)
                          .fill(
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(204, 204, 204, 0.8)"
                              className="cursor-pointer"
                            />
                          )
                          ?.map((element, index) => {
                            let justifyClass = "";
                            if (index % 4 === 1) {
                              justifyClass = "justify-self-start";
                            } else if (index % 4 === 2) {
                              justifyClass = "justify-self-end";
                            } else if (index % 4 === 3) {
                              justifyClass = "justify-self-end";
                            }
                            let idSeat = `A${(index + 1)
                              .toString()
                              .padStart(2, "0")}`;
                            return orderInfo.tickets.includes(idSeat) ? (
                              <span key={index} className={justifyClass}>
                                <Icon
                                  width="40"
                                  height="40"
                                  icon="material-symbols:bedroom-child"
                                  className="cursor-pointer"
                                  color="green"
                                  id={idSeat}
                                />
                              </span>
                            ) : (
                              <span key={index} className={justifyClass}>
                                <Icon
                                  width="40"
                                  height="40"
                                  icon="material-symbols:bedroom-child"
                                  color="rgba(204, 204, 204, 0.8)"
                                  className="cursor-pointer"
                                  id={idSeat}
                                />
                              </span>
                            );
                          })}
                      </div>
                    </div>

                    <div className="grid grid-cols-5 mt-[15px]">
                      {new Array(5)
                        .fill(
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="rgba(204, 204, 204, 0.8)"
                            className="cursor-pointer"
                          />
                        )
                        ?.map((element, index) => {
                          let justifyClass = "";
                          if (index === 1) {
                            justifyClass = "flex justify-self-star";
                          } else if (index === 4) {
                            justifyClass = "justify-self-end";
                          }
                          let idSeat = `A${(index + 41)
                            .toString()
                            .padStart(2, "0")}`;
                          return orderInfo.tickets.includes(idSeat) ? (
                            <span key={index} className={justifyClass}>
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="green"
                                className="cursor-pointer"
                                id={idSeat}
                              />
                            </span>
                          ) : (
                            <span key={index} className={justifyClass}>
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                className="cursor-pointer"
                                color="rgba(204, 204, 204, 0.8)"
                                id={idSeat}
                              />
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[70%]">
              <p className="text-[1.5rem] text-[#F07272] font-semibold mb-[10px]">
                Your trip infomation:
              </p>
              <div className="flex flex-col gap-[10px] pb-[10px] border-b-2">
                <p>
                  <span className="font-semibold">PASSENGER NAME: </span>
                  <span className="uppercase">{orderInfo?.displayName}</span>
                </p>
                <p>
                  <span className="font-semibold">EMAIL: </span>
                  <span className="uppercase">{orderInfo?.email}</span>
                </p>
                <p>
                  <span className="font-semibold">PHONE: </span>
                  <span className="uppercase">{orderInfo?.phoneNumber}</span>
                </p>
                <p>
                  <span className="font-semibold">FROM: </span>
                  <span className="uppercase">{orderInfo?.from}</span>
                </p>
                <p>
                  <span className="font-semibold">TO: </span>
                  <span className="uppercase">{orderInfo?.to}</span>
                </p>
                <p>
                  <span className="font-semibold">DATE: </span>
                  <span className="uppercase">{orderInfo?.date}</span>
                </p>
                <p>
                  <span className="font-semibold">BOOKING ID: </span>
                  <span className="uppercase">{orderInfo?.uid}</span>
                </p>
              </div>
              <p className="font-semibold text-[#1D7ED8] text-[1.5rem] my-[10px]">
                Bus information:
              </p>
              <div className="flex flex-col gap-[10px] pb-[10px]">
                <p>
                  <span className="font-semibold">TripID: </span>
                  <span className="uppercase">{orderInfo?.uid}</span>
                </p>
                <p>
                  <span className="font-semibold">Bus Type: </span>
                  <span className="uppercase">
                    Luxury {orderInfo?.type} Bus
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Capacity: </span>
                  <span className="uppercase">
                    {orderInfo?.totalSeats} seats
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Departure Time: </span>
                  <span className="uppercase">{orderInfo?.departureTime}</span>
                </p>
                <p>
                  <span className="font-semibold">Arrival Time: </span>
                  <span className="uppercase">{orderInfo?.arrivalTime}</span>
                </p>
                <p className="flex">
                  <span className="font-semibold">Seat Number: </span>
                  {orderInfo?.tickets.map((ticket, index) => {
                    return (
                      <div key={index}>
                        <span className="uppercase"> {ticket}</span>
                      </div>
                    );
                  })}
                </p>
                <p>
                  <span className="font-semibold">Pick up point: </span>
                  <span className="uppercase">
                    {orderInfo?.pickUp.location} - {orderInfo?.pickUp.name}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Drop off point: </span>
                  <span className="uppercase">
                    {orderInfo?.final.location} - {orderInfo?.final.name}
                  </span>
                </p>
              </div>
              <button className="flex items-center w-[60%] border p-2 mb-[10px] ease-linear duration-300 hover:border-[#E04141]">
                <Icon icon="material-symbols:download" width="26" height="26" />
                <span className="font-semibold text-[#E04141] pl-[5px]">
                  CLICK TO DOWNLOAD TICKET
                </span>
              </button>
              <button className="flex items-center w-[60%] border p-2 mb-[10px] ease-linear duration-300 hover:border-[#E04141]">
                <Icon
                  icon="material-symbols:mail-outline-sharp"
                  width="26"
                  height="26"
                />
                <span className="font-semibold text-[#E04141] pl-[5px] ">
                  SEND TICKET TO MAIL
                </span>
              </button>
              <button className="flex items-center w-[60%] border p-2 ease-linear duration-300 hover:border-[#E04141]">
                <Icon icon="material-symbols:print" width="26" height="26" />
                <span className="font-semibold text-[#E04141] pl-[5px]">
                  QUICK PRINT
                </span>
              </button>
            </div>
          </div>
          <div className="flex justify-between px-[20px] pb-[10px]">
            <div className="flex items-center hover:border ease-linear p-2 duration-300 hover:border-[#1D7ED8] cursor-pointer">
              <Icon icon="majesticons:paper-fold-text" width="26" height="26" />
              <span>VIEW PAYMENT DETAILS</span>
            </div>
            <div
              onClick={() => {
                setViewMoreDetails(!viewMoreDetails);
              }}
              className="flex items-center hover:border ease-linear p-2 duration-300 hover:border-[#E04141] cursor-pointer"
            >
              <Icon icon="ph:x" width="26" height="26" />
              <span>CLOSE</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TripHistoryInfo;
