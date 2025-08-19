/* eslint-disable react/prop-types */

// import usawinlogo from "../assets/headerLogo.png";
import usawinlogo from "../assets/headerLogo-removebg.png";
import kefu from "../assets/icons/kefu.png";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import awardRecord from "../assets/icons/awardRecord.png";
import gift from "../assets/images/gift.png";
import gift2 from "../assets/images/giftPage.png";
import rechargeHistory from "../assets/icons/rechargeHistory.png";
import bethistory from "../assets/Andarbahar/bethistory.png";
import filter from "../assets/usaAsset/promotion/filter.png";
import backButton from "../assets/usaAsset/wingo/back.png";
import musichead from "../assets/usaAsset/wingo/musicHead.png";
import voiceoff from "../assets/usaAsset/wingo/voice-off.png";
import downloadButton from "../assets/usaAsset/downloadButton.png";
import engFlag from "../assets/usaAsset/engFlag.png";
import Notification from "../assets/usaAsset/pro_notification.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../utils/apis";
import LanguageSelector from "./CountryLogoIcon";
const profileApi = apis.profile;
function Header({ audioRef, isAudioOn, setIsAudioOn }) {
  const location = useLocation();
  const [myDetails, setMyDetails] = useState(null);
  const [apkLink, setapkLink]=useState()
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioOn) {
        audioRef.current.muted = true;
        audioRef.current.pause();
      } else {
        audioRef.current.muted = false;
      }
      setIsAudioOn(!isAudioOn);
    }
  };

  const profileDetails = async (userId) => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${profileApi}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data);
        // console.log("profile res:", res.data.data.apk_link);
        // setapkLink();
      }
    } catch (err) {
      // console.log(err);
      toast.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      profileDetails(userId);
    }
  }, [userId]);
  // console.log("myDetails",myDetails)
  return (
    <div className="font-inter">
      {location?.pathname === "/" ? (
        <div className="bg-bg4  px-2 py-0.5 flex justify-between items-center">
          <img className="w-22 h-12 " src={usawinlogo} alt="logo not found" />
          {!userId ? (
            <div className=" gap-2 flex">
              <Link
                to="/login"
                className="flex items-center border border-[#5F5132] text-[#D9AC4F] rounded-md text-xs py-1 px-4"
              >
                Log in
              </Link>
              {/* <Link to="/register" className="bg-gradient-to-r from-customlightbtn to-customdarkBluebtn flex items-center  text-white rounded-md text-xs py-0.5 px-4">Register</Link> */}
            </div>
          ) : (
            <div className="flex items-center ">
              <div className="relative  h-8">
                <img
                  className="mt-4 mr-1 top-2/3 right-3.5 w-7 h-5 transform -translate-y-1/2"
                  src={Notification}
                  alt="sd"
                />
                <div className="absolute -top-[0.3rem] -right-[0.2rem] w-3 h-3 bg-[#CC3C43] rounded-full transform -translate-y-1/2 animate-pulse-fade"></div>
              </div>
              {/* <a href={myDetails?.apk_link} download>
              <img className="w-6 h-6 mt-2 mr-2" src={downloadButton} alt="Download APK" />
            </a> */}
              {/* <img className="w-6 h-6 mt-2" src={engFlag} alt="sd" /> */}
              {/* Download */}
              <div className="p-2  pl-0">
                <a
                  href={myDetails?.data?.apk_link}
                  download
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-5 text-[#D9AC4F]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 3v12m0 0l4-4m-4 4l-4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <rect
                      x="6"
                      y="18"
                      width="12"
                      height="1"
                      fill="currentColor"
                    />
                    <rect
                      x="8"
                      y="20"
                      width="8"
                      height="1"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      ) : location?.pathname === "/activity" ? (
        <div className="w-full h-[3.22rem] bg-gradient-to-r from-red to-redLight flex items-center justify-center">
          <img className="w-25 h-12 " src={usawinlogo} alt="logo not found" />
        </div>
      ) : location?.pathname === "/activity/invitationbonus" ? (
        <div className="bg-gradient-to-r from-red to-redLight h-[3.22rem] flex items-center justify-between">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Invitation bonus</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/details" ? (
        <div className="bg-gradient-to-r from-red to-redLight h-[3.22rem] flex items-center justify-between">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Activity Details</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/award" ? (
        <header className="h-[3.22rem] bg-gradient-to-l from-red to-redLight px-3">
          <div className="flex items-center justify-between">
            <Link to={-1}>
              <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
            </Link>
            <Link
              to="/activity/award/collectionrecord"
              className="flex items-center"
            >
              <img className="h-5 w-5" src={awardRecord} alt="ds" />
              <p className="text-xs">Collection record</p>
            </Link>
          </div>
        </header>
      ) : location?.pathname ===
        "/activity/invitationbonus/invitationrewardrule" ? (
        <div className="bg-[#333332]  h-[3.22rem] flex items-center justify-between ">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl text-white" />
          </Link>
          <p className="text-sm text-white">Invitation reward rules</p>
          <div></div>
        </div>
      ) : location?.pathname === "/allFirstDepositPlans" ? (
        <div className="bg-[#333332]  h-[3.22rem] flex items-center justify-between ">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl text-white" />
          </Link>
          <p className="text-sm text-white">First deposit bonus</p>
          <div></div>
        </div>
      ) : location?.pathname ===
        "/activity/invitationbonus/invitationrecord" ? (
        <div className="bg-[#333332] h-[3.22rem] flex items-center justify-between text-white">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl" />
          </Link>
          <p className="text-sm">Invitation record</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/rebate" ? (
        <div className="flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Rebate</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/superJackpot" ? (
        <div className="flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Super Jackpot</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/gifts" ? (
        <header className="bg-gradient-to-l from-red to-redLight px-3">
          <div className="flex items-center justify-between">
            <Link to={-1}>
              <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
            </Link>
            <p className="text-sm">Gift</p>
            <p className="text-sm"></p>
          </div>
          <div className="mt-2">
            <img src={gift2} alt="sd" className="w-30 h-35" />
          </div>
        </header>
      ) : location?.pathname === "/activity/attendance" ? (
        <div className="flex  items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Attendance</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/gamerule" ? (
        <div className="flex  items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Game Rules</p>
          <div></div>
        </div>
      ) : location?.pathname === "/activity/attendacehistory" ? (
        <div className="flex  items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Attendance History</p>
          <div></div>
        </div>
      ) : location?.pathname === "/promotion" ? (
        <div className="px-3 flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <p></p>
          <p className="text-sm">Agency</p>
          <Link to="/promotion/newSuboridnate">
            <img className="w-6 h-6" src={filter} alt="df" />
          </Link>
        </div>
      ) : location?.pathname === "/promotion/newSuboridnate" ? (
        <div className="px-3 flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">New subordinates</p>
          <div></div>
        </div>
      ) : location?.pathname === "/promotion/subordinatedata" ? (
        <div className="px-3 flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Subordinate data</p>
          <div> </div>
        </div>
      ) : location?.pathname === "/promotion/commissiondetail" ? (
        <div className="px-3 flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Commission details</p>
          <div> </div>
        </div>
      ) : location?.pathname === "/promotion/invitationrules" ? (
        <div className="px-3 flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Rules</p>
          <div> </div>
        </div>
      ) : location?.pathname === "/promotion/rebateratio" ? (
        <div className="px-3 flex items-center justify-between text-white bg-[#333332]  h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Rebate ratio</p>
          <div> </div>
        </div>
      ) : location?.pathname === "/wallet" ? (
        <div className="flex items-center justify-between bg-gradient-to-l from-redLight to-red h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Wallet</p>
          <div></div>
        </div>
      ) : location?.pathname === "/allgames" ? (
        <div className="flex items-center justify-between bg-gradient-to-l from-redLight to-red h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">All Games</p>
          <div></div>
        </div>
      ) : location?.pathname === "/wallet/deposit" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl text-white" />
          </Link>
          <p className="text-sm">Deposit</p>
          <Link to="wallet/deposithistory" className="text-xsm">
            Deposit History
          </Link>
        </div>
      ) : location?.pathname === "/wallet/withdrawal" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Withdraw</p>
          <Link to="wallet/withdrawalhistory" className="text-xs">
            Withdrawal History
          </Link>
        </div>
      ) : location?.pathname === "/wallet/deposithistory" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Deposit History</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/wallet/withdrawalhistory" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Withdraw History</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/wallet/withdrawal/addbankaccount" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl" />
          </Link>
          <p className="text-sm">Add a bank account number</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname ===
        "/walletwithdrawal/addbankaccount/showdetails" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl" />
          </Link>
          <p className="text-sm">Add a bank account</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname ===
        "/walletwithdrawal/addbankaccount/showdetailsusdt" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl" />
          </Link>
          <p className="text-sm">Add a bank account</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/wallet/withdrawal/editbankaccount" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl" />
          </Link>
          <p className="text-sm">Edit bank account details</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname ===
        "/wallet/withdrawal/addbankaccount/selectbank" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="text-3xl" />
          </Link>
          <p className="text-sm">Choose a bank</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/wallet/withdrawal/addusdtwalletaddress" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
          </Link>
          <p className="text-sm">Add USDT address</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/notifications" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Notification</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/vip" ? (
        <div className="flex px-2 items-center justify-between bg-customdarkBlue h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">VIP</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/gamehistory" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl text-white" />
          </Link>
          <p className="text-sm">Game statistics</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/alltransactionhistory" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Transaction History</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/setting" ? (
        <div className="flex px-2 items-center justify-between bg-customdarkBlue h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Settings Center</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/announcement" ? (
        <div className="flex px-2 items-center justify-between bg-customdarkBlue h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Announcement</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/changepassword" ? (
        <div className="flex px-2 items-center justify-between bg-[#333332]  text-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-3xl text-white" />
          </Link>
          <p className="text-sm">Change login Password</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/bindmail" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Bind Mailbox</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/feedback" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Feedback</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/customerservices" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-sm text-black">Customer Service</p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/depositNotRecieve" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Recharge History </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/depositNotRecieveform" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Deposit Not Recieve </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/withdrawProblem" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Withdraw History </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/withdrawProblemform" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Withdraw Problem </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/changeIdLogin" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Change Login Password </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/gameProblem" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Game Problems </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/ifscModification" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">IFSC Modifiaction </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/deleteWithdrawBank" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">
            Delete Withdraw Bank Account{" "}
          </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/changeBankName" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black">Change Bank Name </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/usdtNonIndian" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black truncate whitespace-nowrap overflow-hidden">
            USDT verification (non indian members)
          </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/usdtIndian" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black truncate whitespace-nowrap overflow-hidden">
            USDT verification (indian members)
          </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/deleteUsdtAddress" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black truncate whitespace-nowrap overflow-hidden">
            Delete Old USDT Address and Rebind
          </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/aviatorLuckyBonus" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black truncate whitespace-nowrap overflow-hidden">
            Aviator Lucky Bonus
          </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname == "/customerservices/WingoWinStreak" ? (
        <div className="flex px-2 items-center justify-between bg-white h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-black" />
          </Link>
          <p className="text-[19px] text-black truncate whitespace-nowrap overflow-hidden">
            Wingo 1 Min Win Streak Bonus
          </p>
          <p className="text-xs"></p>
          {/* <LanguageSelector /> */}
        </div>
      ) : location?.pathname === "/beginnersguide" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Beginners Guide</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/aboutus" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">About Us</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/aboutus/child" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">About Us</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/aboutus/confidential" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Confidentiality Agreement</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/aboutus/risk" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Risk Disclosure Agreement</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/aboutus/tc" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Terms & Condition</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/aboutus/faqs" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">TirangaWin FAQs</p>
          <p className="text-xs"></p>
        </div>
      ) : location?.pathname === "/changeavatar" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Change Avatar</p>
          <Link to="#" className="col-span-1 bg-">
            {/* <img className="h-8 w-8" src={rechargeHistory} alt="ds" /> */}
          </Link>
        </div>
      ) : location?.pathname === "/dragonTiger" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Dragon Tiger</p>
          <Link to="/dragonTiger/history" className="col-span-1 bg-">
            <img className="h-8 w-8" src={rechargeHistory} alt="ds" />
          </Link>
        </div>
      ) : location?.pathname === "/dragonTiger/history" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Dragon Tiger</p>
          <p className="text-sm"></p>
        </div>
      ) : location?.pathname === "/andarbahar" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">In Out</p>
          <Link
            to="/andarbahar/history"
            className="col-span-1 bg-gradient-to-l from-red to-redLight"
          >
            <img className="h-8 w-8" src={bethistory} alt="ds" />
          </Link>
        </div>
      ) : location?.pathname === "/andarbahar/history" ? (
        <div className="flex px-2 items-center justify-between bg-gradient-to-l from-red to-redLight h-[3.22rem]">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p className="text-sm">Andar Bahar</p>
          <p className="text-sm"></p>
        </div>
      ) : location?.pathname === "/register" ||
        location?.pathname === "/login" ||
        location.pathname.startsWith("/register/") ? (
        <div className="bg-gradient-to-l from-red to-redLight px-1 pt-2 sm:pt-2 md:pt-2 pb-2 sm:pb-1 md:pb-2 flex justify-between items-center">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <img className="w-22 h-12 " src={usawinlogo} alt="logo not found" />
          <p className="text-sm"></p>
          {/*  country logo*/}
          <LanguageSelector />
        </div>
      ) : location?.pathname === "/forgotPassword" ? (
        <div className="bg-gradient-to-l from-red to-redLight px-1 pt-2 sm:pt-2 md:pt-2 pb-2 sm:pb-1 md:pb-2 flex justify-between items-center">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
        </div>
      ) : location?.pathname === "/wallet/transfer" ? (
        <div className="text-white bg-gradient-to-r from-[#A8ECF3] to-[#C8F1F4] px-3 pt-2 sm:pt-2 md:pt-2 pb-2 sm:pb-1 md:pb-2 flex justify-between items-center">
          <Link to={-1}>
            <MdKeyboardArrowLeft className="font-extrabold text-4xl text-white" />
          </Link>
          <p>Fund Transfer</p>
          <Link to="/customerservices">
            <img className="w-7 h-7" src={kefu} alt="logo not found" />
          </Link>
        </div>
      ) : (
        <div className="bg-red  px-3 pt-2 h-[3.22rem] pb-2 flex justify-between items-center">
          <Link to="/">
            <img src={backButton} alt="drf" className="w-6 h-6" />
          </Link>
          <img className="w-22 h-12  " src={usawinlogo} alt="logo not found" />
          <div className="flex items-center gap-2">
            <Link to="/customerservices">
              <img className="w-7 h-7" src={kefu} alt="logo not found" />
            </Link>
            <img
              onClick={toggleAudio}
              className="w-7 h-7"
              src={isAudioOn ? musichead : voiceoff}
              alt="logo not found"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
