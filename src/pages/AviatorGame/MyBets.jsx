/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { configModalUsaWin } from '../../utils/apis'

function MyBets({ betApiHitted }) {
    const userId = localStorage.getItem("userId")

    const [winninDataNew, setWinninDataNew] = useState(null)
    const myBetHandler = async () => {
        // const sr = hotAirData?.status === 0 ? hotAirData?.period : hotAirData?.period + 1
        const payload = {
            uid: userId,
            game_id: 5,
        }
        // console.log("pYLOAD", payload)
        try {
            const res = await axios.post(`${configModalUsaWin}aviator_history`, payload)
            // toast.success(res?.data?.message)
            // console.log("betbetebetebete", res)
            if (res?.data?.status === 200) {
                setWinninDataNew(res?.data?.data)
            } else {
                 toast.warn(res?.data?.message, {
                    className: 'custom-toast custom-toast-warn',
                });
            }
        } catch (err) {
            if (err?.response?.data?.status === 500) {
                toast.error("Server problem")
            } else {
                toast.warn(err?.response?.data?.message, {
                    className: 'custom-toast custom-toast-warn',
                });
            }
        }
    }
    useEffect(() => {
        if (userId) {
            myBetHandler()
        }
        if (userId && (betApiHitted?.bet1 || betApiHitted?.bet2||betApiHitted?.cashout1||betApiHitted?.cashout2)) {
            myBetHandler()
        }
    }, [userId, betApiHitted])
    // console.log("winninDataNew", winninDataNew)
    return (
        <div className='text-white w-full h-full'>
            {/* <button onClick={myBetHandler}>click</button> */}
            <div className="w-full flex items-center py-0.5 justify-between">
                <p className="text-gray w-[40%]">Date</p>
                <p className="text-gray -mr-10 w-[30%]">Bet, X</p>
                <p className="text-gray w-[30%]">Cash out,</p>
            </div>
            <div className="w-full h-full overflow-y-auto  hide-scrollbar">
                <div className=" overflow-y-auto">
                    {winninDataNew?.map((data) => (
                        <div
                            key={data.id}
                            className={`flex px-1 mt-0.5 items-center justify-between rounded-lg shadow-md transform transition-transform duration-500 ease-in-out 
    ${data.win>0 ? 'bg-[#123405] bg-opacity-70 border-[1px] border-[#427F00]' : ''}`}
                            style={{
                                animation: "fadeInFromTop 300ms ease-in-out",
                            }}
                        >
                            <div className="w-[40%] flex items-center space-x-1 xsm:space-x-2">
                                {/* <img
                            src={data.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        /> */}
                                <p className="text-xs 3xl:text-xsm font-semibold">{data.created_at?.slice(0, 10)}&nbsp; {data.created_at?.slice(11, 19)}  </p>
                            </div>
                            <div className="w-[30%] flex justify-start items-center -ml-1 gap-2">
                                <p className="text-white">{data.amount}</p>
                                <div className="w-14">
                                    {data.multiplier>0 && (
                                    <p className="text-xsm bg-black px-2 py-0.5 rounded-full">
                                        {data.multiplier}x
                                    </p>
                                     )}
                                </div>
                            </div>
                            <div className="flex w-[30%] gap-6">
                                <div className="flex justify-center items-center rounded-lg w-[4.2rem] h-12">
                                    {data?.win}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyBets