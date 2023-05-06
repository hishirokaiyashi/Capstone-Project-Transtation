import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Slider.css";
import { addDot } from "../../utils/currencyFormat";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const { price } = useSelector((state) => state.trips);

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  // Reset price to the initial price
  useEffect(() => {
    if (price[0] == min && price[1] == max) {
      setMinVal(min);
      setMaxVal(max);
    }
  }, [price]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        // className="thumb thumb--left"
        className="thumb thumb--left pointer-events-none absolute h-0 w-[200px] z-[3] outline-none"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        // className="thumb thumb--right"
        className="thumb thumb--right pointer-events-none absolute h-0 w-[200px] z-[4]"
      />

      <div
        // className="slider"
        className="slider relative w-[200px]"
      >
        <div
          // className="slider__track"
          className="slider__track absolute h-[5px] rounded-[3px] bg-[#ced4da] w-full z-[1]"
        />
        <div
          ref={range}
          // className="slider__range"
          className="slider__range absolute bg-[#E04141] z-[2]"
        />
        <div
          // className="slider__left-value"
          className="slider__left-value text-[#000] text-xs mt-5 left-1.5"
        >
          {addDot(minVal)}
        </div>
        <div
          //  className="slider__right-value"
          className="slider__right-value text-[#000] text-xs mt-5 -right-1"
        >
          {addDot(maxVal)}
        </div>
      </div>
    </>
  );
};

export default MultiRangeSlider;
