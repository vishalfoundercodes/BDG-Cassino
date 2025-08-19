/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TimerModal from "./TimerModal";
import "./LotteryTimer.css"

const LotteryTimer = ({timeLeft, duration }) => {
  const [isWarning, setIsWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      setIsWarning(true);
      setIsModalOpen(true);
    } else {
      setIsWarning(false);
      if (timeLeft > 5) setIsModalOpen(false);
    }
  }, [timeLeft]);
 
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (value) => value.toString().padStart(2, "0");
// console.log("lottery timer",timeLeft)
  return (
    <div className="relative w-full">
      <div
        className={`flex text-[1.3rem] justify-end space-x-1 ${
          isWarning ? "text-red" : ""
        }`}
      >
        {/* <div className="bg-red font-extrabold text-white h-10 w-6 flex items-center justify-center ">
          {formatTime(minutes)[0]}
        </div> */}
        <div className="bg-[#2B2B2B] font-extrabold text-white h-10 w-6 flex items-center justify-center custom-cut">
          {formatTime(minutes)[0]}
        </div>

        <div className="bg-red text-white h-10 w-6 flex items-center justify-center font-semibold">
          {formatTime(minutes)[1]}
        </div>
        <div className="bg-red text-white h-10 w-4 flex items-center justify-center font-semibold">
          :
        </div>
        <div className="bg-red text-white h-10 w-6 flex items-center justify-center font-semibold">
          {formatTime(seconds)[0]}
        </div>
        {/* <div className="bg-red text-white h-10 w-6 flex items-center justify-center font-semibold">
          {formatTime(seconds)[1]}
        </div> */}
        <div className="bg-[#2B2B2B] text-white h-10 w-6 flex items-center justify-center font-semibold custom-upper-lower-cut">
          {formatTime(seconds)[1]}
        </div>
      </div>
      <div
        className="absolute mt-[3.9rem] xsm:mt-[4.9rem] flex items-center h-[16.5rem] xsm:h-[17.7rem] left-0"
        style={{ width: "214%", transform: "translateX(-50%)" }}
      >
        <TimerModal
          timeLeft={timeLeft}
          duration={duration}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default LotteryTimer;
