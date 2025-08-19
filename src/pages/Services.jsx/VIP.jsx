// import { FaRegCopy } from 'react-icons/fa'
import { useEffect, useState } from "react";
import profilevip1 from "../../assets/icons/profilevip1.png"
import vip1 from "../../assets/icons/vip1.png"
import vip2 from "../../assets/icons/vip2.png"
import vip3 from "../../assets/icons/vip3.png"
import vip4 from "../../assets/icons/vip4.png"
import vip5 from "../../assets/icons/vip5.png"
import vip6 from "../../assets/icons/vip6.png"
import vip7 from "../../assets/icons/vip7.png"
import vip8 from "../../assets/icons/vip8.png"
import vip9 from "../../assets/icons/vip9.png"
import vip10 from "../../assets/icons/vip10.png"
import viptop1 from "../../assets/icons/viptop1.png"
import viptop2 from "../../assets/icons/viptop2.png"
import viptick from "../../assets/icons/viptick.png"
import red_diamond from "../../assets/usaAsset/account/red_diamond.png"
import vipstarcoin from "../../assets/usaAsset/account/monthlyReward.png"
import vipGift from "../../assets/usaAsset/account/vipGift.png"
import rebateRate from "../../assets/usaAsset/account/rebateRate.png"
import vipweal from "../../assets/usaAsset/account/red_coins.png"
import yellowheart from "../../assets/usaAsset/account/yellowHeart.png"
import depo_wallet from "../../assets/icons/depo_wallet.png"
import vipcrown from "../../assets/icons/vipcrown.png"
import vipwelfare1 from "../../assets/icons/vipwelfare1.png"
import vipwelfare2 from "../../assets/icons/vipwelfare2.png"
import vipwelfare5 from "../../assets/icons/vipwelfare5.png"
import vipununlocked from "../../assets/icons/vipununlocked.png"
import vipbg1 from "../../assets/icons/vipbg1.png"
import vipbg2 from "../../assets/icons/vipbg2.png"
import vipbg3 from "../../assets/icons/vipbg3.png"
import vipbg4 from "../../assets/icons/vipbg4.png"
import vipbg5 from "../../assets/icons/vipbg5.png"
import vipbg6 from "../../assets/icons/vipbg6.png"
import vipbg7 from "../../assets/icons/vipbg7.png"
import vipbg8 from "../../assets/icons/vipbg8.png"
import vipbg9 from "../../assets/icons/vipbg9.png"
import vipbg10 from "../../assets/icons/vipbg10.png"
import no_data_available from '../../assets/images/no_data_available.png';

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const avatar = "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg";
import apis from '../../utils/apis'
import { RiVipDiamondFill } from "react-icons/ri";
import Loader from "../../reusable_component/Loader/Loader";
const profileApi = apis.profile
function VIP() {
  const [loading, setLoading] = useState(false);
  const [myDetails, setMyDetails] = useState(null)
  const [vipLevelData, setVipLevel] = useState([])
  const [vipLevelHistoryData, setVipLevelHistory] = useState([])
  const [modal, setModal] = useState("history")
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const profileDetails = async (userId) => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${profileApi}${userId}`);
      console.log("response", res)
      if (res?.status === 200) {
        setMyDetails(res?.data)
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const vipLevelHandler = async () => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      console.log(`level api :${apis.vipLevel}${userId}`);
      const res = await axios.get(`${apis.vipLevel}${userId}`);
      // console.log("response", res)
      if (res?.data?.status === 200) {
        setVipLevel(res?.data)
      } else {
        toast.error(res?.data?.message)
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const vipLevelHistoryHandler = async () => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      console.log(`Fetching VIP level history from ${apis.vipLevelHistory}${userId}`);
      const res = await axios.get(`${apis.vipLevelHistory}${userId}`);
      console.log("response", res)
      if (res?.data?.status === 200) {
        setVipLevelHistory(res?.data?.data)
      } else {
        toast.error(res?.data?.message)
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // add money
  const addMoneyLevelUpHandler = async (id, reward) => {
    setLoading(true)
    const payload = {
      userid: userId,
      level_id: id,
      level_up_rewards: reward
    }
    console.log("level payload receive", payload)
    try {
      console.log(`Adding/receive money for level up: ${apis.vipLevelAddMoney}`);
      const res = await axios.post(apis.vipLevelAddMoney, payload)
      console.log("level benefits:", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        toast.success(res?.data?.message)
        vipLevelHandler()
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err)
    }
  }
  const addMoneyMonthlyHandler = async (id, reward) => {
    setLoading(true)
    const payload = {
      userid: userId,
      level_id: id,
      monthly_rewards: reward
    }
    console.log("monthly payload", payload)
    try {
      const res = await axios.post(apis.vipLevelAddMoney, payload)
      console.log("monthly", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        toast.success(res?.data?.message)
        vipLevelHandler()
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err)
    }
  }
  console.log("vipLevelvipLevel history", vipLevelHistoryData)
  useEffect(() => {
    if (userId) {
      profileDetails(userId);
      vipLevelHandler();
      vipLevelHistoryHandler();
    }
  }, [userId]);

  const rules = [
    {
      heading: "Upgrade standard",
      content:
        "The IP member's experience points (valid bet amount) that meet the requirements of the corresponding rank will be promoted to the corresponding VIP level, the member's VIP data statistics period starts from 00:00:00 days VIP system launched. VIP level calculation is refreshed every 10 minutes! The corresponding experience level is calculated according to valid odds 1:1!",
    },
    {
      heading: "Upgrade order",
      content:
        "The VIP level that meets the corresponding requirements can be promoted by one level every day, but the VIP level cannot be promoted by leapfrogging.",
    },
    {
      heading: "Level maintenance",
      content:
        'VIP members need to complete the maintenance requirements of the corresponding level within 30 days after the "VIP level change"; if the promotion is completed during this period, the maintenance requirements will be calculated according to the current level.',
    },
    {
      heading: "Download standard",
      content:
        "If a VIP member fails to complete the corresponding level maintenance requirements within 30 days, the system will automatically deduct the experience points corresponding to the level. If the experience points are insufficient, the level will be downgraded, and the corresponding discounts will be adjusted to the downgraded level accordingly.",
    },
    {
      heading: "Upgrade bonus",
      content:
        "The upgrade benefits can be claimed on the VIP page after the member reaches the VIP membership level, and each VIP member can only get the upgrade reward of each level once.",
    },
    {
      heading: "Monthly reward",
      content:
        "VIP members can earn the highest level of VIP rewards once a month. Can only be received once a month. Prizes cannot be accumulated. And any unclaimed rewards will be refreshed on the next settlement day. When receiving the highest level of monthly rewards this month Monthly Rewards earned in this month will be deducted e.g. when VIP1 earns 500 and upgrades to VIP2 to receive monthly rewards 500 will be deducted.",
    },
    {
      heading: "Real-time rebate",
      content:
        "The higher the VIP level, the higher the return rate, all the games are calculated in real time and can be self-rewarded!",
    },
    {
      heading: "Safe",
      content:
        "VIP members who have reached the corresponding level will get additional benefits on safe deposit based on the member's VIP level.",
    },
  ];
console.log("vipLevelData", vipLevelData);
  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="bg-customdarkBlue">
        <div className="grid grid-cols-4 px-3 pt-5 pb-14">
          <div className="col-span-1 flex items-center  justify-center">
            <img
              src={
                myDetails?.data?.userimage ? myDetails?.data?.userimage : avatar
              }
              className="w-20 h-20 rounded-full"
              alt="not found"
            />
          </div>
          <div className="col-span-3 flex flex-col items-start justify-start px-2">
            <div className=" flex flex-col items-start justify-start gap-2">
              <img
                className="h-6 w-14 xsm:h-7 xsm:w-16"
                src={profilevip1}
                alt="not found"
              />
              <p className="capitalise text-xsm ">
                {myDetails?.data?.username}
              </p>
            </div>
            {/* <div className='mt-3 bg-yellow text-sm sm:text-lg md:text-sm rounded-full w-48 sm:w-64 md:w-48 flex items-center justify-center '>
              UID &nbsp;&nbsp;|&nbsp;&nbsp;{myDetails?.u_id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button onClick={handleCopyUID}> <FaRegCopy /></button>
            </div>
            <div className='mt-1 text-xs sm:text-sm md:text-xs'>Last Login : {myDetails?.last_login_time}</div> */}
          </div>
        </div>
      </div>
      <div className=" text-white text-xs flex items-center justify-evenly px-3 gap-3 -mt-5">
        <div className="bg-[#4D4D4C] text-center py-3 shadow-md rounded-lg w-full">
          <p className="text-[#D9AC4F] text-sm">
            {" "}
            <span className="text-[#D9AC4F] ">
              {vipLevelData?.my_experience}
            </span>{" "}
            EXP
          </p>
          <p className="text-white">My Experience</p>
        </div>
        <div className="bg-[#4D4D4C] py-3 text-center shadow-md rounded-lg w-full">
          <p className="text-white text-sm">
            {" "}
            <span className="text-[#D9AC4F] ">
              {vipLevelData?.days_count}
            </span>{" "}
            Days
          </p>
          <p className="text-white">Payout time</p>
        </div>
      </div>
      <div className="flex justify-center px-3">
        <p className="w-full text-xs py-2 text-center text-lightGray rounded-md mt-5 border-[#3B3B46] border-[0.5px]">
          VIP level rewards are settled at 2:00 am on the 1st of every month
        </p>
      </div>
      <div className="px-3 pb-5">
        <div className=" flex gap-2 overflow-x-auto snap-x snap-mandatory hide-scrollbar ">
          {vipLevelData?.data?.length > 0 ? (
            vipLevelData?.data?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex-none w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                >
                  <div
                    className={`rounded-md ${
                      item?.name === "vip 1"
                        ? "bg-[#A3B5CF]"
                        : item?.name === "vip 2"
                        ? "bg-[#E8A460]"
                        : item?.name === "vip 3"
                        ? "bg-[#FF8781]"
                        : item?.name === "vip 4"
                        ? "bg-[#5AD1F3]"
                        : item?.name === "vip 5"
                        ? "bg-[#F18DDF]"
                        : item?.name === "vip 6"
                        ? "bg-[#33B57E]"
                        : item?.name === "vip 7"
                        ? "bg-[#37A959]"
                        : item?.name === "vip 8"
                        ? "bg-[#458BED]"
                        : item?.name === "vip 9"
                        ? "bg-[#A05AFD]"
                        : item?.name === "vip 10"
                        ? "bg-[#FB9C3D]"
                        : ""
                    } `}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${
                          item?.name === "vip 1"
                            ? vipbg1
                            : item?.name === "vip 2"
                            ? vipbg2
                            : item?.name === "vip 3"
                            ? vipbg3
                            : item?.name === "vip 4"
                            ? vipbg4
                            : item?.name === "vip 5"
                            ? vipbg5
                            : item?.name === "vip 6"
                            ? vipbg6
                            : item?.name === "vip 7"
                            ? vipbg7
                            : item?.name === "vip 8"
                            ? vipbg8
                            : item?.name === "vip 9"
                            ? vipbg9
                            : item?.name === "vip 10"
                            ? vipbg10
                            : ""
                        })`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className={` p-2 rounded-md snap-center mt-3 text-white flex flex-col items-center justify-center`}
                    >
                      <div className="w-full flex items-center justify-between ">
                        <div className="flex flex-col items-start w-full justify-start">
                          <div className="flex text-nowrap items-start w-full  gap-2">
                            <div>
                              <img
                                src={item?.status === "1" ? viptop1 : viptop2}
                                className="w-6 h-6"
                                alt="fdd"
                              />
                            </div>
                            <div className="capitalize">{item?.name}</div>
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  item?.status === "1" ? viptick : vipununlocked
                                }
                                className="w-4 h-4"
                                alt="fdd"
                              />
                              <p>
                                {item?.status === "1"
                                  ? "Opened"
                                  : "Not open yet"}
                              </p>
                            </div>
                          </div>
                          <div className="border-white py-1 text-xs rounded mt-2 px-4">
                            Dear {item?.name} customer
                          </div>
                          <div className="border-black py-1 text-xs rounded mt-2 px-4">
                            Bet 1=1EXP
                          </div>
                        </div>
                        <div className="flex items-center w-full justify-end">
                          <img
                            src={
                              item?.name === "vip 1"
                                ? vip1
                                : item?.name === "vip 2"
                                ? vip2
                                : item?.name === "vip 3"
                                ? vip3
                                : item?.name === "vip 4"
                                ? vip4
                                : item?.name === "vip 5"
                                ? vip5
                                : item?.name === "vip 6"
                                ? vip6
                                : item?.name === "vip 7"
                                ? vip7
                                : item?.name === "vip 8"
                                ? vip8
                                : item?.name === "vip 9"
                                ? vip9
                                : item?.name === "vip 10"
                                ? vip10
                                : ""
                            }
                            className="w-[5.5rem] h-20"
                            alt="sd"
                          />
                        </div>
                      </div>
                      <div className="text-xs mt-2 w-full px-2">
                        <div className="flex items-center justify-between">
                          <p
                            className={`${
                              item?.name === "vip 1"
                                ? "bg-[#8AA0C0]"
                                : item?.name === "vip 2"
                                ? "bg-[#E3994F]"
                                : item?.name === "vip 3"
                                ? "bg-[#FF7979]"
                                : item?.name === "vip 4"
                                ? "bg-[#4AC9F2]"
                                : item?.name === "vip 5"
                                ? "bg-[#b73d9d]"
                                : item?.name === "vip 6"
                                ? "bg-[#54D8A3]"
                                : item?.name === "vip 7"
                                ? "bg-[#49B13E]"
                                : item?.name === "vip 8"
                                ? "bg-[#4FAEF1]"
                                : item?.name === "vip 9"
                                ? "bg-[#C378E9]"
                                : item?.name === "vip 10"
                                ? "bg-[#F2A83A]"
                                : ""
                            } rounded p-1`}
                          >
                            {item?.bet_amount >= item?.range_amount
                              ? item?.range_amount
                              : item?.bet_amount}{" "}
                            / {item?.range_amount}
                          </p>
                          <p className="uppercase">
                            {/* {Math.min(
                              (item?.bet_amount / item?.range_amount) * 100,
                              100
                            ).toFixed(2)}
                            % Completed */}
                            {item?.name}
                          </p>
                        </div>
                        <div className="w-full bg-[#627798] h-2 mt-2 rounded">
                          <div
                            className={`${
                              item?.name === "vip 1"
                                ? "bg-[#243f67]"
                                : item?.name === "vip 2"
                                ? "bg-[#E3994F]"
                                : item?.name === "vip 3"
                                ? "bg-[#FF7979]"
                                : item?.name === "vip 4"
                                ? "bg-[#21677e]"
                                : item?.name === "vip 5"
                                ? "bg-[#b73d9d]"
                                : item?.name === "vip 6"
                                ? "bg-[#105c3e]"
                                : item?.name === "vip 7"
                                ? "bg-[#49B13E]"
                                : item?.name === "vip 8"
                                ? "bg-[#4FAEF1]"
                                : item?.name === "vip 9"
                                ? "bg-[#C378E9]"
                                : item?.name === "vip 10"
                                ? "bg-[#F2A83A]"
                                : ""
                            } h-2 rounded`}
                            style={{
                              width: `${Math.min(
                                (item?.bet_amount / item?.range_amount) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <div className="w-full mx-1 mt-1 text-white text-center">
                          Incomplete will be deducted by the system
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-redLight shadow-md rounded-lg mt-3 p-2">
                    <div className="flex items-center border-customlightbtn border-b-[0.5px] ">
                      <div>
                        <img src={red_diamond} className="w-7 h-7" alt="df" />
                      </div>
                      <div className="w-full font-bold px-2 py-1 text-white">
                        VIP {item?.tag} Benefits level
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-5 w-full justify-center px-2">
                      <div className="flex w-32 justify-start ">
                        <img className="w-12 h-12" src={vipGift} alt="fd" />
                      </div>
                      <div className="w-full text-white">
                        <p>Level up rewards</p>
                        <p className="text-xs text-lightGray">
                          Each account can only receive 1 time
                        </p>
                      </div>
                      <div className="w-[40%] flex flex-col gap-1 text-orange-400 text-xs">
                        <div className="border-orange-400 border-[0.5px] flex justify-center items-center  rounded-md p-1 gap-2">
                          <img src={depo_wallet} className="w-4" alt="sd" />
                          <p className="">{item?.level_up_rewards}</p>
                        </div>
                        <div className="border-[#D9AC4F] flex justify-center  gap-2 items-center  p-1 rounded-md border-[0.5px]">
                          <div className="bg-[#D9AC4F] w-5 rounded-full flex items-center justify-center h-4">
                            {" "}
                            <RiVipDiamondFill className="text-[#333332]" />
                          </div>
                          <p className="text-[#D9AC4F]">
                            {item?.level_up_status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full justify-evenly mt-5  px-2">
                      <div className="flex w-32 justify-start ">
                        <img className="w-12 h-12" src={vipstarcoin} alt="fd" />
                      </div>
                      <div className="w-full text-white">
                        <p>Monthly rewards</p>
                        <p className="text-xs text-lightGray">
                          Each account can only receive 1 time per month
                        </p>
                      </div>
                      <div className="w-[40%] text-orange-400 text-xs flex flex-col gap-1 ">
                        <div className="border-orange-400 flex justify-center gap-2 items-center  rounded-md border-[0.5px] p-1">
                          <img src={depo_wallet} className="w-4" alt="sd" />
                          <p className="">{item?.monthly_rewards}</p>
                        </div>
                        <div className="border-[#D9AC4F] flex justify-center gap-2 items-center  p-1 rounded-md border-[0.5px]">
                          <div className="bg-[#D9AC4F] w-4 rounded-full flex items-center justify-center h-4">
                            {" "}
                            <RiVipDiamondFill className="text-[#333332]" />
                          </div>
                          <p className="text-[#D9AC4F]">
                            {item?.monthly_rewards_status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 w-full justify-evenly mt-5 px-2">
                      <div className="flex w-32 justify-start ">
                        <img className="w-12 h-12" src={rebateRate} alt="fd" />
                      </div>
                      <div className="w-full text-white">
                        <p>Rebate rate</p>
                        <p className="text-xs text-lightGray">
                          Increase income of rebate
                        </p>
                      </div>
                      <div className="w-[40%] text-[#D9AC4F] text-xs flex flex-col">
                        <div className="border-customlightbtn-redLight flex justify-between items-center  rounded-md border-[0.5px] p-1">
                          <img src={vipweal} className="w-4" alt="sd" />
                          <p className="">{item?.rebate_rate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" gap-2 bg-[#333332] shadow-md rounded-lg mt-3 p-2">
                    <div className="flex items-center border-border1 border-b-2">
                      <div>
                        <img src={vipcrown} className="w-7 h-7" alt="df" />
                      </div>
                      <div className=" w-full font-bold px-2 py-1 text-white">
                        My Benefits
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-5">
                      <div className="w-full col-span-1 bg-[#232323]">
                        <div className="bg-gradient-to-l from-[#f95959] to-[#ff9a8e] rounded-t-lg w-full flex flex-col items-center justify-center">
                          <div
                            className="w-full h-24 flex flex-col justify-end bg-no-repeat"
                            style={{
                              backgroundImage: `url(${vipwelfare1})`,
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                            }}
                          >
                            <div className="shadow-2xl bg-black opacity-35 text-xs font-bold flex justify-between items-center w-full px-1 pt-1 mt-3">
                              <div className=" flex justify-between items-center  rounded-md  px-1">
                                <img
                                  src={depo_wallet}
                                  className="w-4"
                                  alt="sd"
                                />
                                <p className="">{item?.level_up_rewards}</p>
                              </div>
                              <div className=" flex justify-between items-center  p-1 rounded-md ">
                                <img
                                  src={yellowheart}
                                  className="w-4"
                                  alt="sd"
                                />
                                <p className="">{item?.level_up_status}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-white text-sm mx-1">
                          Level up rewards
                        </p>
                        <p className="text-xs text-white mt-2 mx-1">
                          Each account can only receive 1 time
                        </p>
                        {item.level_up_status == "1" ? (
                          <button
                            onClick={() =>
                              addMoneyLevelUpHandler(
                                item?.id,
                                item?.level_up_rewards
                              )
                            }
                            className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1 hover:bg-[#b1b3c9] cursor-pointer"
                          >
                            Claim now
                          </button>
                        ) : item.level_up_status == "2" ? (
                          <button
                            disabled
                            className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1 hover:bg-[#b1b3c9] cursor-pointer"
                          >
                            Claimed
                          </button>
                        ) : (
                          <button
                            disabled
                            className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1 hover:bg-[#b1b3c9] cursor-pointer"
                          >
                            In complete
                          </button>
                        )}
                      </div>
                      <div className="w-full col-span-1 bg-[#232323]">
                        <div className="bg-gradient-to-r from-[#f95959] to-[#ff9a8e] rounded-t-lg w-full flex flex-col items-end justify-center">
                          <div
                            className="w-full flex flex-col justify-end h-24 bg-no-repeat"
                            style={{
                              backgroundImage: `url(${vipwelfare2})`,
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                            }}
                          >
                            <div className="text-xs bg-[#232323] opacity-35 font-bold flex justify-between items-center w-full px-1 pt-1 mt-">
                              <div className=" flex justify-between items-center  rounded-md p-1">
                                <img
                                  src={depo_wallet}
                                  className="w-4"
                                  alt="sd"
                                />
                                <p className="">{item?.monthly_rewards}</p>
                              </div>
                              <div className=" flex justify-between items-center  p-1 rounded-md ">
                                <img
                                  src={yellowheart}
                                  className="w-4"
                                  alt="sd"
                                />
                                <p>{item?.monthly_rewards_status}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-white text-sm mx-1">
                          Monthly rewards
                        </p>
                        <p className="text-xs text-white mt-2 mx-1">
                          Each account can only receive 1 time per monthly
                          received
                        </p>
                        {item.monthly_rewards_status == "1" ? (
                          <button
                            onClick={() =>
                              addMoneyMonthlyHandler(
                                item?.id,
                                item?.monthly_rewards
                              )
                            }
                            className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1 cursor-pointer"
                          >
                            Claim now
                          </button>
                        ) : item.monthly_rewards_status == "2" ? (
                          <button
                            disabled
                            className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1 cursor-pointer"
                          >
                            Claimed
                          </button>
                        ) : (
                          <button
                            disabled
                            className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1 cursor-pointer"
                          >
                            In complete
                          </button>
                        )}
                      </div>
                      <div className="w-full col-span-1 bg-[#232323]">
                        <div className="bg-gradient-to-l from-[#f95959] to-[#ff9a8e] rounded-t-lg w-full flex flex-col items-center justify-center">
                          <div
                            className="w-full h-24 flex flex-col justify-end bg-no-repeat"
                            style={{
                              backgroundImage: `url(${vipwelfare5})`,
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                            }}
                          >
                            <div className="text-xs bg-black opacity-35 font-bold flex justify-between items-center w-full px-1 pt-1 mt-3">
                              <div className=" flex justify-between items-center  rounded-md p-1">
                                <img src={vipweal} className="w-4" alt="sd" />
                                <p className="">{item?.rebate_rate}</p>
                              </div>
                              <div className=" flex justify-between items-center  p-1 rounded-md ">
                                <img
                                  src={yellowheart}
                                  className="w-4"
                                  alt="sd"
                                />
                                <p>{item?.rebate_rate_status}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-white text-sm mx-1">Rebate rate</p>
                        <p className="text-xs text-white mt-2 mx-1">
                          Increase income of rebate
                        </p>
                        <button
                          // className="mt-5 border-redLight text-redLight border-[1px] w-full text-xsm py-1 rounded-full mx-1"
                          className="mt-5 bg-[#CCCEDC] text-lightGray font-bold text-xsm w-full py-1.5 rounded-full mx-1"
                        >
                          Check the Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <img className="mt-10" src={no_data_available} alt="ds" />
              <p className="text-center text-black">No data</p>
            </>
          )}
        </div>

        <div className="bg-redLight grid grid-cols-2  mt-3">
          <button
            onClick={() => setModal("history")}
            className={`col-span-1  w-full ${
              modal === "history"
                ? "border-[#D9AC4F] text-[#D9AC4F] border-b-[2px]"
                : "text-[#A8A59E] "
            } p-3`}
          >
            History
          </button>
          <button
            onClick={() => setModal("rules")}
            className={`col-span-1  w-full p-3 ${
              modal === "rules"
                ? "border-[#D9AC4F] text-[#D9AC4F] border-b-[2px]"
                : "text-[#A8A59E]"
            }`}
          >
            Rules
          </button>
        </div>
        {modal === "history" && (
          <div className="bg-redLight text-white opacity-75  pt-3 px-3">
            {vipLevelHistoryData.length > 0 ? (
              vipLevelHistoryData.map((item, i) => (
                <div
                  className="flex items-center justify-between pb-5 border-b-blue-50 border-b-[0.5px]"
                  key={i}
                >
                  <p>
                    <p className="text-white font-bold text-center">
                      Experience
                    </p>
                    <p className="text-xsm text-center text-white opacity-80">
                      {item?.exp}
                    </p>
                  </p>
                  <p>
                    <p className="text-white font-bold text-center">Date</p>
                    <p className="text-xsm text-center">{item?.created_at}</p>
                  </p>
                  {/* <p>{item?.created_at}</p> */}
                </div>
              ))
            ) : (
              <>
                {" "}
                <img className="" src={no_data_available} alt="sd" />
                <p>no data</p>
              </>
            )}
          </div>
        )}
        {modal === "rules" && (
          <div className=" rounded-lg mt-3 p-2">
            <h1 className="text-[#D9AC4F] text-lg font-bold text-center mt-2">
              VIP privileges
            </h1>
            <h1 className="text-xsm text-[#A8A5A1] text-center mt-1">
              VIP rule description
            </h1>
            {rules?.map((item) => (
              <div
                key={item}
                className="bg-redLight rounded-xl mt-3 px-4 pt-4 pb-3"
              >
                <p className="w-3 h-[2px] bg-redLight"></p>
                <div
                  className="-mt-5 text-xs h-14 flex justify-center pt-3 bg-no-repeat"
                  // style={{
                  //   backgroundImage: `url(${viprulehead})`,
                  //   backgroundPosition: "center",
                  //   backgroundSize: "contain",

                  // }}
                >
                  {item?.heading}
                </div>
                <div className="mt-2 text-white opacity-75">
                  {item?.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default VIP