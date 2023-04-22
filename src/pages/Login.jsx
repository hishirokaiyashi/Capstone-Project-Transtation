import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
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
    // Validate email and password
    try {
      const res = await logInWithEmailAndPassword(
        email.trim(),
        password.trim()
      );
      toast.success(`Welcome back to My App, ${email}!`);
      navigate("/");
    } catch (error) {
      toast.error(err.message);
    }
  };

  const handleSignInGoogle = () => {
    signInWithGoogle().then(() => navigate("/"));
    // Redirect to other page ...
  };

  const handleForgotPassword = debounce(async (e) => {
    e.preventDefault();
    // Validate email
    try {
      await sendPasswordReset(forgotEmail);
      toast.info("Password reset link sent!");
      setDisplayForgotPassword(false);
    } catch (error) {
      toast.error(err.message);
    }
  }, 3000);
  const handleDisplayForgotPassword = () => {
    setDisplayForgotPassword(true);
  };
  const handleChangeEmail = (e) => {
    if (e.currentTarget.value === "") {
      setError({ ...error, email: "Email cannot be empty" });
    } else {
      if (validateEmail(e.currentTarget.value)) {
        setError({
          ...error,
          email: "Email is invalid ",
        });
      } else setError({ ...error, email: "" });
    }
    setInput({ ...input, email: e.target.value });
  };
  return !isAuthenticated ? (
    <div className="flex h-screen bg-my-gray">
      <div className="h-full w-6/12 flex justify-center py-[40px]">
        <div className="py-[30px] px-[60px] rounded-[10px] bg-white ">
          <div className="flex justify-between mb-[45px]">
            <img
              src="/src/assets/images/Logo.png"
              alt="Logo"
              className="h-[34px]"
            />
            <div className="flex items-center justify-center cursor-pointer text-[1.25rem]">
              <span>EN</span>
              <Icon
                className="flex items-center"
                icon="material-symbols:keyboard-arrow-down-rounded"
              />
            </div>
          </div>
          {displayForgotPassword ? (
            <div>
              <hr className="w-full my-8 h-px bg-black" />

              <h2 className="text-3xl ">Forget password section</h2>

              <form
                id="resetForm"
                onSubmit={handleForgotPassword}
                className="flex flex-col mt-4 "
              >
                <div className="gap-10 flex">
                  <label htmlFor="forgotEmail">Email</label>
                  <input
                    className={
                      error.email == ""
                        ? "outline-none border border-blue rounded py-1 px-2"
                        : "outline-none border border-red-500 rounded py-1 px-2"
                    }
                    type="text"
                    id="forgotEmail"
                    onInput={(e) => handleChangeEmail(e)}
                  />
                  <p className="text-red-500">{error.email}</p>
                </div>

                <button
                  form="resetForm"
                  className="mt-2 py-2 px-3 bg-slate-500 rounded"
                  type="submit"
                >
                  Send password reset
                </button>
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
                    className="h-[56px] w-full outline-none border border-blue rounded py-1 px-2"
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
                    className="h-[56px] w-full outline-none border border-blue rounded py-1 px-2"
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
                  className="py-[16px] px-[56px]  bg-[#E04141] mb-[8px] rounded-[10px] font-Ballo text-[1.625rem] text-white"
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
                <span className="font-bold font-Ballo text-[1.25rem]">OR</span>
                {/* <hr className="border-[#6A6A6B] flex-1 flex-grow-0 flex-shrink-1 h-0"></hr> */}
              </div>
              <div
                className=" flex items-center justify-center cursor-pointer"
                onClick={handleSignInGoogle}
              >
                <div className="mt-[20px] py-[10px] px-[40px] border w-fit border-[#6A6A6B] rounded-[25px] flex items-center justify-center">
                  <img
                    src="/src/assets/images/icon _google_.png"
                    alt="icon _google"
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
        <h1 className="absolute w-full text-5xl font-extrabold bottom-20 left-10 text-white font-Achivo z-3">
          EXPLORE NEW
          <br />
          DESINATION
          <br />
          WITH US
        </h1>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Login;
