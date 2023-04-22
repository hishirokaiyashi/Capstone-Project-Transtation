import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { getRouteFromId } from "../../firebase/firestore";
import { substractHHMMToHour } from "../../utils/convertDatetime";
import { addDot, removeDot } from "../../utils/currencyFormat";

const placeList = [
  {
    id: "SAIGON",
    name: "Ho Chi Minh city",
    code: "SG",
  },
  {
    id: "ANGIANG",
    name: "An Giang province",
    code: "AG",
  },
  {
    id: "CANTHO",
    name: "Can Tho city",
    code: "CT",
  },
  {
    id: "BENTRE",
    name: "Ben Tre province",
    code: "BT",
  },
  {
    id: "DANANG",
    name: "Da Nang city",
    code: "DN",
  },
  {
    id: "DALAT",
    name: "Da Lat city",
    code: "DL",
  },
];

const TripsInfo = ({ tripInfo }) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    getRoute();
  }, []);

  const getRoute = async () => {
    const res = await getRouteFromId(tripInfo.route_id);
    setRoute(res);
  };

  return (
    <div className="mb-[40px]">
      <div className="flex bg-white">
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
                  hr
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
                {addDot(tripInfo.ticketPrice)}
              </p>
              <div className="flex justify-between pl-[38px]">
                <div>
                  <p className="text-[1.25rem] font-Ballo text-my-text-gray-second font-semibold">
                    30 seats left
                  </p>
                  <Link className="text-[0.75rem] text-[#1D7ED8] underline underline-offset-2">
                    View more trip details
                  </Link>
                </div>
                <button className="px-[38px] py-[12px] bg-[#000] text-white text-[1.25rem] font-Ballo">
                  BUY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-3 px-[40px] py-[10px]">
        <div className="flex items-center justify-between">
          <p className="pr-[10px]">1</p>
          Desired place
          <div className="border w-[50px] h-0"></div>
        </div>
        <div className="flex items-center">
          <p className="pr-[10px]">2</p>
          Pick up and drop off point
          <div className="border w-[50px] h-0"></div>
        </div>
        <div className="flex">
          <p className="pr-[10px]">3</p>
          Enter information
        </div>
        <span className="text-[1rem] absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default TripsInfo;
