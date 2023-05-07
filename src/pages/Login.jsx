import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import logo from "../assets/images/Login/Logo.png";
import GoogleLogo from "../assets/images/Login/icon-google.png";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset,
} from "../firebase/auth.js";
import { validateEmail } from "../utils/validation";

const Login = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [iconPasswordType, setIconPasswordType] = useState("mdi:eye-off");

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

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
    setIconPasswordType(
      passwordType === "password" ? "ic:baseline-remove-red-eye" : "mdi:eye-off"
    );
  };
  return !isAuthenticated ? (
    <div>
      <div className="flex h-screen bg-my-gray">
        <div className="h-full w-6/12 flex justify-center py-[40px]">
          <div className="py-[30px] px-[60px] rounded-[10px] bg-white ">
            <div className="flex justify-between mb-[45px]">
              <Link to="/">
                <img src={logo} alt="Capstone Logo" className="h-[34px]" />
              </Link>
              <div className="flex items-center justify-center cursor-pointer text-[1.25rem]">
                <span>EN</span>
                <Icon
                  className="flex items-center"
                  icon="material-symbols:keyboard-arrow-down-rounded"
                />
              </div>
            </div>

            <div>
              <div className="mb-[35px]">
                <p className="text-[1.75rem] font-semibold  mb-[15px]">
                  Sign In
                </p>
                <p className="text-[1.125rem] text-my-text-gray tracking-wide">
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
                  <span className="mt-[4px] px-[16px] text-[0.75rem] text-my-text-gray-second ">
                    Ex. user123@abc.com
                  </span>
                </div>

                <div className="relative">
                  <label
                    className="absolute z-1 left-[16px] top-[-15px] bg-white p-[4px]"
                    htmlFor="password"
                  >
                    Password
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    className="h-[56px] w-full outline-none border border-blue rounded py-1 px-3"
                    type={passwordType}
                    id="password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-[16px] top-[20px] cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <Icon icon={iconPasswordType} />
                  </span>
                </div>
                <div className="flex justify-between mt-[15px] mb-[37px] ">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-[13px] w-[13px] mr-[7px]"
                    />
                    <span className=" tracking-wide">Remember me</span>
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="text-my-text-gray-third underline text-[16px] tracking-wide cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  className="py-[16px] px-[56px] bg-[#E04141] mb-[8px] rounded-[10px]  text-[1.375rem] text-white"
                  type="submit"
                  form="loginForm"
                >
                  SIGN IN
                </button>
              </form>

              <Link
                to="/register"
                className=" text-[#1D7ED8] underline flex justify-center items-center flex-col text-[0.875rem]"
              >
                Don’t have an account? Sign up for free here
              </Link>
              <div className="flex justify-center mt-[15px]">
                <div className="border-[#6A6A6B] border-t "></div>
                <span className="  text-[1.25rem]">OR</span>
              </div>
              <div
                className=" flex items-center justify-center cursor-pointer"
                onClick={handleSignInGoogle}
              >
                <div className="mt-[20px] py-[10px] px-[40px] border w-fit border-[#6A6A6B] rounded-[25px] flex items-center justify-center">
                  <img src={GoogleLogo} alt="icon-google" />
                  <span className="text-[1rem] text-[#6A6A6B] ml-[18px] tracking-wide">
                    Login with Google
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-screen flex flex-col justify-end w-6/12 bg-banner-login bg-cover bg-center bg-no-repeat">
          <div className="absolute bg-black bg-opacity-30 z-2 top-0 left-0 right-0 bottom-0"></div>
          <h1 className="absolute p-[4px] w-fit text-5xl font-extrabold bottom-20 left-10 text-white  z-3 bg-gradient-to-r from-gray-900 to-transparent">
            EXPLORE NEW
            <br />
            DESTINATION
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
