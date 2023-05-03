import React from "react";

const TextMessages = ({ type, message, userInfo }) => {
  return (
    <>
      {type == "sender" && (
        <div className="flex items-end justify-end text-white w-full mb-2">
          <div className="bg-blue-600 p-2 px-3 rounded-2xl max-w-[300px]">
            <p className="text-sm whitespace-pre-line break-words">
              {message.message}
            </p>
            <p className="text-xs text-end">10:36am</p>
          </div>
          <img
            src={userInfo?.photoURL}
            alt="Message-logo-icon"
            className="w-[35px] h-[35px] rounded-full ml-1 object-cover"
          />
        </div>
      )}
      {type == "receiver" && (
        <div className="flex items-end text-white w-full mb-2">
          <img
            src={userInfo?.photoURL}
            alt="Message-logo-icon"
            className="w-[35px] h-[35px] rounded-full mr-1 object-cover "
          />
          <div className="bg-slate-400 p-2 px-3  rounded-2xl max-w-[300px]">
            <p className="text-sm whitespace-pre-line break-words ">
              {message.message}
            </p>
            <p className="text-xs">10:36am</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TextMessages;
