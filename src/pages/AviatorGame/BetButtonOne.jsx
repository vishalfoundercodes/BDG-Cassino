/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { FiMinusCircle } from "react-icons/fi";
import { LuCirclePlus } from "react-icons/lu";
import { toast } from "react-toastify";
import apis from "../../utils/apis";
import { socket } from "./AviatorSocket";
import { useProfile } from "../../reusable_component/gameApi";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { configModalUsaWin } from "../../utils/apis";
function BetButtonOne({ setBtn, setBetApiHitted,  }) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [betAmount, setBetAmount] = useState(1);
  const [betStatus, setBetStatus] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [predictedCashoutValue, setPredictedCashoutValue] = useState(1.1);
    // const userId = localStorage.getItem("userId");
      const { myDetails} = useProfile(userId);
      // console.log("my details on bet one:", myDetails?.data.total_wallet);
  const [isAutoBetAndCashout, setIsAutoBetAndCashout] = useState({
    autoBet: false,
    autoCashout: false,
  });
  const [hotAirData, setHotAirData] = useState(null);
  useEffect(() => {
    const handleSocket = (hotair) => {
      const q = JSON.parse(hotair);
      setHotAirData(q);
    };

    socket.on("bdgcasino_aviator", handleSocket);
    return () => socket.off("bdgcasino_aviator", handleSocket);
  }, []);
  // console.log("hotAirDatahotAirDatahotAirDatahotAirData",hotAirData)
  const handleIncrement = () => setBetAmount((prev) => Number(prev) + 1);
  const handleDecrement = () =>
    setBetAmount((prev) => (prev > 1 ? Number(prev) - 1 : prev));
  const handleQuickBet = (amount) => setBetAmount(amount);

  // normal bet
  const normalBetHandler = async () => {
    try {
        const loginTokenFromLocalStorage = localStorage.getItem("login_token");
        const response = await axios.get(`${apis.profile}${userId}`);
        const profileToken = response?.data?.data?.login_token;
        if (profileToken != loginTokenFromLocalStorage) {
          // setLoading(true);
          // console.log("wingo login token matches");
          toast.error("Another user logged in");
          navigate("/login");
          return;
        }
          const sr =
            hotAirData?.status === 0 && hotAirData?.betTime < 10
              ? hotAirData?.period
              : hotAirData?.period + 1;
          // const sr = hotAirData?.period + 1
          const payload = {
            uid: userId,
            number: 1,
            amount: betAmount,
            game_id: 5,
            game_sr_num: sr,
          };
          // console.log("pYLOAD", payload);
          try {
            const res = await axios.post(
              `${configModalUsaWin}aviator_bet`,
              payload
            );
            // toast.success(res?.data?.message)
            // console.log("betbetebetebete", res)
            if (res?.data?.status === 200) {
              localStorage.setItem("aviatorBet1", "1");
              localStorage.setItem("aviatorsr1", sr);
              setBetApiHitted({ bet1: true });
              setBetApiHitted({ cancel1: false });
              toast.success(res?.data?.message, {
                className: "custom-toast custom-toast-success",
              });
              setBetStatus(true);
            } else {
              toast.warn(res?.data?.message, {
                className: "custom-toast custom-toast-warn",
              });
            }
          } catch (err) {
            if (err?.response?.data?.status === 500) {
              toast.error("Server problem");
            } else {
              // console.log(
              //   "err?.response?.data?.message",
              //   err?.response?.data?.message
              // );
              toast.error(err?.response?.data?.message, {
                className: "custom-toast custom-toast-error",
              });
            }
          }
    } catch (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Error fetching profile data");
    }
  
  };
  const cancelNormalBetHandler = async () => {
    const sr = localStorage.getItem("aviatorsr1");

    const payload = {
      userid: userId,
      number: 1,
      gamesno: sr,
    };
    // console.log("pYLOAD", payload)
    try {
      const res = await axios.get(
        `${configModalUsaWin}aviator_bet_cancel?userid=${userId}&number=1&gamesno=${sr}`
      );
      // toast.success(res?.data?.message)
      // console.log("cvancelcancelcanel", res)
      if (res?.data?.success === true || res?.data?.status === 200) {
        localStorage.setItem("aviatorBet1", "0");
        localStorage.setItem("aviatorsr1", "0");
        setBetApiHitted({ cancel1: true });
        setBetStatus(false);
        toast.success(res?.data?.message, {
          className: "custom-toast custom-toast-success",
        });
      } else {
        toast.warn(res?.data?.message, {
          className: "custom-toast custom-toast-warn",
        });
        // toast.warn(res?.data?.message)
      }
    } catch (err) {
      if (err?.response?.data?.status === 500) {
        toast.error("Server problem");
      } else {
        toast.error(err?.response?.data?.message, {
          className: "custom-toast custom-toast-error",
        });
      }
    }
  };
  const cashoutNormalBetHandler = async () => {
    const sr = localStorage.getItem("aviatorsr1");
    const salt = {
      uid: userId,
      multiplier: hotAirData?.timer,
      game_sr_num: sr,
      number: 1,
    };

    // Convert salt object to a Base64 encoded string
    const saltEncoded = btoa(JSON.stringify(salt));
    // console.log("saltEncodedsaltEncoded", saltEncoded)
    try {
      const res = await axios.post(
        `${configModalUsaWin}aviator_cashout?salt=${encodeURIComponent(
          saltEncoded
        )}`
      );
      // console.log("cashout", res);
      if (res?.data?.status === 200) {
        setBetApiHitted({ cashout1: true });
        localStorage.setItem("aviatorBet1", "0");
        localStorage.setItem("aviatorsr1", "0");
        setBetStatus(false);
        toast.success(res?.data?.message, {
          className: "custom-toast custom-toast-success",
        });
      } else {
        toast.warn(res?.data?.message, {
          className: "custom-toast custom-toast-warn",
        });
      }
    } catch (err) {
      if (err?.response?.data?.status === 500) {
        // console.log("Server problem");
        toast.error("Server problem");
      } else {
        toast.error(err?.response?.data?.message, {
          className: "custom-toast custom-toast-error",
        });
      }
    }
  };

  // console.log("hotAirDatahotAirData",hotAirData)
  useEffect(() => {
    const status = localStorage.getItem("aviatorBet1");
    if (status == 1) {
      setBetStatus(true);
    }
    if (hotAirData?.status === 2) {
      const lastBetRound = localStorage.getItem("aviatorsr1");
      const currentRound = Number(hotAirData?.period);
      // console.log("lastBetRound and currentRound",betStatus,Number(lastBetRound),currentRound)
      if (lastBetRound != "0" && Number(lastBetRound) === currentRound) {
        localStorage.setItem("aviatorBet1", "0");
        localStorage.setItem("aviatorsr1", "0");
        setBetStatus(false);
      }
    }
  }, [hotAirData, betStatus]);
  // console.log("hotAirData?.timer", hotAirData, predictedCashoutValue)
  useEffect(() => {
    if (
      isAuto &&
      isAutoBetAndCashout.autoBet &&
      hotAirData?.status === 0 &&
      hotAirData?.betTime == "9"
    ) {
      // alert("sd")
      normalBetHandler();
    }
  }, [isAuto, isAutoBetAndCashout.autoBet, hotAirData]);
  useEffect(() => {
    if (
      isAuto &&
      isAutoBetAndCashout.autoCashout &&
      hotAirData?.status === 1 &&
      hotAirData?.timer == predictedCashoutValue
    ) {
      // alert("sd")
      cashoutNormalBetHandler();
    }
  }, [isAuto, isAutoBetAndCashout.autoCashout, hotAirData]);

  useEffect(() => {
    setBtn((prevState) => ({
      ...prevState,
      btn1: isAuto,
    }));
  }, [isAuto]);

  useEffect(() => {
    const sr = hotAirData?.period;
    const lasteBetSrNo = Number(localStorage.getItem("aviatorsr1"));
    const aviatorBetStatus = Number(localStorage.getItem("aviatorBet1"));
    // console.log("lasteBetSrNo", lasteBetSrNo,aviatorBetStatus);
    if (
      hotAirData?.status === 2 &&
      hotAirData?.betTime === 2 &&
      aviatorBetStatus === 1 &&
      lasteBetSrNo === sr
    ) {
      // alert("dfsfd")
      localStorage.setItem("aviatorsr1", "0");
      localStorage.setItem("aviatorBet1", "0");
      setBetStatus(false);
    }
  }, [hotAirData]);

  return (
    <div className="w-full py-1  lg:py-0 lg:w-1/2 text-xsm xsm:text-sm px-2 lg:px-10 3xl:px-20 bg-blackAviator2 rounded-md flex flex-col items-center">
      <div className="flex mt-1 justify-between bg-black rounded-full">
        <button
          className={`px-10 rounded-full ${
            !isAuto ? "bg-blackAviator3 text-white" : "bg-black text-white"
          }`}
          onClick={() => setIsAuto(false)}
        >
          Bet
        </button>
        <button
          className={`px-10 rounded-full ${
            isAuto ? "bg-blackAviator3 text-white" : "bg-black text-white"
          }`}
          onClick={() => setIsAuto(true)}
        >
          Auto
        </button>
      </div>

      {/* Bet Amount Control */}
      <div className="grid grid-cols-5 gap-2 w-full ">
        <div className="col-span-2 flex flex-col items-center w-full ">
          <div className="flex w-32 xsm:w-40 bg-black items-center text-2xl justify-between px-2 py-0.5 mt-2 rounded-full">
            <button className="text-blackAviator3" onClick={handleDecrement}>
              <FiMinusCircle className="text-gray" />{" "}
            </button>
            <input
              inputMode="numeric"
              type="text"
              min="0"
              value={betAmount}
              onBeforeInput={(e) => {
                const incomingValue = e.target.value + e.data;
                const wallet = Number(myDetails?.data?.total_wallet || 0);

                // Prevent non-digit input and values greater than wallet
                const isValid = /^\d+$/.test(incomingValue);
                const numericVal = Number(incomingValue);

                if (!isValid || numericVal > wallet) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // keep only digits
                const numericVal = Number(val);
                const wallet = Number(myDetails?.data?.total_wallet || 0);

                if (numericVal <= wallet) {
                  setBetAmount(val);
                }
              }}
              className="text-white text-xl bg-transparent text-center w-16 xsm:w-20 outline-none no-spinner"
            />

            <button className="text-blackAviator3" onClick={handleIncrement}>
              <LuCirclePlus className="text-gray" />{" "}
            </button>
          </div>
          <div className="flex gap-1 xsm:gap-2 mt-[2px] items-center justify-center">
            {[100, 200].map((amount) => (
              <button
                key={amount}
                className="px-2 py-0.5 bg-blackAviator3 text-gray rounded-full"
                onClick={() => handleQuickBet(amount)}
              >
                {amount}.00
              </button>
            ))}
          </div>
          <div className="flex gap-1 xsm:gap-2 mt-[1px] items-center justify-center">
            {[500, 1000].map((amount) => (
              <button
                key={amount}
                className="px-2 py-0.5 bg-blackAviator3 text-gray rounded-full"
                onClick={() => handleQuickBet(amount)}
              >
                {amount}.00
              </button>
            ))}
          </div>
          {isAuto && (
            <div className="w-full -mt-1 text-xsm xsm:text-sm text-gray flex items-center justify-center">
              Auto Bet &nbsp;
              <button>
                {isAutoBetAndCashout.autoBet ? (
                  <BiToggleRight
                    onClick={() =>
                      setIsAutoBetAndCashout((prev) => ({
                        ...prev,
                        autoBet: false,
                      }))
                    }
                    className="text-white"
                    size={40}
                  />
                ) : (
                  <BiToggleLeft
                    onClick={() =>
                      setIsAutoBetAndCashout((prev) => ({
                        ...prev,
                        autoBet: true,
                      }))
                    }
                    className="text-white"
                    size={40}
                  />
                )}{" "}
              </button>
            </div>
          )}
        </div>
        {/* Bet Button */}
        {betStatus ? (
          hotAirData?.status === 1 &&
          Number(localStorage.getItem("aviatorsr1")) ===
            Number(hotAirData?.period) ? (
            <div className="mt-2 col-span-3  w-full">
              <button
                onClick={cashoutNormalBetHandler}
                className="[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white text-xl md:text-2xl leading-snug 
                           font-manrope font-extrabold mt-1 col-span-3 px-8 py-1 w-full border-greenBorderAviator border-[2px] bg-yellow rounded-3xl"
              >
                Cashout <br /> {(betAmount * hotAirData?.timer).toFixed(2)}
              </button>
              {isAuto && (
                <div className="flex items-center justify-center gap-2">
                  <div className="text-gray flex items-center justify-start">
                    Auto Cash Out&nbsp;
                    <button>
                      {isAutoBetAndCashout.autoCashout ? (
                        <BiToggleRight
                          onClick={() =>
                            setIsAutoBetAndCashout((prev) => ({
                              ...prev,
                              autoCashout: false,
                            }))
                          }
                          className="text-white"
                          size={40}
                        />
                      ) : (
                        <BiToggleLeft
                          onClick={() =>
                            setIsAutoBetAndCashout((prev) => ({
                              ...prev,
                              autoCashout: true,
                            }))
                          }
                          className="text-white"
                          size={40}
                        />
                      )}{" "}
                    </button>
                  </div>
                  <input
                    value={predictedCashoutValue}
                    onChange={(e) => setPredictedCashoutValue(e.target.value)}
                    className="bg-black text-gray rounded-full px-2 w-20 py-0.5 flex items-center"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="col-span-3 mt-2">
              {hotAirData?.status === 1 && (
                <p className="text-[#F85050] text-sm text-center">
                  Waiting for next round
                </p>
              )}
              <button
                onClick={cancelNormalBetHandler}
                className="[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white text-xl md:text-2xl leading-snug 
                           font-manrope font-extrabold mt-1 px-8 py-3 w-full border-greenBorderAviator border-[2px] bg-[#DE003D] rounded-3xl"
              >
                Cancel
              </button>
              {isAuto && (
                <div className="flex items-center justify-center gap-2">
                  <div className="text-gray flex items-center justify-start">
                    Auto Cash Out&nbsp;
                    <button>
                      {isAutoBetAndCashout.autoCashout ? (
                        <BiToggleRight
                          onClick={() =>
                            setIsAutoBetAndCashout((prev) => ({
                              ...prev,
                              autoCashout: false,
                            }))
                          }
                          className="text-white"
                          size={40}
                        />
                      ) : (
                        <BiToggleLeft
                          onClick={() =>
                            setIsAutoBetAndCashout((prev) => ({
                              ...prev,
                              autoCashout: true,
                            }))
                          }
                          className="text-white"
                          size={40}
                        />
                      )}{" "}
                    </button>
                  </div>
                  <input
                    value={predictedCashoutValue}
                    onChange={(e) => setPredictedCashoutValue(e.target.value)}
                    className="bg-black text-gray rounded-full px-2 w-20 py-0.5 flex items-center"
                  />
                </div>
              )}
            </div>
          )
        ) : (
          <div className="mt-2 col-span-3 w-full">
            <button
              onClick={normalBetHandler}
              className="w-full py-1 lg:px-8 border-greenBorderAviator border-[2px] bg-greenAviator text-white text-3xl rounded-3xl"
            >
              <p
                className="[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white text-xl md:text-2xl leading-snug 
                           font-manrope font-extrabold"
              >
                BET
              </p>
              <p
                className="[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white text-xl md:text-2xl leading-snug 
                           font-manrope font-extrabold"
              >
                {Number(betAmount).toFixed(2)}{" "}
              </p>
            </button>
            {isAuto && (
              <div className="text-xsm xsm:text-sm flex items-center justify-center gap-1 xsm:gap-2">
                <div className="text-gray flex items-center justify-start text-nowrap">
                  Auto Cash Out&nbsp;
                  <button>
                    {isAutoBetAndCashout.autoCashout ? (
                      <BiToggleRight
                        onClick={() =>
                          setIsAutoBetAndCashout((prev) => ({
                            ...prev,
                            autoCashout: false,
                          }))
                        }
                        className="text-white"
                        size={40}
                      />
                    ) : (
                      <BiToggleLeft
                        onClick={() =>
                          setIsAutoBetAndCashout((prev) => ({
                            ...prev,
                            autoCashout: true,
                          }))
                        }
                        className="text-white"
                        size={40}
                      />
                    )}{" "}
                  </button>
                </div>
                <input
                  value={predictedCashoutValue}
                  onChange={(e) => setPredictedCashoutValue(e.target.value)}
                  className="bg-black text-gray rounded-full px-[5px] w-14 xsm:w-20 py-[1px] flex items-center"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default BetButtonOne;
