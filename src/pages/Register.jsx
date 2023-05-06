import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  checkUserExists,
} from "../firebase/auth.js";
import { uploadFile } from "../firebase/storage";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

import debounce from "../utils/debounce";
import generateAvatar from "../utils/generateAvatar";
import {
  apiGetPublicProvinces,
  apiGetPublicDistrict,
  apiGetPublicVillage,
} from "../utils/getLocationApi";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validateAddress,
  validateIdCard,
  checkAge,
} from "../utils/validation";

// import Input from "../components/Input";
import Select from "../components/Select";
import Modal from "../components/Modal/index.jsx";
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    avatar: "",
    gender: "Male",
    dateOfBirth: "",
    idCard: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [iconPasswordType, setIconPasswordType] = useState("mdi:eye-off");

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    idCard: "",
  });

  const [display, setDisplay] = useState(false);

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

  const handleChangePassword = (e) => {
    const temp = { ...error };
    const inputPassword = e.currentTarget.value;

    if (inputPassword === "") {
      temp.password = "Password cannot be empty";
    } else {
      if (inputPassword.length < 8) {
        temp.password = "Password must have at least 8 characters long";
      } else if (!validatePassword(inputPassword)) {
        temp.password =
          "Password must contain at least 1 uppercase letter and 1 number character";
      } else {
        temp.password = "";
      }
    }

    if (input.confirmPassword !== "") {
      if (e.target.value !== input.confirmPassword) {
        temp.confirmPassword = "Confirm Password is not matched";
      } else {
        temp.confirmPassword = "";
      }
    } else {
      temp.confirmPassword = "";
    }
    setError({ ...temp });
    setInput({ ...input, password: inputPassword });
  };

  const handleConfirmPassword = (e) => {
    const temp = { ...error };
    const confirmPassword = e.target.value;
    if (confirmPassword == "" || input.password !== confirmPassword) {
      temp.confirmPassword = "Password is not matched";
    } else {
      temp.confirmPassword = "";
    }
    setError({ ...temp });
    setInput({ ...input, confirmPassword: confirmPassword });
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
    setIconPasswordType(
      passwordType === "password" ? "ic:baseline-remove-red-eye" : "mdi:eye-off"
    );
  };

  const handleChangeFirstName = (e) => {
    if (e.currentTarget.value === "") {
      setError({ ...error, firstName: "First name cannot be empty" });
    } else {
      if (e.currentTarget.value.length > 40) {
        setError({
          ...error,
          firstName: "First name cannot be longer than 40 characters",
        });
      } else if (!validateFirstName(e.currentTarget.value)) {
        setError({
          ...error,
          firstName: "First name is invalid ",
        });
      } else setError({ ...error, firstName: "" });
    }
    setInput({ ...input, firstName: e.target.value });
  };

  const handleChangeLastName = (e) => {
    if (e.currentTarget.value === "") {
      setError({ ...error, lastName: "Last name cannot be empty" });
    } else {
      if (e.currentTarget.value.length > 40) {
        setError({
          ...error,
          lastName: "Last name cannot be longer than 40 characters",
        });
      } else if (!validateLastName(e.currentTarget.value)) {
        setError({
          ...error,
          lastName: "Last name is invalid ",
        });
      } else setError({ ...error, lastName: "" });
    }
    setInput({ ...input, lastName: e.target.value });
  };

  const handleDateChange = (event) => {
    const currentDate = moment();
    const inputDate = moment(event.target.value, "YYYY-MM-DD", true);
    const age = currentDate.diff(inputDate, "years");
    if (!inputDate.isValid()) {
      setError({
        ...error,
        dateOfBirth: "Please enter a valid date",
      });
    } else if (inputDate > currentDate) {
      setError({
        ...error,
        dateOfBirth: "Please enter a date that is not in the future",
      });
    } else if (age < 16) {
      setError({
        ...error,
        dateOfBirth: "You must be at least 16 years old",
      });
    } else if (age > 100) {
      setError({
        ...error,
        dateOfBirth: "Please enter a valid year",
      });
    } else {
      setError({ ...error, dateOfBirth: "" });
    }
    setInput({ ...input, dateOfBirth: event.target.value });
  };

  const handleIdCardChange = (event) => {
    if (event.target.value === "") {
      setError({
        ...error,
        idCard: "ID Card Number cannot be empty",
      });
    } else if (!validateIdCard(event.target.value)) {
      setError({
        ...error,
        idCard: "Please enter a valid ID Card Number",
      });
    } else if (!checkAge(event.target.value)) {
      setError({
        ...error,
        idCard: "You must be at least 18 years old",
      });
    } else {
      setError({ ...error, idCard: "" });
    }
    setInput({ ...input, idCard: event.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Get firstName, lastName, phoneNumber, cnfpassword error messages querried by name's keys and its values != ""
    const errors = Object.fromEntries(
      Object.entries(error).filter(([key, value]) => {
        return (
          [
            "email",
            "firstName",
            "lastName",
            "dateOfBirth",
            "idCard",
            "password",
            "confirmPassword",
          ].includes(key) && value !== ""
        );
      })
    );

    // If there appears any existing error messages, show toast
    if (Object.keys(errors).length > 0) {
      toast.error("Please enter information fields properly!");
      // Focus first error input
      document.getElementById(Object.keys(errors)[0]).focus();
      return;
    }

    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      idCard,
      password,
      confirmPassword,
    } = input;
    const checkEmail = await checkUserExists({ email });
    if (email == "") {
      setError({ ...error, email: "Email cannot be empty" });
      document.getElementById("email").focus();
      return;
    } else if (!checkEmail) {
      toast.error("Please use another email");
      setError({
        ...error,
        email: "Your email is already in use",
      });
      document.getElementById("email").focus();
      return;
    } else if (firstName == "") {
      setError({ ...error, firstName: "Firstname cannot be empty" });
      document.getElementById("firstName").focus();
      return;
    } else if (lastName == "") {
      setError({ ...error, lastName: "Last name cannot be empty" });
      document.getElementById("lastName").focus();
      return;
    } else if (dateOfBirth == "") {
      setError({
        ...error,
        dateOfBirth: "Please enter a valid date",
      });
      return;
    } else if (idCard == "") {
      setError({ ...error, idCard: "ID card number cannot be empty" });
      document.getElementById("idCard").focus();
      return;
    } else if (password == "") {
      setError({ ...error, password: "Password cannot be empty" });
      document.getElementById("password").focus();
      return;
    } else if (confirmPassword == "") {
      setError({
        ...error,
        confirmPassword: "Confirm password cannot be empty",
      });
      document.getElementById("confirmPassword").focus();
      return;
    }
    const autoAvatar = await generateAvatar(input.firstName + input.lastName);
    const blob = new Blob([autoAvatar], { type: "image/png" });
    await uploadFile(
      blob,
      () => {},
      (url) => {
        const signedUpUser = {
          firstName,
          lastName,
          phoneNumber,
          dateOfBirth,
          avatar: url,
          idCard,
        };
        setDisplay(true);
        signUp(signedUpUser);
        setInput({ ...input, avatar: url });
      }
    );
    // Redirect to login page...
  };

  const signUp = async (infor) => {
    const res = await registerWithEmailAndPassword(
      infor,
      input.email,
      input.password
    );
  };

  return (
    <>
      <div className="bg-banner-login h-full min-h-screen bg-fixed flex justify-center items-center">
        <div className="w-[693px] bg-white py-[14px] rounded-[10px]">
          <div className="flex justify-between mb-[30px] px-[60px]">
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
          <div className="px-[94px]">
            <p className="text-[2rem]  font-semibold pb-[12px]">Sign Up</p>
            <p className="text-my-text-gray text-[1.125rem]">
              Enter information to register an account
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            className="flex flex-col mt-[4px] px-[94px]"
          >
            <div>
              <div className="relative mt-[16px]">
                <label
                  htmlFor="email"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px]"
                >
                  Email
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  className={
                    error.email == ""
                      ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                      : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
                  }
                  type="text"
                  id="email"
                  placeholder="eg. example@example.com"
                  value={input.email}
                  onInput={(e) => handleChangeEmail(e)}
                />
                <p className="text-red-500 pt-[4px] text-[0.75rem]">
                  {error.email}
                </p>
              </div>
              <div className="relative mt-[14px]">
                <label
                  htmlFor="firstName"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  First name
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="eg. Giao"
                  id="firstName"
                  value={input.firstName}
                  className={
                    error.firstName == ""
                      ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                      : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onInput={(e) => handleChangeFirstName(e)}
                />
                <p className="text-red-500 text-[0.75rem]">{error.firstName}</p>
              </div>
              <div className="relative mt-[16px]">
                <label
                  htmlFor="lastName"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Last name
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="eg. Tran"
                  id="lastName"
                  value={input.lastName}
                  className={
                    error.lastName == ""
                      ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                      : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onInput={(e) => handleChangeLastName(e)}
                />
                <p className="text-red-500 text-[0.75rem]">{error.lastName}</p>
              </div>
              <div className="flex flex-col mt-[16px] relative border ">
                <label
                  htmlFor="date"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Date of birth:
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={input.dateOfBirth}
                  onChange={handleDateChange}
                  className="h-[50px] w-full border rounded cursor-pointer grid pl-2 pr-3"
                />
                <p className="text-red-500 text-[0.75rem]">
                  {error.dateOfBirth}
                </p>
              </div>
              <div className=" flex flex-col mt-[16px] relative">
                <label
                  htmlFor="idCard"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  ID card:
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="idCard"
                  placeholder="Id card number..."
                  name="idCard"
                  value={input.idCard}
                  className={
                    error.idCard == ""
                      ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                      : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onChange={handleIdCardChange}
                />
                <p className="text-red-500 text-[0.75rem]">{error.idCard}</p>
              </div>
              <div className="relative mt-[16px]">
                <label
                  htmlFor="password"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Password
                  <span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    className={
                      error.password == ""
                        ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                        : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
                    }
                    type={passwordType}
                    id="password"
                    placeholder="Password..."
                    value={input.password}
                    onInput={(e) => handleChangePassword(e)}
                  />
                  <span
                    className="absolute right-[16px] top-[20px] cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <Icon icon={iconPasswordType} />
                  </span>
                </div>
                <p className="text-red-500 pt-[4px] text-[0.75rem]">
                  {error.password}
                </p>
              </div>
              <div className="relative mt-[16px]">
                <label
                  htmlFor="password"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Confirmed password
                  <span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    type={passwordType}
                    placeholder="Confirm password..."
                    id="confirmPassword"
                    value={input.confirmPassword}
                    className={
                      error.confirmPassword == ""
                        ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                        : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
                    }
                    onInput={(e) => handleConfirmPassword(e)}
                  />
                  <span className="absolute right-[16px] top-[20px] cursor-pointer">
                    <Icon icon={iconPasswordType} />
                  </span>
                </div>
                <p className="text-red-500 pt-[4px] text-[0.75rem]">
                  {error.confirmPassword}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={() => handleRegister}
                  className="mt-[10px] cursor-pointer text-white py-[10px] px-20 bg-[#E04141] text-[1.375rem] rounded text-center"
                >
                  REGISTER
                </button>
              </div>
            </div>
          </form>
          <Link
            to="/login"
            className="text-my-text-blue py-2 flex justify-center underline text-[0.875rem]"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
      {display && (
        <>
          <Modal type="register" />
        </>
      )}
    </>
  );
};

export default Register;
