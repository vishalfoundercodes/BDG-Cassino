/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const TimerModal = ({ timeLeft, duration, isOpen, onClose, height }) => {
    const [isWarning, setIsWarning] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (timeLeft <= 10 && timeLeft > 0) {
            setIsWarning(true);
            onClose(true);
        } else {
            setIsWarning(false);
            onClose(false);
        }
    }, [timeLeft]);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatTime = (value) => value.toString().padStart(2, "0");
    return (
        <div
            style={{ height: height }}
            className={`rounded-2xl absolute modal w-full ${isOpen ? "block" : "hidden"}`}>
            <div
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                className="bg-black opacity-80 h-full w-full sm:top-5 md:top-0 absolute inset-0 rounded-2xl"
            >
            </div>
            <div className="modal-content relative flex items-center justify-center h-full w-full mt-2">
                <div className={`flex items-center justify-center space-x-8 xsm:space-x-9 ${isWarning ? 'text-red' : 'text-green'}`}>
                    <div className={`bg-white w-[6.5rem] h-[10rem] xsm:w-[7.5rem] rounded-2xl flex items-center justify-center font-extrabold text-[10rem] `}>
                        {formatTime(seconds)[0]}
                    </div>
                    <div className={`bg-white w-[6.5rem] h-[10rem] xsm:w-[7.5rem] rounded-2xl flex items-center justify-center font-extrabold text-[10rem] `}>
                        {formatTime(seconds)[1]}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TimerModal;
