import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Modal = ({ type, setLostModal, stepContinue }) => {
  const navigate = useNavigate();
  return (
    <>
      {type === "register" && (
        <>
          <div className="overlay fixed z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] transition-all duration-300 ease"></div>

          <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-xl flex flex-col justify-center items-center transition-all transform-origin-center animate-zoomIn">
            <Icon
              icon="ic:baseline-check-circle-outline"
              color="#e04141"
              width="65"
              height="65"
            />
            <p className="text-[1.125rem] font-semibold my-2">SUCCESS</p>
            <p className="text-[1rem] text-center text-my-text-gray-third">
              Congratulations, your account has been successfully registered!
            </p>
            <p className="text-[1rem] text-center text-my-text-gray-third">
              Please verify your account in your email before login
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-[58px] py-[10px] text-white bg-[#E04141] rounded-[10px]"
            >
              BACK TO LOGIN
            </button>
          </div>
        </>
      )}
      {type === "forgotpassword" && (
        <>
          <div className="overlay fixed z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] transition-all duration-300 ease"></div>

          <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-xl flex flex-col justify-center items-center transition-all transform-origin-center animate-zoomIn">
            <Icon
              icon="ic:baseline-check-circle-outline"
              color="#e04141"
              width="65"
              height="65"
            />
            <p className="text-[1.125rem] font-semibold my-2">SUCCESS</p>
            <p className="text-[1rem] text-center text-my-text-gray-third">
              Congratulations, your password has been successfully reset
            </p>
            <p className="text-[1rem] text-center text-my-text-gray-third">
              Please check your email for changing your password!
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-[58px] py-[10px] text-white bg-[#E04141] rounded-[10px]"
            >
              BACK TO LOGIN
            </button>
          </div>
        </>
      )}
      {type === "FailCheckout" && (
        <>
          <div className="overlay fixed z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] transition-all duration-300 ease"></div>

          <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-xl flex flex-col justify-center items-center transition-all transform-origin-center animate-zoomIn">
            <img
              className="w-[50px] h-[50px]"
              src="/src/assets/images/Payment/FailedCheckout.png"
              alt="FailedCheckout"
            />
            <p className="text-[1.125rem] font-semibold my-2">Failed</p>
            <p className="text-[1rem] text-center text-my-text-gray-third">
              We are really sorry about this issue. Your order is out of stock!
            </p>
          </div>
        </>
      )}
      {type === "FailLostCheckout" && (
        <>
          <div className="overlay fixed z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] transition-all duration-300 ease"></div>

          <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-xl flex flex-col justify-center items-center transition-all transform-origin-center animate-zoomIn">
            <img
              className="w-[50px] h-[50px]"
              src="/src/assets/images/Payment/FailedCheckout.png"
              alt="FailedCheckout"
            />
            <p className="text-[1.125rem] font-semibold my-2">Failed</p>
            <p className="text-[1rem] text-center text-my-text-gray-third">
              We are really sorry about this issue. One of your order is out of
              stock!
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-[58px] py-[10px] text-white bg-[#E04141] rounded-[10px]"
            >
              BACK
            </button>
            <button
              onClick={() => {
                setLostModal(false);
                stepContinue(true);
              }}
              className="mt-4 px-[58px] py-[10px] text-white bg-[#E04141] rounded-[10px]"
            >
              CONTINUE
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
