import apis from '../../utils/apis';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import giftRedeemList from "../../assets/usaAsset/activity/giftRedeemList.png"
import giftHistory from "../../assets/usaAsset/activity/giftHistory.png";
import moment from 'moment';
import Loader from '../../reusable_component/Loader/Loader';
function ActivityGifts() {
    const [loading, setLoading] = useState(false);
    const [giftCode, setGiftCode] = useState("")
    const [redeemedGiftList, setRedeemedGiftList] = useState([])
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()
    const redeemGift = async () => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        const payload = {
            userid: userId,
            code: giftCode
        }
        // console.log('payload', payload)
        try {
          // console.log(`redeeming gift with code: ${apis.redeemGift}`);
            const res = await axios.post(apis.redeemGift, payload)
            if (res?.data?.status === 200 || res?.data?.status === "200") {
                setLoading(false)
                toast.success(res?.data?.message)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            // console.log("object", err)
            setLoading(false)
            toast.error(err)
            if (err?.response?.data?.status === "500") {
                // console.log("server erro")
                toast.error(err?.response?.data?.message || "Something went wrong")
            } else {
                toast.error(err?.response?.data?.message)
            }
        }
    }

    const redeemGiftListHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${apis.redeemGiftList}${userId}`)
            // console.log("res", res)
            if (res?.data?.status === 200) {
                setLoading(false)
                setRedeemedGiftList(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            setLoading(false)
            if (err?.response?.data?.status == "500") {
                // console.log("er", err)
                toast.error(err?.response?.data?.message || "Something went wrong")
            } else {

                toast.error(err?.response?.data?.message)
            }
        }
    }
    useEffect(() => {
        if (userId) {
            redeemGiftListHandler()
        }
    }, [userId])
    return (
      <div className="mx-3 font-roboto">
        {loading && <Loader setLoading={setLoading} loading={loading} />}
        <div className="bg-customdarkBlue text-sm text-white opacity-80 rounded p-2 mt-[10rem] pb-10">
          <p className="text-white opacity-80">Hi</p>
          <p className="text-white opacity-80">We have a gift for you</p>
          <p className="text-white mt-5">Please enter the gift code below</p>
          <input
            onChange={(e) => setGiftCode(e.target.value)}
            className="w-full outline-none bg-red rounded-full p-3 pl-5 mt-3"
            type="text"
            placeholder="Please enter gift code"
          />
          <button
            onClick={redeemGift}
            className="bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206] rounded-full w-full text-sm py-1.5 mt-5"
          >
            Receive
          </button>
        </div>
        <div className="mt-3">
          <div className="flex mt-10 items-center gap-3  text-white ">
            <img className="w-6 h-6" src={giftHistory} alt="sa" />
            <h1 className="text-nowrap text-lg font-bold">
              {/* Gift Redeemed List */}
              History
            </h1>
          </div>
          <table className="w-full mt-10">
            <thead>
              <tr className="text-white font-bold text-[13px]">
                <th className="text-center">Gift Code</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Status</th>
                <th className="text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {redeemedGiftList?.length > 0 ? (
                redeemedGiftList?.map((item, i) => (
                  <tr
                    key={i}
                    className="text-white text-[12px] bg-customdarkBlue"
                  >
                    <td className="text-center py-2">{item?.gift_code}</td>
                    <td className="text-center">{item?.amount}</td>
                    <td className="text-center">
                      {item?.status === 1 ? "Redeem" : "Yet to redeem"}
                    </td>
                    <td className="text-center">
                      {moment(item?.created_at).format("DD-MM-YYYY")}
                    </td>
                  </tr>
                ))
              ) : (
                <p className="text-center w-full  justify-center">no data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ActivityGifts