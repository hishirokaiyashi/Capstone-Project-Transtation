import React, { useState, useRef, useEffect } from "react";
import BoxChatIcon from "../BoxChatIcon";
import SupportWindow from "../SupportWindow";

const Messager = () => {
  const [visible, setVisible] = useState(false);
  const wapperRef = useRef(null);
  const handleChangeVisible = (data) => {
    setVisible(data);
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (wapperRef.current && !wapperRef.current.contains(e.target)) {
        setVisible(!visible);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.addEventListener("mousedown", handleClickOutSide);
    };
  }, [wapperRef]);

  return (
    <div ref={wapperRef}>
      <SupportWindow showPopUp={handleChangeVisible} visible={visible} />
      <BoxChatIcon showPopUp={handleChangeVisible} visible={visible} />
    </div>
  );
};

export default Messager;
