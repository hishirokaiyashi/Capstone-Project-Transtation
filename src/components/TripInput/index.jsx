import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/order.slice";

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
    // <form className="flex flex-col justify-center items-center w-[400px] m-auto">
    //   <div className="flex flex-col w-full">
    //     <label htmlFor="FullName" className="text-[1rem] font-semibold">
    //       Full name
    //       <span className="text-red-500"> *</span>
    //     </label>
    //     <input
    //       id="FullName"
    //       type="text"
    //       placeholder="Your full name"
    //       value={input.fullName}
    //       onInput={(e) => {
    //         handleChangeFirstName(e);
    //       }}
    //       className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
    //     />
    //     <p className="text-red-500 mt-[2px]">{error.fullName}</p>
    //   </div>
    //   <div className="flex flex-col w-full mt-[12px]">
    //     <label htmlFor="PhoneNumber" className="text-[1rem] font-semibold">
    //       Phone number
    //       <span className="text-red-500"> *</span>
    //     </label>
    //     <input
    //       id="PhoneNumber"
    //       type="text"
    //       placeholder="Your Phone number"
    //       className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
    //       value={input.phoneNumber}
    //       onInput={(e) => {
    //         handlePhoneNumber(e);
    //       }}
    //     />
    //     <p className="text-red-500 mt-[2px]">{error.phoneNumber}</p>
    //   </div>
    //   <div className="flex flex-col w-full mt-[12px]">
    //     <label htmlFor="Email" className="text-[1rem] font-semibold">
    //       Email
    //       <span className="text-red-500 "> *</span>
    //     </label>
    //     <input
    //       id="Email"
    //       type="text"
    //       placeholder="Your Email"
    //       className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
    //       value={input.email}
    //       onInput={(e) => {
    //         handleChangeEmail(e);
    //       }}
    //     />
    //     <p className="text-red-500 mt-[2px]">{error.email}</p>
    //   </div>
    //   <div className="flex w-full mt-[12px]">
    //     <input
    //       type="checkbox"
    //       className="cursor-pointer mr-[5px]"
    //       checked={isTransit}
    //       onChange={(e) => setIsTransit(e.target.checked)}
    //     />
    //     <span>Transit(optional)</span>
    //   </div>
    //   {isTransit && (
    //     <div className="flex flex-col w-full mt-[12px]">
    //       <div className="flex flex-col w-full mt-[12px]">
    //         <label htmlFor="Transit" className="text-[1rem] font-semibold">
    //           Transit from
    //           <span className="text-red-500 "> *</span>
    //         </label>
    //         <input
    //           id="Transit"
    //           type="text"
    //           placeholder="Transit from..."
    //           className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
    //           value={input.transitFrom}
    //           onInput={(e) => {
    //             handleTransitFrom;
    //           }}
    //         />
    //         <p className="text-red-500 mt-[2px]">{error.transitFrom}</p>
    //       </div>
    //       <div className="flex flex-col w-full mt-[12px]">
    //         <label htmlFor="transitTo" className="text-[1rem] font-semibold">
    //           Transit to
    //           <span className="text-red-500 "> *</span>
    //         </label>
    //         <input
    //           id="transitTo"
    //           type="text"
    //           placeholder="Transit to..."
    //           className="h-[38px] w-full outline-none border border-blue rounded py-1 px-3 mt-[3px]"
    //           value={input.transitTo}
    //           onInput={(e) => {
    //             handleTransitTo;
    //           }}
    //         />
    //         <p className="text-red-500 mt-[2px]">{error.transitTo}</p>
    //       </div>
    //     </div>
    //   )}
    // </form>
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
