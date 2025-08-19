/* eslint-disable react/prop-types */

import winnerANouncement from "../assets/usaAsset/wingo/win_go_win_bg.png"
import LooseANouncement from "../assets/images/wingolostimage.png"
import { ImCross } from "react-icons/im";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const WingoWinnerAnnoucementTrx = ({ data, onClose }) => {
    const [autoCloseEnabled, setAutoCloseEnabled] = useState(
        localStorage.getItem("wingoAnnoucementModal") === "1"
    );
    console.log("data winner",data)
    useEffect(() => {
        if (autoCloseEnabled) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
console.log("data winner 2", data);
            return () => clearTimeout(timer);
        }
    }, [autoCloseEnabled]);

    const handleAutoCloseClick = () => {
        const status = localStorage.getItem("wingoAnnoucementModal");
        if (status === "0") {
            localStorage.setItem("wingoAnnoucementModal", "1");
            setAutoCloseEnabled(true);
        } else {
            localStorage.setItem("wingoAnnoucementModal", "0");
            setAutoCloseEnabled(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal Background */}
            <div
                className="z-50 relative w-80 bg-no-repeat h-[500px] bg-contain bg-center"
                style={{ backgroundImage: `url(${data.win === 0 ? LooseANouncement : winnerANouncement})` }}
            >
                {/* Modal Content */}
                <div className="absolute w-full inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h2 className={`text-3xl ${data?.win === 0 ? "mt-[12rem] text-gray" : "mt-[11rem] text-white"} font-bold `}>{data.win === 0 ? "Sorry" : "Congratulations!"}</h2>
                    <p className={`text-xs w-full text-nowrap flex items-center justify-center ${data?.win === 0 ? "text-black mt-14" : "text-white mt-8"}`}>
                        Lottery results:&nbsp;
                        {(data?.number === 0 || data?.number === 5) ? (
                            <span className="relative w-20 font-bold text-white px-2 py-1.5 rounded-md">
                                <div className=" h-5 w-12">
                                    <div
                                        className="absolute inset-0 rounded-lg flex items-center justify-center"
                                        style={{
                                            backgroundColor: data?.number === 0 ? "red" : "green",
                                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                        }}
                                    >{data?.number === 0 ? "Red" : "Green"} Voilet</div>
                                    <div
                                        className="absolute rounded-lg inset-0 bg-voilet flex items-center justify-center"
                                        style={{
                                            clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)'
                                        }}
                                    >{data?.number === 0 ? "Red" : "Green"} Voilet</div>
                                </div>
                            </span>
                        ) : (
                            <span className={`${data?.number % 2 === 0 ? "bg-red" : "bg-green"} px-2 py-1.5 text-white rounded-md`}>
                                {data?.number === 1
                                    ? "Green"
                                    : data?.number === 2
                                        ? "Red"
                                        : data?.number === 3
                                            ? "Green"
                                            : data?.number === 4
                                                ? "Red"
                                                : data?.number === 6
                                                    ? "Red"
                                                    : data?.number === 7
                                                        ? "Green"
                                                        : data?.number === 8
                                                            ? "Red"
                                                            : data?.number === 9
                                                                ? "Green"
                                                                : ""}
                            </span>)}
                        &nbsp;&nbsp;
                        {(data?.number === 0 || data?.number === 5) ? (
                            <span className="relative w-20 font-bold text-white px-2 py-1.5 rounded-md">
                                <div className=" h-5 w-5">
                                    <div
                                        className="absolute inset-0 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: data?.number === 0 ? "red" : "green",
                                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                        }}
                                    >{data?.number}</div>
                                    <div
                                        className="absolute rounded-full inset-0 bg-voilet flex items-center justify-center"
                                        style={{
                                            clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)'
                                        }}
                                    >{data?.number}</div>
                                </div>
                            </span>
                        ) : (
                            <span className={`${data?.number % 2 === 0 ? "bg-red" : "bg-green"} px-2 h-[26px] flex items-center text-white rounded-md`}>
                                {data?.number}
                            </span>)}
                        &nbsp;&nbsp;
                        {(data?.number === 0 || data?.number === 5) ? (
                            <span className="relative w-20 font-bold text-white px-2 py-1.5 rounded-md">
                                <div className=" h-5 w-5">
                                    <div
                                        className="absolute inset-0 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: data?.number === 0 ? "red" : "green",
                                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                        }}
                                    > {data?.number < 5 ? `Small` : `Big`}</div>
                                    <div
                                        className="absolute rounded-full inset-0 bg-voilet flex items-center justify-center"
                                        style={{
                                            clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)'
                                        }}
                                    > {data?.number < 5 ? `Small` : `Big`}</div>
                                </div>
                            </span>
                        ) : (
                            <span className={`${data?.number % 2 === 0 ? "bg-red" : "bg-green"} font-bold text-white flex items-center justify-center px-2 h-[26px] rounded-md`}>
                                {data?.number < 5 ? `Small` : `Big`}
                            </span>)}
                    </p>
                    <p className={` text-2xl ${data?.win === 0 ? "mt-12" : "mt-8"} text-red`}>
                        <p className="font-bold text-xsm text-red">
                            {data?.win === 0 ? "" : "Bonus"}
                            <p className=" text-2xl">{data?.win === 0 ? "Lost" : ` ${data?.win?.toFixed(2)}`}</p>
                        </p>
                    </p>
                    <p className=" text-2xl  text-blackLight">
                        <p className=" text-xsm flex text-blackLight">
                            Period:{" "}
                            <p className="font-bold text-xs">{data?.win === 0 ? "Lost " : "Win "}{data?.gameid === 6 ? `1 min, ${data?.games_no}` : data?.gameid === 7 ? `3 min ${data?.games_no}` : data?.gameid === 8 ? `5 mins ${data?.games_no}` : data?.gameid === 9 ? `10 mins ${data?.games_no}` : "null"}</p>
                        </p>
                    </p>
                    <div className={`flex items-center ${data?.win === 0 ? "mt-8" : "mt-12"} w-full px-2 gap-2 cursor-pointer`} onClick={handleAutoCloseClick}>
                        {autoCloseEnabled ? (
                            <FaCheckCircle className='text-[#B1835A]' size={26} style={{ color: `[#B1835A]` }} />
                        ) : (
                            <FaRegCircle className='text-[#B1835A]' size={26} style={{ color: `[#B1835A]` }} />
                        )}
                        <p className="text-xs">{autoCloseEnabled ? "Cancel Auto Close" : "3 Seconds auto close"}</p>
                    </div>
                    <button
                        className="mt-5 px-6 py-2 font-extrabold text-white rounded-md "
                        onClick={onClose}
                    >
                        <ImCross className="border-4 p-1 border-white rounded-full" size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default WingoWinnerAnnoucementTrx