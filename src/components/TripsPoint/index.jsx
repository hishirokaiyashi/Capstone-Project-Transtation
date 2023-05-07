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
      const selectedValue = event.target.value;
      setSelectedPickUpPoint(selectedValue);
      const selectedPickUp = pickUpsPoint.find(
        (point) => point.location === selectedValue
      );
      dispatch(
        setPickUpPoints({
          location: selectedPickUp.location,
          time: selectedPickUp.time.find((item) =>
            checkBetweenTwoHours(departureTime, 1, item, null)
          ),
          name: selectedPickUp.name,
        })
      );
    };
    // Set default value for pickUp if selectedPickUpPoint has not been set
    if (!selectedPickUpPoint && pickUpsPoint && pickUpsPoint.length > 0) {
      const selectedPickUp = pickUpsPoint[0];
      dispatch(
        setPickUpPoints({
          location: selectedPickUp.location,
          time: selectedPickUp.time[0],
          name: selectedPickUp.name,
        })
      );
    }
    return pickUpsPoint?.map((point, index) => {
      return (
        <div
          htmlFor={point.id}
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
                  checkBetweenTwoHours(departureTime, 1, item, null)
                )}
                - {point.location}
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
      const selectedValue = event.target.value;
      setSelectedFinalPoint(selectedValue);
      const selectedFinal = finalsPoint.find(
        (point) => point.location === selectedValue
      );
      dispatch(
        setFinalPoints({
          location: selectedFinal.location,
          time: selectedFinal.time.find((item) =>
            checkBetweenTwoHours(arrivalTime, -1, item, null)
          ),
          name: selectedFinal.name,
        })
      );
    };
    return finalsPoint?.map((point, index) => {
      return (
        <div
          htmlFor={point.id}
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
                  checkBetweenTwoHours(arrivalTime, -1, item, null)
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
