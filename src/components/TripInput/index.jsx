import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/order.slice";

const TripInp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [input, setInput] = useState({
    fullName: user.displayName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    transitFrom: "",
    transitTo: "",
  });

  const [error, setError] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    transitFrom: "",
    transitTo: "",
  });

  const [isTransit, setIsTransit] = useState(false);

  const handleChangeFirstName = useCallback(
    (e) => {
      if (e.currentTarget.value === "") {
        setError({ ...error, fullName: "Full name cannot be empty" });
      } else {
        if (e.currentTarget.value.length > 40) {
          setError({
            ...error,
            fullName: "First name cannot be longer than 40 characters",
          });
        } else if (!validateFirstName(e.currentTarget.value)) {
          setError({
            ...error,
            fullName: "First name is invalid ",
          });
        } else setError({ ...error, fullName: "" });
      }
      setInput({ ...input, fullName: e.target.value });
    },
    [error, input]
  );

  const handleChangeEmail = useCallback(
    (e) => {
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
    },
    [error, input]
  );

  const handlePhoneNumber = useCallback(
    (e) => {
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
    },
    [error, input]
  );

  const handleTransitFrom = useCallback(
    (e) => {
      if (e.currentTarget.value === "") {
        setError({ ...error, transitFrom: "TransitFrom cannot be empty" });
      } else {
        setError({ ...error, transitFrom: "" });
      }
      setInput({ ...input, transitFrom: e.target.value });
    },
    [error, input]
  );

  const handleTransitTo = useCallback(
    (e) => {
      if (e.currentTarget.value === "") {
        setError({ ...error, transitFrom: "TransitFrom cannot be empty" });
      } else {
        setError({ ...error, transitFrom: "" });
      }
      setInput({ ...input, transitTo: e.target.value });
    },
    [error, input]
  );

  return (
    <form className="flex flex-col justify-center items-center w-[400px] m-auto">
      <div className="flex flex-col w-full">
        <label htmlFor="FullName" className="text-[1rem] font-semibold">
          Full name
          <span className="text-red-500"> *</span>
        </label>
        <input
          id="FullName"
          type="text"
          placeholder="Your full name"
          value={input.fullName}
          onInput={(e) => {
            handleChangeFirstName(e);
          }}
          className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
        />
        <p className="text-red-500 mt-[2px]">{error.fullName}</p>
      </div>
      <div className="flex flex-col w-full mt-[12px]">
        <label htmlFor="PhoneNumber" className="text-[1rem] font-semibold">
          Phone number
          <span className="text-red-500"> *</span>
        </label>
        <input
          id="PhoneNumber"
          type="text"
          placeholder="Your Phone number"
          className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
          value={input.phoneNumber}
          onInput={(e) => {
            handlePhoneNumber(e);
          }}
        />
        <p className="text-red-500 mt-[2px]">{error.phoneNumber}</p>
      </div>
      <div className="flex flex-col w-full mt-[12px]">
        <label htmlFor="Email" className="text-[1rem] font-semibold">
          Email
          <span className="text-red-500 "> *</span>
        </label>
        <input
          id="Email"
          type="text"
          placeholder="Your Email"
          className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
          value={input.email}
          onInput={(e) => {
            handleChangeEmail(e);
          }}
        />
        <p className="text-red-500 mt-[2px]">{error.email}</p>
      </div>
      <div className="flex w-full mt-[12px]">
        <input
          type="checkbox"
          className="cursor-pointer mr-[5px]"
          checked={isTransit}
          onChange={(e) => setIsTransit(e.target.checked)}
        />
        <span>Transit(optional)</span>
      </div>
      {isTransit && (
        <div className="flex flex-col w-full mt-[12px]">
          <div className="flex flex-col w-full mt-[12px]">
            <label htmlFor="Transit" className="text-[1rem] font-semibold">
              Transit from
              <span className="text-red-500 "> *</span>
            </label>
            <input
              id="Transit"
              type="text"
              placeholder="Transit from..."
              className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
              value={input.transitFrom}
              onInput={(e) => {
                handleTransitFrom;
              }}
            />
            <p className="text-red-500 mt-[2px]">{error.transitFrom}</p>
          </div>
          <div className="flex flex-col w-full mt-[12px]">
            <label htmlFor="transitTo" className="text-[1rem] font-semibold">
              Transit to
              <span className="text-red-500 "> *</span>
            </label>
            <input
              id="transitTo"
              type="text"
              placeholder="Transit to..."
              className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
              value={input.transitTo}
              onInput={(e) => {
                handleTransitTo;
              }}
            />
            <p className="text-red-500 mt-[2px]">{error.transitTo}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default TripForm;
