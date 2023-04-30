import React, { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import { Icon } from "@iconify/react";
import { addDot, removeDot } from "../utils/currencyFormat";

const Test = () => {
  const { order } = useSelector((state) => state.order);

  return (
    <MainLayout>
      <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
        FREE TRANSIT SERVICE FOR EVERY DESTINATION
      </p>
      <div className="bg-banner-trip bg-no-repeat bg-cover h-[157px]"></div>
      <section className="max-w-screen-xl mx-auto flex flex-col">
        <div className="mt-[20px] mb-[60px]">
          <Link>Homepage</Link> /<Link>Booking</Link> /<span>Payment</span>
        </div>
        <div className="flex ">
          <div className="w-[60%] px-[8px]">
            <p className="mb-[50px] text-[2.5rem]">
              Please select your payment method
            </p>
            <div className="px-[16px] border-2">
              <div className="">
                {/* <label
                  htmlFor="Boarding"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="Boarding"
                    name="PaymentType"
                    value="Boarding"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="flex items-center">
                      <Icon
                        icon="ic:round-directions-bus"
                        color="#1890ff"
                        width="24"
                        height="24"
                      />
                      <p className="text-[1rem] text-[#344054]">Boarding</p>
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      You can pay the driver upon boarding
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="ZaloPay"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="ZaloPay"
                    name="PaymentType"
                    value="ZaloPay"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="flex items-center">
                      <Icon
                        icon="arcticons:zalopay"
                        color="#1890ff"
                        width="24"
                        height="24"
                      />
                      <p className="text-[1rem] text-[#344054]">ZaloPay</p>
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      Your phone must have Zalopay application installed
                    </p>
                  </div>
                </label> */}
                <label htmlFor="Momo" className="flex cursor-pointer py-[20px]">
                  <input
                    type="radio"
                    id="Momo"
                    name="PaymentType"
                    value="Momo"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="text-[1rem] text-[#344054] flex items-center">
                      <span className="mr-[5px]">Momo E-Wallet</span>
                      <img
                        className="w-[16px] h-[16px]"
                        src="/src/assets/images/Payment/MoMo_Logo.png"
                        alt="MoMo_Logo"
                      />
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      You will be navigated to Momo Gateway for payment process
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="CreditCard"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="CreditCard"
                    name="PaymentType"
                    value="CreditCard"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px] flex flex-col">
                    <div className="text-[1rem] text-[#344054]">
                      <span className="mr-[5px]">Credit Card</span>
                    </div>
                    <div className="flex">
                      <img
                        className="w-[26px] h-[16px]"
                        src="/src/assets/images/Payment/MasterCard.png"
                        alt="MasterCard"
                      />
                      <img
                        className="w-[26px] h-[16px]"
                        src="/src/assets/images/Payment/Visa.jpg"
                        alt="Visa"
                      />
                      <img
                        className="w-[26px] h-[16px]"
                        src="/src/assets/images/Payment/AmericanExpress.png"
                        alt="AmericanExpress"
                      />
                      <img
                        className="w-[26px] h-[16px]"
                        src="/src/assets/images/Payment/JCB.png"
                        alt="JCB"
                      />
                    </div>
                  </div>
                </label>
                <label
                  htmlFor="DomesticATMCard"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="DomesticATMCard"
                    name="PaymentType"
                    value="DomesticATMCard"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="text-[1rem] text-[#344054] flex items-center">
                      <span className="mr-[5px]">Domestic ATM Card</span>
                      <img
                        className="w-[26px] h-[36px]"
                        src="/src/assets/images/Payment/Napas.png"
                        alt="Napas"
                      />
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      You will be navigated to Napas Gateway for payment process
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="Bank Transfer"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="Bank Transfer"
                    name="PaymentType"
                    value="Bank Transfer"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="text-[1rem] text-[#344054] flex items-center">
                      <span className="mr-[5px]">Bank Transfer</span>
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      You will be navigated to VN Pay Gateway for payment
                      process
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="VN Pay QR"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="VN Pay QR"
                    name="PaymentType"
                    value="VN Pay QR"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="text-[1rem] text-[#344054] flex items-center">
                      <span className="mr-[5px]">VN Pay QR</span>
                      <img
                        className="w-[46px] h-[36px]"
                        src="/src/assets/images/Payment/Vnpay.png"
                        alt="Vnpay"
                      />
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      You will be navigated to VN Pay Gateway for payment
                      process
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="ZaloPay"
                  className="flex cursor-pointer py-[20px]"
                >
                  <input
                    type="radio"
                    id="ZaloPay"
                    name="PaymentType"
                    value="ZaloPay"
                    checked
                    className="cursor-pointer"
                    // onChange={handlePickUpPlaceChange}
                  />
                  <div className="pl-[12px]">
                    <div className="flex items-center">
                      <Icon
                        icon="arcticons:zalopay"
                        color="#1890ff"
                        width="24"
                        height="24"
                      />
                      <p className="text-[1rem] text-[#344054]">ZaloPay</p>
                    </div>
                    <p className="text-[1rem] text-[#344054]">
                      Your phone must have Zalopay application installed
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="w-[40%] px-[8px] ">
            <div className="border-2 p-[16px]">
              <div className=" ">
                <p className="text-[1.5rem] text-[#F07272] font-semibold mb-[20px]">
                  Your trip information
                </p>
                <div>
                  <p className="uppercase text-[1rem] mb-[3px]">
                    PASSENGER NAME: {order.displayName}
                  </p>

                  <p className="text-[1rem] mb-[3px]">EMAIL: {order.email}</p>
                  <p className="uppercase text-[1rem] mb-[3px]">
                    PHONE: {order.phoneNumber}
                  </p>
                  <p className="uppercase text-[1rem] mb-[3px]">
                    {/* FROM: {order.} */}
                  </p>
                  <p className="uppercase text-[1rem] mb-[3px]">
                    PHONE: {order.phoneNumber}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p>Pickup</p>
                  <p>22:00 - T4, 26/04/2023</p>
                  <p>{order.pickUp?.location}</p>
                </div>
                <div>
                  <p>Final</p>
                  <p>22:00 - T4, 26/04/2023</p>
                  <p>{order.final?.location}</p>
                </div>
              </div>
            </div>
            <div className="mt-[30px] flex justify-between">
              <span>Total Price: </span>
              <span>{addDot(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Test;
