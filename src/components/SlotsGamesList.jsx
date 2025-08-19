import { fetchAllGames, fetchGameURL } from "../reusable_component/gameApi";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import viewall from "../assets/usaAsset/homeScreen/viewall.png"
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function SlotsGamesList() {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId")
  const [allGamesListView, setAllGamesListView] = useState(null)
    const [slotsGames, setSlotsGames] = useState([]);
  // useEffect(() => {
  //   fetchAllGames(setAllGamesListView);
  //   console.log("slots game list:", allGamesListView.data?.data);
  // }, []);
    useEffect(() => {
      fetchAllGames((res) => {
        // ✅ Filter only slots category
        const allGames = res?.data?.data || [];
     const slotsOnly = allGames.filter((game) => {
       const categoryName =
         game.category || game.type || game.game_category || "";
       return categoryName.toLowerCase().includes("slot");
     });

        setSlotsGames(slotsOnly);
        console.log("Filtered Slots Games:", slotsOnly);
      });
    }, []);
  return (
    <div>
      <div className="flex items-center justify-between gap-2 w-full  pr-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-2  bg-gradient-to-r from-[#EDD188] to-[#CA9D4B] gap-2  rounded-[2px] flex items-center">
            {" "}
          </div>
          <div className="text-[16px] font-extrabold text-[#D9AC4F]">Slot</div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div
              className="h-5 w-16 rounded-lg border-[0.5px] flex items-center justify-center text-[12px] p-2 text-[#D9AC4F]"
              onClick={() => navigate(`/allgames?activeModalValue=4`)}
            >
              {" "}
              ALL
              <div className="text-[12px] text-[#D9AC4F] pl-1 ">
                {slotsGames.length}
              </div>
              <div className="text-[12px] text-[#D9AC4F] ">
                {" "}
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full ">
        {slotsGames.length > 0 ? (
          slotsGames.slice(0, 12).map((item, i) => (
            <div
              onClick={() => {
                // console.log(
                //   `item id: ${item?.gameId} , userID:${userId},navigate:${navigate}, setloading${setLoading}`
                // );
                fetchGameURL(item?.gameId, userId, navigate, setLoading);
              }}
              key={i}
              className="flex flex-col items-center text-black p-2 "
            >
              <img
                src={item?.imgUrl}
                className="w-36 h-28 rounded-lg border  border-[#D9AC4F]"
                alt={item?.gameNameEn || "slot-game"}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-black text-xl w-full col-span-3">
            No data
          </div>
        )}
      </div>
      {/* <div className="w-full mt-2 font-bold flex items-center justify-center">
        <Link className="border-[1px] flex items-center justify-center w-full border-bg2 text-red p-2 rounded-full gap-2" to={`/allgames?activeModalValue=${1}`}>
          <button className="flex items-center">
            <img className="w-7 h-7" src={viewall} alt="ds" />
            <p className="text-xsm">View All</p>
          </button>
        </Link>
      </div> */}
    </div>
  );
}

export default SlotsGamesList