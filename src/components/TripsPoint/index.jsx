import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPickUpPoints, setFinalPoints } from "../../redux/order.slice";

const TripsPoint = ({ type, pickUpsPoint, finalsPoint }) => {
  const dispatch = useDispatch();

  if (type === "pickUps") {
    const [selectedPickUpPoint, setSelectedPickUpPoint] = useState(
      pickUpsPoint ? pickUpsPoint[0] : null
    );

    const handlePickUpPlaceChange = (event) => {
      setSelectedPickUpPoint(event.target.value);
      dispatch(setPickUpPoints(event.target.value));
    };

    return pickUpsPoint.map((point, index) => {
      return (
        <div key={index}>
          <label htmlFor={point} className="flex">
            <input
              type="radio"
              id={point}
              name="PickupPlace"
              value={point}
              checked={selectedPickUpPoint === point}
              className="cursor-pointer"
              onChange={handlePickUpPlaceChange}
            />
            <span className="px-[8px]">{point}</span>
          </label>
          <br></br>
        </div>
      );
    });
  } else {
    const [selectedFinalPoint, setSelectedFinalPoint] = useState(
      finalsPoint ? finalsPoint[0] : null
    );

    const handleFinalPlaceChange = (event) => {
      setSelectedFinalPoint(event.target.value);
      dispatch(setFinalPoints(event.target.value));
    };

    return finalsPoint.map((point, index) => {
      return (
        <div key={index}>
          <label htmlFor={point} className="flex">
            <input
              type="radio"
              id={point}
              name="FinalPlace"
              value={point}
              checked={selectedFinalPoint === point}
              className="cursor-pointer"
              onChange={handleFinalPlaceChange}
            />
            <span className="px-[8px]">{point}</span>
          </label>
          <br></br>
        </div>
      );
    });
  }
};

export default TripsPoint;
