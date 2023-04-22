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

const Login = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");
  const [displayForgotPassword, setDisplayForgotPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const errorMessage = await logInWithEmailAndPassword(
        email.trim(),
        password.trim()
      );
      if (!errorMessage) {
        toast.success(`Welcome back to Capstone, ${email}!`);
        navigate("/");
      } else if (errorMessage.includes("verify")) {
        toast.info(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(err.message);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {}
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (error !== "") {
      // Validate email
      try {
        await sendPasswordReset(forgotEmail);
        toast.info("Password reset link sent!");
        setDisplayForgotPassword(false);
      } catch (error) {
        toast.error(err.message);
      }
    } else {
      toast.error("You should fill information email!");
    }
  };

  const handleDisplayForgotPassword = () => {
    setDisplayForgotPassword(true);
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
      <div
        className={
          displayForgotPassword
            ? "flex h-screen bg-white"
            : "flex h-screen bg-my-gray"
        }
      >
        <div
          className={
            displayForgotPassword
              ? "h-full w-6/12 flex justify-center py-[60px] px-[40px]"
              : "h-full w-6/12 flex justify-center py-[40px]"
          }
        >
          <div
            className={
              displayForgotPassword
                ? "w-full h-full flex flex-col flex-1"
                : "py-[30px] px-[60px] rounded-[10px] bg-white "
            }
          >
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

            {displayForgotPassword ? (
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
                        // value={forgotEmail}
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
            ) : (
              <div>
                <div className="mb-[35px]">
                  <p className="text-[1.75rem] font-semibold font-Besley mb-[15px]">
                    Sign In
                  </p>
                  <p className="text-[1.125rem] text-my-text-gray font-Amata tracking-wide">
                    Please enter valid email and password to Sign In
                  </p>
                </div>
                <form
                  id="loginForm"
                  onSubmit={handleLogin}
                  className="flex flex-col"
                >
                  <div className="relative mb-[19px]">
                    <input
                      className="h-[56px] w-full outline-none border border-blue rounded py-1 px-3"
                      type="text"
                      id="email"
                      value={email}
                      onInput={(e) => setEmail(e.target.value)}
                    />
                    <label
                      className="absolute z-1 left-[16px] top-[-15px] bg-white p-[4px]"
                      htmlFor="email"
                    >
                      Email
                      <span className="text-red-500"> *</span>
                    </label>
                    <span className="mt-[4px] px-[16px] text-[0.75rem] text-my-text-gray-second font-Roboto">
                      Ex. user123@abc.com
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      className="h-[56px] w-full outline-none border border-blue rounded py-1 px-3"
                      type="password"
                      id="password"
                      value={password}
                      onInput={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className="absolute z-1 left-[16px] top-[-15px] bg-white p-[4px]"
                      htmlFor="password"
                    >
                      Password
                      <span className="text-red-500"> *</span>
                    </label>
                  </div>
                  <div className="flex justify-between mt-[15px] mb-[37px] ">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-[13px] w-[13px] mr-[7px]"
                      />
                      <span className=" tracking-wide">Remember me</span>
                    </div>
                    <div
                      onClick={handleDisplayForgotPassword}
                      className="text-my-text-gray-third underline text-[16px] tracking-wide cursor-pointer"
                    >
                      Forgot Password?
                    </div>
                  </div>
                  <button
                    className="py-[16px] px-[56px] bg-[#E04141] mb-[8px] rounded-[10px] font-Ballo text-[1.625rem] text-white"
                    type="submit"
                    form="loginForm"
                  >
                    SIGN IN
                  </button>
                </form>

                <div className="flex justify-center items-center flex-col">
                  Don’t have an account ? Sign up for free
                  <br />
                  <Link to="/register" className="text-[#1D7ED8]">
                    HERE
                  </Link>
                </div>
                <div className="flex justify-center mt-[15px]">
                  <div className="border-[#6A6A6B] border-t "></div>
                  <span className="font-bold font-Ballo text-[1.25rem]">
                    OR
                  </span>
                  {/* <hr className="border-[#6A6A6B] flex-1 flex-grow-0 flex-shrink-1 h-0"></hr> */}
                </div>
                <div
                  className=" flex items-center justify-center cursor-pointer"
                  onClick={handleSignInGoogle}
                >
                  <div className="mt-[20px] py-[10px] px-[40px] border w-fit border-[#6A6A6B] rounded-[25px] flex items-center justify-center">
                    <img
                      src="/src/assets/images/Login/icon-google.png"
                      alt="icon-google"
                    />
                    <span className="text-[1.25rem] text-[#6A6A6B] ml-[18px] tracking-wide">
                      Login with Google
                    </span>
                  </div>
                </div>
              </div>
            )}
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
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Login;
