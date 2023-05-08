import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

import { addDot, vndToUsd, UsdToVnd } from "../utils/currencyFormat";
import { getOrderById } from "../firebase/firestore";
import failPayment from "../assets/images/Payment/failedPayment.jpg";
import MainLayout from "../layouts/MainLayout";

import Loader from "../components/Loader";

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  useEffect(() => {
    if (orderId) {
      getOrder(orderId);
    } else {
      toast.error("Wrong URL!");
      navigate("/notfound");
    }
  }, []);

  const getOrder = async (orderId) => {
    try {
      const res = await getOrderById(orderId);
      if (res) {
        setLoading(false);
        setOrderInfo(res);
      } else {
        toast.error("Order not found, your order might be cancelled");
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("There was an error while getting the order.");
      setError(true);
    }
  };
  if (loading) return <Loader />;
  return error || !orderId ? (
    <Navigate to="/notfound" replace />
  ) : orderInfo.paymentStatus === "Paid" ? (
    <MainLayout>
      <div className="">
        <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
          FREE TRANSIT SERVICE FOR EVERY DESTINATION
        </p>
        <div className="bg-[#eeeeee] py-[20px]">
          <div className="max-w-[600px] m-auto p-4 bg-white  flex justify-center flex-col ">
            <div className="flex flex-col items-center my-10">
              <Icon
                icon="ic:baseline-check-circle-outline"
                color="#e04141"
                width="100"
                height="100"
                className="text-center mb-5"
              />
              <p className="font-Ballo text-4xl font-bold mt-[10px] mb-[15px] tracking-wide">
                PAYMENT SUCCESSFULLY
              </p>
              <p className="text-[#6A6A6B] tracking-wide font-Amata font-normal">
                Congratulations, your ticket had been issued
              </p>
            </div>
            <div className="flex flex-col justify-start">
              <div className="mx-3">
                <div className="bg-[#E04141] mb-4 w-full p-[10px] text-white font-semibold text-[1.25rem]">
                  Your trip information
                </div>
              </div>

              {/* Trip Info */}
              <div className="py-[16px] px-[10px] flex flex-col gap-[10px] border-b-2 pb-8 mx-6 mb-4">
                <p className="font-semibold font-Ballo text-base">
                  PASSENGER NAME:{" "}
                  <span className="ml-1 font-semibold">
                    {orderInfo.displayName.toUpperCase()}
                  </span>
                </p>
                <p className="font-semibold font-Ballo text-base leading-6">
                  EMAIL:{" "}
                  <span className="font-normal ml-1">{orderInfo.email}</span>
                </p>

                <p className="font-semibold font-Ballo text-base leading-6">
                  PHONE:{" "}
                  <span className="font-normal ml-1">
                    {orderInfo.phoneNumber}
                  </span>
                </p>
                <p className="font-semibold font-Ballo text-base leading-6">
                  FROM:{" "}
                  <span className="font-normal ml-1">{orderInfo.from}</span>
                </p>
                <p className="font-semibold font-Ballo text-base leading-6">
                  TO: <span className="font-normal ml-1">{orderInfo.to}</span>
                </p>
                <p className="font-semibold font-Ballo text-base leading-6">
                  DATE:{" "}
                  <span className="font-normal ml-1">{orderInfo.date}</span>
                </p>
                <p className="font-semibold font-Ballo text-base leading-6">
                  BOOKING ID:{" "}
                  <span className="font-normal ml-1">{orderInfo.uid}</span>
                </p>
              </div>
              <div className="py-[16px] px-[10px] flex flex-col gap-[10px] ">
                <p className=" bg-[#1D7ED8] w-full p-[10px] text-white font-semibold text-[1.25rem]">
                  BUS INFORMATION:
                </p>

                {/* Bus Info */}
                <div className=" mx-6 mb-2">
                  <p className="font-semibold font-Ballo text-base leading-10">
                    TRIP ID:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.trip_id}
                    </span>
                  </p>

                  <p className="font-semibold font-Ballo text-base leading-10">
                    BUS TYPE:{" "}
                    <span className="font-normal ml-1">
                      Luxury Seater {orderInfo.type} Bus
                    </span>
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    CAPACITY:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.totalSeats} Seats
                    </span>
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    DEPARTURE TIME:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.departureTime}
                    </span>
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    ARRIVAL TIME:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.arrivalTime}
                    </span>
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    TICKET AMOUNT:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.ticketAmount}
                    </span>
                  </p>

                  <p className="font-semibold font-Ballo text-base leading-10">
                    SEAT NUMBER:{" "}
                    {orderInfo.tickets.map((seat, index) => {
                      const isLastSeat = index === orderInfo.tickets.length - 1;
                      return (
                        <span key={index} className="font-normal">
                          {seat}
                          {!isLastSeat && ","}{" "}
                        </span>
                      );
                    })}
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    PICK UP POINT:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.pickUp.location} - {orderInfo.pickUp.name}
                    </span>
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    DROP OFF POINT:{" "}
                    <span className="font-normal ml-1">
                      {orderInfo.final.location} - {orderInfo.final.name}
                    </span>
                  </p>
                  <p className="font-semibold font-Ballo text-base leading-10">
                    TOTAL PRICE:{" "}
                    <span className=" ml-1 text-base text-[#1D7ED8] font-bold">
                      {addDot(UsdToVnd(orderInfo.totalPrice))}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[#6A6A6B] m-auto font-Amata text-sm ">
                Your ticket had been sent to your email and SMS
              </p>
            </div>
            <Link
              to="/my-ticket"
              className="font-Ballo text-lg font-semibold text-center mt-[30px] mx-2 mb-10 px-[60px] py-[10px] 
            bg-[#E04141] text-white cursor-pointer"
            >
              VIEW TICKET
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  ) : (
    <MainLayout>
      <div className="flex flex-col justify-center items-center bg-[#eeeeee] py-[20px]">
        <div className="max-w-[600px] m-auto p-4 bg-white  flex justify-center flex-col items-center">
          <img src={failPayment} alt="" className="w-[100px] h-[100px]" />
          <p className="text-[2rem] font-semibold mt-[20px] mb-[20px]">
            Payment failed
          </p>
          <p className="text-[#6A6A6B] mb-[20px] text-center">
            The payment was unsuccessful due to an abnormality. Please try again
            later or use another payment method.
          </p>
          <Link className="text-[1.375rem] rounded-[10px] mb-[20px] text-center mt-[30px] px-[60px] py-[10px] bg-[#E04141] text-white cursor-pointer">
            Try again
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutSuccess;
