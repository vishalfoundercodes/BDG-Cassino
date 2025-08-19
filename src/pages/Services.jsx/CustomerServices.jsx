import { Link } from 'react-router-dom'
import customerBg from '../../assets/images/customerBg.png'
// import email_tab from '../../assets/icons/email_tab.png'
import { MdKeyboardArrowRight } from 'react-icons/md'
// import { BiLogoTelegram } from 'react-icons/bi'
import axios from 'axios'
import apis from '../../utils/apis'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../reusable_component/Loader/Loader'
import usdtIcon from "../../assets/images/usdt_icon.png"
import serviceAviator from "../../assets/images/serviceAviator.png";
import serviceBDGWin from "../../assets/images/serviceBDGWin.png";
import serviceChangeBank from "../../assets/images/serviceChangeBank.png";
import serviceChangeLogin from "../../assets/images/serviceChangeLogin.png";
import serviceChannel from "../../assets/images/serviceChannel.png";
import serviceDeleteBank from "../../assets/images/serviceDeleteBank.png";
import serviceDeposit from "../../assets/images/serviceDeposit.png";
import serviceGameProblem from "../../assets/images/serviceGameProblem.png";
import serviceIFSC from "../../assets/images/serviceIFSC.png";
import serviceWingo from "../../assets/images/serviceWingo.png";
import serviceWithdrawalProblem from "../../assets/images/serviceWithdrawalProblem.png";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

