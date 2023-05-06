import React from "react";

const Button = ({ loading, text }) => {
  return (
    <button
      type="submit"
      draggable="false"
      disabled={loading}
      className={`${
        loading
          ? "border border-[#cccc] cursor-not-allowed"
          : "border border-[#E04141]"
      } relative flex justify-center py-3 px-12 m-auto w-[350px]  rounded-[5px] bg-white group text-[#E04141] mt-[30px]`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#000"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="#000"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-[1rem] text-[#cccc]  uppercase font-light tracking-wider">
            Loading
          </span>
        </>
      ) : (
        <>
          <span className="text-[1rem] uppercase font-light tracking-wider">
            {text}
          </span>
          <div className="absolute inset-0 py-3 px-12 bg-[#E04141] rounded-[5px] text-white motion-safe:transition-[clip-path] motion-safe:duration-500 ease-out [clip-path:circle(20%_at_120%_120%)] group-hover:[clip-path:circle(170%_at_120%_120%)]">
            <span className="text-[1rem]  uppercase font-light tracking-wider">
              {text}
            </span>
          </div>
        </>
      )}
    </button>
  );
};

export default Button;
