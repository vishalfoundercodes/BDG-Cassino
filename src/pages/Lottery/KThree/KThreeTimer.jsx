
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TimerModal from "./TimerModal";

const KThreeTimer = ({height, timeLeft, duration }) => {
    const [isWarning, setIsWarning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const calculateTimeLeft = () => {
    //   const now = new Date();
    //   const secondsInCycle = (now.getMinutes() * 60 + now.getSeconds()) % duration;
    //   const remainingTime = duration - secondsInCycle; 
    //   setTimeLeft(remainingTime);
    // };

    // useEffect(() => {
    //   calculateTimeLeft();
    //   const interval = setInterval(() => {
    //     calculateTimeLeft();
    //   }, 1000);

    //   return () => clearInterval(interval); 
    // }, [duration]);

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
                className={` absolute mt-[10.6rem] w-[216%] xs2:w-[210%] xs:w-[195%]  -translate-x-[50%] xs:-translate-x-[45%] flex items-center left-0  xs2:left-1.5 xs:left-0`}
                style={{height:height,   }}
            >
                <TimerModal
                    timeLeft={timeLeft}
                    duration={duration}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    height={height}
                />
            </div>
        </div>
    );
};

export default KThreeTimer;
