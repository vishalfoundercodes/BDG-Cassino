/* eslint-disable react/prop-types */

import winnerANouncement from "../assets/usaAsset/wingo/win_go_win_bg.png"
import LooseANouncement from "../assets/images/wingolostimage.png"
import celebration from "../assets/images/celebration.gif";
import { ImCross } from "react-icons/im";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const WingoWinnerAnnoucement = ({ data, onClose }) => {
    const [autoCloseEnabled, setAutoCloseEnabled] = useState(
        localStorage.getItem("wingoAnnoucementModal") === "1"
    );
    useEffect(() => {
        if (autoCloseEnabled) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

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
    const [showCelebration, setShowCelebration] = useState(false);
    useEffect(() => {
      if (data?.win !== 0) {
        setShowCelebration(true);
        const gifTimer = setTimeout(() => {
          setShowCelebration(false);
        }, 2000); // adjust duration as needed

        return () => clearTimeout(gifTimer);
      }
    }, [data?.win]);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        {/* Modal Background */}
        <div
          className="z-50 relative w-80 bg-no-repeat h-[500px] bg-contain bg-center"
          style={{
            backgroundImage: `url(${
              data.win === 0 ? LooseANouncement : winnerANouncement
            })`,
          }}
        >
          {/* 🎉 Celebration GIF at the top center */}
          {showCelebration && (
            <img
              src={celebration}
              alt="Celebration"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-50 h-50 z-50"
            />
          )}
          {/* Modal Content */}
          <div className="absolute w-full inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2
              className={`text-3xl ${
                data?.win === 0
                  ? "mt-[12rem] text-gray"
                  : "mt-[11rem] text-white"
              } font-bold `}
            >
              {data.win === 0 ? "Sorry" : "Congratulations"}
            </h2>
            <p
              className={`text-xs w-full text-nowrap flex items-center justify-center ${
                data?.win === 0 ? "text-black mt-14" : "text-white mt-8"
              }`}
            >
              Lottery results:&nbsp;
              {data?.number === 0 || data?.number === 5 ? (
                <span className="relative w-20 font-bold text-white px-2 py-1.5 rounded-md">
                  <div className=" h-5 w-12">
                    <div
                      className="absolute inset-0 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: data?.number === 0 ? "red" : "green",
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      }}
                    >
                      {data?.number === 0 ? "Red" : "Green"} Voilet
                    </div>
                    <div
                      className="absolute rounded-lg inset-0 bg-voilet flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)",
                      }}
                    >
                      {data?.number === 0 ? "Red" : "Green"} Voilet
                    </div>
                  </div>
                </span>
              ) : (
                <span
                  className={`${
                    data?.number % 2 === 0 ? "bg-red" : "bg-[#F44841]"
                  } px-2 py-1.5 text-white rounded-md`}
                >
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
                </span>
              )}
              &nbsp;&nbsp;
              {data?.number === 0 || data?.number === 5 ? (
                <span className="relative w-20 font-bold text-white px-2 py-1.5 rounded-md">
                  <div className=" h-5 w-5">
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: data?.number === 0 ? "red" : "green",
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      }}
                    >
                      {data?.number}
                    </div>
                    <div
                      className="absolute rounded-full inset-0 bg-voilet flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)",
                      }}
                    >
                      {data?.number}
                    </div>
                  </div>
                </span>
              ) : (
                <span
                  className={`${
                    data?.number % 2 === 0 ? "bg-red" : "bg-[#F44841]"
                  } px-2 h-[26px] flex items-center text-white rounded-md`}
                >
                  {data?.number}
                </span>
              )}
              &nbsp;&nbsp;
              {data?.number === 0 || data?.number === 5 ? (
                <span className="relative w-20 font-bold text-white px-2 py-1.5 rounded-md">
                  <div className=" h-5 w-5">
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: data?.number === 0 ? "red" : "green",
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      }}
                    >
                      {" "}
                      {data?.number < 5 ? `Small` : `Big`}
                    </div>
                    <div
                      className="absolute rounded-full inset-0 bg-voilet flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)",
                      }}
                    >
                      {" "}
                      {data?.number < 5 ? `Small` : `Big`}
                    </div>
                  </div>
                </span>
              ) : (
                <span
                  className={`${
                    data?.number % 2 === 0 ? "bg-red" : "bg-[#F44841]"
                  } font-bold text-white flex items-center justify-center px-2 h-[26px] rounded-md`}
                >
                  {data?.number < 5 ? `Small` : `Big`}
                </span>
              )}
            </p>
            {/* <p className={` text-2xl ${data?.win === 0 ? "mt-12" : "mt-8"} text-red`}>
                        <p className="font-bold text-xsm text-red">
                            {data?.win === 0 ? "" : "Bonus"}
                            <p className=" text-2xl ">{data?.win === 0 ? "Lost" : ` ${data?.win?.toFixed(2)}`}</p>
                        </p>
                    </p>
                    <p className=" text-2xl  text-blackLight">
                        <p className=" text-xsm flex text-blackLight">
                            Period:{" "}
                            <p className="font-bold text-xs">{data?.win === 0 ? "Lost " : "Win "}{data?.gameid === 1 ? `30 Seconds ${data?.games_no}` : data?.gameid === 2 ? `1 min ${data?.games_no}` : data?.gameid === 3 ? `3 mins ${data?.games_no}` : data?.gameid === 4 ? `5 mins ${data?.games_no}` : "null"}</p>
                        </p>
                    </p> */}

            <div className="text-center text-red font-bold mt-5">
              {/* Bonus Label and Amount */}
              {data?.win !== 0 && (
                <>
                  <p className="text-sm leading-none text-[#F44841]">Bonus</p>
                  <p className="text-2xl leading-tight text-[#F44841]">
                    ₹{data?.win?.toFixed(2)}
                  </p>
                </>
              )}

              {data?.win === 0 && (
                <p className="text-2xl mt-3 text-red font-semibold">Loss</p>
              )}

              {/* Game Period Info */}
              <div className="mt-1 text-blackLight text-xs leading-tight">
                <p>
                  Period:{" "}
                  {data?.gameid === 1
                    ? "WinGo 30sec"
                    : data?.gameid === 2
                    ? "WinGo 1min"
                    : data?.gameid === 3
                    ? "WinGo 3mins"
                    : data?.gameid === 4
                    ? "WinGo 5mins"
                    : "Unknown"}
                </p>
                <p className="font-medium text-[14px]">{data?.games_no}</p>
              </div>
            </div>

            <div
              className={`flex items-center ${
                data?.win === 0 ? "mt-8" : "mt-12"
              } w-full px-2 gap-2 cursor-pointer`}
              onClick={handleAutoCloseClick}
            >
              {autoCloseEnabled ? (
                <FaCheckCircle
                  className="text-[#B1835A]"
                  size={26}
                  style={{ color: `[#B1835A]` }}
                />
              ) : (
                <FaRegCircle
                  className="text-[#B1835A]"
                  size={26}
                  style={{ color: `[#B1835A]` }}
                />
              )}
              <p className="text-xs">
                {autoCloseEnabled
                  ? "Cancel Auto Close"
                  : "3 Seconds auto close"}
              </p>
            </div>
            <button
              className="mt-5 px-6 py-2 font-extrabold text-white rounded-md "
              onClick={onClose}
            >
              <ImCross
                className="border-4 p-1 border-white rounded-full"
                size={32}
              />
            </button>
          </div>
        </div>
      </div>
    );
};
export default WingoWinnerAnnoucement