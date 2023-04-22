import React from "react";

const InputFilter = ({ name }) => {
  const sortType = [
    "Earliest Arrival",
    "Latest Arrival",
    "Cheapest Price",
    "No Stop Midway",
  ];
  const categoriesType = ["Sleeper Bus", "45 Seater Bus"];
  const departureTimeType = [
    "1:00 - 5:00",
    "5:00 -  11:00",
    "13:00 - 16:00",
    "16:00 - 23:00",
  ];
  const pickUpType = [
    "Mega Market Vung Tau",
    "Thuy Duong Beach Station",
    "Lotte Mart Vung Tau",
    "Xom Luoi Market Station",
  ];
  return (
    <>
      {name === "SORT" && (
        <div>
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
                key={index}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="checkbox"
                  name={item}
                  id={item}
                  className="w-[13px] h-[13px] mr-[12px]"
                />
                <label htmlFor={item} className="text-[1rem]">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
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
          {categoriesType?.map((item, index) => {
            return (
              <div
                key={index}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="checkbox"
                  name={item}
                  id={item}
                  className="w-[13px] h-[13px] mr-[12px]"
                />
                <label htmlFor={item} className="text-[1rem]">
                  {item}
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
                key={index}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="checkbox"
                  name={item}
                  id={item}
                  className="w-[13px] h-[13px] mr-[12px]"
                />
                <label htmlFor={item} className="text-[1rem]">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      )}
      {name === "PICK UP POINT" && (
        <div className="mt-[25px]">
          <div className="flex justify-between border-b-2 p-[20px] pl-0">
            <span className="text-[#6A6A6B] font-semibold font-Ballo text-[1rem] tracking-wide">
              PICK UP POINT
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
          {pickUpType?.map((item, index) => {
            return (
              <div
                key={index}
                className="pl-[18px] pr-[63px] py-[10px] text-my-text-gray-third font-Ballo"
              >
                <input
                  type="checkbox"
                  name={item}
                  id={item}
                  className="w-[13px] h-[13px] mr-[12px]"
                />
                <label htmlFor={item} className="text-[1rem]">
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
