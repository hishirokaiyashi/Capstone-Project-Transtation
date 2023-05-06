import React from "react";
import MultiRangeSlider from "../components/Slider";
import MainLayout from "../layouts/MainLayout";

const Payment = () => {
  return (
    <div className="mt-[50px]">
      <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
    </div>
  );
};

export default Payment;
