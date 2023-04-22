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
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    avatar: "",
    gender: "Male",
    dateOfBirth: "",
    idCard: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [iconPasswordType, setIconPasswordType] = useState("mdi:eye-off");

  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    idCard: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [villages, setVillages] = useState([]);
  const [village, setVillage] = useState("");

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchPublicProvinces = async () => {
      try {
        const response = await apiGetPublicProvinces();
        if (response.status === 200) {
          setProvinces(response.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublicProvinces();
  }, []);

  useEffect(() => {
    setDistrict(null);
    setVillages(null);
    const fetchPublicDistrict = async () => {
      if (!province) {
        return; // province has not been set yet, return early
      }
      const response = await apiGetPublicDistrict(province.id);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
  }, [province]);

  useEffect(() => {
    setVillage("");
    const fetchPublicVillage = async () => {
      const response = await apiGetPublicVillage(district.id);
      if (response.status === 200) {
        setVillages(response.data?.results);
      }
    };
    district && fetchPublicVillage();
  }, [district]);

  const handleChangeUserName = (e) => {
    if (validateUsername(e.currentTarget.value)) {
      setError({
        ...error,
        userName: "User name cannot contain special characters",
      });
    } else {
      if (e.currentTarget.value === "") {
        setError({
          ...error,
          userName: "User name cannot be empty",
        });
      } else if (e.currentTarget.value.length < 6) {
        setError({
          ...error,
          userName: "User name must have at least 6 characters",
        });
      } else {
        setError({
          ...error,
          userName: "",
        });
      }
    }
    setInput({ ...input, userName: e.target.value });
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

  const handleContinue = debounce(async () => {
    // Get username, pass, cnfpassword error messages querried by name's keys and its values != ""
    const errors = Object.fromEntries(
      Object.entries(error).filter(([key, value]) => {
        return (
          ["userName", "email", "password", "confirmPassword"].includes(key) &&
          value !== ""
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

    // Get username, email, pass input values as individual variables
    const { userName, email, password, confirmPassword } = input;

    // Check either username or email has been used before in Firestore
    const checkUserName = await checkUserExists({ userName });
    const checkEmail = await checkUserExists({ email });

    // Check all circumstances can happen with these input values
    if (userName == "") {
      setError({
        ...error,
        userName: "User name cannot be empty",
      });
      document.getElementById("userName").focus();
      return;
    } else if (email == "") {
      setError({ ...error, email: "Email cannot be empty" });
      document.getElementById("email").focus();
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
    } else if (!checkUserName) {
      toast.error("Please use another username");
      setError({
        ...error,
        userName: "Your username is already in use",
      });
      document.getElementById("userName").focus();
      return;
    } else if (!checkEmail) {
      toast.error("Please use another username");
      setError({
        ...error,
        email: "Your email is already in use",
      });
      document.getElementById("email").focus();
      return;
    }

    // If passing all validation checks above, then we'll be going on
    setDisplay(!display);
  }, 3000);

  const handleRegister = async (e) => {
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
            "idCard",
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
      avatar,
      gender,
      userName,
      idCard,
    } = input;

    if (firstName == "") {
      setError({ ...error, firstName: "Firstname cannot be empty" });
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
    } else if (idCard == "") {
      setError({ ...error, idCard: "ID card number cannot be empty" });
      document.getElementById("idCard").focus();
      return;
    } else if (Object.keys(address).length === 0) {
      setError({ ...error, address: "Address cannot be empty" });
      return;
    }

    if (selectedFile) {
      // Upload avatar selected or generated from UI avatar API
      await uploadFile(
        selectedFile,
        () => {},
        (url) => {
          const signedUpUser = {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            address: {
              province,
              district,
              village,
              home: input.address,
            },
            avatar: url,
            gender,
            userName,
            idCard,
          };

          signUp(signedUpUser);
          setInput({ ...input, avatar: url });
          // setInput((prev) => ({ ...prev, avatar: url }));
        }
      );
    } else {
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
            address: {
              province,
              district,
              village,
              home: input.address,
            },
            avatar: url,
            gender,
            userName,
            idCard,
          };
          signUp(signedUpUser);
          setInput({ ...input, avatar: url });
          // setInput((prev) => ({ ...prev, avatar: url }));
        }
      );
    }
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
      <h2 className="text-3xl">Register section</h2>
      <form onSubmit={handleRegister} className="flex flex-col mt-4">
        {!display ? (
          <div>
            <div className="gap-2 flex flex-col">
              <div className="relative w-fit">
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
                  className="rounded-full w-32 h-32 object-cover"
                  alt="Default avatar"
                />
                <label
                  htmlFor="avatar"
                  className="bg-green-300 p-1 rounded-full absolute bottom-0 right-0 cursor-pointer"
                >
                  <Icon icon="material-symbols:edit" width="24" height="24" />
                </label>
              </div>

              <label htmlFor="userName">User name</label>
              <input
                className={
                  error.userName == ""
                    ? "outline-none border border-blue rounded py-1 px-2"
                    : "outline-none border border-red-500 rounded py-1 px-2"
                }
                type="text"
                id="userName"
                placeholder="Username..."
                value={input.userName}
                onInput={(e) => handleChangeUserName(e)}
              />
              <p className="text-red-500">{error.userName}</p>
            </div>

            <div className="gap-2 flex mt-4">
              <label htmlFor="email">Email</label>
              <input
                className={
                  error.email == ""
                    ? "outline-none border border-blue rounded py-1 px-2"
                    : "outline-none border border-red-500 rounded py-1 px-2"
                }
                type="text"
                id="email"
                placeholder="Email..."
                value={input.email}
                // required
                onInput={(e) => handleChangeEmail(e)}
              />
              <p className="text-red-500">{error.email}</p>
            </div>

            <div className="gap-10 flex mt-4">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className={
                    error.password == ""
                      ? "outline-none border border-blue rounded py-1 px-2"
                      : "outline-none border border-red-500 rounded py-1 px-2"
                  }
                  type={passwordType}
                  id="password"
                  placeholder="Password..."
                  value={input.password}
                  onInput={(e) => handleChangePassword(e)}
                />
                <span
                  className="absolute right-[10px] top-[7px] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <Icon icon={iconPasswordType} />
                </span>
              </div>
              <p className="text-red-500">{error.password}</p>
            </div>
            <div className="gap-10 flex mt-4">
              <label htmlFor="password">Confirmed password</label>
              <div className="relative">
                <input
                  type={passwordType}
                  placeholder="Confirm Password..."
                  id="confirmPassword"
                  value={input.confirmPassword}
                  className={
                    error.confirmPassword == ""
                      ? "outline-none border border-blue rounded py-1 px-2"
                      : "outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onInput={(e) => handleConfirmPassword(e)}
                />
                <span className="absolute right-[10px] top-[7px] cursor-pointer">
                  <Icon icon={iconPasswordType} />
                </span>
              </div>
              <p className="text-red-500">{error.confirmPassword}</p>
            </div>
            <div
              onClick={handleContinue}
              className="mt-2 py-2 px-3 bg-slate-500 rounded"
            >
              Continue
            </div>
          </div>
        ) : (
          <div>
            <div className="gap-10 flex mt-4">
              <div>
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  placeholder="First Name..."
                  id="firstName"
                  value={input.firstName}
                  className={
                    error.firstName == ""
                      ? "outline-none border border-blue rounded py-1 px-2"
                      : "outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onInput={(e) => handleChangeFirstName(e)}
                />
                <p className="text-red-500">{error.firstName}</p>
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  placeholder="Last Name..."
                  id="lastName"
                  value={input.lastName}
                  className={
                    error.lastName == ""
                      ? "outline-none border border-blue rounded py-1 px-2"
                      : "outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onInput={(e) => handleChangeLastName(e)}
                />
                <p className="text-red-500">{error.lastName}</p>
              </div>
            </div>
            <div className="gap-10 flex mt-4">
              <div>
                <label htmlFor="phone">Phone number</label>
                <input
                  type="text"
                  placeholder="Phone start with 0..."
                  id="phone"
                  value={input.phoneNumber}
                  className={
                    error.phoneNumber == ""
                      ? "outline-none border border-blue rounded py-1 px-2"
                      : "outline-none border border-red-500 rounded py-1 px-2"
                  }
                  onInput={(e) => handlePhoneNumber(e)}
                />
                <p className="text-red-500">{error.phoneNumber}</p>
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
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
            <div className="gap-2 flex mt-4">
              <label htmlFor="date">Date of birth:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={input.dateOfBirth}
                onChange={handleDateChange}
              />
              <p className="text-red-500">{error.dateOfBirth}</p>
            </div>
            <div className="gap-2 flex mt-4">
              <label htmlFor="idCard">ID Card:</label>
              <input
                type="text"
                id="idCard"
                placeholder="ID Card Number..."
                name="idCard"
                value={input.idCard}
                className={
                  error.idCard == ""
                    ? "outline-none border border-blue rounded py-1 px-2"
                    : "outline-none border border-red-500 rounded py-1 px-2"
                }
                onChange={handleIdCardChange}
              />
              <p className="text-red-500">{error.idCard}</p>
            </div>
            <div className="gap-10 flex mt-4">
              <label htmlFor="provinces">City/Province</label>
              <Select
                type="provinces"
                setValue={(value) => {
                  setProvince(value);
                }}
                options={provinces}
              />
            </div>

            <div className="gap-10 flex mt-4">
              <label htmlFor="districts">Ward/District</label>
              <Select
                type="districts"
                setValue={(value) => setDistrict(value)}
                options={districts}
              />
            </div>

            <div className="gap-10 flex mt-4">
              <label htmlFor="villages">Town/Village</label>
              <Select
                type="villages"
                setValue={(value) => setVillage(value)}
                options={villages}
              />
            </div>

            <div className="gap-10 flex mt-4">
              <label htmlFor="address">Home address</label>
              <input
                type="text"
                placeholder="Address..."
                id="address"
                value={input.address}
                className={
                  error.address == ""
                    ? "outline-none border border-blue rounded py-1 px-2"
                    : "outline-none border border-red-500 rounded py-1 px-2"
                }
                onInput={(e) => handleHomeAddress(e)}
              />
              <p className="text-red-500">{error.address}</p>
            </div>

            <button
              onClick={() => {
                setDisplay(!display);
              }}
              className="mt-2 py-2 px-3 bg-slate-500 rounded"
            >
              Previous
            </button>

            <button
              type="submit"
              // onClick={() => handleRegister}
              className="mt-2 py-2 px-3 bg-slate-500 rounded"
            >
              Register
            </button>
          </div>
        )}
      </form>
      <div className="py-2">
        Already have an account?
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