function CustomerServices() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [serviceData, setServiceData] = useState([])
  const handlerNavigator = (linkUrl) => {
    window.open(linkUrl, "_blank")
  }

  const serviceDataHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(apis.customer_service)
      console.log("resres", res.data);
      if (res?.data?.status === 200) {
        setLoading(false)
        setServiceData(res?.data?.data)
      } else if (res?.data?.status === 400) {
        setLoading(false)
        toast.error(res?.data?.message)
      }

    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    serviceDataHandler()
  }, [])
  return (
    <div className="bg-white">
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="bg-gradient-to-b from-[#EDD188] to-[#C79744]">
        <img src={customerBg} alt="ds" />
      </div>
      {/* <div className="mt-5 px-5 flex items-center justify-between w-full font-bold text-white">
        <p>Self Service</p>
        <button
          onClick={() => handlerNavigator(serviceData[0]?.link)}
          className="px-3 py-1.5 text-xsm rounded-full border-none bg-gradient-to-b from-customlightbtn to-customdarkBluebtn shadow-lg flex items-center justify-center text-white"
        >
          My Issue
        </button>
      </div> */}
      {/* <div className=" text-xsm px-5">
        {serviceData?.map((item, i) => (
          <button
            onClick={() => handlerNavigator(item?.link)}
            key={i}
            className=" py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-white bg-redLight mt-5 border-b-[1px] pb-2 border-gray"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full w-10 h-10 text-white p-1 flex items-center justify-center bg-[#FB4E4E]">
                <img src={item?.Image} alt="sd" />
             
              </div>
              <p>{item?.name}</p>
              
            </div>
            <p className="flex items-center gap-2">
              <MdKeyboardArrowRight size={28} className="text-2xl" />
            </p>
          </button>
        ))}
      </div> */}
      {/* <div className="text-xsm px-5">
        {serviceData?.slice(0, 1).map((item, i) => (
          <button
            onClick={() => handlerNavigator(item?.link)}
            key={i}
            className="py-2 rounded-lg w-full flex items-center justify-between gap-2 text-white bg-redLight mt-5 border-b-[1px] pb-2 border-gray"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full w-10 h-10 text-white p-1 flex items-center justify-center bg-[#FB4E4E]">
                <FaPhoneAlt className="text-white w-4 h-4" />
              </div>
              <p className="text-white font-medium">LiveChat</p>
            </div>
            <p className="flex items-center gap-2">
              <MdKeyboardArrowRight size={28} className="text-2xl" />
            </p>
          </button>
        ))}
      </div> */}

      <div className="text-sm px-5 mt-5 ">
        <h2 className="text-lg font-semibold text-black mb-4">Self Service</h2>

        {[
          {
            icon: serviceDeposit,
            label: "Deposit Not Receive",
            route: "/customerservices/depositNotRecieve",
          },
          {
            icon: serviceIFSC,
            label: "IFSC Modification",
            route: "/customerservices/ifscModification",
          },
          {
            icon: serviceDeleteBank,
            label: "Delete Withdraw Bank Account and Rebind",
            route: "/customerservices/deleteWithdrawBank",
          },
          {
            icon: serviceWithdrawalProblem,
            label: "Withdrawal problem",
            route: "/customerservices/withdrawProblem",
          },
          {
            icon: serviceChangeLogin,
            label: "Change Login Password",
            route: "/customerservices/changeIdLogin",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray"
            onClick={() => navigate(item.route)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B3B3B] text-white flex items-center justify-center text-lg">
                <img src={item.icon} alt="" />
              </div>
              <span className="text-black text-[14px] font-medium">
                {item.label}
              </span>
            </div>
            <MdKeyboardArrowRight size={22} className="text-gray" />
          </div>
        ))}
      </div>

      {/* Extended Self Service List */}
      <div className="text-sm px-5 mt-0">
        {[
          {
            icon: usdtIcon,
            label: "USDT verification (Non Indian Members)",
            route: "/customerservices/usdtNonIndian",
          },
          {
            icon: usdtIcon,
            label: "USDT verification (Indian Members)",
            route: "/customerservices/usdtIndian",
          },
          {
            icon: usdtIcon,
            label: "Delete Old USDT Address and Rebind",
            route: "/customerservices/deleteUsdtAddress",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray"
            onClick={() => navigate(item.route)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B3B3B] text-white flex items-center justify-center text-lg">
                <img src={item.icon} alt="" />
              </div>
              <span className="text-black text-[14px] font-medium">
                {item.label}
              </span>
            </div>
            <MdKeyboardArrowRight size={22} className="text-gray" />
          </div>
        ))}
      </div>

      {/* Additional Service Options */}
      <div className="text-sm px-5 mt-0">
        {[
          {
            icon: serviceChangeBank,
            label: "Change bank name",
            route: "/customerservices/changeBankName",
          },
          {
            icon: serviceWingo,
            label: "Wingo 1 Min Win Streak Bonus",
            route: "/customerservices/WingoWinStreak",
          },
          // { icon: serviceBDGWin, label: "Check BDG CASINO link", route: "/" },
          {
            icon: serviceGameProblem,
            label: "Game Problems",
            route: "/customerservices/gameProblem",
          },
          {
            icon: serviceAviator,
            label: "Aviator Lucky Bonus",
            route: "/customerservices/aviatorLuckyBonus",
          },
          // {
          //   icon: serviceChannel,
          //   label: "【BDG Cassino】Official Channel",
          //   route: "",
          // },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray"
            onClick={() => navigate(item.route)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B3B3B] text-white flex items-center justify-center text-lg">
                <img src={item.icon} alt="" />
              </div>
              <span className="text-black text-sm font-medium">
                {item.label}
              </span>
            </div>
            <MdKeyboardArrowRight size={22} className="text-gray" />
          </div>
        ))}
      </div>

      {/* Additional linkkkkkkk Service Options */}
      <div className="text-sm px-5 mt-0">
        {[
          {
            icon: serviceBDGWin,
            label: "Check BDG CASINO link",
            Link: "https://bdgcassino.com/",
          },

          {
            icon: serviceChannel,
            label: "【BDG Cassino】Official Channel",
            Link: "https://t.me/bdgcasinoviptrade",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray"
            // onClick={() => navigate(item.route)}
            onClick={() => {
              if (item.Link) {
                window.open(item.Link, "_blank");
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B3B3B] text-white flex items-center justify-center text-lg">
                <img src={item.icon} alt="" />
              </div>
              <span className="text-black text-sm font-medium">
                {item.label}
              </span>
            </div>
            <MdKeyboardArrowRight size={22} className="text-gray" />
          </div>
        ))}
      </div>

      {/* Kind Tips Section */}
      <div className="bg-[#F6F7FB] px-5 pt-4 pb-8 mt-5">
        <h3 className="text-base font-semibold text-[#333333] mb-2">
          Kind tips
        </h3>
        <p className="text-[13px] text-[#333] leading-relaxed">
          1. Please select the corresponding question and submit it for review.
          After successful submission, the customer service specialist will
          handle it for you within 10 minutes. Please wait patiently.
          <br />
          <br />
          2. 15 minutes after submitting for review, you can use [Progress
          Query] to view the review results of the work order you submitted.
        </p>

        {/* Progress Query Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-[#F2C400] hover:bg-[#e6b800] text-white text-base font-medium px-8 py-2 rounded-full shadow-md transition duration-300 w-2/3">
            Progress Query
          </button>
        </div>
      </div>

      {/* <div className="bg-[#2c2c2c] flex items-center justify-between rounded-md px-4 py-3 w-fit min-w-[300px] shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-[#FB4E4E] rounded-full p-2">
            <FaPhoneAlt className="text-white w-4 h-4" />
          </div>
          <span className="text-white font-medium">LiveChat</span>
        </div>
        <div className="text-white text-lg">{">"}</div>
      </div> */}
    </div>
  );
}

export default CustomerServices