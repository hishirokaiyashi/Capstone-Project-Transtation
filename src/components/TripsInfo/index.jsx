import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setTripInfo, setUserInfo, setPoints } from "../../redux/order.slice";
import { Icon } from "@iconify/react";
import { substractHHMMToHour } from "../../utils/convertDatetime";
import { addDot, removeDot } from "../../utils/currencyFormat";
import { toast } from "react-toastify";
import { getSeatsFromTripId } from "../../firebase/firestore";
import {
  validateEmail,
  validateFirstName,
  validatePhoneNumber,
  validateAddress,
} from "../../utils/validation";

import TripSeat from "../TripSeat";
import TripsPoint from "../TripsPoint";
// import TripInput from "../TripInput";
import TripInput from "../TripInput";
const TripsInfo = ({ tripInfo, route }) => {
  // selectedSeats
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [seats, setSeats] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openMore, setOpenMore] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [input, setInput] = useState({
    fullName: user.displayName || "",
    phoneNumber: user.phoneNumber || "",
    email: user.email || "",
    note: "",
    // transitFrom: "",
    // transitTo: "",
    // address:
    //   (user.address && user.address.home ? user.address.home + ", " : "") +
    //   (user.address && user.address.village && user.address.village.name + ", "
    //     ? user.address.village.name
    //     : "") +
    //   (user.address && user.address.district && user.address.district.name
    //     ? user.address.district.name
    //     : ""),
  });

  const [error, setError] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  // const [isTransit, setIsTransit] = useState(false);
  const handleChangeFirstName = useCallback(
    (e) => {
      if (e.currentTarget.value === "") {
        setError({ ...error, fullName: "Full name cannot be empty" });
      } else {
        if (e.currentTarget.value.length > 40) {
          setError({
            ...error,
            fullName: "Full name cannot be longer than 40 characters",
          });
        } else if (!validateFirstName(e.currentTarget.value)) {
          setError({
            ...error,
            fullName: "Full name is invalid ",
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

  const handleChangeNote = useCallback(
    (e) => {
      setInput({ ...input, note: e.target.value });
    },
    [input]
  );

  // const handleTransitFrom = useCallback(
  //   (e) => {
  //     if (e.currentTarget.value === "") {
  //       setError({ ...error, transitFrom: "Transit from cannot be empty" });
  //     } else {
  //       setError({ ...error, transitFrom: "" });
  //     }
  //     setInput({ ...input, transitFrom: e.target.value });
  //   },
  //   [error, input]
  // );

  // const handleTransitTo = useCallback(
  //   (e) => {
  //     if (e.currentTarget.value === "") {
  //       setError({ ...error, transitTo: "Transit to cannot be empty" });
  //     } else {
  //       setError({ ...error, transitTo: "" });
  //     }
  //     setInput({ ...input, transitTo: e.target.value });
  //   },
  //   [error, input]
  // );
  // const handleHomeAddress = useCallback(
  //   (e) => {
  //     switch (true) {
  //       case e.currentTarget.value === "":
  //         setError({ ...error, address: "Address cannot be empty" });
  //         break;
  //       case e.currentTarget.value.length < 5:
  //         setError({
  //           ...error,
  //           address: "Address is too short! Please try again ",
  //         });
  //         break;
  //       case e.currentTarget.value.length > 100:
  //         setError({
  //           ...error,
  //           address: "Address is too long! Please try again ",
  //         });
  //         break;
  //       case !validateAddress(e.currentTarget.value):
  //         setError({
  //           ...error,
  //           address: "Address is invalid ",
  //         });
  //         break;
  //       default:
  //         setError({ ...error, address: "" });
  //         break;
  //     }
  //     const home = e.target.value;
  //     setInput({ ...input, address: home });
  //   },
  //   [error, input]
  // );

  useEffect(() => {
    if (openMore) {
      const unsubscribe = getSeatsFromTripId(tripInfo.uid, (data) => {
        setSeats(data);
      });
      return unsubscribe;
    }
  }, [tripInfo, openMore]);

  useEffect(() => {
    if (selectedSeats.length !== 0 && selectedSeats.length !== 0) {
      const availableSeats = seats
        ?.filter((seat) => seat.status !== "Available")
        .map((seat) => seat.id);
      // ["A03":unavailable, "A04", "A05", "A06", "A07": unavailable, "A08", "A09]
      // ["A03","A07"]

      const filteredSeats = selectedSeats.filter(
        (seat) => !availableSeats.includes(seat)
      );
      // selectedSeats ["A03","A04","A05"]
      // filteredSeats ["A04","A05"]

      if (filteredSeats.length !== 0) {
        if (filteredSeats.length !== selectedSeats.length) {
          toast.info(
            `The following seats are already taken: ${selectedSeats
              .filter((seat) => !filteredSeats.includes(seat))
              .join(", ")}`
          );
          // console.log(filteredSeats);
          setSelectedSeats(filteredSeats);
        }
      }
    }
  }, [seats, selectedSeats]);

  const handleQuanitySeats = (selectedSeats) => {
    setSelectedSeats((prevSeats) => {
      const selectedSeatIds = selectedSeats.map((seat) => seat.id);
      return selectedSeatIds;
    });
  };

  const handleTabClick = (index) => {
    if (selectedSeats != 0) {
      const selectedTrip = {
        trip_id: tripInfo.uid,
        seats: selectedSeats,
        ticketPrice: tripInfo.ticketPrice,
      };
      dispatch(setTripInfo(selectedTrip));
      dispatch(
        setPoints({
          pickUp: route.pickUps[0],
          final: route.finals[0],
        })
      );
      setActiveTabIndex(index);
    } else {
      toast.info("You must select at least one seat!");
    }
  };

  const handleContinueForm = (e) => {
    e.preventDefault();
    const errors = Object.fromEntries(
      Object.entries(error).filter(([key, value]) => {
        return (
          [
            "fullName",
            "phoneNumber",
            "email",
            // "transitFrom",
            // "transitTo",
            // "address",
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
    const { fullName, phoneNumber, email, transitFrom, transitTo, address } =
      input;
    if (fullName == "") {
      setError({ ...error, fullName: "FullName cannot be empty" });
      document.getElementById("FullName").focus();
      return;
    } else if (phoneNumber == "") {
      setError({ ...error, phoneNumber: "Phone number cannot be empty" });
      document.getElementById("PhoneNumber").focus();
      return;
    } else if (email == "") {
      setError({ ...error, email: "Email cannot be empty" });
      document.getElementById("Email").focus();
      return;
    }
    // else if (address == "") {
    //   setError({ ...error, address: "Address cannot be empty" });
    //   document.getElementById("Address").focus();
    //   return;
    // }
    // if (isTransit) {
    //   if (transitFrom == "") {
    //     setError({ ...error, transitFrom: "transitFrom cannot be empty" });
    //     document.getElementById("transitFrom").focus();
    //     return;
    //   } else if (transitTo == "") {
    //     setError({ ...error, transitTo: "transitTo cannot be empty" });
    //     document.getElementById("transitTo").focus();
    //     return;
    //   }
    // }
    dispatch(
      setUserInfo({
        user_id: user.uid,
        email: input.email,
        address: input.address,
        displayName: input.fullName,
        note: input.note,
        // transitFrom: input.transitFrom,
        // transitTo: input.transitTo,
        // phoneNumber: input.phoneNumber,
      })
    );
    navigate("/test");
  };

  return (
    <div className="mb-[40px] ">
      <div className="flex pb-[10px] border-b-2 border-dashed bg-white">
        <img
          src={
            tripInfo.type === "Bed"
              ? "/src/assets/images/Trips/Bed-Bus.png"
              : "/src/assets/images/Trips/Seat-Bus.png"
          }
          alt=""
          className="w-[30%] h-[230px] object-cover"
        />
        <div className="pl-[35px] pt-[12px] w-[70%] pr-[18px]">
          <div className="flex justify-between">
            <p className="pt-[16px] font-Ballo text-[1.5rem] font-bold text-[#535354]">
              Luxury {tripInfo.type} Bus - {tripInfo.totalSeats} seats
            </p>
            <p className="text-[0.625rem] text-my-text-gray-third font-Ballo">
              Trip ID: {tripInfo.uid}
            </p>
          </div>
          <div className="flex justify-between pt-[30px]">
            <div className=" w-3/6">
              <div className="flex items-center justify-between pb-[10px]">
                <p className="text-[2rem] font-Ballo">
                  {tripInfo.departureTime}
                </p>
                <div className="border w-[50px] h-0"></div>
                <p className="text-[0.8125rem] text-my-text-gray-third">
                  {route?.startPoint},
                  <br />
                  {route?.direction.split(" - ")[0]}
                </p>
              </div>
              <div className="flex items-center">
                <div className="border w-0 h-[30px]"></div>
                <p className="text-[0.6875rem] text-my-text-gray-third pl-[4px]">
                  {substractHHMMToHour(
                    tripInfo.departureTime,
                    tripInfo.arrivalTime
                  )}
                  hr(s)
                </p>
              </div>
              <div className="flex items-center justify-between pt-[10px]">
                <p className="text-[2rem] font-Ballo">{tripInfo.arrivalTime}</p>
                <div className="border w-[50px] h-0"></div>
                <p className="text-[0.8125rem] text-my-text-gray-third">
                  {route?.endPoint},
                  <br />
                  {route?.direction.split(" - ")[1]}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between w-3/6">
              <p className="text-right text-[2.375rem] text-[#F07272] font-semibold">
                {addDot(tripInfo?.ticketPrice)}
              </p>
              <div className="flex justify-between pl-[38px]">
                <div className="w-[50%]">
                  <p className="text-[1.25rem] font-Ballo text-my-text-gray-second font-semibold">
                    {/* {seats?.filter((seat) => seat.status == "Available").length}{" "} */}
                    {tripInfo.availableSeats} seats left
                  </p>
                  <Link className="text-[0.75rem] w-full text-[#1D7ED8] underline underline-offset-2">
                    View more trip details
                  </Link>
                </div>
                {openMore === false ? (
                  <button
                    className="px-[10px] py-[12px] bg-[#000] text-white text-[1rem] font-Ballo w-[40%]"
                    onClick={() => {
                      setOpenMore(true);
                    }}
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    className="px-[10px] py-[12px] bg-[#000] text-white text-[1rem] font-Ballo w-[40%]"
                    onClick={() => {
                      setOpenMore(false);
                    }}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openMore && (
        <div className=" pt-[40px] px-[20px] bg-white">
          <div className="relative w-full">
            <div className="absolute left-[10%] top-[-8px]  flex items-center flex-col z-[2]">
              <p
                className={`pr-[10px] rounded-full w-[20px] h-[20px] ${
                  activeTabIndex === 0 ? "bg-red-500" : "bg-[#C0BEBE]"
                } mb-[7px]`}
              ></p>
              <p className="text-[#6A6A6B] text-[1.25rem] font-Ballo">
                Seat booking
              </p>
            </div>
            <div className="absolute top-[-8px]  left-[40%] flex items-center flex-col z-[2]">
              <p
                className={`pr-[10px] rounded-full w-[20px] h-[20px] ${
                  activeTabIndex === 1 ? "bg-red-500" : "bg-[#C0BEBE]"
                } mb-[7px]`}
              ></p>
              <p className="text-[#6A6A6B] text-[1.25rem] font-Ballo">
                Pick up and drop off
              </p>
            </div>
            <div className="absolute top-[-8px] left-[80%] flex items-center flex-col z-[2]">
              <p
                className={`pr-[10px] rounded-full w-[20px] h-[20px] ${
                  activeTabIndex === 2 ? "bg-red-500" : "bg-[#C0BEBE]"
                } mb-[7px]`}
              ></p>
              <p className="text-[#6A6A6B] text-[1.25rem] font-Ballo">
                Enter information
              </p>
            </div>
            <div className="absolute border-t-4 w-full border-[#7A7474] top-[30%] z-[0]"></div>
            <span
              className="text-[1rem] absolute right-[-10px] top-[-30px] cursor-pointer "
              onClick={() => {
                setOpenMore(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
              >
                <path
                  fill="red"
                  d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Z"
                />
              </svg>
            </span>
          </div>
          <div className={activeTabIndex === 0 ? "block" : "hidden"}>
            <div className="pt-[50px] pb-[20px] flex justify-center border-b-2">
              <TripSeat
                typeSeat={tripInfo.type}
                seats={seats}
                handleQuanitySeats={handleQuanitySeats}
              />
            </div>
            <div className="flex justify-between items-center py-[10px]">
              <div>
                <span>Seats: </span>
                {selectedSeats.map((seat, index) => {
                  return <span key={index}>{seat}, </span>;
                })}
              </div>
              <div className="flex gap-[10px] items-center  text-[1.6875rem] text-[#1F83DF]">
                <p>Total: </p>
                <p>{addDot(selectedSeats?.length * tripInfo.ticketPrice)}</p>
                <button
                  className="px-[16px] py-[16px] bg-[#E04141] text-white  text-[1.25rem]"
                  onClick={() => handleTabClick(1)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              activeTabIndex === 1 ? "block pt-[50px] pb-[20px]" : "hidden"
            }
          >
            <div className="flex pt-[40px] pb-[44px] border-b-2 border-dashed">
              <div className="w-[50%] border-r-2 px-[46px]">
                <div className="text-[1.5rem] font-semibold text-center mb-[30px]">
                  Pick up point
                </div>
                <TripsPoint
                  type="pickUps"
                  pickUpsPoint={route?.pickUps}
                  finalsPoint={route?.finals}
                  arrivalTime={tripInfo?.arrivalTime}
                  departureTime={tripInfo?.departureTime}
                />
              </div>
              <div className="w-[50%] px-[46px]">
                <div className="text-[1.5rem] font-semibold text-center mb-[30px]">
                  Pay point
                </div>
                <TripsPoint
                  type="finals"
                  finalsPoint={route?.finals}
                  pickUpsPoint={route?.pickUps}
                  arrivalTime={tripInfo?.arrivalTime}
                  departureTime={tripInfo?.departureTime}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-[16px] pb-[8px]">
              <button
                className="flex items-center justify-center px-[15px] text-center"
                onClick={() => handleTabClick(0)}
              >
                <span className="px-[36px] py-[16px] bg-[#C0BEBE] text-white text-[1.25rem]">
                  BACK
                </span>
              </button>
              <div className="flex gap-[10px] items-center text-[1.6875rem] text-[#1F83DF]">
                <p>Total: </p>
                <p>{addDot(selectedSeats?.length * tripInfo.ticketPrice)}</p>
                <button
                  onClick={() => handleTabClick(2)}
                  className="px-[36px] py-[16px] bg-[#E04141] text-white text-[1.25rem]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              activeTabIndex === 2
                ? "pt-[50px] pb-[20px] flex flex-col"
                : "hidden"
            }
          >
            <form
              action=""
              className="flex flex-col justify-center items-center w-[400px] m-auto"
            >
              <TripInput
                label="Full name"
                id="FullName"
                type="text"
                placeholder="Your full name"
                value={input.fullName}
                error={error.fullName}
                onChange={handleChangeFirstName}
                required
              />
              <TripInput
                label="Phone number"
                id="PhoneNumber"
                type="text"
                placeholder="Your Phone number"
                value={input.phoneNumber}
                error={error.phoneNumber}
                onChange={handlePhoneNumber}
                required
              />
              <TripInput
                label="Email"
                id="Email"
                type="text"
                placeholder="Your Email"
                value={input.email}
                error={error.email}
                onChange={handleChangeEmail}
                required
              />
              <div className="flex flex-col justify-center mt-[10px] w-[400px] m-auto">
                <label htmlFor="Note" className="text-[1rem] font-semibold">
                  Note
                </label>
                <input
                  id="Note"
                  type="text"
                  placeholder=""
                  className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
                  value={input.note}
                  onChange={handleChangeNote}
                />
              </div>
              {/* <TripInput
                label="Address"
                id="Address"
                type="text"
                placeholder="Your Address"
                value={input.address}
                error={error.address}
                onChange={handleHomeAddress}
                required
              /> */}
              {/* <div className="flex w-full mt-[12px]">
                <input
                  type="checkbox"
                  className="cursor-pointer mr-[5px]"
                  checked={isTransit}
                  onChange={(e) => setIsTransit(e.target.checked)}
                />
                <span>Transit(optional)</span>
              </div>
              {isTransit && (
                <>
                  <TripInput
                    label="Transit From"
                    id="TransitFrom"
                    type="text"
                    placeholder="Transit from..."
                    value={input.transitFrom}
                    error={error.transitFrom}
                    onChange={handleTransitFrom}
                    required
                  />
                  <TripInput
                    label="Transit To"
                    id="transitTo"
                    type="text"
                    placeholder="Transit to..."
                    value={input.transitTo}
                    error={error.transitTo}
                    onChange={handleTransitTo}
                    required
                  />
                </>
              )} */}
            </form>
            <div className="flex justify-between items-center pt-[16px] pb-[8px]">
              <button
                className="flex items-center justify-center  text-center"
                onClick={() => handleTabClick(1)}
              >
                <span className="px-[36px] py-[16px] bg-[#C0BEBE] text-white">
                  Back
                </span>
              </button>
              <div className="flex gap-[10px] items-center  text-[1.6875rem] text-[#1F83DF]">
                <p>Total: </p>
                <p>{addDot(selectedSeats?.length * tripInfo.ticketPrice)}</p>
                <button
                  onClick={handleContinueForm}
                  className="px-[16px] py-[16px] bg-[#E04141] text-white text-[1.25rem]"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsInfo;
