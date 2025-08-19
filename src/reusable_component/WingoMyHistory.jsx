/* eslint-disable react/prop-types */
import { useState } from "react";
import noData from "../assets/images/no_data_available.png"

const WingoMyHistory = ({ myHistoryData, handlehistorybox }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    // console.log("wingo my history ", myHistoryData)
    return (
        <>
            {handlehistorybox === 2 ? (
                myHistoryData?.data?.length > 0 ? (
                    myHistoryData?.data?.map((item, i) => (
                        <div key={i} className="px-4 w-full mt-3">
                            <div
                                className="bg-redLight text-white  rounded-md px-4 py-2 grid grid-cols-3"
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            >
                                <div className="col-span-2 flex gap-2">
                                    <div className="w-10 h-10 flex text-xsm flex-col rounded-md font- overflow-hidden relative">
                                        {item?.number == 0 ? (
                                            <>
                                                <div className="relative h-16 w-full">
                                                    <div
                                                        className="absolute inset-0 bg-red"
                                                        style={{
                                                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                                        }}
                                                    ></div>
                                                    <div
                                                        className="absolute inset-0 bg-voilet"
                                                        style={{
                                                            clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)'
                                                        }}
                                                    ></div>
                                                </div>
                                            </>
                                        ) : item?.number == 5 ? (
                                            <>
                                                <div className="relative h-16 w-full">
                                                    <div
                                                        className="absolute inset-0 bg-green"
                                                        style={{
                                                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                                        }}
                                                    ></div>
                                                    <div
                                                        className="absolute inset-0 bg-voilet"
                                                        style={{
                                                            clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%, 0 100%)'
                                                        }}
                                                    ></div>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className={`flex-1 text-white flex items-center justify-center ${item?.number == 1 ||
                                                    item?.number == 3 ||
                                                    item?.number == 7 ||
                                                    item?.number == 9 ||
                                                    item?.number == 10
                                                    ? "bg-green"
                                                    : item?.number == 2 ||
                                                        item?.number == 4 ||
                                                        item?.number == 6 ||
                                                        item?.number == 8 ||
                                                        item?.number == 30
                                                        ? "bg-customred"
                                                        : item?.number == 20 ? "bg-voilet" : item?.number == 40
                                                            ? "bg-yellow"
                                                            : item?.number == 50
                                                                ? "bg-bg3"
                                                                : "bg-voilet"
                                                    }`}
                                            >
                                                {item?.number == 1 ||
                                                    item?.number == 3 ||
                                                    item?.number == 7 ||
                                                    item?.number == 9 || item?.number == 2 ||
                                                    item?.number == 4 ||
                                                    item?.number == 6 ||
                                                    item?.number == 8 ? item?.number : item?.number == 10 ? "G" : item?.number == 20 ? "V" : item?.number == 30 ? "R" : item?.number == 40 ? "B" : item?.number == 50 ? "S" : ""}
                                            </div>
                                        )}
                                        {(item?.number == 0 || item?.number == 5) && (
                                            <div className="absolute inset-0 font-bold flex items-center justify-center text-white">
                                                {item?.number}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p>{item?.games_no}</p>
                                        <p className="text-white opacity-55 text-xs text-nowrap">{item?.created_at}</p>
                                    </div>
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <div>
                                        <div
                                            className={`font-bold flex items-center justify-center ${item?.win_amount === 0 && item?.status === 0 ? "text-gray border-gray" : (item?.win_amount === 0
                                                ? "text-customred border-customred"
                                                : "text-green border-green"
                                            )} border w-20 h-8 rounded-md`}
                                        >
                                            {item?.win_amount === 0 && item?.status === 0 ? "Pending" : (item?.win_amount === 0 ? "Failed" : "Success")}
                                        </div>
                                        <div
                                            className={`font-bold text-center ${item?.win_amount === 0 && item?.status === 0 ? "text-gray" : (item?.win_amount === 0 ? "text-customred" : "text-green")}`}
                                        >
                                            {item?.win_amount === 0 && item?.status === 0 ? "--" : (item?.win_amount === 0
                                                ? `- ${item?.amount}.00`
                                                : `+ ${item?.win_amount}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {activeIndex === i && (
                                <div className="w-full gap-2 mt-3 text-sm">
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Order number</p>
                                        <p>{item?.order_id}</p>
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Period</p>
                                        <p>{item?.games_no}</p>
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Purchase amount</p>
                                        <p>{item?.amount}</p>
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Amount after tax</p>
                                        <p className="text-customred">{item?.trade_amount}</p>
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Tax</p>
                                        <p>{item?.commission}</p>
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Result</p>
                                        {item?.status !== 0 ? <p>
                                            {item?.win_number === 1 || item?.win_number === 3 ? (
                                                <>
                                                    <span className="text-green font-bold">
                                                        {item?.win_number}
                                                    </span>{" "}
                                                    <span className="text-green">Green</span>
                                                    <span className="text-bg3">, Small</span>
                                                </>
                                            ) : item?.win_number === 7 || item?.win_number === 9 ? (
                                                <>
                                                    <span className="text-green font-bold">
                                                        {item?.win_number}
                                                    </span>{" "}
                                                    <span className="text-green">Green</span>
                                                    <span className="text-yellow">, Big</span>
                                                </>
                                            ) : item?.win_number === 2 || item?.win_number === 4 ? (
                                                <>
                                                    <span className="text-customred font-bold">
                                                        {item?.win_number}
                                                    </span>{" "}
                                                    <span className="text-customred">Red</span>
                                                    <span className="text-bg3">, Small</span>
                                                </>
                                            ) : item?.win_number === 6 || item?.win_number === 8 ? (
                                                <>
                                                    <span className="text-customred font-bold">
                                                        {item?.win_number}
                                                    </span>{" "}
                                                    <span className="text-customred">Red</span>
                                                    <span className="text-yellow">, Big</span>
                                                </>
                                            ) : item?.win_number === 0 ? (
                                                <>
                                                    <span className="text-customred font-bold">
                                                        {item?.win_number}
                                                    </span>{" "}
                                                    <span className="text-customred">Red</span>
                                                    <span className="text-bg3">, Small</span>
                                                </>
                                            ) : item?.win_number === 5 ? (
                                                <>
                                                    <span className="text-green font-bold">
                                                        {item?.win_number}
                                                    </span>{" "}
                                                    <span className="text-green">Green</span>
                                                    <span className="text-bg3">, Big</span>
                                                </>
                                            ) : item?.win_number == 10 ? (
                                                <>
                                                    
                                                    <span className="text-green">Green</span>
                                                    {/* <span className="text-bg3">, Big</span> */}
                                                </>
                                            ) : item?.win_number == 20 ? (
                                                <>
                                                    
                                                    <span className="text-voilet">Violet</span>
                                                    {/* <span className="text-bg3">, Big</span> */}
                                                </>
                                            ) : item?.win_number == 30 ? (
                                                <>
                                                    
                                                    <span className="text-customred">Red</span>
                                                    {/* <span className="text-bg3">, Big</span> */}
                                                </>
                                            ) : item?.win_number == 40 ? (
                                                <>
                                                    
                                                    <span className="text-yellow">Big</span>
                                                    {/* <span className="text-bg3">, Big</span> */}
                                                </>
                                            ) : item?.win_number == 50 ? (
                                                <>
                                                    
                                                    <span className="text-bg3">Small</span>
                                                    {/* <span className="text-bg3">, Big</span> */}
                                                </>
                                            ) : item?.win_number}
                                        </p> : "--"}
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Select</p>
                                        <p>{item?.number == 10 ? <p className="text-green">Green</p> : item?.number == 20 ? <p className="text-voilet">Violet</p> : item?.number == 30 ? <p className="text-customred">Red</p> : item?.number == 40 ? <p className="text-yellow">Big</p> : item?.number == 50 ? <p className="text-bg3">Small</p> : item?.number}</p>
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Status</p>
                                        {item?.status === 2 ? <span className="text-customred">Failed</span> : item?.status === 1 ? <span className="text-green">Succeed</span> : <p>Unpaid</p>}

                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Win/Loss</p>
                                        {item?.status !== 0 ? <p>{item?.win_amount == 0 ? (<>
                                            <span className="text-customred">0.00</span>
                                        </>) : <span className="text-green">{item?.win_amount}</span>}</p> : <p>--</p>}
                                    </div>
                                    <div className="bg-redLight text-white w-full mt-1 py-2 flex items-center justify-between px-2  rounded-md">
                                        <p>Order time</p>
                                        <p>{item?.created_at}</p>
                                    </div>

                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="h-64 xsm:h-[22rem] flex flex-col justify-center  mx-4 p-3 mt-3 mb-3 ">
                        <div className="flex justify-center items-center mt-5">
                            <img
                                src={noData}
                                alt="Not Found"
                                className="w-44 h-28"
                            />
                        </div>
                        <p className="text-center mt-5 text-xsm  font-bold text-white">
                            No data
                        </p>
                    </div>
                )
            ) : null}
        </>
    );
};

export default WingoMyHistory;
