import wallets from "../../assets/usaAsset/wallet/pro_wallet.png"
import CircularIndicator from "../../reusable_component/CircularIndicator";
import depositIcon from "../../assets/usaAsset/wallet/rechargeIcon.png"
import rechargeHistory from "../../assets/usaAsset/wallet/rechargeHistory.png"
import withdraw from "../../assets/usaAsset/wallet/widthdrawBlue.png"
import withdrawHistory from "../../assets/usaAsset/wallet/withdrawHistory.png"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import apis from '../../utils/apis'
import FirstDepositModal from "../../reusable_component/FirstDepositModal";
import Loader from "../../reusable_component/Loader/Loader";
const profileApi = apis.profile

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [firstDepsoitModal, setFirstDepsoitModal] = useState(localStorage.getItem("firstDepositModalValue") === "1");
  const [myDetails, setMyDetails] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  const userid = localStorage.getItem("userId");

  const profileDetails = async (userId) => {
    // if (!userId) {
    //   toast.error("User not logged in");
    //   navigate("/login");
    //   return;
    // }
    try {
      const res = await axios.get(`${profileApi}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data)
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (userid) {
      profileDetails(userid);
    }
  }, [userid]);
  const isFundTransferRunningRef = useRef(false);

  const fundTransferHandler = useCallback(() => {
    // if (isFundTransferRunningRef.current) return;
    // isFundTransferRunningRef.current = true;
    // if (!userId) {
    //   toast.error("User not logged in");
    //   navigate("/login");
    //   isFundTransferRunningRef.current = false;
    //   return;
    // }

    setShowModal(true);
    setTimer(5);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          console.log("triggered is to start")
          triggerFundTransfer();
          isFundTransferRunningRef.current = false;
        }
        return prev - 1;
      });
    }, 1000);
  }, [userid, navigate]);


  const triggerFundTransfer = useCallback(async () => {
    // if (isFundTransferRunningRef.current) return;
    // isFundTransferRunningRef.current = true;
    const payload = { id: userid };
    setLoading(true)
    try {
      const res = await axios.post(apis.fundTransfer, payload, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
      if (res?.data?.status === 200) {
        setLoading(false)
        profileDetails(userid);
        toast.success(res?.data?.message);
      }
    } catch (er) {
      console.error("Error:", er);
      toast.error(er);
    } finally {
      setLoading(false)
      setShowModal(false);
      isFundTransferRunningRef.current = false;
    }
  }, [userid, profileDetails]);


  const mainWalletPercentage = useMemo(() => {
    if (!myDetails?.data) return 0;
    return (myDetails.data.wallet * 100) /
      (myDetails.data.wallet + myDetails.data.third_party_wallet);
  }, [myDetails]);

  const thirdPartyWalletPercentage = useMemo(() => {
    if (!myDetails?.data) return 0;
    return (myDetails.data.third_party_wallet * 100) /
      (myDetails.data.wallet + myDetails?.data?.third_party_wallet);
  }, [myDetails]);

  const array = [{ game: "Lottery", amount: myDetails?.data?.wallet }, { game: "JILI", amount: myDetails?.data?.third_party_wallet }, { game: "EVO_Video", amount: myDetails?.data?.third_party_wallet }, { game: "TV_Chess", amount: myDetails?.data?.third_party_wallet }, { game: "Wickets9", amount: myDetails?.data?.third_party_wallet }, { game: "JDB", amount: myDetails?.data?.third_party_wallet }, { game: "DG", amount: myDetails?.data?.third_party_wallet }, { game: "CMD", amount: myDetails?.data?.third_party_wallet }, { game: "CQ9", amount: myDetails?.data?.third_party_wallet }, { game: "MG", amount: myDetails?.data?.third_party_wallet }, { game: "SaBa", amount: myDetails?.data?.third_party_wallet }, { game: "TB", amount: myDetails?.data?.third_party_wallet }, { game: "PG", amount: myDetails?.data?.third_party_wallet }, { game: "AG_Video", amount: myDetails?.data?.third_party_wallet }, { game: "Card365", amount: myDetails?.data?.third_party_wallet }, { game: "V8Card", amount: myDetails?.data?.third_party_wallet }]

  useEffect(() => {
    // console.log("userid",userid)
    const status = localStorage.getItem("firstDepositModalValue");
    if (status === "0" && userid) {
      setFirstDepsoitModal(true);
    } else {
      setFirstDepsoitModal(false);
    }
  }, [])
  // console.log("timer",timer)
  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      {firstDepsoitModal && (
        <div className="relative z-50 font-roboto">
          <FirstDepositModal
            firstDepsoitModal={firstDepsoitModal}
            setFirstDepsoitModal={setFirstDepsoitModal}
            onClose={() => setFirstDepsoitModal(false)}
          /></div>
      )}

      <div className="min-h-screen text-white  flex font-inter flex-col items-center ">
        <div className="bg-gradient-to-l from-[#4673cf] to-[#374a93] flex flex-col justify-center items-center  text-white w-full px-6 pb-16 pt-5 text-center shadow-md">
          <img className="h-12 w-12" src={wallets} alt="cx" />
          <p className="text-2xl font- mt-2">₹ {myDetails ? Number(myDetails?.data?.wallet + myDetails?.data?.third_party_wallet).toFixed(2) : "0.00"}</p>
          <p className="text-xsm mt-1">Total Balance</p>
        </div>
        <div className="px-4 -mt-8">
          <div className="bg-customdarkBlue shadow-md rounded-lg px-2 pt-5 pb-20 mt-2 w-full ">
            <div className="flex w-full text-black">
              <div className="flex w-[50%] flex-col justify-center items-center">
                <CircularIndicator percentage={mainWalletPercentage} />

                <p className="mt-2 text-white">₹ {myDetails ? Number(myDetails?.data?.wallet).toFixed(2) : "0.00"}</p>
                <p className="bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-xsm">Main wallet</p>
              </div>
              <div className="flex w-[50%] flex-col justify-center items-center">
                <CircularIndicator percentage={thirdPartyWalletPercentage} />
                <p className="mt-2  text-white">₹ {myDetails ? Number(myDetails?.data?.third_party_wallet).toFixed(2) : "0.00"}</p>
                <p className="bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-xsm">Third party wallet</p>
              </div>
            </div>
            <button onClick={fundTransferHandler} className="bg-gradient-to-l from-[#4673cf] to-[#374a93]  text-sm text-white w-full py-2 mt-4 rounded-full outline-none font-semibold">
              {showModal ? `Recalling ${timer}...` : "Main wallet transfer"}
            </button>
            <div className="grid grid-cols-4 gap-4 mt-6 max-w-md">
              <button className="">
                <Link className=" rounded-lg flex flex-col justify-start h-20 items-center" to="/wallet/deposit"  >
                  <img
                    src={depositIcon}
                    alt="Deposit"
                    className="w-16 h-16"
                  />
                  <p className="text-xs mt-2 ">Deposit</p>
                </Link>
              </button>
              <button className="">
                <Link className=" rounded-lg flex flex-col justify-start h-20 items-center" to="/wallet/withdrawal"  >
                  <img
                    src={withdraw}
                    alt="Withdrawal"
                    className="w-16 h-16"
                  />
                  <p className="text-xs mt-2">Withdraw</p>
                </Link>
              </button>
              <button className="" >
                <Link className=" rounded-lg flex flex-col justify-start h-20 items-center" to="/wallet/deposithistory"  >
                  <img
                    src={rechargeHistory}
                    alt="Deposit History"
                    className="w-16 h-16"
                  />
                  <p className="text-xs mt-2">Deposit history</p>
                </Link>
              </button>
              <button className="" >
                <Link className=" rounded-lg flex flex-col justify-start h-20 items-center" to="/wallet/withdrawalhistory"  >
                  <img
                    src={withdrawHistory}
                    alt="Withdrawal History"
                    className="w-16 h-16"
                  />
                  <p className="text-xs mt-2">Withdrawal history</p>
                </Link>
              </button>
            </div>

          </div>
        </div>
        {/* <div className="w-full grid grid-cols-3 pl-4 mt-2 mb-20">
          {array?.map((item, i) => (
            <div
              key={i}
              className={`col-span-1 mb-2 w-28 h-20 rounded-md flex flex-col items-center text-xsm
                 justify-evenly ${i === 0 ? "bg-gradient-to-l from-[#4673cf] to-[#374a93] text-white" : "bg-customdarkBlue"
                } shadow-md text-lightGray`}
            >
              <p>₹ {item?.amount}</p>
              <p>{item?.game}</p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default Wallet;
