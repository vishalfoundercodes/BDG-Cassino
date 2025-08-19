/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const TimerModal = ({ timeLeft,duration, isOpen, onClose, parentRef }) => {
  const [isWarning, setIsWarning] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (parentRef?.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      setModalPosition({
        top: parentRect.top - 200,
        left: parentRect.left,
      });
    }
  }, [parentRef]);

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {  
      setIsWarning(true);
      onClose(true);
    } else {
      // console.log("falseeee",timeLeft)
      setIsWarning(false);
      onClose(false);
    }
  }, [timeLeft]);
  // console.log("trueee", timeLeft)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (value) => value.toString().padStart(2, "0");
  return (
    <div
      className={` rounded-2xl h-[20rem] xs:h-[22rem] xsm:h-[19.5rem] mt-14 xs:mt-[5.5rem] xsm:-mt-3 w-full absolute modal ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="bg-black opacity-80 h-full w-full absolute inset-0 rounded-2xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      ></div>
      <div className="modal-content relative flex items-center justify-center h-full mt-2">
        <div
          className={`flex items-center justify-center space-x-8 xsm:space-x-9 ${
            isWarning ? "text-white" : "text-green"
          }`}
        >
          <div className="bg-redLight text-[#8F5206] h-[10rem] w-[6.5rem] xsm:h-[12rem] xsm:w-[7.5rem] rounded-2xl flex items-center justify-center font-extrabold text-[10rem] ">
            {formatTime(seconds)[0]}
          </div>
          <div className="bg-redLight text-[#8F5206] h-[10rem] w-[6.5rem] xsm:h-[12rem] xsm:w-[7.5rem] rounded-2xl flex items-center justify-center font-extrabold text-[10rem] ">
            {formatTime(seconds)[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
