import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserInfoByUserId } from "../../firebase/firestore";
import { setUser } from "../../redux/user.slice";
import { uploadFile } from "../../firebase/storage";
import {
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validateAddress,
} from "../../utils/validation";
import generateAvatar from "../../utils/generateAvatar";
import Button from "../Button";

const defaultAvatar =
  "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-19.jpg";

const ProfileUserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState({
    imgSrc: user.photoURL || defaultAvatar,
  });
  const [input, setInput] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    photoUrl: user.photoURL || "",
    gender: "Male",
    dateOfBirth: user.dateOfBirth || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);

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

  const handlePhoneNumber = (e) => {
    if (e.currentTarget.value === "") {
      setError({ ...error, phoneNumber: "Phone number cannot be empty" });
    } else {
      if (
        e.currentTarget.value.length < 9 ||
        e.currentTarget.value.length > 10
      ) {
        setError({
          ...error,
          phoneNumber: "Phone number is invalid",
        });
      } else if (!validatePhoneNumber(e.currentTarget.value)) {
        setError({
          ...error,
          phoneNumber: "Phone number is invalid ",
        });
      } else setError({ ...error, phoneNumber: "" });
    }
    setInput({ ...input, phoneNumber: e.target.value });
  };

  const handleHomeAddress = (e) => {
    switch (true) {
      case e.currentTarget.value === "":
        setError({ ...error, address: "Address cannot be empty" });
        break;
      case e.currentTarget.value.length < 5:
        setError({
          ...error,
          address: "Address is too short! Please try again ",
        });
        break;
      case e.currentTarget.value.length > 100:
        setError({
          ...error,
          address: "Address is too long! Please try again ",
        });
        break;
      case !validateAddress(e.currentTarget.value):
        setError({
          ...error,
          address: "Address is invalid ",
        });
        break;
      default:
        setError({ ...error, address: "" });
        break;
    }
    const home = e.target.value;
    setInput({ ...input, address: home });
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

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgSrc = event.target.result;
      setAvatar({
        file: file,
        imgSrc: imgSrc,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateProfileUser = async (e) => {
    e.preventDefault();

    // Get firstName, lastName, phoneNumber, cnfpassword error messages querried by name's keys and its values != ""
    const errors = Object.fromEntries(
      Object.entries(error).filter(([key, value]) => {
        return (
          [
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
            "dateOfBirth",
            // "idCard",
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
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      address,
      photoURL,
      gender,
    } = input;

    if (firstName == "") {
      setError({ ...error, firstName: "First name cannot be empty" });
      document.getElementById("firstName").focus();
      return;
    } else if (lastName == "") {
      setError({ ...error, lastName: "Last name cannot be empty" });
      document.getElementById("lastName").focus();
      return;
    } else if (phoneNumber == "") {
      setError({ ...error, phoneNumber: "Phone number cannot be empty" });
      document.getElementById("phoneNumber").focus();
      return;
    } else if (dateOfBirth == "") {
      setError({
        ...error,
        dateOfBirth: "Please enter a valid date",
      });
      return;
    }

    setLoading(true);
    if (selectedFile) {
      // Upload avatar selected or generated from UI avatar API
      await uploadFile(
        selectedFile,
        () => {},
        async (url) => {
          const newUserInfo = {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            address,
            photoURL: url,
            gender,
          };
          setInput({ ...input, photoURL: url });
          await updateUserInfoByUserId(user.uid, newUserInfo);
          dispatch(
            setUser({
              ...user,
              firstName: newUserInfo.firstName,
              lastName: newUserInfo.lastName,
              displayName: newUserInfo.firstName + newUserInfo.lastName,
              fullName: newUserInfo.firstName + newUserInfo.lastName,
              phoneNumber: newUserInfo.phoneNumber,
              dateOfBirth: newUserInfo.dateOfBirth,
              address: newUserInfo.address,
              photoURL: newUserInfo.photoURL,
            })
          );
        }
      );
    } else if (!selectedFile && avatar.imgSrc === defaultAvatar) {
      const autoAvatar = await generateAvatar(input.firstName + input.lastName);
      const blob = new Blob([autoAvatar], { type: "image/png" });
      await uploadFile(
        blob,
        () => {},
        async (url) => {
          const newUserInfo = {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            address,
            photoURL: url,
            gender,
          };
          setInput({ ...input, photoURL: url });
          await updateUserInfoByUserId(user.uid, newUserInfo);
          dispatch(
            setUser({
              ...user,
              firstName: newUserInfo.firstName,
              lastName: newUserInfo.lastName,
              displayName: newUserInfo.firstName + newUserInfo.lastName,
              fullName: newUserInfo.firstName + newUserInfo.lastName,
              phoneNumber: newUserInfo.phoneNumber,
              dateOfBirth: newUserInfo.dateOfBirth,
              address: newUserInfo.address,
              photoURL: newUserInfo.photoURL,
            })
          );
        }
      );
    } else {
      const newUserInfo = {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        address,
        photoURL: user.photoURL,
        gender,
      };
      await updateUserInfoByUserId(user.uid, newUserInfo);
      dispatch(
        setUser({
          ...user,
          firstName: newUserInfo.firstName,
          lastName: newUserInfo.lastName,
          displayName: newUserInfo.firstName + newUserInfo.lastName,
          fullName: newUserInfo.firstName + newUserInfo.lastName,
          phoneNumber: newUserInfo.phoneNumber,
          dateOfBirth: newUserInfo.dateOfBirth,
          address: newUserInfo.address,
          photoURL: newUserInfo.photoURL,
        })
      );
    }
    toast.success(`Update profile successfully!, ${user.email}!`);
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => handleUpdateProfileUser(e)}
      className="flex w-full  py-1 px-10"
    >
      <div className="gap-2 flex items-center w-[30%]">
        <div className="relative w-fit ">
          <input
            type="file"
            accept="image/*"
            name="Avatar"
            id="avatar"
            onChange={handleChangeAvatar}
            className="hidden"
          />
          <img
            src={avatar.imgSrc}
            className="rounded-full w-[200px] h-[200px] object-cover"
            alt="Default avatar"
          />
          <label
            htmlFor="avatar"
            className="bg-[#E04141] text-white p-4 rounded-full absolute bottom-0 right-0 cursor-pointer"
          >
            <Icon icon="material-symbols:edit" width="24" height="24" />
          </label>
        </div>
      </div>
      <div className="flex flex-col w-[70%]">
        <div className="flex flex-col mt-4">
          <label
            htmlFor="firstName "
            className="mb-[5px] font-semibold text-[1rem]"
          >
            First name
          </label>
          <input
            type="text"
            placeholder="First Name..."
            id="firstName"
            value={input.firstName}
            className={
              error.firstName == ""
                ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
            }
            onInput={(e) => handleChangeFirstName(e)}
          />
          <p className="text-red-500">{error.firstName}</p>
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="lastName"
            className="mb-[5px] font-semibold text-[1rem]"
          >
            Last name
          </label>
          <input
            type="text"
            placeholder="Last Name..."
            id="lastName"
            value={input.lastName}
            className={
              error.lastName == ""
                ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
            }
            onInput={(e) => handleChangeLastName(e)}
          />
          <p className="text-red-500">{error.lastName}</p>
        </div>
        <div className="flex flex-col mt-4">
          <div>
            <label
              htmlFor="phone"
              className="mb-[5px] font-semibold text-[1rem]"
            >
              Phone number
            </label>
            <input
              type="text"
              placeholder="Phone start with 0..."
              id="phone"
              value={input.phoneNumber}
              className={
                error.phoneNumber == ""
                  ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                  : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
              }
              onInput={(e) => handlePhoneNumber(e)}
            />
            <p className="text-red-500">{error.phoneNumber}</p>
          </div>
          <div className="flex gap-[10px] mt-4">
            <label
              htmlFor="gender"
              className="mb-[5px] font-semibold text-[1rem]"
            >
              Gender
            </label>
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              checked={input.gender === "Male"}
              onChange={() => setInput({ ...input, gender: "Male" })}
            />
            <label htmlFor="Male">Male</label>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              checked={input.gender === "Female"}
              onChange={() => setInput({ ...input, gender: "Female" })}
            />
            <label htmlFor="Female">Female</label>
            <br></br>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="date" className="mb-[5px] font-semibold text-[1rem]">
            Date of birth:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={input.dateOfBirth}
            onChange={handleDateChange}
            className="h-[50px] w-full border p-2 cursor-pointer"
          />
          <p className="text-red-500">{error.dateOfBirth}</p>
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="address"
            className="mb-[5px] font-semibold text-[1rem]"
          >
            Home address
          </label>
          <input
            type="text"
            placeholder="Address..."
            id="address"
            value={input.address}
            className={
              error.address == ""
                ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2"
                : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2"
            }
            onInput={(e) => handleHomeAddress(e)}
          />
          <p className="text-red-500">{error.address}</p>
        </div>
        <Button loading={loading} text="Update Profile" />
      </div>
    </form>
  );
};

export default ProfileUserInfo;
