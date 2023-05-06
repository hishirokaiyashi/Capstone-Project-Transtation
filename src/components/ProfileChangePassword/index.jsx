import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { updateProfilePassword } from "../../firebase/auth";
import { validatePassword } from "../../utils/validation";
import Button from "../Button";

const ProfileChangePassword = () => {
  const [input, setInput] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [iconPasswordType, setIconPasswordType] = useState("mdi:eye-off");
  const [loading, setLoading] = useState(false);

  const handleChangeCurrentPassword = (e) => {
    const temp = { ...error };
    const inputPassword = e.currentTarget.value;

    if (inputPassword === "") {
      temp.currentPassword = "Password cannot be empty";
    } else {
      if (inputPassword.length < 8) {
        temp.currentPassword = "Password must have at least 8 characters long";
      } else if (!validatePassword(inputPassword)) {
        temp.currentPassword =
          "Password must contain at least 1 uppercase letter and 1 number character";
      } else {
        temp.currentPassword = "";
      }
    }
    if (inputPassword === input.password) {
      temp.password = "New password cannot be the same as the current password";
    } else {
      temp.password = "";
    }
    setError({ ...temp });
    setInput({ ...input, currentPassword: inputPassword });
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
    if (inputPassword === input.currentPassword) {
      temp.password = "New password cannot be the same as the current password";
    }
    if (input.confirmPassword !== "") {
      if (e.target.value !== input.confirmPassword) {
        temp.confirmPassword = "Confirm password is not matched";
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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = input;

    if (password === "") {
      setError((prev) => ({ ...prev, password: "Password cannot be empty" }));
      return;
    }
    if (confirmPassword === "") {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm password cannot be empty",
      }));

      return;
    }
    if (error.password !== "" || error.confirmPassword !== "") {
      return;
    }

    setLoading(true);

    try {
      await updateProfilePassword(input.currentPassword, input.password);
      setInput({ currentPassword: "", password: "", confirmPassword: "" });
    } catch (error) {
      toast.info(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        handleUpdatePassword(e);
      }}
      className="flex flex-col py-1 px-10"
    >
      <div className="flex flex-col mt-4">
        <label
          htmlFor="currentPassword"
          className="mb-[10px] font-semibold text-[1rem]"
        >
          Current password
        </label>
        <div className="relative">
          <input
            className={
              error.currentPassword == ""
                ? "w-full h-[50px] outline-none border border-blue rounded py-1 px-2"
                : "w-full h-[50px] outline-none border border-red-500 rounded py-1 px-2"
            }
            type={passwordType}
            id="currentPassword"
            placeholder="Password..."
            value={input.currentPassword}
            onInput={(e) => handleChangeCurrentPassword(e)}
          />
          <span
            className="absolute right-[30px] top-[20px] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <Icon icon={iconPasswordType} />
          </span>
        </div>
        <p className="text-red-500">{error.currentPassword}</p>
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="password"
          className="mb-[10px] font-semibold text-[1rem]"
        >
          New Password
        </label>
        <div className="relative">
          <input
            className={
              error.password == ""
                ? "w-full h-[50px] outline-none border border-blue rounded py-1 px-2"
                : "w-full h-[50px] outline-none border border-red-500 rounded py-1 px-2"
            }
            type={passwordType}
            id="password"
            placeholder="Password..."
            value={input.password}
            onInput={(e) => handleChangePassword(e)}
          />
          <span
            className="absolute right-[30px] top-[20px] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <Icon icon={iconPasswordType} />
          </span>
        </div>
        <p className="text-red-500">{error.password}</p>
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="password"
          className="mb-[10px] font-semibold text-[1rem]"
        >
          Confirmed new password
        </label>
        <div className="relative">
          <input
            type={passwordType}
            placeholder="Confirm Password..."
            id="confirmPassword"
            value={input.confirmPassword}
            className={
              error.confirmPassword == ""
                ? "w-full h-[50px] outline-none border border-blue rounded py-1 px-2"
                : "w-full h-[50px] outline-none border border-red-500 rounded py-1 px-2"
            }
            onInput={(e) => handleConfirmPassword(e)}
          />
          <span className="absolute right-[30px] top-[20px] cursor-pointer">
            <Icon onClick={togglePasswordVisibility} icon={iconPasswordType} />
          </span>
        </div>
        <p className="text-red-500">{error.confirmPassword}</p>
      </div>{" "}
      {/* <button
        type="submit"
        className="text-[1.375rem] rounded-[5px] mb-[20px] text-center mt-[20px] px-[60px] py-[20px] bg-[#E04141] text-white cursor-pointer"
      >
        Change Password
      </button> */}
      <Button loading={loading} text="Change password" />
    </form>
  );
};

export default ProfileChangePassword;
