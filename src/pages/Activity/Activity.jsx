
import gift_redeem from "../../assets/images/gift_redeem.png"
import sign_in_banner from "../../assets/images/sign_in_banner.png"
import reward from "../../assets/usaAsset/activity/reward.png"
import bonus from "../../assets/usaAsset/activity/bonus.png"
import bettingRebate from "../../assets/usaAsset/activity/bettingRebate.png"
import { Link } from "react-router-dom";
import axios from "axios"
import apis from "../../utils/apis"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import FirstDepositModal from "../../reusable_component/FirstDepositModal"
import Loader from "../../reusable_component/Loader/Loader"
function Activity() {
  const [loading, setLoading] = useState(false);
  const [firstDepsoitModal, setFirstDepsoitModal] = useState(localStorage.getItem("firstDepositModalValue") === "1");
  const [bannerData, setBannerData] = useState([])

  const bannerDataHandler = async () => {
    setLoading(true)
    try {
      console.log(`Fetching banner data from: ${apis.slider}`);
      const res = await axios.get(apis.slider)
      // console.log("res for banner", res)
      if (res?.status === 200) {
        setLoading(false);
        setBannerData(res?.data?.data);
        console.log("bannerData", res?.data?.data);
      } else {
        setLoading(false);
        // toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      // console.log(err)
    }
  }
  useEffect(() => {
    bannerDataHandler()
  }, [])

  useEffect(() => {
    const userid= localStorage.getItem("userId")
    // console.log("userid",userid)
    const status = localStorage.getItem("firstDepositModalValue");
    if (status === "0"&&userid) {
        setFirstDepsoitModal(true);
    } else {
        setFirstDepsoitModal(false);
    }
}, [])
  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      {firstDepsoitModal && (
        <div className="relative z-50 font-roboto">
          <FirstDepositModal
            firstDepsoitModal={firstDepsoitModal}
            setFirstDepsoitModal={setFirstDepsoitModal}
            onClose={() => setFirstDepsoitModal(false)}
          />
        </div>
      )}
      <div className="font-roboto w-full pb-20">
        <div className=" px-3 pb-2 bg-gradient-to-r from-red to-redLight">
          <h2 className="text-white font-semibold text-lg ">Activity</h2>
          <p className="text-xs pt-5">
            Please remember to follow the event page. <br /> We will launch user
            feedback activities from time to time.
          </p>
        </div>
        {/* Content Section */}
        <div className="p-3">
          <div className="flex items-center text-lightGray  justify-between mb-6">
            {/* <Link to="/activity/award" className="flex flex-col items-center justify-center">
              <img src={reward} className="h-10 w-10" alt="sd" />
              <p className="text-xs text-center  mt-1">Activity Award</p>
            </Link> */}
            <Link
              to="/activity/invitationbonus"
              className="flex flex-col items-center justify-center"
            >
              <img src={bonus} className="h-10 w-10" alt="sd" />
              <p className="text-xs text-center mt-1">Invitation Bonus</p>
            </Link>
            <Link
              to="/activity/rebate"
              className="flex flex-col items-center justify-center"
            >
              <img src={bettingRebate} className="h-10 w-10" alt="sd" />
              <p className="text-xs text-center  mt-1">Betting rebate</p>
            </Link>
            <Link
              to="/activity/superJackpot"
              className="flex flex-col items-center justify-center"
            >
              <img src={bonus} className="h-10 w-10" alt="sd" />
              <p className="text-xs text-center  mt-1">Super Jackpot</p>
            </Link>
            {/* <Link to="/activity/invitationbonus" className="flex flex-col items-center justify-center">
            <img src={bonus} className="h-8 w-8" alt="sd" />
            <p className="text-xs text-center  mt-1">First deposit bonus</p>
          </Link> */}
          </div>

          {/* Gift and Attendance Bonus Section */}
          <div className="grid grid-cols-2 gap-2.5 mb-6 ">
            <Link
              to="/activity/gifts"
              className="rounded-lg shadow-md bg-[#333332]"
            >
              <img
                src={gift_redeem}
                alt="Gifts"
                className="w-full h-[50%] object-fill rounded"
              />
              <h3 className="font-bold text-white mt-2 text-sm px-2">Gifts</h3>
              <p className="text-white text-xs font-light px-2">
                Enter the redemption code to receive gift rewards.
              </p>
            </Link>
            <Link
              to="/activity/attendance"
              className=" rounded-lg shadow-md bg-[#333332]"
            >
              <img
                src={sign_in_banner}
                alt="Attendance Bonus"
                className="w-full h-[50%] object-fill rounded"
              />
              <h3 className="font-bold text-white mt-2 text-sm px-2">
                Attendance Bonus
              </h3>
              <p className="text-white font-light text-xs px-2">
                The more consecutive days you sign in, the higher the reward
                will be.
              </p>
            </Link>
          </div>

          {/* Promotion Banner */}
          {bannerData?.map((item, i) => (
            <Link key={i} to={`${item.activity_image_url}`}>
              <div className="rounded-lg shadow-md bg-[#333332] mt-2">
                <img
                  src={item?.activity_image}
                  alt={item?.name}
                  className="w-full h-40 object-fill rounded-lg"
                />
                <h1>{item?.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Activity;
