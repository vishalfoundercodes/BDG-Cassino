import { useEffect, useState } from 'react'
// import deco_first from "../../assets/images/deco_first.png"
// import deco_four from "../../assets/images/deco_four.png"
// import DragonTiger from "../../assets/dragontiger/DragonTiger.png"
// import fan_aviator from "../../assets/aviator/fan_aviator.png"
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import no_data_available from '../../assets/images/no_data_available.png';
// import plonkoicon from '../../assets/icons/plonkoicon.png';
// import { RxDashboard } from 'react-icons/rx'
import jilli2 from "../../assets/usaAsset/homeScreen/JILLI2.png";
import gameStattic from "../../assets/usaAsset/wallet/gameStats.png"
import apis from '../../utils/apis';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AvaitorGoldenCoins from "../../assets/usaAsset/homeScreen/AvaitorGoldenCoins.png";
import lotterycategorywingo from "../../assets/usaAsset/homeScreen/lotterycategorywingo.png";
import chickenRoadImage from "../../assets/ChickenRoadGame/chicken loading.png";
import gamecategoryfish from "../../assets/usaAsset/homeScreen/fishingicon.png";
function GameHistory() {
  const [selectedGame, setSelectedGame] = useState(0); // default Lottery
  const [activePeriod, setActivePeriod] = useState(1); // default Today
  const [gameStats, setGameStats] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const gameStatsHandler = async (periodType) => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      console.log(`${apis.gameStatsHistory}${userId}&type=${periodType}`);
      const res = await axios.get(
        `${apis.gameStatsHistory}${userId}&type=${periodType}`
      );
      console.log("Game Stats Response:", res.data);
      if (res?.data?.status === 200) {
        setGameStats(res?.data);
      } else {
        setGameStats(null);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (userId) {
      gameStatsHandler(activePeriod);
    }
  }, [userId, activePeriod]);

  const payMethod = [
    {
      image: lotterycategorywingo,
      image1: lotterycategorywingo,
      name: "Lottery",
      type: 0,
      key: "Wingo Game",
    },
    {
      image: AvaitorGoldenCoins,
      image1: AvaitorGoldenCoins,
      name: "Aviator",
      type: 1,
      key: "aviator Game",
    },
    {
      image: chickenRoadImage,
      image1: chickenRoadImage,
      name: "Chicken Road",
      type: 2,
      key: "chicken Road Game",
    },
  ];

  // ✅ Find selected game data
  const selectedGameData =
    gameStats?.data?.find(
      (g) =>
        g.game.toLowerCase().trim() ===
        payMethod
          .find((p) => p.type === selectedGame)
          ?.key.toLowerCase()
          .trim()
    ) || null;

  return (
    <>
      {/* ✅ Game Selection */}
      <div className="hide-scrollbar overflow-x-auto py-3 mx-3">
        <div className="flex gap-2 text-xsm font-bold">
          {payMethod.map((item) => (
            <div
              key={item.type}
              className={`w-32 flex-shrink-0 flex flex-col items-center justify-between shadow-lg rounded-lg ${
                selectedGame === item.type
                  ? "text-[#8F5206] bg-gradient-to-r from-[#EDD188] to-[#CA9D4B]"
                  : "bg-customdarkBlue text-gray"
              } px-3 cursor-pointer`}
              onClick={() => setSelectedGame(item.type)}
            >
              <img
                className="w-16 h-10"
                src={selectedGame === item.type ? item.image : item.image1}
                alt={item.name}
              />
              <p className="font-bold text-nowrap text-sm">{item.name}</p>
            </div>
          ))}
        </div>

        {/* ✅ Period Selection */}
        <div className="flex gap-1.5 text-xs mt-3">
          {[
            { id: 1, label: "Today" },
            { id: 2, label: "Yesterday" },
            { id: 3, label: "This week" },
            { id: 4, label: "This month" },
          ].map((period) => (
            <div
              key={period.id}
              className={`py-1.5 flex-shrink-0 flex items-center justify-center shadow-lg rounded-full ${
                activePeriod === period.id
                  ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                  : "bg-redLight text-[#A8A5A1]"
              } px-5 cursor-pointer`}
              onClick={() => setActivePeriod(period.id)}
            >
              <p className="text-nowrap">{period.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Grand Total */}
      <div className="mt-3 px-3">
        <div className="h-32 rounded-lg flex flex-col items-center justify-center bg-redLight">
          <p className="font-bold text-xl text-yellow">
            <span>₹</span>
            {gameStats?.status === 200
              ? gameStats?.grand_total?.toFixed(2) || "0.00"
              : "0.00"}
          </p>
          <p className="mt-3">Total bet</p>
        </div>
      </div>

      {/* ✅ Show Only Selected Game */}
      <div className="px-3 mt-3">
        {selectedGameData ? (
          <div className="bg-redLight p-4 rounded-lg shadow-md mb-4 text-white">
            <div className="flex items-center gap-2">
              <img className="w-8 h-8" src={gameStattic} alt="game icon" />
              <p className="text-white text-sm font-bold capitalize">
                {selectedGameData.game}
              </p>
            </div>

            <div className="flex ml-10 text-[15px] justify-between mt-2.5">
              <p>Total bet</p>
              <p>₹{selectedGameData.total_bet_amount?.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex ml-10 text-[15px] justify-between mt-2.5">
              <p>Number of bets</p>
              <p className="text-amber-400">
                {selectedGameData.total_bet_count || "0"}
              </p>
            </div>
            <div className="flex ml-10 text-[15px] justify-between mt-2.5">
              <p>Winning amount</p>
              <p className="text-yellow">
                ₹{selectedGameData.total_win_amount?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-10 w-full flex flex-col items-center">
            <img src={no_data_available} alt="No data available" />
            <p className="mt-5">No data</p>
          </div>
        )}
      </div>
    </>
  );
}


export default GameHistory