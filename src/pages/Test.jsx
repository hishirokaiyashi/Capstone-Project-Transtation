import React, { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

import { setTickets, resetOrderState } from "../redux/order.slice.js";

import MainLayout from "../layouts/MainLayout";
import Modal from "../components/Modal/index.jsx";
import { addDot, removeDot, vndToUsd } from "../utils/currencyFormat";
import {
  getUnavailableSeats,
  createOrder,
  setSeatsByTripId,
} from "../../src/firebase/firestore.js";
import { checkout } from "../services/stripeApis.js";

const Test = () => {
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

  return failedModal ? (
    <Modal type="FailCheckout" />
  ) : lostModal ? (
    <Modal
      type="FailLostCheckout"
      stepContinue={(data) => setStepContinue(data)}
      setLostModal={(data) => setLostModal(data)}
    />
  ) : (
    <MainLayout>
      <p className="bg-black-background w-full text-white text-center py-[22px]  text-[1rem] font-semibold tracking-wide">
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
            <div className="px-[16px] ">
              <div className="">
                <label
                  htmlFor="Momo"
                  className={`flex cursor-pointer py-[20px] px-[10px] border-2 rounded ${
                    selectedPaymentMethod === "Momo" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
                  <input
                    type="radio"
                    id="Momo"
                    name="PaymentType"
                    value="Momo"
                    className="cursor-pointer"
                    checked={selectedPaymentMethod === "Momo"}
                    onChange={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                    }}
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
                  className={`flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "CreditCard" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
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
                  <div className="pl-[12px] flex flex-col gap-[10px]">
                    <div className="text-[1rem] text-[#344054]">
                      <span className="mr-[5px]">Credit card</span>
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
                  className={`flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "Domestic ATM Card" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
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
                  <div className="pl-[12px]">
                    <div className="text-[1rem] text-[#344054] flex items-center">
                      <span className="mr-[5px]">Domestic ATM card</span>
                      <img
                        className="w-[36px] h-[26px] object-contain"
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
                  className={`flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "Bank Transfer" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
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
                  htmlFor="VNPayQR"
                  className={`flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "VN Pay QR" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
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
                  className={`flex cursor-pointer py-[20px] px-[10px] border-2 rounded mt-[10px] ${
                    selectedPaymentMethod === "ZaloPay" &&
                    "bg-my-blue border-[#1D7ED8]"
                  }`}
                >
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
                  <div className="pl-[12px]">
                    <div className="flex items-center">
                      <p className="text-[1rem] text-[#344054]">ZaloPay</p>
                      <Icon
                        icon="arcticons:zalopay"
                        color="#1890ff"
                        width="24"
                        height="24"
                      />
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
              <div className="mb-[15px]">
                <p className="text-[1.5rem] text-[#F07272] font-semibold mb-[20px]">
                  Your trip information
                </p>
                <div>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    PASSENGER NAME:{" "}
                    <span className="font-normal">{order.displayName}</span>
                  </p>

                  <p className="text-[1rem] mb-[8px] font-semibold">
                    EMAIL: <span className="font-normal">{order.email}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    PHONE:{" "}
                    <span className="font-normal">{order.phoneNumber}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    FROM: <span className="font-normal">{order.from}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    TO: <span className="font-normal">{order.to}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    DATE: <span className="font-normal">{order.date}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    BOOKING ID:{" "}
                    <span className="font-normal">{order.booking_id}</span>
                  </p>
                </div>
              </div>
              <hr />
              <div className="mt-[15px]">
                <p className="text-[1.5rem] text-[#1D7ED8] font-semibold mb-[20px]">
                  BUS INFORMATION:
                </p>
                <div>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    TripID: <span className="font-normal">{order.trip_id}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    Bus Type: <span className="font-normal">{order.type}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    Capacity:{" "}
                    <span className="font-normal">{order.totalSeats}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    Departure Time:{" "}
                    <span className="font-normal">{order.departureTime}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
                    Arrival Time:{" "}
                    <span className="font-normal">{order.arrivalTime}</span>
                  </p>
                  <p className="uppercase text-[1rem] mb-[8px] font-semibold">
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
                    <span className="font-normal">{order.pickUp.location}</span>
                  </p>
                  <p className="text-[1rem] mb-[8px] font-semibold">
                    Drop off point:{" "}
                    <span className="font-normal">{order.final.location}</span>
                  </p>
                </div>
              </div>
              <div className="mt-[30px] flex justify-between">
                <span className="text-[1.375rem] font-semibold">
                  TOTAL AMOUNT:{" "}
                </span>
                <span className="text-[1.375rem] text-[#1D7ED8]">
                  {addDot(order.totalPrice)}
                </span>
              </div>
            </div>
            <div className="flex justify-start  mt-[10px]">
              <button
                onClick={handlePayOrder}
                className="w-full text-[1rem] p-[10px] rounded bg-[#E04141] text-white"
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

export default Test;
