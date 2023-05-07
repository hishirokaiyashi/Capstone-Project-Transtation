import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import nothing from "../assets/images/order/nothing.gif";

import { getOrdersByUserId } from "../firebase/firestore";
import { isPastDate, getDDMMYY } from "../utils/convertDatetime.js";
import MainLayout from "../layouts/MainLayout";
import TripHistoryInfoSecond from "../components/TripHistoryInfoSecond";

const MyBooking = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error2, setError2] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

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
      <div className="max-w-screen-xl mx-auto flex flex-col">
        <div className="flex flex-col w-full">
          <p className="mb-[20px] text-[1.5rem] font-semibold">
            AVAILABLE BOOOKINGS
          </p>
          <div className="w-full flex flex-col gap-[20px]">
            {availableOrders && availableOrders?.length > 0 ? (
              availableOrders?.map((order, index) => {
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
                  className="w-[200px] h-[200px] object-cover"
                />
                <h1 className="text-[1rem] mb-[10px]">
                  There is no bookings available at the moment!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBooking;
