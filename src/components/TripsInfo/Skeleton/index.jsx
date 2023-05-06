import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TripSkeleton = () => {
  return new Array(5).fill(0).map((_, i) => (
    <div
      key={i}
      className="flex pb-[10px] mb-[15px] border-b-2 border-dashed bg-white shadow"
    >
      <div className="w-[30%] h-[230px] object-cover bg-gray-200">
        <Skeleton height={230} />
      </div>
      <div className="pl-[35px] pt-[12px] w-[70%] pr-[18px]">
        <div className="flex justify-between">
          <p className="pt-[16px] font-Ballo text-[1.5rem] font-bold text-[#535354]">
            <Skeleton width={350} />
          </p>
          <p className="text-[0.625rem] text-my-text-gray-third font-Ballo">
            <Skeleton width={150} height={10} />
          </p>
        </div>
        <div className="flex justify-between pt-[30px]">
          <div className=" w-3/6">
            <div className="flex items-center justify-between pb-[10px]">
              <p className="text-[2rem] font-Ballo">
                <Skeleton width={80} />
              </p>
              <div className="border w-[50px] h-0"></div>
              <p className="w-1/3 self-left text-[0.8125rem] text-my-text-gray-third">
                <Skeleton />
                <br />
                <Skeleton />
              </p>
            </div>
            <div className="flex items-center ">
              <div className="border w-0 h-[30px]"></div>
              <p className=" text-[0.6875rem] text-my-text-gray-third pl-[4px]">
                <Skeleton width={20} />
              </p>
            </div>
            <div className="flex items-center justify-between pt-[10px]">
              <p className="text-[2rem] font-Ballo">
                <Skeleton width={80} />
              </p>
              <div className="border w-[50px] h-0"></div>
              <p className="text-[0.8125rem] text-my-text-gray-third">
                <Skeleton width={80} />
                <br />
                <Skeleton />
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between w-3/6">
            <p className="text-right text-[2.375rem] text-[#F07272] font-semibold">
              <Skeleton width={150} />
            </p>
            <div className="flex justify-between pl-[38px]">
              <div className="w-[50%]">
                <p className="text-[1.25rem] font-Ballo text-my-text-gray-second font-semibold">
                  <Skeleton height={25} />
                </p>
                <div className="text-[0.75rem] w-full text-[#1D7ED8] underline underline-offset-2">
                  <Skeleton height={25} />
                </div>
              </div>

              <div className="h-full px-[10px]  text-white text-[1rem] font-Ballo w-[40%]">
                <Skeleton height={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default TripSkeleton;
