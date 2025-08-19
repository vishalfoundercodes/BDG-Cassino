import { fetchAllGamesSpribe, fetchGameURLSpribe } from "../reusable_component/gameApi";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import viewall from "../assets/usaAsset/homeScreen/viewall.png"
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function MiniGamesList() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId")
  const [allGamesListView, setAllGamesListView] = useState(null)
  useEffect(() => {
    fetchAllGamesSpribe(setAllGamesListView);
  }, []);
  //  console.log("allGamesListView",allGamesListView)
  return (
    <div>
      <div className="flex items-center justify-between gap-2 w-full  pr-2 mt-4">
        <div className="flex items-center gap-2">

          <div className="h-7 w-2 bg-customlightbtn gap-2  rounded-[2px] flex items-center"> </div>
          <div className="text-[16px] font-extrabold">Orignal</div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="h-5 w-16 rounded-lg border-[0.5px] flex items-center justify-center text-[12px] p-2"> ALL
              <div className="text-[12px] text-customlightbtn pl-1 ">{allGamesListView?.data?.message?.data?.length}</div>
              <div className="text-[12px] text-lightGray "> <IoIosArrowForward />
              </div>


            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full">
        {allGamesListView?.data?.message?.data?.length > 0 ? (
          allGamesListView?.data?.message?.data?.map((item, i) => (
            <div onClick={() => fetchGameURLSpribe(item?.game_id_long, userId, navigate, setLoading)} key={i} className=" flex flex-col items-center text-black p-2 ">
              <img src={item?.game_image} className="w-36 h-20 rounded-lg" alt="sd" />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-white text-xl w-full col-span-3">No data</div>
        )}
      </div>
      {/* <div className="w-full mt-2 font-bold flex items-center justify-center">
         <Link className="border-[1px] flex items-center justify-center w-full border-bg2 text-red p-2 rounded-full gap-2" to= {`/allgames?activeModalValue=${2}`}>
           <button className="flex items-center">
             <img className="w-7 h-7" src={viewall} alt="ds" />
             <p className="text-xsm">View All</p>
           </button>
         </Link>
       </div> */}
    </div>
  )
}

export default MiniGamesList