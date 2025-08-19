
import { fetchAllGames, fetchGameURL } from "../reusable_component/gameApi";
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import lotterycategorywingo from "../assets/usaAsset/homeScreen/lotterycategorywingo.png"
import lotterycategorytrx from "../assets/usaAsset/homeScreen/lotterycategorytrx.png"
import alllotterybg from "../assets/usaAsset/homeScreen/alllotterybg.png"
import aviatornew from "../assets/usaAsset/homeScreen/aviatornew.png"
import k3 from "../assets/usaAsset/homeScreen/kk3.png"
// import d5d from "../assets/usaAsset/homeScreen/d5d.png"
// import dragontiger from "../assets/usaAsset/homeScreen/dragontiger.png"
// import Plinko from "../assets/usaAsset/homeScreen/Plinko.png"
// import mines from "../assets/Mines/minesBg.png"
// import hntBg from "../assets/HeadTail/hntBg.png"
import trx_guc from "../assets/trx_guc.png"
// import andharBahar from "../assets/usaAsset/homeScreen/andharBahar.png"
import { useNavigate } from "react-router-dom";
import CasinoGamesList from "./CasinoGamesList";
import SlotsGamesList from "./SlotsGamesList";
import FishingGamesList from "./FishingGamesList";
import FlashGameList from "./FlashGameList";
import PokerGamesList from "./PokerGamesList";
import LobbyGamesList from "./LobbyGamesList";
import MiniGamesList from "./MiniGamesList";
// // import keno from "../assets/keno/keno.png"
// import spintowheel from "../assets/spintowheel/spintowheel.png"
// import dice from "../assets/dice.png"
// import redBlack from "../assets/redBlack.jpeg"
// import updown from "../assets/updown.png"
// import jhndimunda_gamelogo from "../assets/jhndimunda_gamelogo.png"
// import hilo from "../assets/hilo.png"
// import jackpot from "../assets/jackpotlogo.png"
// import hotairballoon from "../assets/hotairballoon.png"
// import miniroulette from "../assets/miniroulette.png"
// import teenpatti from "../assets/teenpattti.png"
// import game_on_lottery from "../assets/game_on_lottery.png"
// import titli from "../assets/titli.png"
// import lucky_12 from "../assets/lucky_12.png"
// import d_lucky_16 from "../assets/d_lucky_16.png"
// import funtarget from "../assets/funtarget.png"
// import triple_chance from "../assets/triple_chance.png"
import chickenRoadImage from "../assets/ChickenRoadGame/chicken favicon.png";

