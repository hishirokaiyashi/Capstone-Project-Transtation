import React, { useState } from "react";

const BoxChatIcon = ({ showPopUp, visible }) => {
  const [hovered, setHovered] = useState(false);
  //   const [display,setDisplay]=   useState(showPopUp);
  const handleChangeOnClick = () => {
    showPopUp(!visible);
  };
  return (
    <div className="fixed bottom-[10px] right-[10px]">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleChangeOnClick}
        className={`transition-all duration-3000 ease-in-out 
          ${
            hovered
              ? " bg-chat-icon bg-no-repeat  relative bg-center bg-[length:84px] w-[84px] h-[84px] bg-white rounded-full cursor-pointer border-2 border-fuchsia-700 shadow-[0px_0px_16px_6px_rgba(0,0,0,0.33)]"
              : "bg-chat-icon bg-no-repeat  relative bg-center bg-[length:84px] w-[84px] h-[84px] bg-white rounded-full cursor-pointer border border-teal-800 shadow-[0px_0px_16px_6px_rgba(0,0,0,0.33)]"
          }`}
      >
        <div
          className={`transition-all duration-700 ease-in-out w-[150px] absolute right-[100px] bottom-[50px] z-10000 shadow-[0px_0px_16px_6px_rgba(0,0,0,0.33)]
           ${hovered ? " opacity-100 " : "opacity-0"}`}
        >
          Hey, Can I Help You?
        </div>
      </div>
    </div>
  );
};

export default BoxChatIcon;
