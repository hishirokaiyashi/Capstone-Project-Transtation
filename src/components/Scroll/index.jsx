import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ScrollBtn = () => {
  const [showToTop, setShowToTop] = useState(false);

  const handleScroll = () => {
    const screenHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const isNearTop = currentScroll < screenHeight;
    setShowToTop(!isNearTop);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 2000,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showToTop && (
        <div
          className={`fixed flex bottom-7 bg-[rgba(0,0,0,0.1)] left-4 -rotate-90 border-2 border-[#F07272] rounded-full p-2 z-80 gap-3 text-slate-900 transition-all duration-300 cursor-pointer hover:opacity-80`}
          onClick={scrollToTop}
        >
          <Icon
            icon="mdi:ray-start-arrow"
            color="#e04141"
            width="28"
            height="28"
          />
        </div>
      )}
    </>
  );
};

export default ScrollBtn;
