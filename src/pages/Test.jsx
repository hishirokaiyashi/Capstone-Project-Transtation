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
      <section className="max-w-screen-xl mx-auto">
        <p className="px-[8px]">Diverse and secure payment methods.</p>
        <div className="flex">
          <div className="w-[60%] px-[8px]">
            <p>Payment method</p>
            <div className="px-[16px] border-2">
              <div className="">
                <label
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
                </label>
              </div>
            </div>
          </div>
          <div className="w-[40%] px-[8px] ">
            <p>information trip</p>
            <div className="border-2 p-[16px]">
              <div className=" ">
                <div>
                  <p>Customer</p>
                  <p>{order.displayName}</p>
                </div>
                <div>
                  <p>Phone number</p>
                  <p>{order.phoneNumber}</p>
                </div>
                <div>
                  <p>Email</p>
                  <p>{order.email}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Pickup</p>
                  <p>22:00 - T4, 26/04/2023</p>
                  <p>{order.pickUp.name}</p>
                </div>
                <div>
                  <p>Final</p>
                  <p>22:00 - T4, 26/04/2023</p>
                  <p>{order.final.name}</p>
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
