import React, { useState } from "react";
import messagerIcon from "../../../assets/images/Message/Message-logo-icon.png";

const BoxChatIcon = ({ showPopUp, visible }) => {
  
  const [hovered, setHovered] = useState(false);
  const handleChangeOnClick = () => {
    showPopUp(!visible);
    setHovered(false);
  };
  return (
    <div className="fixed bottom-[10px] right-[10px]">
      <img
        src={messagerIcon}
        alt="messagerIcon"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleChangeOnClick}
        className="w-[60px] h-[60px] object-cover cursor-pointer rounded-full border-slate-200 border p-2"
      />
      <div
        className={`transition-all rounded duration-700 ease-in-out w-[130px] absolute right-[60px] bottom-[50px] z-10000 bg-[#606770] text-white p-2
           ${hovered ? " block " : "hidden"}`}
      >
        Hey, Can I Help You?
      </div>
    </div>
  );
};

export default BoxChatIcon;
