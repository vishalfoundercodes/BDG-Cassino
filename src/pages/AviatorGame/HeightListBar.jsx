/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { configModalUsaWin } from '../../utils/apis'

// eslint-disable-next-line react/prop-types
function HeightListBar({ hotAirData, betApiHitted, refreshHeightList, setRefreshHeightList }) {
    const [getData, setGetData] = useState(null)
    // console.log("refreshHeightList",refreshHeightList)
    const getPreviousResult = async () => {
        // console.log("first")
        try {
            const res = await axios.get(`${configModalUsaWin}aviator_last_five_result`)
            // alert("hittedd")
            console.log("aviator_last_five_result", res)
            if (res?.data?.status === 200 || res?.data?.status === "200") {
                setGetData(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (hotAirData?.status === 0) {
            getPreviousResult()
        }
    }, [hotAirData?.status])
    // console.log("hotAirData",hotAirData)
    const colors = ["text-[#F85050]", "text-blue-500", "text-green", "text-yellow", "text-purple-500", "text-pink-500"];

    return (
        <div className='overflow-x-auto hide-scrollbar w-full flex items-center gap-2'>
            {getData?.map((item, i) => (
                <div key={i} className={`bg-blackAviator2 rounded-full px-3 py-0.5 text-xsm ${colors[i % colors.length]}`}
                >
                    {item?.price}
                </div>
            ))}
        </div>
    )
}

export default HeightListBar