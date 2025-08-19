import { fetchAllGames, fetchGameURL } from "../reusable_component/gameApi";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import viewall from "../assets/usaAsset/homeScreen/viewall.png"
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function FishingGamesList() {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId")
  const [allGamesListView, setAllGamesListView] = useState(null)
  // useEffect(() => {
  //   fetchAllGames(setAllGamesListView);
  // }, []);
 const [fishGames, setFishGames] = useState([]); // ✅ store fish category games

 useEffect(() => {
   fetchAllGames((res) => {
     const allGames = res?.data?.data || [];
     // ✅ Filter only fish games
     const fishOnly = allGames.filter((game) => {
       const categoryName =
         game.category || game.type || game.game_category || "";
       return (
         categoryName.toString().toLowerCase().includes("fish") ||
         categoryName === "5"
       );
     });

     setFishGames(fishOnly); // ✅ store in state
    //  console.log("Filtered Fish Games:", fishOnly);
   });
 }, []);
  // console.log("allGamesListView",allGamesListView)
  return (
    <div>
      {/* ✅ Header */}
      <div className="flex items-center justify-between gap-2 w-full pr-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-2 bg-gradient-to-r from-[#EDD188] to-[#CA9D4B] rounded-[2px]"></div>
          <div className="text-[16px] font-extrabold  text-[#D9AC4F]">
            Fishing
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div
              className="h-5 w-16 rounded-lg border-[0.5px] flex items-center justify-center text-[12px] p-2  text-[#D9AC4F]"
              onClick={() => navigate(`/allgames?activeModalValue=5`)}
            >
              ALL
              <div className="text-[12px]  text-[#D9AC4F] pl-1">
                {fishGames.length}
              </div>
              <div className="text-[12px]  text-[#D9AC4F]">
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Game Grid */}
      <div className="grid grid-cols-3 w-full">
        {fishGames.length > 0 ? (
          fishGames.slice(0, 12).map((item, i) => (
            <div
              onClick={() =>
                fetchGameURL(item?.gameId, userId, navigate, setLoading)
              }
              key={i}
              className="flex flex-col items-center text-black p-2 cursor-pointer"
            >
              <img
                src={item?.img || item?.imgUrl}
                className="w-36 h-28 rounded-lg border  border-[#D9AC4F]"
                alt={item?.gameNameEn || "fish-game"}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-white text-xl w-full col-span-3">
            No data
          </div>
        )}
      </div>
    </div>
  );

}

export default FishingGamesList