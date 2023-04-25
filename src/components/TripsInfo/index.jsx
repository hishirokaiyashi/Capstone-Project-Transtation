import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTripInfo, setPoints } from "../../redux/order.slice";
import { Icon } from "@iconify/react";
import { substractHHMMToHour } from "../../utils/convertDatetime";
import { addDot, removeDot } from "../../utils/currencyFormat";
import { toast } from "react-toastify";
import { getSeatsFromTripId } from "../../firebase/firestore";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validateAddress,
} from "../../utils/validation";

import TripSeat from "../TripSeat";
import TripsPoint from "../TripsPoint";
import TripForm from "../TripForm";

const TripsInfo = ({ tripInfo, route }) => {
  const dispatch = useDispatch();

  const [seats, setSeats] = useState(null);
  const [quanitySeats, setQuanitySeats] = useState([]); // chọn ghế
  const [openMore, setOpenMore] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (openMore) {
      const unsubscribe = getSeatsFromTripId(tripInfo.uid, (data) => {
        setSeats(data);
      });
      return unsubscribe;
    }
  }, [tripInfo, openMore]);

  const handleQuanitySeats = (selectedSeats) => {
    setQuanitySeats((prevSeats) => {
      const selectedSeatIds = selectedSeats.map((seat) => seat.id);
      return selectedSeatIds;
    });
  };

  const handleTabClick = (index) => {
    if (quanitySeats != 0) {
      const selectedTrip = {
        trip_id: tripInfo.uid,
        seats: quanitySeats,
        ticketPrice: tripInfo.ticketPrice,
      };
      dispatch(setTripInfo(selectedTrip));
      dispatch(
        setPoints({
          pickUp: route.pickUps[0],
          final: route.finals[0],
        })
      );
      setActiveTabIndex(index);
    } else {
      toast.info("You must select at least one seat!");
    }
  };

  return (
    <div className="mb-[40px] ">
      <div className="flex pb-[10px] border-b-2 border-dashed bg-white">
        <img
          src={
            tripInfo.type === "Bed"
              ? "/src/assets/images/Trips/Bed-Bus.png"
              : "/src/assets/images/Trips/Seat-Bus.png"
          }
          alt=""
          className="w-[30%] h-[230px] object-cover"
        />
        <div className="pl-[35px] pt-[12px] w-[70%] pr-[18px]">
          <div className="flex justify-between">
            <p className="pt-[16px] font-Ballo text-[1.5rem] font-bold text-[#535354]">
              Luxury {tripInfo.type} Bus - {tripInfo.totalSeats} seats
            </p>
            <p className="text-[0.625rem] text-my-text-gray-third font-Ballo">
              Trip ID: {tripInfo.uid}
            </p>
          </div>
          <div className="flex justify-between pt-[30px]">
            <div className=" w-3/6">
              <div className="flex items-center justify-between pb-[10px]">
                <p className="text-[2rem] font-Ballo">
                  {tripInfo.departureTime}
                </p>
                <div className="border w-[50px] h-0"></div>
                <p className="text-[0.8125rem] text-my-text-gray-third">
                  {route?.startPoint},
                  <br />
                  {route?.direction.split(" - ")[0]}
                </p>
              </div>
              <div className="flex items-center">
                <div className="border w-0 h-[30px]"></div>
                <p className="text-[0.6875rem] text-my-text-gray-third pl-[4px]">
                  {substractHHMMToHour(
                    tripInfo.departureTime,
                    tripInfo.arrivalTime
                  )}
                  hr(s)
                </p>
              </div>
              <div className="flex items-center justify-between pt-[10px]">
                <p className="text-[2rem] font-Ballo">{tripInfo.arrivalTime}</p>
                <div className="border w-[50px] h-0"></div>
                <p className="text-[0.8125rem] text-my-text-gray-third">
                  {route?.endPoint},
                  <br />
                  {route?.direction.split(" - ")[1]}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between w-3/6">
              <p className="text-right text-[2.375rem] text-[#F07272] font-semibold">
                {addDot(tripInfo?.ticketPrice)}
              </p>
              <div className="flex justify-between pl-[38px]">
                <div className="w-[50%]">
                  <p className="text-[1.25rem] font-Ballo text-my-text-gray-second font-semibold">
                    {/* {seats?.filter((seat) => seat.status == "Available").length}{" "} */}
                    {tripInfo.availableSeat} seats left
                  </p>
                  <Link className="text-[0.75rem] w-full text-[#1D7ED8] underline underline-offset-2">
                    View more trip details
                  </Link>
                </div>
                {openMore === false ? (
                  <button
                    className="px-[10px] py-[12px] bg-[#000] text-white text-[1rem] font-Ballo w-[40%]"
                    onClick={() => {
                      setOpenMore(true);
                    }}
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    className="px-[10px] py-[12px] bg-[#000] text-white text-[1rem] font-Ballo w-[40%]"
                    onClick={() => {
                      setOpenMore(false);
                    }}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openMore && (
        <div className=" pt-[40px] px-[20px] bg-white">
          <div className="relative w-full">
            <div className="absolute left-[10%] top-[-8px]  flex items-center flex-col z-[2]">
              <p
                className={`pr-[10px] rounded-full w-[20px] h-[20px] ${
                  activeTabIndex === 0 ? "bg-red-500" : "bg-[#C0BEBE]"
                } mb-[7px]`}
              ></p>
              <p className="text-[#6A6A6B] text-[1.25rem] font-Ballo">
                Seat booking
              </p>
            </div>
            <div className="absolute top-[-8px]  left-[40%] flex items-center flex-col z-[2]">
              <p
                className={`pr-[10px] rounded-full w-[20px] h-[20px] ${
                  activeTabIndex === 1 ? "bg-red-500" : "bg-[#C0BEBE]"
                } mb-[7px]`}
              ></p>
              <p className="text-[#6A6A6B] text-[1.25rem] font-Ballo">
                Pick up and drop off
              </p>
            </div>
            <div className="absolute top-[-8px] left-[80%] flex items-center flex-col z-[2]">
              <p
                className={`pr-[10px] rounded-full w-[20px] h-[20px] ${
                  activeTabIndex === 2 ? "bg-red-500" : "bg-[#C0BEBE]"
                } mb-[7px]`}
              ></p>
              <p className="text-[#6A6A6B] text-[1.25rem] font-Ballo">
                Enter information
              </p>
            </div>
            <div className="absolute border-t-4 w-full border-[#7A7474] top-[30%] z-[0]"></div>
            <span
              className="text-[1rem] absolute right-[-10px] top-[-30px] cursor-pointer "
              onClick={() => {
                setOpenMore(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
              >
                <path
                  fill="red"
                  d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Z"
                />
              </svg>
            </span>
          </div>
          <div className={activeTabIndex === 0 ? "block" : "hidden"}>
            <div className="pt-[50px] pb-[20px] flex justify-center border-b-2">
              <TripSeat
                typeSeat={tripInfo.type}
                seats={seats}
                handleQuanitySeats={handleQuanitySeats}
              />
            </div>
            <div className="flex justify-between items-center py-[10px]">
              <div>
                <span>Seats: </span>
                {quanitySeats.map((seat, index) => {
                  return <span key={index}>{seat}, </span>;
                })}
              </div>
              <div className="flex gap-[10px] items-center">
                <p>Total: </p>
                <p>{addDot(quanitySeats?.length * tripInfo.ticketPrice)}</p>
                <button
                  className="p-[10px] bg-blue-100 text-black"
                  onClick={() => handleTabClick(1)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              activeTabIndex === 1 ? "block pt-[50px] pb-[20px]" : "hidden"
            }
          >
            <div className="flex py-[20px] border-b-2">
              <div className="w-[50%] border-r-2 p-[1rem] ">
                <dir className="">pick up point</dir>
                <TripsPoint
                  type="pickUps"
                  pickUpsPoint={route.pickUps}
                  finalsPoint={route.finals}
                />
              </div>
              <div className="w-[50%] p-[1rem]">
                <dir className="">Pay point</dir>
                <TripsPoint
                  type="finals"
                  finalsPoint={route.finals}
                  pickUpsPoint={route.pickUps}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-[16px] pb-[8px]">
              <button
                className="flex items-center justify-center px-[15px] text-center"
                onClick={() => handleTabClick(0)}
              >
                <span>&lt; Back</span>
              </button>
              <div className="flex gap-[10px] items-center">
                <p>Total: </p>
                <p>{addDot(quanitySeats?.length * tripInfo.ticketPrice)}</p>
                <button onClick={() => handleTabClick(2)}>Next</button>
              </div>
            </div>
          </div>
          <div
            className={
              activeTabIndex === 2
                ? "pt-[50px] pb-[20px] flex flex-col"
                : "hidden"
            }
          >
            <TripForm />
            <div className="flex justify-between items-center pt-[16px] pb-[8px]">
              <button
                className="flex items-center justify-center px-[15px] text-center"
                onClick={() => handleTabClick(1)}
              >
                <span>&lt; Back</span>
              </button>
              <div className="flex gap-[10px] items-center">
                <p>Total: </p>
                <p>{addDot(quanitySeats?.length * tripInfo.ticketPrice)}</p>
                <button>Continue</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsInfo;
