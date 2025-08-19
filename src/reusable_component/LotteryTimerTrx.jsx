/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TimerModalTrx from "./TimerModalTrx";

const LotteryTimerTrx = ({timeLeft, duration }) => {
  const [isWarning, setIsWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0) {
      setIsWarning(true);
      setIsModalOpen(true); 
    } else {
      setIsWarning(false);
      if (timeLeft > 10) setIsModalOpen(false); 
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div className="relative w-full">
       <div className={`flex text-[1.3rem] justify-end space-x-1 ${isWarning ? "text-red" : ""}`}>
        <div className="border-white border-[0.5px] rounded-[3px] font-extrabold text-white h-8 w-6 flex items-center justify-center ">
          {formatTime(minutes)[0]}
        </div>
        <div className="border-white border-[0.5px] rounded-[3px] font-extrabold text-white h-8 w-6 flex items-center justify-center ">
          {formatTime(minutes)[1]}
        </div>
        <div className="border-white border-[0.5px] rounded-[3px] font-extrabold text-white h-8 w-6 flex items-center justify-center ">
          :
        </div>
        <div className="border-white border-[0.5px] rounded-[3px] font-extrabold text-white h-8 w-6 flex items-center justify-center  ">
          {formatTime(seconds)[0]}
        </div>
        <div className="border-white border-[0.5px] rounded-[3px] font-extrabold text-white h-8 w-6 flex items-center justify-center ">
          {formatTime(seconds)[1]}
        </div>
      </div>
      <div
        className="absolute mt-[6rem] xsm:mt-[6rem] flex items-center h-[18rem] xsm:h-[19rem] left-0"
        style={{ width: "214%", transform: "translateX(-50%)" }}
      >
        <TimerModalTrx
          timeLeft={timeLeft}
          duration={duration}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default LotteryTimerTrx;
