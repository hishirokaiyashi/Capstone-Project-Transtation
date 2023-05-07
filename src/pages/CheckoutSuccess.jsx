import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { UsdToVnd, addDot } from "../utils/currencyFormat";
import { getOrderById } from "../firebase/firestore";
import failPayment from "../assets/images/Payment/failedPayment.jpg";
import MainLayout from "../layouts/MainLayout";

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
  if (loading) return <div>Loading</div>;
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
            <div className="flex flex-col items-center">
              <Icon
                icon="ic:baseline-check-circle-outline"
                color="#e04141"
                width="100"
                height="100"
                className="text-center"
              />
              <p className="text-[2rem] mt-[10px] font-semibold mb-[15px] tracking-wide">
                PAYMENT SUCCESSFULLY
              </p>
              <p className="text-[#6A6A6B] tracking-wide">
                Congratulations, your ticket had been issued
              </p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="w-full p-[10px] bg-[#E04141] text-white font-semibold text-[1.25rem] mt-[24px]">
                Your trip information
              </p>
              <div className="py-[16px] px-[10px] flex flex-col gap-[10px] border-b-2">
                <p className="font-semibold">
                  PASSENGER NAME:{" "}
                  <span className="font-normal">{orderInfo.displayName}</span>
                </p>
                <p className="font-semibold">
                  EMAIL: <span className="font-normal">{orderInfo.email}</span>
                </p>

                <p className="font-semibold">
                  PHONE:{" "}
                  <span className="font-normal">{orderInfo.phoneNumber}</span>
                </p>
                <p className="font-semibold">
                  FROM: <span className="font-normal">{orderInfo.from}</span>
                </p>
                <p className="font-semibold">
                  TO: <span className="font-normal">{orderInfo.to}</span>
                </p>
                <p className="font-semibold">
                  DATE: <span className="font-normal">{orderInfo.date}</span>
                </p>
                <p className="font-semibold">
                  BOOKING ID:{" "}
                  <span className="font-normal">{orderInfo.uid}</span>
                </p>
              </div>
              <div className="py-[16px] px-[10px] flex flex-col gap-[10px]">
                <p className=" bg-[#1D7ED8] w-full p-[10px] text-white font-semibold text-[1.25rem]">
                  BUS INFORMATION:
                </p>
                <p className="font-semibold">
                  TRIP ID:{" "}
                  <span className="font-normal">{orderInfo.trip_id}</span>
                </p>
                <p className="font-semibold">
                  BOOKING ID:{" "}
                  <span className="font-normal">{orderInfo.uid}</span>
                </p>
                <p className="font-semibold">
                  BUS TYPE:{" "}
                  <span className="font-normal">
                    Luxury Seater {orderInfo.type} Bus
                  </span>
                </p>
                <p className="font-semibold">
                  CAPACITY:{" "}
                  <span className="font-normal">
                    {orderInfo.totalSeats} Seats
                  </span>
                </p>
                <p className="font-semibold">
                  DEPARTURE TIME:{" "}
                  <span className="font-normal">{orderInfo.departureTime}</span>
                </p>
                <p className="font-semibold">
                  ARRIVAL TIME:{" "}
                  <span className="font-normal">{orderInfo.arrivalTime}</span>
                </p>
                <p className="font-semibold">
                  TICKET AMOUNT:{" "}
                  <span className="font-normal">{orderInfo.ticketAmount}</span>
                </p>

                <p className="font-semibold">
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
                <p className="font-semibold">
                  PICK UP POINT:{" "}
                  <span className="font-normal">
                    {orderInfo.pickUp.location} - {orderInfo.pickUp.name}
                  </span>
                </p>
                <p className="font-semibold">
                  DROP OFF POINT:{" "}
                  <span className="font-normal">
                    {orderInfo.final.location} - {orderInfo.final.name}
                  </span>
                </p>
                <p className="font-semibold">
                  TOTAL PRICE:{" "}
                  <span className="font-normal">
                    {addDot(orderInfo.totalPrice)}
                  </span>
                </p>
              </div>
              <p className="text-[#6A6A6B] m-auto">
                Your ticket had been sent to your email and SMS
              </p>
            </div>
            <Link className="text-center mt-[30px] px-[60px] py-[10px] bg-[#E04141] text-white cursor-pointer">
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
