import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import debounce from "../../utils/debounce";
import { getDDMMYY, reverseDDMMYY } from "../../utils/convertDatetime";

const placeList = [
  {
    id: "SAIGON",
    name: "Ho Chi Minh city",
    code: "SG",
  },
  {
    id: "ANGIANG",
    name: "An Giang province",
    code: "AG",
  },
  {
    id: "CANTHO",
    name: "Can Tho city",
    code: "CT",
  },
  {
    id: "BENTRE",
    name: "Ben Tre",
    code: "BT",
  },
  {
    id: "DANANG",
    name: "Da Nang city",
    code: "DN",
  },
  {
    id: "DALAT",
    name: "Da Lat city",
    code: "DL",
  },
];

const SearchTrip = (props) => {
  const navigate = useNavigate();

  const [departureList, setDepartureList] = useState(placeList);
  const [departure, setDeparture] = useState(props.from || "");

  const [destinationList, setDestinationList] = useState(placeList);
  const [destination, setDestination] = useState(props.to || "");

  const [startDate, setStartDate] = useState(
    props.date ? reverseDDMMYY(props.date) : new Date()
  );

  const handleExchange = debounce(() => {
    if (
      departure !== "" &&
      !departure.includes("From Departure") &&
      destination !== "" &&
      !destination.includes("To Destination")
    ) {
      let temp = destination;
      setDestination(departure);
      setDeparture(temp);
    } else {
      toast.info("Please select proper information!");
    }
  }, 1000);

  const handleSearchTrip = debounce(() => {
    if (!departure && departure.includes("From Departure")) {
      toast.info("Please select a departure point!");
      return;
    } else if (!destination || destination.includes("To Destination")) {
      toast.info("Please select a destination point!");
      return;
    }

    const params = {
      departureId: departure,
      destinationId: destination,
      date: getDDMMYY(startDate),
    };

    navigate(`/trips?${new URLSearchParams(params).toString()}`);
  }, 3000);

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div
        className="flex justify-between border-b p-2.5 py-3 my-4"
        onClick={props.onClick}
      >
        <label onClick={props.onClick} ref={ref}>
          {props.value || props.placeholder}
        </label>
        <Icon
          icon="mdi:calendar-time"
          color="#414242"
          width="24"
          height="24"
          onClick={props.onClick}
        />
      </div>
    );
  });

  useEffect(() => {
    if (departure) {
      const newList = [...placeList];
      setDestinationList(newList.filter((item) => item.code !== departure));
    }

    if (destination) {
      const newList = [...placeList];
      setDepartureList(newList.filter((item) => item.code !== destination));
    }

    if (props.date) {
      setStartDate(reverseDDMMYY(props.date));
    }
  }, [departure, destination, props]);

  return (
    <div className="flex items-center bg-white rounded-lg px-[29px] ] py-4 justify-center">
      <div className="">
        <select
          id="countries"
          className="w-[263px] border-b font-Ballo text-gray-700 text-base outline-none focus:ring-gray-800 focus:border-gray-900 block p-2.5 py-3 my-4"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        >
          <option value="">From Departure</option>
          {departureList?.map((item) => (
            <option
              key={item.id}
              value={item.code}
              className="text-base py-2 transition-all ease-in duration-100"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <Icon
        icon="uil:exchange-alt"
        color="#414242"
        width="40"
        height="40"
        className="p-[0.5rem] rounded-full hover:bg-gray-200 transition-all ease-in duration-200  cursor-pointer"
        onClick={handleExchange}
      />
      <div>
        <select
          id="countries"
          className="w-[263px] border-b font-Ballo text-gray-700 text-base outline-none focus:ring-gray-800 focus:border-gray-900 block p-2.5 py-3 my-4"
          value={destination}
          onChange={(e) => setDestination(e.currentTarget.value)}
        >
          <option value="">To Destination</option>
          {destinationList?.map((item) => (
            <option key={item.id} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mx-4">
        <DatePicker
          className="font-Ballo text-gray-700 text-base"
          showIcon
          selected={reverseDDMMYY(startDate)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInput />}
        />
      </div>
      <button
        onClick={handleSearchTrip}
        className="text-white font-Ballo bg-btnRed text-[20px] rounded-lg py-3 px-4"
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchTrip;
