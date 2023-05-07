import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layouts/MainLayout";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import nothing from "../assets/images/order/nothing.gif";
import { getOrdersByUserId } from "../firebase/firestore";
import { isPastDate, getDDMMYY } from "../utils/convertDatetime.js";
import TripTicket from "../components/TripTicket";
import TripHistoryInfo from "../components/TripHistoryInfo";
import ProfileChangePassword from "../components/ProfileChangePassword";
import avatar from "../../src/assets/images/Payment/FailedCheckout.png";
import ProfileUserInfo from "../components/ProfileUserInfo";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

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

  const [selectedTab, setSelectedTab] = useState("Profile");
  const tabs = ["Profile", "Change Password"];

  return (
    <MainLayout>
      <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
        FREE TRANSIT SERVICE FOR EVERY DESTINATION
      </p>
      <div className="bg-banner-trip bg-no-repeat bg-cover h-[157px]"></div>
      <div className="max-w-screen-xl mx-auto flex flex-col mt-[19px]">
        <p className="text-[0.75rem] text-my-text-gray-third tracking-wide font-Amata">
          <Link to="/">Homepage</Link> / My account
        </p>
        <div className="flex border mt-[20px] mb-[20px]">
          <div className="h-[800px] w-[30%] pr-[65px] border-r-2">
            <p className="py-3 px-6 text-lg">
              Profile: <span className="font-semibold">{user.displayName}</span>
            </p>
            <div>
              <p
                onClick={() => setActiveTab(1)}
                className={`${
                  activeTab == 1 ? "border-l-2 border-black font-semibold" : ""
                } py-3 px-6 text-lg cursor-pointer`}
              >
                My account
              </p>
              <p
                onClick={() => setActiveTab(2)}
                className={`${
                  activeTab == 2 ? "border-l-2 border-black font-semibold" : ""
                } py-3 px-6 text-lg cursor-pointer`}
              >
                Order history
              </p>
              <p
                onClick={() => setActiveTab(3)}
                className={`${
                  activeTab == 3 ? "border-l-2 border-black font-semibold" : ""
                } py-3 px-6 text-lg cursor-pointer`}
              >
                Ticket history
              </p>
            </div>
          </div>
          <div className="w-[70%] ">
            <div className={`${activeTab == 1 ? "flex flex-col" : "hidden"} `}>
              <div className="flex font-semibold text-lg">
                <ul className="flex w-full">
                  {tabs.map((item) => (
                    <li
                      key={item}
                      className="relative w-full text-black cursor-pointer h-12 flex justify-between items-center flex-1 min-w-0  select-none py-2.5 rounded-br-none rounded-bl-none rounded-[5px]"
                      onClick={() => setSelectedTab(item)}
                    >
                      {item === selectedTab ? (
                        <motion.div
                          className="absolute rounded-lg top-0 left-0 w-full h-full bg-[#E04141] -z-1"
                          layoutId="underline"
                        />
                      ) : null}
                      <span
                        className={`${
                          item === selectedTab ? "text-white" : "text-black"
                        } w-full text-center absolute z-1`}
                      >
                        {`${item}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab === "Profile" ? "Profile" : "Password"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedTab === "Profile" ? (
                    <ProfileUserInfo />
                  ) : (
                    <ProfileChangePassword />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div
              className={`${
                activeTab == 2 ? "flex" : "hidden"
              } flex-col py-6 px-10`}
            >
              <div className="flex flex-col w-full">
                <p className="mb-[20px] text-[1.5rem] font-semibold">
                  AVAILABLE BOOOKINGS
                </p>
                <div className="w-full flex flex-col gap-[20px]">
                  {availableOrders && availableOrders?.length > 0 ? (
                    availableOrders?.map((order, index) => {
                      return (
                        <div key={index} className="">
                          <TripHistoryInfo orderInfo={order} />
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
                          <TripHistoryInfo orderInfo={order} />
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
            <div
              className={`${
                activeTab == 3 ? "flex" : "hidden"
              } flex-col py-6 px-10`}
            >
              <TripTicket />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
