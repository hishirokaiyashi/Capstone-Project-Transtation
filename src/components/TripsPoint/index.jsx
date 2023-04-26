import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPickUpPoints, setFinalPoints } from "../../redux/order.slice";
import { checkBetweenTwoHours } from "../../utils/convertDatetime";
const TripsPoint = ({
  type,
  pickUpsPoint,
  finalsPoint,
  arrivalTime,
  departureTime,
}) => {
  const dispatch = useDispatch();

  if (type === "pickUps") {
    const [selectedPickUpPoint, setSelectedPickUpPoint] = useState(
      pickUpsPoint ? pickUpsPoint[0].location : null
    );

    const handlePickUpPlaceChange = (event) => {
      setSelectedPickUpPoint(event.target.value);
      dispatch(setPickUpPoints(event.target.value));
    };
    // const returnTime = (time) => {
    //   checkBetweenTwoHours(departureTime,1,time);
    // };
    return pickUpsPoint.map((point, index) => {
      return (
        <div
          key={index}
          className={
            selectedPickUpPoint === point.location
              ? "p-[16px] border border-[#1D7ED8] mb-[12px] rounded-[8px] bg-my-blue cursor-pointer flex justify-center items-center"
              : "p-[16px] border mb-[12px] rounded-[8px] cursor-pointer flex justify-center items-center"
          }
        >
          <label htmlFor={point.id} className="flex cursor-pointer">
            <input
              type="radio"
              id={point.id}
              name="PickupPlace"
              value={point.location}
              checked={selectedPickUpPoint === point.location}
              className="cursor-pointer"
              onChange={handlePickUpPlaceChange}
            />
            <div className="pl-[12px]">
              <p className="text-[1rem] text-[#344054]">
                {point.time.find((item) =>
                  checkBetweenTwoHours(departureTime, 1, item)
                )}
                -{point.location}
              </p>
              <p
                className={
                  selectedPickUpPoint === point.location
                    ? "text-my-text-blue mt-[2px]"
                    : "text-[#667085] mt-[2px]"
                }
              >
                {point.name}
              </p>
            </div>
          </label>
          <br></br>
        </div>
      );
    });
  } else {
    const [selectedFinalPoint, setSelectedFinalPoint] = useState(
      finalsPoint ? finalsPoint[0].location : null
    );

    const handleFinalPlaceChange = (event) => {
      setSelectedFinalPoint(event.target.value);
      dispatch(setFinalPoints(event.target.value));
    };

    return finalsPoint.map((point, index) => {
      return (
        <div
          key={index}
          className={
            selectedFinalPoint === point.location
              ? "p-[16px] border border-[#1D7ED8] mb-[12px] rounded-[8px] bg-my-blue cursor-pointer flex justify-center items-center"
              : "p-[16px] border mb-[12px] rounded-[8px] cursor-pointer  flex justify-center items-center"
          }
        >
          <label htmlFor={point.id} className="flex cursor-pointer">
            <input
              type="radio"
              id={point.id}
              name="FinalPlace"
              value={point.location}
              checked={selectedFinalPoint === point.location}
              className="cursor-pointer"
              onChange={handleFinalPlaceChange}
            />
            <div className="pl-[12px]">
              <p className="text-[1rem] text-[#344054]">
                {point.time.find((item) =>
                  checkBetweenTwoHours(arrivalTime, -1, item)
                )}
                -{point.location}
              </p>
              <p
                className={
                  selectedFinalPoint === point.location
                    ? "text-my-text-blue mt-[2px]"
                    : "text-[#667085] mt-[2px]"
                }
              >
                {point.name}
              </p>
            </div>
          </label>
          <br></br>
        </div>
      );
    });
  }
};

export default TripsPoint;
