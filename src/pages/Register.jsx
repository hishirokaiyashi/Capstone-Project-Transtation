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
import ModalAuthentication from "../components/ModalAuthentication/index.jsx";
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();

  // const [avatar, setAvatar] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);

  const [input, setInput] = useState({
    // userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    // phoneNumber: "",
    // address: "",
    avatar: "",
    gender: "Male",
    dateOfBirth: "",
    idCard: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [iconPasswordType, setIconPasswordType] = useState("mdi:eye-off");

  const [error, setError] = useState({
    // userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    // phoneNumber: "",
    // address: "",
    dateOfBirth: "",
    idCard: "",
  });

  // const [provinces, setProvinces] = useState([]);
  // const [province, setProvince] = useState("");
  // const [districts, setDistricts] = useState([]);
  // const [district, setDistrict] = useState("");
  // const [villages, setVillages] = useState([]);
  // const [village, setVillage] = useState("");

  const [display, setDisplay] = useState(false);

  // useEffect(() => {
  //   const fetchPublicProvinces = async () => {
  //     try {
  //       const response = await apiGetPublicProvinces();
  //       if (response.status === 200) {
  //         setProvinces(response.data.results);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchPublicProvinces();
  // }, []);

  // useEffect(() => {
  //   setDistrict(null);
  //   setVillages(null);
  //   const fetchPublicDistrict = async () => {
  //     if (!province) {
  //       return; // province has not been set yet, return early
  //     }
  //     const response = await apiGetPublicDistrict(province.id);
  //     if (response.status === 200) {
  //       setDistricts(response.data?.results);
  //     }
  //   };
  //   province && fetchPublicDistrict();
  // }, [province]);

  // useEffect(() => {
  //   setVillage("");
  //   const fetchPublicVillage = async () => {
  //     const response = await apiGetPublicVillage(district.id);
  //     if (response.status === 200) {
  //       setVillages(response.data?.results);
  //     }
  //   };
  //   district && fetchPublicVillage();
  // }, [district]);

  // const handleChangeUserName = (e) => {
  //   if (validateUsername(e.currentTarget.value)) {
  //     setError({
  //       ...error,
  //       userName: "User name cannot contain special characters",
  //     });
  //   } else {
  //     if (e.currentTarget.value === "") {
  //       setError({
  //         ...error,
  //         userName: "User name cannot be empty",
  //       });
  //     } else if (e.currentTarget.value.length < 6) {
  //       setError({
  //         ...error,
  //         userName: "User name must have at least 6 characters",
  //       });
  //     } else {
  //       setError({
  //         ...error,
  //         userName: "",
  //       });
  //     }
  //   }
  //   setInput({ ...input, userName: e.target.value });
  // };

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

  // const handlePhoneNumber = (e) => {
  //   if (e.currentTarget.value === "") {
  //     setError({ ...error, phoneNumber: "Phone number cannot be empty" });
  //   } else {
  //     if (
  //       e.currentTarget.value.length < 9 ||
  //       e.currentTarget.value.length > 10
  //     ) {
  //       setError({
  //         ...error,
  //         phoneNumber: "Phone number is invalid",
  //       });
  //     } else if (!validatePhoneNumber(e.currentTarget.value)) {
  //       setError({
  //         ...error,
  //         phoneNumber: "Phone number is invalid ",
  //       });
  //     } else setError({ ...error, phoneNumber: "" });
  //   }
  //   setInput({ ...input, phoneNumber: e.target.value });
  // };

  // const handleHomeAddress = (e) => {
  //   switch (true) {
  //     case e.currentTarget.value === "":
  //       setError({ ...error, address: "Address cannot be empty" });
  //       break;
  //     case e.currentTarget.value.length < 5:
  //       setError({
  //         ...error,
  //         address: "Address is too short! Please try again ",
  //       });
  //       break;
  //     case e.currentTarget.value.length > 100:
  //       setError({
  //         ...error,
  //         address: "Address is too long! Please try again ",
  //       });
  //       break;
  //     case !validateAddress(e.currentTarget.value):
  //       setError({
  //         ...error,
  //         address: "Address is invalid ",
  //       });
  //       break;
  //     default:
  //       setError({ ...error, address: "" });
  //       break;
  //   }
  //   const home = e.target.value;
  //   setInput({ ...input, address: home });
  // };

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

  // const handleChangeAvatar = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const imgSrc = event.target.result;
  //     setAvatar({
  //       file: file,
  //       imgSrc: imgSrc,
  //     });
  //   };

  //   reader.readAsDataURL(file);
  // };

  // const handleContinue = debounce(async () => {
  // Get username, pass, cnfpassword error messages querried by name's keys and its values != ""
  //   const errors = Object.fromEntries(
  //     Object.entries(error).filter(([key, value]) => {
  //       return (
  //         [
  //           "email",
  //           "firstName",
  //           "lastName",
  //           "password",
  //           "confirmPassword",
  //         ].includes(key) && value !== ""
  //       );
  //     })
  //   );

  //   // If there appears any existing error messages, show toast
  //   if (Object.keys(errors).length > 0) {
  //     toast.error("Please enter information fields properly!");
  //     // Focus first error input
  //     document.getElementById(Object.keys(errors)[0]).focus();
  //     return;
  //   }

  //   // Get username, email, pass input values as individual variables
  //   const { userName, email, password, confirmPassword } = input;

  //   // Check either username or email has been used before in Firestore
  //   // const checkUserName = await checkUserExists({ userName });
  //   const checkEmail = await checkUserExists({ email });

  //   // Check all circumstances can happen with these input values
  //   if (userName == "") {
  //     setError({
  //       ...error,
  //       userName: "User name cannot be empty",
  //     });
  //     document.getElementById("userName").focus();
  //     return;
  //   } else if (email == "") {
  //     setError({ ...error, email: "Email cannot be empty" });
  //     document.getElementById("email").focus();
  //     return;
  //   } else if (password == "") {
  //     setError({ ...error, password: "Password cannot be empty" });
  //     document.getElementById("password").focus();
  //     return;
  //   } else if (confirmPassword == "") {
  //     setError({
  //       ...error,
  //       confirmPassword: "Confirm password cannot be empty",
  //     });
  //     document.getElementById("confirmPassword").focus();
  //     return;
  //   } else if (!checkUserName) {
  //     toast.error("Please use another username");
  //     setError({
  //       ...error,
  //       userName: "Your username is already in use",
  //     });
  //     document.getElementById("userName").focus();
  //     return;
  //   } else if (!checkEmail) {
  //     toast.error("Please use another username");
  //     setError({
  //       ...error,
  //       email: "Your email is already in use",
  //     });
  //     document.getElementById("email").focus();
  //     return;
  //   }

  //   // If passing all validation checks above, then we'll be going on
  //   setDisplay(!display);
  // }, 3000);

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
            // "phoneNumber",
            // "address",
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
      // address,
      // avatar,
      // gender,
      // userName,
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
    }
    // else if (phoneNumber == "") {
    //   setError({ ...error, phoneNumber: "Phone number cannot be empty" });
    //   document.getElementById("phoneNumber").focus();
    //   return;
    // }
    else if (dateOfBirth == "") {
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
    // else if (Object.keys(address).length === 0) {
    //   setError({ ...error, address: "Address cannot be empty" });
    //   return;
    // }

    // if (selectedFile) {
    //   // Upload avatar selected or generated from UI avatar API
    //   await uploadFile(
    //     selectedFile,
    //     () => {},
    //     (url) => {
    //       const signedUpUser = {
    //         firstName,
    //         lastName,
    //         phoneNumber,
    //         dateOfBirth,
    //         address: {
    //           province,
    //           district,
    //           village,
    //           home: input.address,
    //         },
    //         avatar: url,
    //         gender,
    //         userName,
    //         idCard,
    //       };

    //       signUp(signedUpUser);
    //       setInput({ ...input, avatar: url });
    //       // setInput((prev) => ({ ...prev, avatar: url }));
    //     }
    //   );
    // } else {
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
          // address: {
          //   province,
          //   district,
          //   village,
          //   home: input.address,
          // },
          avatar: url,
          // gender,
          // userName,
          idCard,
        };
        signUp(signedUpUser);
        setInput({ ...input, avatar: url });
        // setInput((prev) => ({ ...prev, avatar: url }));
      }
    );
    setDisplay(true);
    // }
    // signUp(input);
    // Check re password !== Password
    // registerWithEmailAndPassword("An Nguyen", email, password);
    // Redirect to login page...
  };

  const signUp = async (infor) => {
    const res = await registerWithEmailAndPassword(
      infor,
      input.email,
      input.password
    );
    console.log(input);
    navigate("/login");
  };

  return (
    <>
      <div className="bg-banner-login h-full min-h-screen bg-fixed flex justify-center items-center">
        <div className="w-[693px] bg-white py-[14px] rounded-[10px]">
          {/* <h2 className="text-3xl">Register section</h2> */}
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
            <p className="text-[2rem] font-Ballo font-semibold pb-[12px]">
              Sign Up
            </p>
            <p className="text-my-text-gray text-[1.125rem]">
              Enter information to register an account
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            className="flex flex-col mt-[4px] px-[94px]"
          >
            <div>
              {/* <div className="flex flex-col">
                <div className="relative w-fit m-auto">
                  <input
                    type="file"
                    accept="image/*"
                    name="Avatar"
                    id="avatar"
                    onChange={handleChangeAvatar}
                    className="hidden"
                  />
                  <img
                    src={
                      avatar
                        ? avatar.imgSrc
                        : "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-19.jpg"
                    }
                    className="rounded-full w-28 h-28 object-cover"
                    alt="Default avatar"
                  />
                  <label
                    htmlFor="avatar"
                    className="bg-green-300 p-1 rounded-full absolute bottom-0 right-0 cursor-pointer"
                  >
                    <Icon icon="material-symbols:edit" width="24" height="24" />
                  </label>
                </div>
                <div className="relative pt-[10px]">
                  <label
                    htmlFor="userName"
                    className="absolute top-[-8px] left-[12px] bg-white p-[4px]"
                  >
                    User Name
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    className={
                      error.userName == ""
                        ? "h-[50px] w-full outline-none border border-blue rounded py-1 px-2 "
                        : "h-[50px] w-full outline-none border border-red-500 rounded py-1 px-2 "
                    }
                    type="text"
                    id="userName"
                    placeholder="Username..."
                    value={input.userName}
                    onInput={(e) => handleChangeUserName(e)}
                  />
                  <p className="text-red-500 pt-[4px] text-[0.75rem]">
                    {error.userName}
                  </p>
                </div>
              </div> */}

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
                  // required
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
              {/* <div className="relative">
              <label
                htmlFor="phone"
                className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
              >
                Phone number
                <span className="text-red-500"> *</span>
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
              <p className="text-red-500 text-[0.75rem]">{error.phoneNumber}</p>
            </div> */}
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
                {/* <button
                  onClick={() => {
                    setDisplay(!display);
                  }}
                  className="mt-[20px] cursor-pointer text-white py-[10px] px-3 bg-[#6A6A6B] text-[1rem] rounded text-center"
                >
                  Previous
                </button> */}

                <button
                  type="submit"
                  onClick={() => handleRegister}
                  className="mt-[10px] cursor-pointer text-white py-[10px] px-20 bg-[#E04141] text-[1.625rem] rounded text-center"
                >
                  REGISTER
                </button>
              </div>
              {/* <div
                onClick={handleContinue}
                className="mt-[20px] cursor-pointer text-white py-[20px] px-3 bg-[#6A6A6B] text-[1.625rem] rounded text-center"
              >
                Continue
              </div> */}
            </div>
            {/* <div className="flex mt-4"></div>
              <div className="flex mt-4">
                <div className="w-[40%] flex items-center gap-2 justify-center">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="radio"
                    id="Male"
                    name="gender"
                    value="Male"
                    checked={input.gender === "Male"}
                    onChange={() => setInput({ ...input, gender: "Male" })}
                    className="cursor-pointer"
                  />
                  <label htmlFor="Male">Male</label>
                  <input
                    type="radio"
                    id="Female"
                    name="gender"
                    value="Female"
                    checked={input.gender === "Female"}
                    onChange={() => setInput({ ...input, gender: "Female" })}
                    className="cursor-pointer"
                  />
                  <label htmlFor="Female">Female</label>
                  <br></br>
                </div>
              </div>  */}
            {/* <div className="flex"></div> */}
            {/* <div className="flex flex-col mt-4 relative">
                <label
                  htmlFor="address"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Home address
                  <span className="text-red-500"> *</span>
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
                <p className="text-red-500 text-[0.75rem]">{error.address}</p>
              </div> */}
            {/* <div className="flex mt-6 ">
                <div className="relative w-[50%] pr-[10px]">
                  <label
                    htmlFor="provinces"
                    className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                  >
                    City/Province (optional)
                  </label>
                  <div className="w-full ">
                    <Select
                      type="provinces"
                      setValue={(value) => {
                        setProvince(value);
                      }}
                      options={provinces}
                    />
                  </div>
                </div>
                <div className="relative w-[50%]">
                  <label
                    htmlFor="districts"
                    className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                  >
                    Ward/District (optional)
                  </label>
                  <Select
                    type="districts"
                    setValue={(value) => setDistrict(value)}
                    options={districts}
                  />
                </div>
              </div> */}

            {/* <div className="flex mt-4 relative">
                <label
                  htmlFor="districts"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Ward/District
                </label>
                <Select
                  type="districts"
                  setValue={(value) => setDistrict(value)}
                  options={districts}
                />
              </div> */}

            {/* <div className="flex mt-4 relative">
                <label
                  htmlFor="villages"
                  className="absolute top-[-16px] left-[12px] bg-white p-[4px] z-10"
                >
                  Town/Village (optional)
                </label>
                <div className="w-full">
                  <Select
                    type="villages"
                    setValue={(value) => setVillage(value)}
                    options={villages}
                  />
                </div>
              </div> */}
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
          {/* <div className="overlay fixed z-10 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] transition-all duration-300 ease"></div>

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
          </div> */}
          <ModalAuthentication type="resigter" />
        </>
      )}
    </>
  );
};

export default Register;
