import React from "react";

const TripInput = ({
  id,
  type,
  placeholder,
  label,
  required,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col justify-center mt-[10px] w-[400px] m-auto">
      <label htmlFor={id} className="text-[1rem] font-semibold">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 mt-[2px]">{error}</p>}
    </div>
  );
};

export default TripInput;
