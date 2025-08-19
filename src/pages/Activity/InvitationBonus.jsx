/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import inviterule from "../../assets/usaAsset/activity/inviterule.svg"
import inviterecord from "../../assets/usaAsset/activity/inviterecord.svg"
import invitationBonus from "../../assets/usaAsset/activity/invitationBonus.png"
import axios from 'axios'
import apis from '../../utils/apis'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Loader from '../../reusable_component/Loader/Loader'
import invitationBg from "../../assets/usaAsset/activity/invitation_bg.png";
function InvitationBonus() {
    const [invitationListData, setInvitationListData] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const InvitationListHandler = async () => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${apis.invitation_bonus_list}${userId}`)
            if (res?.data?.status === 200) {
                setLoading(false)
                setInvitationListData(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            // console.log("Internal server error")
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    }
    const bonusClaimHandler = async (amount, bonusId) => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }

        const payload = {
            userid: userId,
            amount,
            invite_id: bonusId,
        };
        try {
            const res = await axios.post(apis.invitation_bonus_claim, payload);
            if (res?.status === 200) {
                setLoading(false)
                toast.success(res?.data?.message || "Bonus claimed successfully");
                InvitationListHandler()
            } else if (res?.response?.data?.status === 400) {
                setLoading(false)
                toast.error(res?.response?.data?.message || "Something went wrong");
            }
        } catch (err) {
            setLoading(false)
            // console.error(err);
            setLoading(false)
            if(err?.response?.data?.status===500){
              // console.log("er",err)
              toast.error(err?.response?.data?.message || "Something went wrong")
            }else{
              toast.error(err?.response?.data?.message)
            }        }
    };

    useEffect(() => {
        InvitationListHandler()
    }, [])
    // console.log("invitationListData", invitationListData)
    return (
      <div className=" font-roboto">
        {loading && <Loader setLoading={setLoading} loading={loading} />}
        {/* <header className={`bg-gradient-to-r from-red to-redLight px-3 pb-5 font-inter`}> */}
        {/* <header
          className="bg-gradient-to-r from-red to-redLight px-3 pb-5 font-inter bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${invitationBg})` }}
        > */}
        <header
          className="px-3 pb-5 font-inter bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(356deg, #f99937 2.72%, #ff6922 43.54%, #ff8039 98.54%), url(${invitationBg})`,
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="grid grid-cols-3 py-3 ">
            <div className="col-span-2">
              {/* <img
                src={invitationBonus}
                alt="Gifts"
                className="w-full  object-cover rounded"
              /> */}
              <h1 className="font-semibold text-xsm">
                Invite friends and deposit
              </h1>
              <p className="text-xsm mt-3">Both parties can receive rewards</p>
              <p className="text-xsm mt-2">
                Invite friends to register and recharge
              </p>
              <p className="text-xsm">to receive rewards</p>
              <p className="text-xs mt-2">Activity Date</p>
              <p className="text-lg text-nowrap mt-2">
                2024-05-01 - 2024-05-31
              </p>
            </div>
            <div className="col-span-2 pl-2">
              {/* <h1 className="font-bold">Invite friends and deposit</h1>
              <p className="text-xs mt-5">Both parties can receive rewards</p>
              <p className="text-xs mt-2">
                Invite friends to register and recharge to receive rewards
              </p>
              <p className="text-xs mt-2">Activity Date</p>
              <p className="text-lg text-nowrap mt-2">
                2024-05-01 - 2024-05-31
              </p> */}
            </div>
          </div>
        </header>
        <div className="bg-customdarkBlue shadow-lg mx-3 -mt-5 text-white text-xsm py-5 rounded-lg flex items-center justify-evenly">
          <Link
            to="/activity/invitationbonus/invitationrewardrule"
            className="flex flex-col items-center"
          >
            <img className="w-16 h-16" src={inviterule} alt="sd" />
            <p>Invitation reward rules</p>
          </Link>
          <Link
            to="/activity/invitationbonus/invitationrecord"
            className="flex flex-col items-center"
          >
            <img className="w-16 h-16" src={inviterecord} alt="sd" />
            <p>Invitation record</p>
          </Link>
        </div>

        {invitationListData?.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto hide-scrollbar">
            {invitationListData?.map((item, i) => (
              <div
                key={{ i }}
                className="relative w-96 h-72 bg-customdarkBlue rounded-2xl overflow-hidden mx-2 mt-2"
              >
                <div className="flex justify-between pr-2 text-xsm">
                  {/* <div
                    className="bg-[#17B15E] rounded-tl-lg flex items-center gap-1 w-[40%] pl-2 py-3 relative"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 1rem) 0, 100% 100%, calc(100% - 1rem) 100%, 0 100%)",
                    }}
                  > */}
                  {/* <div className="bg-[#17B15E] flex items-center gap-1 w-[40%] pl-2 py-3 rounded-tl-2xl rounded-br-2xl">
                    <p>Bonus</p>
                    <p className="h-5 w-5 text-[#BABFE0] bg-white flex items-center rounded-full justify-center">
                      {item?.bonus_id}
                    </p>
                    <button className="w-6 h-6">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <g clipPath="url(#clip0)">
                          <path
                            d="M23.9004 43.8999C34.9461 43.8999 43.9004 34.9456 43.9004 23.8999C43.9004 12.8542 34.9461 3.8999 23.9004 3.8999C12.8547 3.8999 3.90039 12.8542 3.90039 23.8999C3.90039 34.9456 12.8547 43.8999 23.9004 43.8999Z"
                            fill="white"
                          />
                          <path
                            d="M34 14L14 34"
                            stroke="#BABFE0"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 14L34 34"
                            stroke="#BABFE0"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="48" height="48" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div> */}
                  <div className="bg-[#17B15E] flex items-center justify-between w-[40%] pl-2 pr-2 py-3 rounded-tl-2xl rounded-br-2xl">
                    {/* Left side: Bonus and amount */}
                    <div className="flex items-center gap-2">
                      <p className="text-white">Bonus</p>
                      <p className="h-5 w-5 text-[#796462] bg-white flex items-center justify-center rounded-full text-xs font-medium">
                        {item?.bonus_id}
                      </p>
                    </div>

                    {/* Right side: Close (X) button */}
                    <button className="w-6 h-6">
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <g clipPath="url(#clip0)">
                          <path
                            d="M23.9004 43.8999C34.9461 43.8999 43.9004 34.9456 43.9004 23.8999C43.9004 12.8542 34.9461 3.8999 23.9004 3.8999C12.8547 3.8999 3.90039 12.8542 3.90039 23.8999C3.90039 34.9456 12.8547 43.8999 23.9004 43.8999Z"
                            fill="white"
                          />
                          <path
                            d="M34 14L14 34"
                            stroke="#BABFE0"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 14L34 34"
                            stroke="#BABFE0"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="48" height="48" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>

                  <span></span>
                  <p className="flex items-center text-[#ff8310] text-xsm font-bold">
                    ₹ {item?.claim_amount}
                  </p>
                </div>
                <div className="border-[#484755] border-[0.1px]"></div>
                {/* <div className="bg-[#4D4D4C] text-xsm text-white flex items-center justify-between px-2 mx-2 mt-2 py-1 rounded-md">
                  <p>Number of Invitees</p>
                  <p className="text-white">{item?.no_of_invitees}</p>
                </div>
                <div className="bg-[#4D4D4C] text-xsm text-white flex items-center justify-between px-2 mx-2 mt-2 py-1 rounded-md">
                  <p>Recharge per people</p>

                  <p className="text-[#D2383C]">₹ {item?.amount}</p>
                </div> */}
                <div className="bg-[#4D4D4C] text-xsm text-white flex px-2 mx-2 mt-2 py-1 rounded-md">
                  {/* Left part: label (left aligned inside left half) */}
                  <div className="w-1/2 text-left">
                    <p>Number of invitees</p>
                  </div>

                  {/* Right part: value (centered inside right half) */}
                  <div className="w-1/2 flex justify-center">
                    <p className="text-white">{item?.no_of_invitees}</p>
                  </div>
                </div>

                <div className="bg-[#4D4D4C] text-xsm text-white flex px-2 mx-2 mt-2 py-1 rounded-md">
                  <div className="w-1/2 text-left">
                    <p>Recharge per people</p>
                  </div>

                  <div className="w-1/2 flex justify-center">
                    {/* <p className="text-[#D2383C]">₹ {item?.amount}</p> */}
                    <p className="text-[#D2383C]">
                      ₹ {(item?.amount || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 mt-10 px-2">
                  <div className="col-span-1 flex flex-col items-center ">
                    <p className="text-gold">
                      {item?.no_of_invitees < item?.no_of_user
                        ? item?.no_of_invitees
                        : item?.no_of_user}
                      /{item.no_of_user}
                    </p>
                    <p className="text-xsm text-white">Number of invitees</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center ">
                    <p className="text-[#D2383C]">
                      {item?.refer_invitees < item?.no_of_user
                        ? item?.refer_invitees
                        : item?.no_of_user}
                      /{item?.no_of_user}
                    </p>
                    <p className="text-xsm text-white">Deposit number</p>
                  </div>
                </div>
                <div className="px-2">
                  <button
                    disabled={item?.status == 1 || item?.status == 0}
                    onClick={() =>
                      bonusClaimHandler(item?.claim_amount, item?.bonus_id)
                    }
                    className={`${
                      item?.status == 1
                        ? "bg-[#6F7381]"
                        : item?.status == 2
                        ? "bg-green"
                        : "bg-yellow"
                    }  bg-[#6F7381] rounded-full w-full font-bold text-sm py-2 mt-5`}
                  >
                    {item?.status == 0
                      ? "Finished"
                      : item?.status == 2
                      ? "Claim"
                      : "Unfinished"}
                  </button>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-6 h-6 bg-customdarkBlue opacity-70 rounded-full"></div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-6 h-6 bg-customdarkBlue opacity-70 rounded-full"></div>
                {/* Dashed line */}
                <div className="absolute top-1/2 left-0 right-0 border-t-[2px] border-red "></div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-red rounded-full"></div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-red rounded-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white flex justify-center mt-20">No data</div>
        )}
      </div>
    );
}

export default InvitationBonus