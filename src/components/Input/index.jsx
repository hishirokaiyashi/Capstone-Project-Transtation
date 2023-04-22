
import React from "react";

const Input = ({ label, id, type, placeholder, value, error, onInput }) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        <div className="relative">
          <input
            className={
              error == ""
                ? "outline-none border border-blue rounded py-1 px-2"
                : "outline-none border border-red-500 rounded py-1 px-2"
            }
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onInput={onInput}
          />
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  };

export default Input