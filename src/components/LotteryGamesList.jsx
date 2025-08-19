
import { Link, useNavigate } from "react-router-dom";
import lotterycategorywingo from "../assets/usaAsset/homeScreen/lotterycategorywingo.png"
import lotterycategorytrx from "../assets/usaAsset/homeScreen/lotterycategorytrx.png"
import k3 from "../assets/usaAsset/homeScreen/kk3.png"
import d5d from "../assets/usaAsset/homeScreen/d5d.png"
import { useEffect, useState } from "react";
import { fetchAllGamesSpribe, fetchGameURLSpribe } from "../reusable_component/gameApi";
import Loader from "../reusable_component/Loader/Loader";
import { IoIosArrowForward } from "react-icons/io";


function LotteryGamesList() {
    const [loading, setLoading] = useState(false)
    const [allGamesListView, setAllGamesListView] = useState(null)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        fetchAllGamesSpribe(setAllGamesListView);
    }, []);
    // console.log("allGamesListView?.data?.message?.data", allGamesListView?.data?.message?.data[0]?.game_id_long)
    const games = [
        { id: 1, name: "Win Go", image: lotterycategorywingo, route: "/lottery/wingo", description1: "The highest bonus in history", description2: "Through the platform WIN GO Hash lottery seed as the result of the lottery", bgColor: "bg-redLight" },
        { id: 2, name: "Trx Win", image: lotterycategorytrx, route: "/lottery/trxwingo", description1: "The highest bonus in history", description2: "By obtaining the real-time hash value of the TRX blockchain as the result of the lottery", bgColor: "bg-redLight" },
        // { id: 3, name: "K3", image: k3, route: "/lottery/k3", description1: "The highest bonus in history", description2: "The player predicts 3 DICE numbers, the winning rate is high, the gameplay is simple, and it is easy to win", bgColor: "bg-redLight" },
        // { id: 4, name: "5D", image: d5d, route: "/comingsoon", description1: "The highest bonus in history", description2: "5 numbers are used as the result of the lottery, and the playing methods are flexible and diverse", bgColor: "bg-redLight" },


    ];

    return (
        <>

            <div className="flex items-center justify-between gap-2 w-full  pr-2 mt-4 mb-3">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-2 bg-customlightbtn gap-2  rounded-[2px] flex items-center"> </div>
                    <div className="text-[16px] font-extrabold">Lottery</div>
                </div>
                {allGamesListView?.data?.lobby?.length > 6 ? <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="h-5 w-16 rounded-lg border-[0.5px] flex items-center justify-center text-[12px] p-2"> ALL
                            <div className="text-[12px] text-customlightbtn pl-1 ">{allGamesListView?.data?.lobby?.length}</div>
                            <div className="text-[12px] text-lightGray "> <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                </div> : <div></div>}
            </div>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            {games?.map((game) => {
                // console.log("gamegamegame",game)
                return (
                    <Link className="w-full mb-2  pr-2 flex items-center justify-center" to={`${game?.route}`} key={game.id}>
                        <div className={`${game.bgColor} flex justify-between px-1  pt-1 pb- w-full rounded-xl h-32`}>
                            <div className="col-span-1 pl-3">
                                <div></div>
                                <div className="h-[105px] w-20 bg-gradient-to-l  from-customlightbtn to-customdarkBluebtn rounded-lg  m-2  flex flex-col items-center justify-center font-serif font-extrabold text-[12px]">
                                    <div>{game.name}</div>
                                    <img className="h-14 w-14" src={game.image} alt="" />
                                </div>
                            </div>
                            <div className=" w-[80%] m-2">
                                <div className="flex justify-between">
                                    <div className="font-bold text-[14px] font-serif">{game.name}</div>
                                    <div className="h-6 w-20 rounded-2xl bg-gradient-to-l  from-customlightbtn to-customdarkBluebtn flex items-center justify-center font-serif"> Go
                                        <div className=" text-white "> <IoIosArrowForward />
                                        </div>

                                    </div>
                                </div>
                                <div className="h-7 w-full rounded-lg bg-red mt-2 flex items-center justify-between px-2">
                                    <div className=" w-30 text-[10px]  flex items-start justify-start">{game.description1}</div>
                                    <div className="h-3 w-[0.5px] bg-white"></div>
                                    <div className="text-customlightbtn">0.00</div>
                                </div>
                                <div
                                    className="flex items-start justify-between pt-2">
                                    <div className="h-3 w-[3px] bg-customlightBlue"></div>
                                    <div className="text-[10px] pl-1
                                text-slate-300">{game.description2}</div>
                                </div>
                            </div>


                        </div>
                    </Link>
                )
            })}


            {/* </Link>
            ))} */}
            {/*         
            <div className="w-full mt-2 font-bold flex items-center justify-center">
                <Link className="border-[1px] flex items-center justify-center w-full border-bg2 text-red p-2 rounded-full gap-2" to={`/allgames?activeModalValue=${0}`}>
                    <button className="flex items-center">
                        <img className="w-7 h-7" src={viewall} alt="ds" />
                        <p className="text-xsm">View All</p>
                    </button>
                </Link>
            </div> */}
        </>
    );
}

export default LotteryGamesList;
