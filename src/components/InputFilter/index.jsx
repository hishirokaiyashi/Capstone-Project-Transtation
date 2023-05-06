import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortTrips,
  changeCategory,
  changeDeparture,
  changeArrival,
  setFilter,
} from "../../redux/trips.slice";

const InputFilter = ({ name }) => {
  const dispatch = useDispatch();
  const { sort, category, departures, arrivals } = useSelector(
    (state) => state.trips
  );

  useEffect(() => {
    dispatch(setFilter());
  }, [sort, category, departures, arrivals]);

  const sortType = [
    "Earliest Arrival",
    "Latest Arrival",
    "Cheapest Price",
    "Highest Price",
  ];

  const categoriesType = [
    {
      id: 1,
      type: "Bed",
      name: "Sleeper Bus",
    },
    {
      id: 2,
      type: "Seat",
      name: "45 Seater Bus",
    },
  ];

  const departureTimeType = [
    "1:00 - 5:00",
    "5:00 -  11:00",
    "13:00 - 16:00",
    "16:00 - 23:00",
  ];

  const arrivalTimeType = [
    "1:00 - 5:00",
    "5:00 -  11:00",
    "13:00 - 16:00",
    "16:00 - 23:00",
  ];

  return (
    <>
      {name === "SORT" && (
        <>
          <div className="flex justify-between border-b-2 p-[20px] pl-0">
            <span className="text-[#6A6A6B] font-semibold font-Ballo text-[1rem] tracking-wide">
              SORT BY
            </span>
            <span className="text-[#6A6A6B] text-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 14.975q-.2 0-.388-.075t-.312-.2l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
                />
              </svg>
            </span>
          </div>
          {sortType?.map((item, index) => {
            return (
              <div
                key={index + item}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="radio"
                  name="sortType"
                  id={item}
                  className="w-[13px] h-[13px] mr-[12px]"
                  value={item}
                  checked={sort ? sort === item : false}
                  onChange={(e) => dispatch(sortTrips(e.target.value))}
                />
                <label htmlFor={item} className="text-[1rem] cursor-pointer">
                  {item}
                </label>
              </div>
            );
          })}
        </>
      )}
      {name === "CATEGORIES" && (
        <div className="mt-[25px]">
          <div className="flex justify-between border-b-2 p-[20px] pl-0 ">
            <span className="text-[#6A6A6B] font-semibold font-Ballo text-[1rem] tracking-wide">
              CATEGORIES
            </span>
            <span className="text-[#6A6A6B] text-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 14.975q-.2 0-.388-.075t-.312-.2l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
                />
              </svg>
            </span>
          </div>
          {categoriesType?.map((item) => {
            return (
              <div
                key={item.type}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="radio"
                  name="categoriesType"
                  id={item.name}
                  checked={category ? category === item.type : false}
                  value={item.type}
                  className="w-[13px] h-[13px] mr-[12px]"
                  onChange={(e) => dispatch(changeCategory(e.target.value))}
                />
                <label
                  htmlFor={item.name}
                  className="text-[1rem] cursor-pointer"
                >
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      )}
      {name === "DEPARTURE TIME" && (
        <div className="mt-[25px]">
          <div className="flex justify-between border-b-2 p-[20px] pl-0">
            <span className="text-[#6A6A6B] font-semibold font-Ballo text-[1rem] tracking-wide">
              DEPARTURE TIME
            </span>
            <span className="text-[#6A6A6B] text-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 14.975q-.2 0-.388-.075t-.312-.2l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
                />
              </svg>
            </span>
          </div>
          {departureTimeType?.map((item, index) => {
            return (
              <div
                key={item + index}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="checkbox"
                  name="departureTimeType"
                  id={item + "departure"}
                  className="w-[13px] h-[13px] mr-[12px]"
                  value={item}
                  checked={departures.includes(item) ? true : false}
                  onChange={(e) => dispatch(changeDeparture(e.target.value))}
                />
                <label
                  htmlFor={item + "departure"}
                  className="text-[1rem] cursor-pointer"
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      )}
      {name === "ARRIVAL TIME" && (
        <div className="mt-[25px]">
          <div className="flex justify-between border-b-2 p-[20px] pl-0">
            <span className="text-[#6A6A6B] font-semibold font-Ballo text-[1rem] tracking-wide">
              ARRIVAL TIME
            </span>
            <span className="text-[#6A6A6B] text-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 14.975q-.2 0-.388-.075t-.312-.2l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
                />
              </svg>
            </span>
          </div>
          {arrivalTimeType?.map((item, index) => {
            return (
              <div
                key={index + item}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="checkbox"
                  name="arrivalTimeType"
                  id={item + "arrival"}
                  className="w-[13px] h-[13px] mr-[12px]"
                  value={item}
                  checked={arrivals.includes(item) ? true : false}
                  onChange={(e) => dispatch(changeArrival(e.target.value))}
                />
                <label
                  htmlFor={item + "arrival"}
                  className="text-[1rem] cursor-pointer"
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default InputFilter;
