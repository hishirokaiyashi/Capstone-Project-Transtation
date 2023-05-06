import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    //Fetch data from....
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className=" flex  gap-1 justify-center items-center hover:opacity-50 hover:cursor-pointer border-2 border-gray-500 rounded-md">
      <input
        className="ml-2 w-20 font-Amata font-normal text-base focus:w-32 focus:outline-none"
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      <Icon icon="material-symbols:search" className="mr-2" />
    </div>

    // Search Results
  );
};

export default SearchBar;
