import React, { useCallback, useEffect, useState, useRef } from "react";

const MultiRangeSlider = ({ min, max, onChange }) => {
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
  }, [minVal, maxVal, onChange]);

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
        // className="thumb z-[3]"
        className={`${
          minVal > max - 100 ? "z-[5]" : "z-[3]"
        } pointer-events-none absolute h-0 w-[200px] outline: none`}
        // style={{ zIndex: minVal > max - 100 && "5" }}
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
        // className="thumb z-[4]"
        className="pointer-events-none z-[4] absolute h-0 w-[200px] outline: none;"
      />

      <div
        //   className="slider"
        className="relative w-[200px]"
      >
        <div
          // className="slider__track"
          className="absolute h-[5px] rounded-[3px] bg-[#ced4da] w-full z-[1]"
        />
        <div
          ref={range}
          // className="slider__range"
          className="absolute h-[5px] rounded-[3px] bg-[#9fe5e1] z-[2]"
        />
        <div
          // className="slider__left-value"
          className="absolute text-[#dee2e6] text-xs mt-5 left-1.5"
        >
          {minVal}
        </div>
        <div
          // className="slider__right-value"
          className="absolute text-[#dee2e6] text-xs mt-5 -right-1"
        >
          {maxVal}
        </div>
      </div>
    </>
  );
};
export default MultiRangeSlider;
