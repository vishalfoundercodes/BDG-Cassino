/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaMinus, FaPlus, FaRegCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import howtoplayheader from ".././assets/images/howtoplayheader.png";
import Loader  from "./Loader/Loader";

function PreSalesModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] sm:w-[500px] md:w-[370px] bg-white text-black rounded-xl shadow-lg"
      >
        <div
          className="bg-no-repeat flex items-center justify-center h-16 w-full"
          style={{
            backgroundImage: `url(${howtoplayheader})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}
        >
          {"<<Pre-sale rules>>"}
        </div>
        <div className="p-2 text-xs">
          <p>
            1 minutes 1 issue, 45 seconds to go, 15 seconds waiting fro the
            draw. it opens all day.
          </p>
          <p>The total number of trade is 1440 issues.</p>
          <p>
            If you spend 100 to trade, after deducting 2 service fee, your
            contract amount is 98:{" "}
          </p>
          <p>
            1- Select green: if the result shows 1,3,7,9 you will get (98*2)
            196; If the result show 5, you will get (98*1.5) 147{" "}
          </p>
          <p>
            2- Select red: if the result shows 2,4,6,8 you will get (98*2) 196;
            If the result show 0, you will get (98*1.5) 147{" "}
          </p>
          <p>
            3- Select violet: if the result shows 0 or 5, you will get (98*4.5)
            441
          </p>
          <button
            onClick={onClose}
            className="my-5 w-full font-bold text-sm bg-bg3 rounded-full text-white py-3"
          >
            I know
          </button>
        </div>
      </div>
    </div>
  );
}

const colorClassMap = {
  green: "#17B15E",
  g: "#17B15E",
  gv: "#17B15E",
  voilet: "#9B48DB",
  red: "#D23838",
  r: "#D23838",
  rv: "#D23838",
  yellow: "#DD9138",
  bg3: "#2A95F3",
};

function LotteryBetModalTrx({
  gameHistoryData,
  profileDetails,
  myHistory,
  bet_api,
  onClose,
  gameDetails,
}) {
  const [balanceIndex, setBalanceIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quantityIndex, setQuantityIndex] = useState(
    gameDetails?.numericValue !== -1 ? gameDetails?.numericValue : 1
  );
  const [finalBetValue, setFinalBetValue] = useState(1);
  const [checkAgreement, setCheckAgreement] = useState(true);
  const [betValue, setBetTotalValue] = useState(1);
  const [isPreSalesModalOpen, setPreSalesModalOpen] = useState(false);
  const togglePreSalesModal = () => setPreSalesModalOpen(!isPreSalesModalOpen);
  const userId = localStorage.getItem("userId");
  // console.log("gameHistoryData",gameHistoryData[0]?.games_no+1)
  useEffect(() => {
    if (
      gameDetails?.numericValue !== undefined &&
      gameDetails.numericValue !== -1
    ) {
      setQuantityIndex(gameDetails.numericValue);
    }
  }, [gameDetails?.numericValue]);
  useEffect(() => {
    if (betValue > 0 && quantityIndex > 0) {
      setFinalBetValue(betValue * quantityIndex);
    }
  }, [betValue, quantityIndex]);

  const handleBalanceClick = (buttonValue, i) => {
    setBalanceIndex(i);
    setBetTotalValue(parseInt(buttonValue, 10));
  };

  const handleQuantityClick = (multiplier) => {
    if (multiplier > 0) {
      setQuantityIndex(multiplier);
    }
  };
  const incrementBet = () => setQuantityIndex((prev) => prev + 1);
  const decrementBet = () =>
    setQuantityIndex((prev) => (prev > 1 ? prev - 1 : 1));
  const colorClass = colorClassMap[gameDetails?.colorCode] || "#666";
  const nextgames_no = gameHistoryData[0]?.games_no?.slice(7);
  const wingoBetHandler = async () => {
    setLoading(true);
    // console.log("gameHistoryData[0]?.games_no", gameHistoryData[0]?.games_no)
    const payload = {
      userid: userId,
      game_id: gameDetails?.gameId,
      number: gameDetails?.betButtonId,
      amount: finalBetValue,
      games_no:
        gameHistoryData[0]?.games_no.slice(0, 7) + (Number(nextgames_no) + 1),
    };
    // console.log("payload", payload)
    if (checkAgreement) {
      // console.log("fdfsdfd")`
      try {
        const res = await axios.post(`${bet_api}`, payload);
        // console.log("resresrs", res)
        if (res?.data?.status === 200) {
          // console.log("hey")
          const currentValue =
            parseInt(localStorage.getItem(`betStatus${gameDetails?.gameId}`)) ||
            0;
          const updatedValue = currentValue + 1;
          localStorage.setItem(`betStatus${gameDetails?.gameId}`, 1);
          // setIsBetDone(res)
          profileDetails();
          myHistory();
          onClose();
          toast.success(res?.data?.message);
        }
      } catch (err) {
        setLoading(false)
        if (err?.response?.data?.status === 500) {
          console.log(err);
        } else {
          toast.error(err?.response?.data?.message);
        }
      }
    } else {
        setLoading(false)
      toast.warn("Please check pre-sale rules");
    }
  };
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onClose();
  };
  if (loading) {
  return <Loader />;
}

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50"
        onClick={handleOverlayClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full xsm:w-[400px] bg-white text-white rounded-t-3xl shadow-lg"
        >
          <div
            className={`${
              gameDetails?.colorCode === "rv"
                ? `bg-[#9B48DB]`
                : gameDetails?.colorCode === "gv"
                ? `bg-[#9B48DB]`
                : "bg-inputBg text-blackLight"
            } h-[6.6rem] rounded-t-3xl`}
          >
            <div
              className="relative flex flex-col items-center justify-center rounded-t-3xl py-3 text-white"
              style={{ backgroundColor: colorClass }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-full h-3"
                style={{
                  backgroundColor: colorClass,
                  clipPath: "polygon(50% 100%, -20% -20%, 100% 0%)",
                }}
              />
              <h1 className="text-lg font-bold">
                GUC Win{" "}
                {gameDetails?.gameId === 6
                  ? "1 Minute"
                  : gameDetails?.gameId === 7
                  ? "3 Minutes"
                  : gameDetails?.gameId === 8
                  ? "5 Minutes"
                  : "10 Minutes"}{" "}
              </h1>
              <p className="bg-white capitalize w-[80%] mt-3 text-black flex justify-center rounded-md text-sm sm:text-base md:text-sm py-1">
                Select &nbsp; &nbsp;{" "}
                {gameDetails?.colorCode === "yellow"
                  ? "Big"
                  : gameDetails?.colorCode === "bg3"
                  ? "Small"
                  : gameDetails?.colorCode === "r"
                  ? gameDetails?.betButtonId
                  : gameDetails?.colorCode === "rv"
                  ? gameDetails?.betButtonId
                  : gameDetails?.colorCode === "g"
                  ? gameDetails?.betButtonId
                  : gameDetails?.colorCode === "gv"
                  ? gameDetails?.betButtonId
                  : gameDetails?.colorCode}
              </p>
            </div>
          </div>

          <div className="w-full mt-5 flex justify-between">
            <p className="text-black px-4">Balance</p>
            <div className="flex gap-1 mt-3 px-4">
              {["1", "10", "100", "1000"].map((value, i) => (
                <button
                  key={i}
                  onClick={() => handleBalanceClick(value, i)}
                  className={`flex items-center justify-center text-xsm rounded-md h-7 px-2 ${
                    balanceIndex === i ? "" : "bg-inputBg text-blackLight"
                  }`}
                  style={{
                    backgroundColor: balanceIndex === i ? colorClass : "",
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between w-full mt-5 px-4">
            <p className="text-black">Quantity</p>
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={decrementBet}
                className="w-7 h-7 rounded-md font-extrabold text-[14px] flex justify-center items-center"
                style={{ backgroundColor: colorClass }}
              >
                <FaMinus className="text-white text-center" />
              </button>
              <input
                value={finalBetValue}
                inputMode="numeric"
                onChange={(e) => setFinalBetValue(e.target.value)}
                className="outline-none pl-1 w-20 h-7 flex items-center justify-center text-center bg-inputBg text-blackLight text-sm xsm:text-base"
                type="number"
              />
              <button
                onClick={incrementBet}
                className="w-7 h-7 rounded-md font-extrabold text-[14px] flex justify-center items-center"
                style={{ backgroundColor: colorClass }}
              >
                <FaPlus className="text-white text-center" />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-1 mt-3 px-4">
            {["X1", "X5", "X10", "X20", "X50", "X100"].map((label, i) => {
              const numericValue = parseInt(label.slice(1), 10);
              return (
                <button
                  key={i}
                  onClick={() => handleQuantityClick(numericValue)}
                  className={`flex items-center justify-center text-xsm rounded-md h-7 px-2 ${
                    quantityIndex === numericValue
                      ? ""
                      : "bg-inputBg text-blackLight"
                  }`}
                  style={{
                    backgroundColor:
                      quantityIndex === numericValue ? colorClass : "",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center mt-4 px-4">
            <div
              onClick={() => setCheckAgreement(!checkAgreement)}
              className="flex items-center cursor-pointer bg-white rounded-full"
            >
              {checkAgreement ? (
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
            </div>
            <label htmlFor="agree" className="text-black ml-2 text-xsm ">
              I agree
            </label>
            <button
              onClick={togglePreSalesModal}
              className="ml-2 text-redLight underline text-xsm "
            >
              {"<<Pre-sale rules>>"}
            </button>
          </div>

          <div className="grid grid-cols-12 mt-5">
            <button
              onClick={onClose}
              className={` bg-inputBg text-gray col-span-4 h-12`}
            >
              Cancel
            </button>
            <button
              onClick={() => wingoBetHandler()}
              className="bg-bg2 col-span-8 h-12"
              style={{ backgroundColor: colorClass }}
            >
              Total amount {finalBetValue}
            </button>
          </div>
        </div>
      </div>
      {isPreSalesModalOpen && <PreSalesModal onClose={togglePreSalesModal} />}
    </>
  );
}

export default LotteryBetModalTrx;
