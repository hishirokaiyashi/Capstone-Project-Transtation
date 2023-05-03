import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import debounce from "../utils/debounce";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset,
} from "../firebase/auth.js";
import { validateEmail } from "../utils/validation";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
const ForgotPassword = () => {
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (error === "") {
      // Validate email
      try {
        await sendPasswordReset(forgotEmail);
        // toast.info("Password reset link sent!");
        setDisplay(true);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("You should fill information email!");
    }
  };

  const handleChangeEmail = (e) => {
    if (e.currentTarget.value === "") {
      setError("Email cannot be empty");
    } else {
      if (validateEmail(e.currentTarget.value)) {
        setError("Email is invalid");
      } else setError("");
    }
    setForgotEmail(e.target.value);
  };

  return !isAuthenticated ? (
    <div>
      <div className="flex h-screen bg-white">
        <div className="h-full w-6/12 flex justify-center py-[60px] px-[40px]">
          <div className="w-full py-[30px] rounded-[10px] bg-white ">
            <div className="flex justify-between mb-[45px]">
              <Link to="/">
                <img
                  src="/src/assets/images/Login/Logo.png"
                  alt="Capstone Logo"
                  className="h-[34px]"
                />
              </Link>
              <div className="flex items-center justify-center cursor-pointer text-[1.25rem]">
                <span>EN</span>
                <Icon
                  className="flex items-center"
                  icon="material-symbols:keyboard-arrow-down-rounded"
                />
              </div>
            </div>
            <div className="w-full">
              {/* <hr className="w-full my-8 h-px bg-black" /> */}

              <h2 className="text-3xl ">Forget password</h2>

              <form
                id="resetForm"
                onSubmit={handleForgotPassword}
                className="flex flex-col mt-4 "
              >
                <div className="flex flex-col">
                  <p className="text-my-gray text-[1.125rem] font-Amata mb-[1rem]">
                    Enter the Valid Email to receive the verification code
                  </p>
                  <div className="relative mb-[42px]">
                    <label
                      htmlFor="forgotEmail"
                      className="absolute top-[-14px] left-[12px] bg-white p-[4px]"
                    >
                      Email
                      <span className="text-red-500"> *</span>
                    </label>
                    <input
                      className={
                        error == ""
                          ? "h-[56px] w-full outline-none border border-blue rounded py-1 px-3"
                          : "h-[56px] w-full outline-none border border-red-500 rounded py-1 px-3"
                      }
                      type="text"
                      id="forgotEmail"
                      value={forgotEmail}
                      onInput={(e) => handleChangeEmail(e)}
                    />
                    <p className="text-red-500">{error}</p>
                  </div>
                </div>
                <div className="flex justify-center flex-col w-full items-center">
                  <p className="text-center text-[0.75rem] mb-[32px] bg-my-bg-gray-background w-fit font-Amata p-1">
                    When clicking Next, you will receive a verification code
                    <br />
                    through your email
                  </p>
                  <button
                    form="resetForm"
                    className="w-fit font-Ballo mt-2 py-[20px] px-[80px] text-[1.625rem] bg-[#6A6A6B] text-white rounded"
                    type="submit"
                    // onClick={}
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="relative h-screen flex flex-col justify-end w-6/12 bg-banner-login bg-cover bg-center bg-no-repeat">
          <div className="absolute bg-black bg-opacity-30 z-2 top-0 left-0 right-0 bottom-0"></div>
          <h1 className="absolute p-[4px] w-fit text-5xl font-extrabold bottom-20 left-10 text-white font-Achivo z-3 bg-gradient-to-r from-gray-900 to-transparent">
            EXPLORE NEW
            <br />
            DESINATION
            <br />
            WITH US
          </h1>
        </div>
      </div>
      {display && <Modal type="forgotpassword" />}
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ForgotPassword;
