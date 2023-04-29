import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const TripSeat = ({ typeSeat, seats, handleQuanitySeats }) => {
  const [currentSeats, setCurrentSeats] = useState(null);

  useEffect(() => {
    if (!currentSeats) {
      setCurrentSeats(seats);
    } else {
      const selectedSeats = currentSeats
        .filter((seat) => seat.status === "Selected")
        .map((seat) => seat.id); // ["A03", "A04"] // quá khứ được chọn

      setCurrentSeats(
        seats.map((seat) => {
          if (selectedSeats.includes(seat.id) && seat.status === "Available") {
            return {
              ...seat,
              status: "Selected",
            };
          }
          return seat;
        })
      ); // hiện tại tất cả
    }
  }, [seats]);

  const handlePickSeats = (seatId) => {
    const updatedSeats = currentSeats.map((seat) => {
      if (seat.id === seatId) {
        return {
          ...seat,
          status: seat.status === "Available" ? "Selected" : "Available",
        };
      }
      return seat;
    }); // cái màu ghế xanh

    const newSelectedSeats = updatedSeats.filter(
      (seat) => seat.status === "Selected"
    ); // đi qua từng cái ghế xanh

    // if (newSelectedSeats.length > 8) {
    //   toast.info("You can only select 8 tickets for an order!");
    //   return;
    // }
    setCurrentSeats(updatedSeats);

    handleQuanitySeats(newSelectedSeats);
  };

  return (
    <>
      {typeSeat === "Bed" && (
        <>
          <div className="w-[40%] flex flex-col justify-center pl-[40px]">
            <p className="text-[1.5rem] mb-[10px] text-[#6A6A6B] font-semibold font-Ballo">
              Note
            </p>
            <div className="flex items-center text-[1.5rem] mt-[15px]">
              <Icon
                width="40"
                height="40"
                className="mr-[5px]"
                icon="material-symbols:bedroom-child"
                color="rgba(204, 204, 204, 0.8)"
              />
              <span className="text-[1rem]">Available</span>
            </div>
            <div className="flex items-center text-[1.5rem] mt-[15px]">
              <Icon
                width="40"
                height="40"
                className="mr-[5px]"
                icon="material-symbols:bedroom-child"
              />
              <span className="text-[1rem]">Closed</span>
            </div>
            <div className="flex items-center text-[1.5rem] mt-[15px]">
              <Icon
                width="40"
                height="40"
                className="mr-[5px]"
                icon="material-symbols:bedroom-child"
                color="green"
              />
              <span className="text-[1rem]">Selected</span>
            </div>
          </div>
          <div className="w-[60%] flex gap-[16px]">
            <div className="w-2/4">
              <p className="text-center mb-[5px]">Downstairs</p>
              <div className=" p-[10px] rounded-[10px] bg-my-bg-seat">
                <div className="flex items-center justify-between mb-[5px]">
                  <div className="flex items-center">
                    <Icon
                      width="35"
                      height="35"
                      className="mr-[5px]"
                      icon="ph:steering-wheel"
                    />
                    <span>Driver</span>
                  </div>
                  <div className="border-r-2 border-[#535354] pr-[5px]">
                    Entrance
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-3">
                    {currentSeats?.slice(0, 15)?.map((element, index) => {
                      let justifyClass = "";
                      if (index % 3 === 0) {
                        justifyClass = "justify-self-start";
                      } else if (index % 3 === 1) {
                        justifyClass = "justify-self-center";
                      } else if (index % 3 === 2) {
                        justifyClass = "justify-self-end";
                      }
                      return (
                        <span key={index} className={justifyClass}>
                          {element.status == "Available" ? (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(204, 204, 204, 0.8)"
                              className="cursor-pointer"
                              onClick={() => handlePickSeats(element.id)}
                            />
                          ) : element.status == "Selected" ? (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="green"
                              className="cursor-pointer"
                              onClick={() => handlePickSeats(element.id)}
                            />
                          ) : (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(0, 0, 0, 1)"
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-5 mt-[15px]">
                    {/* {new Array(5)
                      .fill(
                        <Icon
                          width="40"
                          height="40"
                          className="overflow-hidden"
                          icon="material-symbols:bedroom-child"
                          color="rgba(204, 204, 204, 0.8)"
                        />
                      )
                      .map((element, index) => {
                        return (
                          <span
                            key={index}
                            className={
                              index === 4
                                ? "flex justify-self-end"
                                : "flex justify-center"
                            }
                          >
                            {element}
                          </span>
                        );
                      })} */}
                    {currentSeats?.slice(15, 20)?.map((element, index) => {
                      return (
                        <span
                          key={index}
                          className={
                            index === 4
                              ? "flex justify-self-end"
                              : "flex justify-center"
                          }
                        >
                          {element.status == "Available" ? (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(204, 204, 204, 0.8)"
                              className="cursor-pointer"
                              onClick={() => handlePickSeats(element.id)}
                            />
                          ) : element.status == "Selected" ? (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="green"
                              className="cursor-pointer"
                              onClick={() => handlePickSeats(element.id)}
                            />
                          ) : (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(0, 0, 0, 1)"
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/4 ">
              <p className="text-center mb-[5px]">Upstairs</p>
              <div className=" py-[10px] px-[16px] rounded-[10px] bg-my-bg-seat">
                <div className="grid grid-cols-3 pt-[40px] ">
                  {currentSeats?.slice(20, 35)?.map((element, index) => {
                    let justifyClass = "";
                    if (index % 3 === 0) {
                      justifyClass = "justify-self-start";
                    } else if (index % 3 === 1) {
                      justifyClass = "justify-self-center";
                    } else if (index % 3 === 2) {
                      justifyClass = "justify-self-end";
                    }
                    return (
                      <span key={index} className={justifyClass}>
                        {element.status == "Available" ? (
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="rgba(204, 204, 204, 0.8)"
                            className="cursor-pointer"
                            onClick={() => handlePickSeats(element.id)}
                          />
                        ) : element.status == "Selected" ? (
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="green"
                            className="cursor-pointer"
                            onClick={() => handlePickSeats(element.id)}
                          />
                        ) : (
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="rgba(0, 0, 0, 1)"
                          />
                        )}
                      </span>
                    );
                  })}
                </div>
                <div className="grid grid-cols-5 mt-[15px]">
                  {currentSeats?.slice(35, 40)?.map((element, index) => {
                    return (
                      <span
                        key={index}
                        className={
                          index === 4
                            ? "flex justify-self-end"
                            : "flex justify-center"
                        }
                      >
                        {element.status == "Available" ? (
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="rgba(204, 204, 204, 0.8)"
                            className="cursor-pointer"
                            onClick={() => handlePickSeats(element.id)}
                          />
                        ) : element.status == "Selected" ? (
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="green"
                            className="cursor-pointer"
                            onClick={() => handlePickSeats(element.id)}
                          />
                        ) : (
                          <Icon
                            width="40"
                            height="40"
                            icon="material-symbols:bedroom-child"
                            color="rgba(0, 0, 0, 1)"
                          />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {typeSeat === "Seat" && (
        <>
          <div className="w-[40%] flex flex-col justify-center pl-[40px]">
            <p className="text-[1.5rem] mb-[10px] text-[#6A6A6B] font-semibold font-Ballo">
              Note
            </p>
            <div className="flex items-center text-[1.5rem] mt-[15px]">
              <Icon
                width="40"
                height="40"
                className="mr-[5px]"
                icon="material-symbols:bedroom-child"
                color="rgba(204, 204, 204, 0.8)"
              />
              <span className="text-[1rem]">Available</span>
            </div>
            <div className="flex items-center text-[1.5rem] mt-[15px]">
              <Icon
                width="40"
                height="40"
                className="mr-[5px]"
                icon="material-symbols:bedroom-child"
              />
              <span className="text-[1rem]">Closed</span>
            </div>
            <div className="flex items-center text-[1.5rem] mt-[15px]">
              <Icon
                width="40"
                height="40"
                className="mr-[5px]"
                icon="material-symbols:bedroom-child"
                color="green"
              />
              <span className="text-[1rem]">Selected</span>
            </div>
          </div>
          <div className="w-[60%] flex justify-center">
            <div className="w-2/4">
              <p className="text-[1.5rem] text-center mb-[10px] text-[#6A6A6B] font-semibold font-Ballo">
                Downstairs
              </p>
              <div className=" p-[10px] rounded-[10px] bg-my-bg-seat">
                <div className="flex items-center justify-between mb-[5px]">
                  <div className="flex items-center">
                    <Icon
                      width="35"
                      height="35"
                      className="mr-[5px]"
                      icon="ph:steering-wheel"
                    />
                    <span>Driver</span>
                  </div>
                  <div className="border-r-2 border-[#535354] pr-[5px]">
                    Entrance
                  </div>
                </div>
                <div>
                  <div className="">
                    <div className="grid grid-rows-10 grid-cols-4">
                      {currentSeats?.slice(0, 40)?.map((element, index) => {
                        let justifyClass = "";
                        if (index % 4 === 1) {
                          justifyClass = "justify-self-start";
                        } else if (index % 4 === 2) {
                          justifyClass = "justify-self-end";
                        } else if (index % 4 === 3) {
                          justifyClass = "justify-self-end";
                        }
                        return (
                          <span key={index} className={justifyClass}>
                            {element.status == "Available" ? (
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="rgba(204, 204, 204, 0.8)"
                                className="cursor-pointer"
                                onClick={() => handlePickSeats(element.id)}
                              />
                            ) : element.status == "Selected" ? (
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="green"
                                className="cursor-pointer"
                                onClick={() => handlePickSeats(element.id)}
                              />
                            ) : (
                              <Icon
                                width="40"
                                height="40"
                                className="mr-[5px]"
                                icon="material-symbols:bedroom-child"
                                color="rgba(0, 0, 0, 1)"
                              />
                            )}
                          </span>
                        );
                      })}
                    </div>
                    {/* <div className="grid grid-cols-2">
                      {currentSeats?.slice(20, 40)?.map((element, index) => {
                        return (
                          <span key={index} className="">
                            {element.status == "Available" ? (
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="rgba(204, 204, 204, 0.8)"
                                className="cursor-pointer"
                                onClick={() => handlePickSeats(element.id)}
                              />
                            ) : element.status == "Selected" ? (
                              <Icon
                                width="40"
                                height="40"
                                icon="material-symbols:bedroom-child"
                                color="green"
                                className="cursor-pointer"
                                onClick={() => handlePickSeats(element.id)}
                              />
                            ) : (
                              <Icon
                                width="40"
                                height="40"
                                className="mr-[5px]"
                                icon="material-symbols:bedroom-child"
                                color="rgba(0, 0, 0, 1)"
                              />
                            )}
                          </span>
                        );
                      })}
                    </div> */}
                  </div>

                  <div className="grid grid-cols-5 mt-[15px]">
                    {currentSeats?.slice(40, 45)?.map((element, index) => {
                      let justifyClass = "";
                      if (index === 1) {
                        justifyClass = "flex justify-self-star";
                      } else if (index === 4) {
                        justifyClass = "justify-self-end";
                      }
                      return (
                        <span key={index} className={justifyClass}>
                          {element.status == "Available" ? (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="rgba(204, 204, 204, 0.8)"
                              className="cursor-pointer"
                              onClick={() => handlePickSeats(element.id)}
                            />
                          ) : element.status == "Selected" ? (
                            <Icon
                              width="40"
                              height="40"
                              icon="material-symbols:bedroom-child"
                              color="green"
                              className="cursor-pointer"
                              onClick={() => handlePickSeats(element.id)}
                            />
                          ) : (
                            <Icon
                              width="40"
                              height="40"
                              className="mr-[5px]"
                              icon="material-symbols:bedroom-child"
                              color="rgba(0, 0, 0, 1)"
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TripSeat;
