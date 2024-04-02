import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import nothing from "../assets/images/order/nothing.gif";

import { getOrdersByUserId } from "../firebase/firestore";
import { isPastDate, getDDMMYY } from "../utils/convertDatetime.js";
import MainLayout from "../layouts/MainLayout";
import TripHistoryInfoSecond from "../components/TripHistoryInfoSecond";
import { Link, useNavigate } from "react-router-dom"; 
import { Icon } from "@iconify/react";
import PaymentHistoryList from "../components/Payment/PaymentHistoryList";

const PaymentHistory = () => {
  const navigate = useNavigate();

  const BookingFilter = {
    sortBy: ["Latest Booking", "Oldest Booking"],
    categories: ["Sleeper Bus", "45 Seater Bus"],
    status: [
      "Available Ticket",
      "Expired Ticket",
      "Cancelled Ticket",
      "Pending Ticket",
    ],
    departureTime: [
      "1:00 - 5:00",
      "5:00 - 11:00",
      "13:00 - 16:00",
      "16:00 - 23:00 ",
    ],
  };

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error2, setError2] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(2);

  useEffect(() => {
    if (user.uid) {
      getOrder(user.uid);
    } else {
      toast.error("Wrong URL!");
      navigate("/notfound");
    }
  }, []);

  const getOrder = async (userId) => {
    try {
      const res = await getOrdersByUserId(userId);
      if (res) {
        setLoading(false);
        setOrderInfo(res);
      } else {
        setLoading(false);
        setError2(true);
      }
    } catch (error) {
      toast.error("There was an error while getting the order.");
      setError2(true);
    }
  };
  const [availableOrders, setAvailableOrders] = useState([]);
  const [expiredOrders, setExpiredOrders] = useState([]);

  useEffect(() => {
    if (orderInfo && orderInfo.length > 0) {
      const newAvailableOrders = [];
      const newExpiredOrders = [];

      orderInfo.forEach((order) => {
        if (!isPastDate(getDDMMYY(order.date))) {
          newAvailableOrders.push(order);
        } else {
          newExpiredOrders.push(order);
        }
      });

      setAvailableOrders(newAvailableOrders);
      setExpiredOrders(newExpiredOrders);
    }
  }, [orderInfo]);
  return (
    <MainLayout>
      <div className=" mb-10">
        <div className="">
          <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
            FREE TRANSIT SERVICE FOR EVERY DESTINATION
          </p>
          <div className="bg-banner-trip bg-no-repeat bg-cover h-[157px]"></div>

          <div className="max-w-screen-xl mx-auto">
            <div className="">
              {/* Path */}
              <p className="mt-8 mb-10 text-[0.75rem] text-my-text-gray-third tracking-wide font-Amata">
                <Link to="/"> Homepage</Link> / My booking
              </p>
              {/* Main content */}
              <div className="grid grid-cols-5 gap-5">
                {/* Sidebar-Filter */}
                <div className="mr-5">
                  {/* Sortby */}
                  <div className="mb-10">
                    <div
                      className="flex items-center justify-between text-[#6A6A6B] font-Ballo font-semibold 
                      text-base pb-4 mb-4 border-b-2 border-solid border-[#6A6A6B]"
                    >
                      <div className="flex gap-2">
                        <Icon
                          className=" text-2xl"
                          icon="material-symbols:filter-list"
                        />
                        SORT BY
                      </div>
                      <Icon
                        className=" text-3xl"
                        icon="material-symbols:keyboard-arrow-down"
                      />
                    </div>

                    {/* Options */}
                    <div className="ml-4">
                      {BookingFilter.sortBy.map((opt, id) => (
                        <div
                          key={id}
                          className="flex gap-2 font-Ballo font-normal text-base text-[#6A6A6B] mb-2"
                        >
                          <input type="radio" name="sortBy" />
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-10">
                    <div
                      className="flex items-center justify-between text-[#6A6A6B] font-Ballo font-semibold 
                      text-base pb-4 mb-4 border-b-2 border-solid border-[#6A6A6B]"
                    >
                      <div className="flex gap-2">
                        <Icon
                          icon="material-symbols:format-list-bulleted"
                          className=" text-2xl"
                        />
                        CATEGORIES
                      </div>
                      <Icon
                        className=" text-3xl"
                        icon="material-symbols:keyboard-arrow-down"
                      />
                    </div>

                    {/* Options */}
                    <div className="ml-4">
                      {BookingFilter.categories.map((opt, id) => (
                        <div
                          key={id}
                          className="flex gap-2 font-Ballo font-normal text-base text-[#6A6A6B] mb-2"
                        >
                          <input type="radio" name="categories" />
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="mb-10">
                    <div
                      className="flex items-center justify-between text-[#6A6A6B] font-Ballo font-semibold 
                      text-base pb-4 mb-4 border-b-2 border-solid border-[#6A6A6B]"
                    >
                      <div className="flex gap-2">
                        <Icon
                          className=" text-2xl"
                          icon="material-symbols:filter-list"
                        />
                        STATUS
                      </div>
                      <Icon
                        className=" text-3xl"
                        icon="material-symbols:keyboard-arrow-down"
                      />
                    </div>

                    <div className="ml-4">
                      {BookingFilter.status.map((opt, id) => (
                        <div
                          key={id}
                          className="flex gap-2 font-Ballo font-normal text-base text-[#6A6A6B] mb-2"
                        >
                          <input type="radio" name="status" />
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DEPARTURE TIME */}
                  <div className="mb-10">
                    <div
                      className="flex items-center justify-between text-[#6A6A6B] font-Ballo font-semibold 
                      text-base pb-4 mb-4 border-b-2 border-solid border-[#6A6A6B]"
                    >
                      <div className="flex gap-2">
                        <Icon
                          className=" text-2xl"
                          icon="material-symbols:filter-list"
                        />
                        DEPARTURE TIME
                      </div>
                      <Icon
                        className=" text-3xl"
                        icon="material-symbols:keyboard-arrow-down"
                      />
                    </div>
                    <div className="ml-4">
                      {BookingFilter.departureTime.map((opt, id) => (
                        <div
                          key={id}
                          className="flex gap-2 font-Ballo font-normal text-base text-[#6A6A6B] mb-2"
                        >
                          <input type="radio" name="departureTime" />
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MY BOOKING */}
                {/* Tab Select */}
                <div className="grid col-span-4 ">
                  <div className="w-full grid grid-cols-4 font-Ballo text-xl border-[1px] border-solid border-[#D9D9D94D] ">
                    <div
                      onClick={() => setActiveTab(3)}
                      className={`py-4 border-r-[1px] border-solid border-[#D9D9D94D] cursor-pointer text-center 
                      ${activeTab == 3 ? `bg-[#D9D9D94D]` : ``}`}
                    >
                      My Voucher
                    </div>
                    <div
                      onClick={() => setActiveTab(0)}
                      className={`py-4 border-r-[1px] border-solid border-[#D9D9D94D] cursor-pointer text-center 
                      ${activeTab == 0 ? `bg-[#D9D9D94D]` : ``}`}
                    >
                      My Wallet
                    </div>
                    <Link to="/order-history">
                      <div
                        onClick={() => setActiveTab(1)}
                        className={`py-4 border-r-[1px] border-solid border-[#D9D9D94D] cursor-pointer text-center 
                      ${activeTab == 1 ? `bg-[#D9D9D94D]` : ``}`}
                      >
                        My Booking
                      </div>
                    </Link>
                    <div
                      onClick={() => setActiveTab(2)}
                      className={`${
                        activeTab == 2
                          ? `bg-[#D9D9D94D]`
                          : `hover:bg-[#D9D9D94D]`
                      } py-4 cursor-pointer text-center`}
                    >
                      Payment History
                    </div>
                  </div>

                  {/* Order history */}

                  <div className="mx-auto py-14 px-14 ">
                    {/* Payment wrapper */}
                    {/* __________________________ */}
                    <div>
                      {/* Render PaymentHistoryList */}
                      <div className="flex flex-col w-full">
                        <Link
                          to="/"
                          className="mb-8 font-Ballo font-medium text-xl text-[#1D7ED8]"
                        >
                          Back Home
                        </Link>
                        <div className="w-full flex flex-col gap-[20px]">
                          {availableOrders && availableOrders?.length > 0 ? (
                            availableOrders?.map((order, index) => {
                              return (
                                <div key={index} className="mb-10">
                                  <PaymentHistoryList orderInfo={order} />
                                </div>
                              );
                            })
                          ) : (
                            <div className="flex justify-center items-center flex-col">
                              <img
                                src={nothing}
                                alt={nothing}
                                className="w-[200px] h-[200px] object-cover"
                              />
                              <h1 className="text-[1rem] mb-[10px]">
                                There is no bookings available at the moment!
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col w-full mt-[20px]">
                        <p className="mb-[20px] text-[1.5rem] font-semibold">
                          EXPIRED BOOKINGS
                        </p>
                        <div className="w-full ">
                          {expiredOrders && expiredOrders?.length > 0 ? (
                            expiredOrders?.map((order, index) => {
                              return (
                                <div key={index} className="">
                                  <TripHistoryInfoSecond orderInfo={order} />
                                </div>
                              );
                            })
                          ) : (
                            <div className="flex justify-center items-center flex-col">
                              <img
                                src={nothing}
                                alt={nothing}
                                className="w-[200px] h-[200px] object-cover bg-transparent"
                              />
                              <h1 className="text-[1rem] mb-[10px]">
                                There is no bookings available at the moment!
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentHistory;
