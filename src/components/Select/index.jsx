import React, { useState, useEffect } from "react";

const Select = ({ type, setValue, options }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setValue(name);
  }, [name]);

  let provinces = [];
  let districts = [];
  let villages = [];

  if (type == "provinces") {
    options?.map((i) => {
      provinces.push({
        label: i.province_name,
        value: { id: i.province_id, name: i.province_name },
      });
    });
  } else if (type == "districts") {
    options?.map((i) => {
      districts.push({
        label: i.district_name,
        value: { id: i.district_id, name: i.district_name },
      });
    });
  } else if ((type = "villages")) {
    options?.map((i) => {
      villages.push({
        label: i.ward_name,
        value: { id: i.ward_id, name: i.ward_name },
      });
    });
  }

  const handleOnChange = (event) => {
    const value = event.target.value;
    setName(JSON.parse(value));
  };

  return (
    <div>
      {type == "provinces" ? (
        <select
          className="w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
          onChange={handleOnChange}
        >
          {provinces.length == 0 ? (
            <option>Please select a province</option>
          ) : (
            provinces.map((province, index) => (
              <option key={index} value={JSON.stringify(province.value)}>
                {province.value.name}
              </option>
            ))
          )}
        </select>
      ) : type == "districts" ? (
        <select
          className="w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
          onChange={handleOnChange}
        >
          {districts.length == 0 ? (
            <option>Please select a province first</option>
          ) : (
            districts.map((district, index) => (
              <option key={index} value={JSON.stringify(district.value)}>
                {district.value.name}
              </option>
            ))
          )}
        </select>
      ) : (
        <select
          className="w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
          onChange={handleOnChange}
        >
          <option>Please select a village</option>
          {
            villages.map((village, index) => (
            <option key={index} value={JSON.stringify(village.value)}>
              {village.value.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;