function PopularGamesList() {
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false);
  // const userId = localStorage.getItem("userId")
  // console.log("userId", userId)
  const [allGamesListView, setAllGamesListView] = useState(null)
  useEffect(() => {
    fetchAllGames(setAllGamesListView);
  }, []);
  // console.log("allGamesListView", allGamesListView)

  const games = [
    { id: 1, name: "Win Go", bgimage: alllotterybg, image: lotterycategorywingo, route: "/lottery/wingo", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    { id: 2, name: "GUC Win", bgimage: trx_guc, image: lotterycategorytrx, route: "/lottery/trxwingo", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    { id: 3, name: "K3 ", bgimage: alllotterybg, image: k3, route: "/lottery/k3", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 4, name: "5D", bgimage: alllotterybg, image: d5d, route: "/comingsoon", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
  ];

  const hotgames = [
    {
      id: 1,
      name: "Avaitor",
      bgimage: aviatornew,
      image: aviatornew,
      route: "/aviator",
      description1: "Guess Number",
      description2: "Green/Red/Violet to win",
      bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
    },
    // { id: 2, name: "Plinko", bgimage: Plinko, image: Plinko, route: "/plinko", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 3, name: "Mines", bgimage: mines, image: mines, route: "/mines", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 4, name: "Head n Tails", bgimage: hntBg, image: hntBg, route: "/headsntails", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 5, name: "Keno", bgimage: keno, image: keno, route: "/keno", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 6, name: "Spin To Wheel", bgimage: spintowheel, image: spintowheel, route: "/spintowheel", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 7, name: "Dice", bgimage: dice, image: dice, route: "/dice", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 8, name: "In Out ", bgimage: andharBahar, image: andharBahar, route: "/andarbahar", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 9, name: "Dragon Tiger", bgimage: dragontiger, image: dragontiger, route: "/dragonTiger", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 10, name: "7UpDown", bgimage: updown, image: updown, route: "/sevenupdown", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 11, name: "Red vs Black", bgimage: redBlack, image: redBlack, route: "/rednblack", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 12, name: "Jhandi Munda", bgimage: jhndimunda_gamelogo, image: jhndimunda_gamelogo, route: "/jhandimunda", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 13, name: "HiLo", bgimage: hilo, image: hilo, route: "/hilo", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 14, name: "Jackpot", bgimage: jackpot, image: jackpot, route: "/jackpot", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 15, name: "Hot air ballon", bgimage: hotairballoon, image: hotairballoon, route: "/hotairballon", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 16, name: "Teenpatti", bgimage:teenpatti , image: teenpatti, route: "/teenpatti", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 17, name: "Mini Roulette", bgimage: miniroulette, image: miniroulette, route: "/miniroulette", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 18, name: "Gameon lottery", bgimage: game_on_lottery, image: game_on_lottery, route: "/gameonlottery", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 19, name: "Titli kabooter", bgimage: titli, image: titli, route: "/titli", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 20, name: "Lucky 12", bgimage: lucky_12, image: lucky_12, route: "/lucky12", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 21, name: "Lucky 16", bgimage: d_lucky_16, image: d_lucky_16, route: "/lucky16", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 22, name: "Fun Target", bgimage: funtarget, image: funtarget, route: "/funtarget", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // { id: 23, name: "Triple Chance", bgimage: triple_chance, image: triple_chance, route: "/triplechance", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    {
      id: 24,
      name: "Chicken Road Game",
      bgimage: chickenRoadImage,
      image: chickenRoadImage,
      route: "/chickenRoadGame",
      description1: "Guess Number",
      description2: "Green/Red/Violet to win",
      bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
    },
  ];
  // console.log("allGamesListView?.data?.casino?.length", allGamesListView)
  return (
    <>
      {/* <div className="flex items-center justify-between gap-2 w-full  pr-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-2 bg-[#D9AC4F] gap-2  rounded-[2px] flex items-center">
            {" "}
          </div>
          <div className="text-[16px] font-extrabold font-serif text-[#D9AC4F]">
            Lottery
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div
              onClick={() => navigate(`/allgames?activeModalValue=${0}`)}
              className="h-5 w-16 rounded-lg border-[0.5px] flex items-center justify-center text-[12px] p-2"
            >
              {" "}
              ALL
              <div className="text-[12px] text-customlightbtn pl-1 ">
                {games?.length}
              </div>
              <div className="text-[12px] text-lightGray ">
                {" "}
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-2 w-full pr-2 gap-2 pt-2">
        {games.length > 0 ? (
          games.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              style={{
                backgroundImage: `url(${item?.bgimage})`,
                backgroundPosition: "center",
              }}
              className="flex flex-col bg-contain bg-center bg-no-repeat items-center text-black p-2 h-[180px] w-full rounded-lg cursor-pointer"
            >
              <div className="text-[18px] font-serif font-bold text-white">
                {item.name}
              </div>
              <div className="h-16 w-16 pt-5">
                <img className="object-fill" src={item.image} alt="" />
              </div>
              <div className="pt-12 pl-20">
                <div className="h-5 w-16 rounded-xl border-[0.5px] flex items-center justify-center text-[16px] text-white font-serif font-extrabold p-2">
                  Go
                  <div className="text-[16px] text-white">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-white text-xl w-full col-span-3">
            No data
          </div>
        )}
      </div> */}

      {/* hotgames */}
      {/* <div className="flex items-center justify-between gap-2 w-full  pr-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-2 bg-[#D9AC4F] gap-2  rounded-[2px] flex items-center">
            {" "}
          </div>
          <div className="text-[16px] font-extrabold text-[#D9AC4F]">Hot</div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="h-5 w-16 rounded-lg border-[0.5px] flex items-center justify-center text-[12px] p-2">
              {" "}
              ALL
              <div className="text-[12px] text-customlightbtn pl-1 ">
                {hotgames?.length}
              </div>
              <div className="text-[12px] text-lightGray ">
                {" "}
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-2 w-full pr-2 gap-2 pt-2">
        <div className="col-span-2 flex">
        {hotgames.length > 0 ? (
          hotgames.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className="flex flex-col items-center text-black px-2   h-[165px] w-full  rounded-lg "
              alt="sd"
            >
              <img
                className="h-full w-full  rounded-lg"
                src={item.bgimage}
                alt=""
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-black text-xl w-full col-span-3">
            No data
          </div>
        )}
        </div>        
      </div> */}
      {/* <div className="grid grid-cols-2 w-full pr-2 gap-2 pt-2">
        <div className="col-span-1">
          <div
            onClick={() => navigate("/aviator")} className=" flex flex-col items-center text-black p-2  h-[180px] w-full  rounded-lg" alt="sd">
            <img className="h-[180px] w-full  rounded-lg" src={aviatornew} alt="" />
          </div>
        </div>
      </div> */}

      {/* casino games */}
      <div>
        {allGamesListView?.data?.casino?.length > 0 ||
        allGamesListView?.data?.casino?.length === undefined ? (
          <div></div>
        ) : (
          <CasinoGamesList />
        )}
      </div>
      <div>
        {allGamesListView?.data?.slots?.length > 0 ||
        allGamesListView?.data?.slots?.length === undefined ? (
          <div></div>
        ) : (
          <SlotsGamesList />
        )}
      </div>
      <div>
        {allGamesListView?.data?.poker?.length > 0 ||
        allGamesListView?.data?.poker?.length === undefined ? (
          <div></div>
        ) : (
          <PokerGamesList />
        )}
      </div>
      <div>
        {allGamesListView?.data?.fishing?.length > 0 ||
        allGamesListView?.data?.fishing?.length === undefined ? (
          <div></div>
        ) : (
          <FishingGamesList />
        )}
      </div>
      <div>
        {allGamesListView?.data?.fishing?.length > 0 ||
        allGamesListView?.data?.fishing?.length === undefined ? (
          <div></div>
        ) : (
          <FlashGameList />
        )}
      </div>
      {/* <div>
        {allGamesListView?.data?.lobby?.length > 0 ||
        allGamesListView?.data?.lobby?.length === undefined ? (
          <div></div>
        ) : (
          <LobbyGamesList />
        )}
      </div> */}
      <div>
        {allGamesListView?.data?.message?.data?.length > 0 ||
        allGamesListView?.data?.message?.data?.length === undefined ? (
          <div></div>
        ) : (
          <MiniGamesList />
        )}
      </div>

      {/* <SlotsGamesList/>
      <FishingGamesList/>
      <PokerGamesList/>
      <LobbyGamesList/>
      <MiniGamesList/> */}

      {/* <div className="w-full mt-2 font-bold flex items-center justify-center">
        <Link className="border-[1px] flex items-center justify-center w-full border-bg2 text- p-2 rounded-full gap-2" to={`/allgames?activeModalValue=${1}`}>
          <button className="flex items-center">
            <img className="w-7 h-7" src={viewall} alt="ds" />
            <p className="text-xsm">View </p>
          </button>
        </Link>
      </div> */}
    </>
  );
}

export default PopularGamesList;
