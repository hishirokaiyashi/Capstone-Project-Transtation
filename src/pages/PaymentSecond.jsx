import React, { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTickets, resetOrderState } from "../redux/order.slice.js";
import MomoLogo from "../assets/images/Payment/MoMo_Logo.png";
import VisaLogo from "../assets/images/Payment/Visa.jpg";
import Vnpay from "../assets/images/Payment/Vnpay.png";
import Napas from "../assets/images/Payment/Napas.png";
import JCB from "../assets/images/Payment/JCB.png";
import MasterCard from "../assets/images/Payment/MasterCard.png";
import AmericanExpress from "../assets/images/Payment/AmericanExpress.png";

import MainLayout from "../layouts/MainLayout";
import Modal from "../components/Modal/index.jsx";
import { Icon } from "@iconify/react";
import { addDot, removeDot, vndToUsd } from "../utils/currencyFormat";
import {
  getUnavailableSeats,
  setSeatsByTripId,
  createOrder,
} from "../../src/firebase/firestore.js";
import CreditCardInputs from "../components/Payment/CreditCardInputs.jsx";

import { checkout } from "../services/stripeApis.js";

const Payment = () => {
  const { order } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [failedModal, setFailedModal] = useState(false);
  const [lostModal, setLostModal] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("CreditCard");
  const [stepContinue, setStepContinue] = useState(false);

  useEffect(() => {
    if (stepContinue) {
      /** Ở front end: Tạo ra một order trong Firebase với paid status == "Unpaid"
       *  Chỉnh lại status của số ghế khách hàng đặt với trip tương ứng thành "Unavailable", chỉnh lại orderId, userId luôn
       */
      updateDataByOrder(); // done - Update data in table Order

      /** Call api post tới local 5000 tạo thanh toán stripe
       * 1. Post nên cần payload --> Tạo payload phù hợp ở request call post */
      const checkoutOrder = [
        {
          name: `Luxury ${order.type} Bus`,
          image: order.image,
          description: order.tickets,
          booking_id: order.booking_id,
          trip_id: order.trip_id,
          user_id: order.user_id,
          quanity: order.ticketAmount,
          ticketPrice: vndToUsd(order.ticketPrice),
          totalPrice: vndToUsd(order.totalPrice),
          email: order.email,
          displayName: order.displayName,
        },
      ];
      checkout(checkoutOrder)
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err.message));
      // console.log({
      //   ...order,
      //   ticketPrice: vndToUsd(order.ticketPrice),
      //   totalPrice: vndToUsd(order.totalPrice),
      // });
      /**
       * 2. Chỉnh sửa lại backend
       *   2.1 Pay load ở front end chỉnh sao thì payload backend chỉnh lại vậy.
       *   2.2 Cài firebase vô, config như frontend rồi chỉnh lại create order là set lại order Unpaid bên trên thành Paid rồi điền thông tin thẻ thanh toán của người dùng
       *   2.3 Nếu thanh toán thành công thì mới create order, nếu không thành công thì mình xoá order mới tạo, chỉnh lại số ghế thành Available, chỉnh là orderId và userId của ghế thành null
       *   2.4 Ở Front end thêm 2 màn hình thành công và thất bại
       */
      // console.log("Test Continue");
    }
  }, [stepContinue]);

  const updateDataByOrder = async () => {
    try {
      await createOrder(order); // tạo thành order
      await setSeatsByTripId(
        order.trip_id,
        order.tickets,
        order.user_id,
        order.booking_id
      );

      toast.success("Order created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayOrder = async () => {
    try {
      const res = await getUnavailableSeats(order.trip_id, order.tickets);
      if (res.length == order.tickets.length) {
        setFailedModal(true); // confirmation for use about the changing information of order
        setTimeout(() => {
          // dispatch reset
          dispatch(resetOrderState(null));
          navigate(-1); // go back the previous page booking
        }, 2000);
        return;
      }
      if (res.length !== 0) {
        // toast.info(
        //   `These following tickets has been paid by other person: ${res.toString()}`
        // );

        /** Dispatch chỉnh lại số ghế */
        const newAvailableTickets = order.tickets.filter(
          (ticket) => !res.includes(ticket)
        ); // lọc lại từ store redux lấy ra những ghế hợp lệ
        dispatch(setTickets(newAvailableTickets));
        setLostModal(true);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error happing. Please try again!");
      return;
    }
    // setFailedModal(true);
    setStepContinue(true);
    // confirmation for use about the changing information of order
    /** Ở front end: Tạo ra một order trong Firebase với paid status == "Unpaid"
     *  Chỉnh lại status của số ghế khách hàng đặt với trip tương ứng thành "Unavailable", chỉnh lại orderId, userId luôn
     */

    /** Call api post tới local 5000 tạo thanh toán stripe
     * 1. Post nên cần payload --> Tạo payload phù hợp ở request call post
     * 2. Chỉnh sửa lại backend
     *   2.1 Pay load ở front end chỉnh sao thì payload backend chỉnh lại vậy.
     *   2.2 Cài firebase vô, config như frontend rồi chỉnh lại create order là set lại order Unpaid bên trên thành Paid rồi điền thông tin thẻ thanh toán của người dùng
     *   2.3 Nếu thanh toán thành công thì mới create order, nếu không thành công thì mình xoá order mới tạo, chỉnh lại số ghế thành Available, chỉnh là orderId và userId của ghế thành null
     *   2.4 Ở Front end thêm 2 màn hình thành công và thất bại
     */
  };

  return !order.email ? (
    <Navigate to="/notfound" replace />
  ) : failedModal ? (
    <Modal type="FailCheckout" />
  ) : lostModal ? (
    <Modal
      type="FailLostCheckout"
      stepContinue={(data) => setStepContinue(data)}
      setLostModal={(data) => setLostModal(data)}
    />
  ) : (
    <MainLayout>
      <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
        FREE TRANSIT SERVICE FOR EVERY DESTINATION
      </p>
      <div className="bg-banner-trip bg-no-repeat bg-cover h-[157px]"></div>
      <section className="max-w-screen-xl mx-auto flex flex-col">
        <div className="text-[0.75rem] text-my-text-gray-third tracking-wide font-Amata mt-[20px] mb-[60px]">
          <Link to="/">Homepage</Link> / <Link>Booking</Link> /{" "}
          <span>Payment</span>
        </div>

        {/* Payment Info */}
        <div className="flex gap-5 pb-5 ">
          {/* Payment Methods */}

          <div className="w-4/6">
            <h1 className="text-[40px] font-Ballo mb-16">
              Please select your payment method
            </h1>

            <div className="px-[16px] ">
              <div className="">
                {/* Momo */}
                <label
                  htmlFor="Momo"
                  className={`w-11/12 mb-4 hover:bg-my-blue hover:border-[#1D7ED8] flex cursor-pointer py-[20px] px-[10px]  border-2 rounded ${
                    selectedPaymentMethod === "Momo" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
                  <div className="pl-[12px]">
                    <div className="flex gap-2 text-[1rem] text-[#344054] items-center">
                      <input
                        type="radio"
                        id="Momo"
                        name="PaymentType"
                        value="Momo"
                        className="cursor-pointer flex items-end"
                        checked={selectedPaymentMethod === "Momo"}
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <span className="text-xl font-Inter">Momo E-Wallet</span>
                      <img
                        className="w-[16px] h-[16px]"
                        src={MomoLogo}
                        alt="MoMo_Logo"
                      />
                    </div>
                    <p className="text-base text-[#667085]">
                      You will be navigated to Momo Gateway for payment process
                    </p>
                  </div>
                </label>

                {/* Credit Card */}
                <label
                  htmlFor="CreditCard"
                  className={`w-11/12 mb-4 hover:bg-my-blue hover:border-[#1D7ED8] flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "CreditCard" &&
                    "border-[#1D7ED8]  hover:bg-white hover:border-[#1D7ED8]"
                  }`}
                >
                  <div className="pl-[12px] flex flex-col gap-[10px]">
                    <div className="flex gap-2 text-[1rem] text-[#344054]">
                      <input
                        type="radio"
                        id="CreditCard"
                        name="PaymentType"
                        value="CreditCard"
                        checked={selectedPaymentMethod === "CreditCard"}
                        className="cursor-pointer"
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <span className="text-xl font-Inter">Credit card</span>
                    </div>
                    <div className="flex mb-4">
                      <img
                        className="w-[26px] h-[16px]"
                        src={MasterCard}
                        alt="MasterCard"
                      />
                      <img
                        className="w-[26px] h-[16px]"
                        src={VisaLogo}
                        alt="Visa"
                      />
                      <img
                        className="w-[26px] h-[16px]"
                        src={AmericanExpress}
                        alt="AmericanExpress"
                      />
                      <img className="w-[26px] h-[16px]" src={JCB} alt="JCB" />
                    </div>
                    {selectedPaymentMethod === "CreditCard" && (
                      <CreditCardInputs />
                    )}
                  </div>
                </label>

                {/* ATM Card */}
                <label
                  htmlFor="DomesticATMCard"
                  className={`w-11/12 mb-4 hover:bg-my-blue hover:border-[#1D7ED8] flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "Domestic ATM Card" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
                  <div className="pl-[12px]">
                    <div className="flex gap-2 text-[1rem] text-[#344054] items-center">
                      <input
                        type="radio"
                        id="DomesticATMCard"
                        name="PaymentType"
                        value="Domestic ATM Card"
                        className="cursor-pointer"
                        checked={selectedPaymentMethod === "Domestic ATM Card"}
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <span className="text-xl font-Inter">
                        Domestic ATM card
                      </span>
                      <img
                        className="w-[36px] h-[26px] object-contain"
                        src={Napas}
                        alt="Napas"
                      />
                    </div>
                    <p className="text-base text-[#667085]">
                      You will be navigated to Napas Gateway for payment process
                    </p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label
                  htmlFor="Bank Transfer"
                  className={`w-11/12 mb-4 hover:bg-my-blue hover:border-[#1D7ED8] flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "Bank Transfer" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
                  <div className="pl-[12px]">
                    <div className="flex gap-2 text-[1rem] text-[#344054] items-center">
                      <input
                        type="radio"
                        id="Bank Transfer"
                        name="PaymentType"
                        value="Bank Transfer"
                        className="cursor-pointer"
                        checked={selectedPaymentMethod === "Bank Transfer"}
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <span className="text-xl font-Inter">Bank Transfer</span>
                    </div>
                    <p className="text-base text-[#667085]">
                      You will be navigated to VN Pay Gateway for payment
                      process
                    </p>
                  </div>
                </label>

                {/* VNPay QR */}
                <label
                  htmlFor="VNPayQR"
                  className={`w-11/12 mb-4 hover:bg-my-blue hover:border-[#1D7ED8] flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "VN Pay QR" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
                  <div className="pl-[12px]">
                    <div className="flex gap-2 text-[1rem] text-[#344054] items-center">
                      <input
                        type="radio"
                        id="VNPayQR"
                        name="PaymentType"
                        value="VN Pay QR"
                        className="cursor-pointer"
                        checked={selectedPaymentMethod === "VN Pay QR"}
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />{" "}
                      <span className="text-xl font-Inter">VN Pay QR</span>
                      <img
                        className="w-[46px] h-[36px]"
                        src={Vnpay}
                        alt="Vnpay"
                      />
                    </div>
                    <p className="text-base text-[#667085]">
                      You will be navigated to VN Pay Gateway for payment
                      process
                    </p>
                  </div>
                </label>

                {/* ZaloPay */}
                <label
                  htmlFor="ZaloPay"
                  className={`w-11/12 mb-4 hover:bg-my-blue hover:border-[#1D7ED8] flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "ZaloPay" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
                  <div className="pl-[12px]">
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        id="ZaloPay"
                        name="PaymentType"
                        value="ZaloPay"
                        className="cursor-pointer"
                        checked={selectedPaymentMethod === "ZaloPay"}
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <p className="text-xl font-Inter">ZaloPay</p>
                      <Icon
                        icon="arcticons:zalopay"
                        color="#1890ff"
                        width="24"
                        height="24"
                      />
                    </div>
                    <p className="text-base text-[#667085]">
                      Your phone must have Zalopay application installed
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className=" w-2/6  mx-auto px-6">
            <div className="border-[#C0BEBE] border-solid border-[1px] rounded-md">
              <div className="mx-4 my-8">
                {/* User */}
                <div className=" border-b-solid border-b-[1px] border-b-[#D9D9D9] pb-4">
                  <p className=" font-Ballo text-[#F07272] font-semibold text-2xl mb-2 ">
                    Your trip information
                  </p>

                  <div>
                    <p className=" font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      PASSENGER NAME:{" "}
                      <span className="font-normal">{order.displayName}</span>
                    </p>

                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      EMAIL: <span className="font-normal">{order.email}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      PHONE:{" "}
                      <span className="font-normal">{order.phoneNumber}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      FROM: <span className="font-normal">{order.from}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      TO: <span className="font-normal">{order.to}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      DATE: <span className="font-normal">{order.date}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      BOOKING ID:{" "}
                      <span className="font-normal">{order.booking_id}</span>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="my-4">
                  <p className="font-Ballo text-[#1D7ED8] font-semibold text-base mb-2 uppercase">
                    BUS INFORMATION:
                  </p>
                  <div>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      TripID:{" "}
                      <span className="font-normal">{order.trip_id}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      Bus Type:{" "}
                      <span className="font-normal">{order.type}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      Capacity:{" "}
                      <span className="font-normal">{order.totalSeats}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      Departure Time:{" "}
                      <span className="font-normal">{order.departureTime}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      Arrival Time:{" "}
                      <span className="font-normal">{order.arrivalTime}</span>
                    </p>
                    <p className="font-Ballo text-[#363637] font-semibold text-base leading-7 mb-1">
                      Seat Number:{" "}
                      <span>
                        {order.tickets?.map((seat, index) => {
                          const isLastSeat = index === order.tickets.length - 1;
                          return (
                            <span key={index} className="font-normal">
                              {seat}
                              {!isLastSeat && ","}{" "}
                            </span>
                          );
                        })}
                      </span>
                    </p>
                    <p className=" text-[1rem] mb-[8px] font-semibold">
                      Pick up point:{" "}
                      <span className="font-normal">
                        {order.pickUp.location}
                      </span>
                    </p>
                    <p className="text-[1rem] mb-[8px] font-semibold">
                      Drop off point:{" "}
                      <span className="font-normal">
                        {order.final.location}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-[30px] flex justify-between">
                  <span className="text-xl font-semibold">TOTAL AMOUNT: </span>
                  <span className="text-xl text-[#1D7ED8]">
                    {addDot(order.totalPrice) || order.totalPrice}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-start  mt-[10px]">
              <button
                onClick={handlePayOrder}
                className="w-full text-xl font-semibold p-[10px] rounded bg-[#E04141] text-white"
              >
                PAY ORDER
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Payment;
