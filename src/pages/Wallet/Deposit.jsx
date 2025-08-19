import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import payzaar from "../../assets/payzaar.png";
import depo_wallet from "../../assets/icons/depo_wallet.png";
import indianpaylogo from "../../assets/images/indianpaylogo.png";
import usdt_icon from "../../assets/images/usdt_icon.png";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import camlenios from "../../assets/usaAsset/wallet/camlenios.png";
import indianpay from "../../assets/usaAsset/wallet/indianpay.png";
// import upi from "../../assets/usaAsset/wallet/upi.png"
// import paytm from "../../assets/usaAsset/wallet/paytm.png"
import rechargeIns from "../../assets/usaAsset/wallet/rechargeIns.png";
import save_wallet from "../../assets/usaAsset/wallet/save_wallet.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../utils/apis";
import withdrawBg from "../../assets/usaAsset/wallet/withdrawBg.png";
import Loader from "../../reusable_component/Loader/Loader";
import { data } from "autoprefixer";
import { FaWallet } from "react-icons/fa";
import selectionChanel from "../../assets/images/selctionChannel.png";

const profileApi = apis.profile;
function Deposit() {
  const [loading, setloading] = useState(false);
  const [qrcode, setQrcode] = useState(null);
  const [walletaddress, setwalletaddress] = useState(null);
  const [amount, setAmount] = useState("");
  const [amountUsdt, setAmountUsdt] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [screenshotUsdt, setScreenshotUsdt] = useState("");
  const [paymenLimts, setPaymenLimts] = useState({});
  const [amountError, setAmountError] = useState("");
  const [amountErrorUSDT, setAmountErrorUSDT] = useState("");

  const [amountErrorCamilino, setAmountErrorCamilino] = useState("");
  const [activeModal, setActiveModal] = useState(0);
  // const [payModesList, setPayModesList] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(200);
  const [selectedAmountCamilino, setSelectedAmountCamilino] = useState(2);
  const [USDTselectedAmount, setUSDTSelectAmount] = useState(10);
  const [upiAmount, setUpiAmount] = useState(selectedAmount);
  const [upiAmountCamilino, setUpiAmountCamilino] = useState(
    selectedAmountCamilino
  );
  const [usdtAmount, setUsdtAmount] = useState(USDTselectedAmount);
  const depositArray = [
    "200",
    "300",
    "500",
    "1000",
    "5000",
    "10000",
    "20000",
    "50000",
    "100000",
  ];
  // const depositArrayKuberPay = ["10000", "15000", "20000", "30000", "50000", "100000"]
  const USDTDepositArray = [
    "10",
    "20",
    "50",
    "100",
    "200",
    "500",
    "1000",
    "2000",
    "5000",
  ];
  const [myDetails, setMyDetails] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const getPaymentLimits = async () => {
    setloading(true);
    try {
      console.log(`api of deposit limit: ${apis.getPaymentLimits}`);
      const res = await axios.get(`${apis.getPaymentLimits}`);
      console.log("res deposit limit:",res)
      if (res?.data?.status === 200) {
        setloading(false);
        setPaymenLimts(res?.data?.data);
      }
    } catch (err) {
      setloading(false);
      toast.error(err);
    }
  };
  // console.log("paymenLimtspaymenLimts", paymenLimts);
  const validateAmount = (amount) => {
    if (!paymenLimts) return;
    let minAmount, maxAmount;
    if (activeModal === 0) {
      minAmount = paymenLimts?.INR_minimum_deposit;
      maxAmount = paymenLimts?.INR_maximum_deposit;
    } else if (activeModal == 1) {
      minAmount = paymenLimts?.USDT_minimum_deposit;
      maxAmount = paymenLimts?.USDT_maximum_deposit;
    } else {
      minAmount = paymenLimts?.kuber_pay_minimum_deposit;
      maxAmount = paymenLimts?.kuber_pay_maximum_deposit;
    }
    amount = Number(amount);
    if (isNaN(amount) || amount < minAmount || amount > maxAmount) {
      setAmountError(`Amount must be between ₹${minAmount} - ₹${maxAmount}`);
      setAmountErrorUSDT(
        `Amount must be between $${minAmount} - $${maxAmount}`
      );
      setAmountErrorCamilino(
        `Amount must be between $${minAmount} - $${maxAmount}`
      );
    } else {
      setAmountError("");
      setAmountErrorUSDT("");
      setAmountErrorCamilino("");
    }
  };
  useEffect(() => {
    if (activeModal == 1) {
      validateAmount(usdtAmount);
      // console.log("usdtAmountusdtAmount", usdtAmount)
    } else if (activeModal == 0) {
      validateAmount(upiAmount);
      // console.log("upiAmount", upiAmount)
    } else {
      validateAmount(upiAmountCamilino);
    }
  }, [activeModal]);
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
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getPaymentLimits();
  }, []);
  // console.log("usdtAmount",usdtAmount,upiAmount)
  // const payin_deposit = async () => {
  //   console.log("payin_deposit called");
  //   if (!userId) {
  //     toast.error("User not logged in");
  //     navigate("/login");
  //     return;
  //   }
  //   // if (!screenshot) {
  //   //   toast.error("Please select a screenshot before proceeding.");
  //   //   return;
  //   // }
  //   setloading(true);

  //   // ✅ Get INR (actual value entered in input)
  //   const inrValue = usdtAmount * (paymenLimts?.deposit_conversion_rate || 1);

  //   // ✅ Get USDT (converted from INR)
  //   const convertedUSDT =
  //     inrValue / (paymenLimts?.deposit_conversion_rate || 1);
      
  //   const payloadusdt = {
  //     user_id: userId,
  //     cash: usdtAmount,
  //     type: 1,
  //     inr: inrValue,
  //     screenshot: screenshot,
  //   };
  //   const apiUsdtPay = apis.payin_deposit_usdt;
  //   try {
  //     console.log("Usdt payload", payloadusdt);
  //     console.log(`Submitting USDT deposit to ${apiUsdtPay}`);
  //     const res = await axios.post(apiUsdtPay, payloadusdt);
  //     console.log("res", res);
  //     if (
  //       res?.data?.status === true ||
  //       res?.data?.status === "200" ||
  //       res?.data?.status === 200 ||
  //       res?.data?.status === "SUCCESS"
  //     ) {
  //       toast.success(res?.data?.message);
  //       console.log("open qr");
  //       window.open(res?.data?.paymentUrl, "_blank");
  //       setloading(false);
  //     } else {
  //       setloading(false);
  //       console.log("res?.data?.message", res?.data?.message);
  //       toast.error(res?.data?.message);
  //     }
  //   } catch (er) {
  //     setloading(false);
  //     console.log("dffgd", er);
  //     toast.error(er);
  //   }
  // };


    const payin_deposit = async () => {
    console.log("payin_deposit called");
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    // if (!screenshot) {
    //   toast.error("Please select a screenshot before proceeding.");
    //   return;
    // }
    setloading(true);

    // ✅ Get INR (actual value entered in input)
    const inrValue = usdtAmount * (paymenLimts?.deposit_conversion_rate || 1);

    // ✅ Get USDT (converted from INR)
    const convertedUSDT =
      inrValue / (paymenLimts?.deposit_conversion_rate || 1);
      
    const payloadusdt = {
      user_id: userId,
      cash: usdtAmount,
      type: 1,
      inr: inrValue,
      screenshot: screenshot,
    };
    const apiUsdtPay = apis.payin_deposit_usdt;
    console.log("apiUsdtPayapiUsdtPay url ",apiUsdtPay)
    try {
      console.log("Usdt payload", payloadusdt);
      console.log(`Submitting USDT deposit to ${apiUsdtPay}`);
      const res = await axios.post(apiUsdtPay, payloadusdt);
      console.log("res", res);
      if (
        res?.data?.status === true ||
        res?.data?.status === "200" ||
        res?.data?.status === 200 ||
        res?.data?.status === "SUCCESS"
      ) {
        toast.success(res?.data?.message);
        console.log("open qr");
        // window.open(res?.data?.paymentUrl, "_blank");
        toast.success()
        setloading(false);
      } else {
        setloading(false);
        console.log("res?.data?.message", res?.data?.message);
        toast.error(res?.data?.message);
      }
    } catch (er) {
      setloading(false);
      console.log("dffgd", er);
      toast.error(er);
    }
  };

  useEffect(() => {
    if (userId) {
      profileDetails(userId);
    }
    getQR();
  }, [userId]);

  const handleSelectAmount = (amount) => {
    const numericAmount = Number(amount);
    setSelectedAmount(numericAmount);
    setUpiAmount(numericAmount);
    validateAmount(numericAmount);
  };
  const handleSelectAmountCamilino = (amount) => {
    const numericAmount = Number(amount);
    setSelectedAmountCamilino(numericAmount);
    setUpiAmountCamilino(numericAmount);
    validateAmount(numericAmount);
  };

  const handleUSDTSelectAmount = (amount) => {
    const numericAmount = Number(amount);
    setUSDTSelectAmount(numericAmount);
    setUsdtAmount(numericAmount);
    validateAmount(numericAmount);
  };

  const toggleModal = (modalType) => {
    setActiveModal(modalType);
    setAmountError("");
    setAmountErrorUSDT("");
  };

  const payMethod = [
    // {
    //   image: payzaar,
    //   name: "Payzaarpay",
    //   type: 0,
    // },
    {
      image: indianpaylogo,
      name: "Indian Pay",
      type: 0,
    },
    {
      image: usdt_icon,
      name: "USDT",
      type: 1,
    },

    // {
    //     image: camlenios,
    //     name: "camlinio",
    //     type: 2
    // }
  ];

  // show qrcode
  const getQR = async () => {
    try {
      const res = await axios.get(`${apis?.show_qr}`);
      console.log("qrcoe usdt ", res);
      console.log("qrcode image:", res?.data?.data[0]?.image);
      if (res?.data?.status === 200 || res?.data?.status === "200" || res?.data?.status === true) {
        console.log("555")
        setQrcode(res?.data?.data[0]?.image);
        setwalletaddress(res?.data?.data[0]?.wallet_address);
      }
    } catch (err) {
      if (err?.response?.data?.status === 500) {
        console.log("err", err);
      } else {
        // toast?.error(err?.response?.data?.message);
        console.log("err", err);
      }
    }
  };

  // type == 2  
  const manualPyamentHandler = async () => {
    console.log("manualPyamentHandler called");
    const payloadManual = {
      user_id: userId,
      cash: amount,
      transaction_id: transactionId,
      screenshot: screenshot,
    };
      console.log("payloadManual", payloadManual);
    try {
      console.log("`${apis?.manual_payin}`",`${apis?.manual_payin}`)
      const res = await axios.post(`${apis?.manual_payin}`, payloadManual);
      console.log("first", res);
      if (res?.data?.status === 200) {
        setTransactionId("");
        setAmount("");
        setScreenshot("");
        toast?.success(res?.data?.message);
      }
    } catch (err) {
      console.log("erere", err);
      if (err?.response?.data?.status === 500) {
        console.log("err", err);
      } else {
        toast?.error(err?.response?.data?.message);
      }
    }
  };

  // type === 0 payin
  const payjarPayinHandler = async () => {
    setloading(true);
    const payload = {
      user_id: userId,
      cash: upiAmount,
      type: "2",
    };
    console.log("PAYLOAD  indian pay", payload);
try {
  console.log(`api of indian pay: ${apis?.payin_deposit_indianPay}`);
  const res = await axios.post(`${apis?.payin_deposit_indianPay}`, payload);
  console.log("payjarIndianPayHandler response", res);

  // ✅ If response is HTML (demo account case)
  if (
    res?.status === 200 &&
    typeof res?.data === "string" &&
    res?.data.includes("<html")
  ) {
    // Open the HTML in a new tab
    const newWindow = window.open();
    newWindow.document.write(res.data);
    newWindow.document.close();
    setloading(false);
    return;
  }

  if (res?.data?.status === 400) {
    toast?.error(res?.data?.error);
  }

  // ✅ Normal success case with JSON response
  if (res?.status === 200 && res?.data?.status === "SUCCESS") {
    toast?.success(res?.data?.message);
    const link = res?.data?.payment_link;
    window.open(link, "_blank");
  }

  setloading(false);
} catch (err) {
  setloading(false);
  console.log("payzaar error", err);
  if (err?.response?.data?.status === 500) {
    console.log("err", err);
  } else {
    toast?.error(err?.response?.data?.message);
  }
}

  };
  // console.log("patymewntre", paymenLimts)

  // console.log("paymenLimts", qrcode)

  const [selected, setSelected] = useState("Happy-APPpay"); // default selected
  const [selectedChannelUSDt, setSelectedChannelUSDt] = useState("FAST-QRpay"); // default selected

  const handleCopy = () => {
    navigator.clipboard.writeText(walletaddress)
 toast.success('Copied to clipboard!');  }
   

  const channels = [
    { name: "Happy-APPpay", balance: "300 - 50K" },
    { name: "7Day-QRpay", balance: "500 - 50K" },
    { name: "FAST-QRpay", balance: "500 - 50K" },
    { name: "UPI-APPpay", balance: "200 - 50K" },
    { name: "Easy-QRpay", balance: "200 - 20K" },
    { name: "AG-QRpay", balance: "300 - 50K" },
    { name: "Gaay-QRpay", balance: "300 - 50K" },
    { name: "51-APPpay", balance: "100 - 50K" },
    { name: "YaYa-APPpay", balance: "300 - 50K" },
    { name: "UM-QRpay", balance: "100 - 2K" },
    { name: "Magic-APPpay", balance: "100 - 50K" },
    { name: "TT-QRpay", balance: "500 - 50K" },
    { name: "Rs-APPpay", balance: "100 - 50K" },
    { name: "Ceco-APPpay", balance: "100 - 50K" },
  ];

  const channels2 = [
    { name: "FAST-QRpay", balance: "500 - 50K" },
    { name: "7Day-QRpay", balance: "500 - 50K" },
    // { name: "Happy-APPpay", balance: "300 - 50K" },
    // { name: "UPI-APPpay", balance: "200 - 50K" },
    // { name: "YaYa-APPpay", balance: "300 - 50K" },
    // { name: "Gaay-QRpay", balance: "300 - 50K" },
    // { name: "Easy-QRpay", balance: "200 - 20K" },
  ];

  return (
    <div className="mx-3">
      {loading == true && <Loader setloading={setloading} loading={loading} />}
      <div
        className="h-40 w-full object-fill bg-no-repeat  rounded-lg p-2"
        style={{
          backgroundImage: `url(${withdrawBg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <p className="flex items-center gap-4 mt-5">
          <p>
            <img className="w-5 h-5" src={depo_wallet} alt="ds" />
          </p>
          <p className="text-[#8F5206]">Balance</p>
        </p>
        <p className="mt-2 text-2xl flex items-center gap-4 ml-5 font-bold text-[#8F5206]">
          <p>
            ₹{" "}
            {myDetails
              ? Number(
                  myDetails?.data?.wallet + myDetails?.data?.third_party_wallet
                ).toFixed(2)
              : "0.00"}
          </p>
          <HiArrowPathRoundedSquare
            onClick={() => profileDetails(userId)}
            className=" text-xl"
          />
        </p>
      </div>
      <div className="w-full grid grid-cols-3 gap-3 mt-2">
        {payMethod &&
          payMethod?.map((item, i) => {
            // console.log("itemr", item, activeModal);
            return (
              <div
                onClick={() => toggleModal(item?.type)}
                key={i}
                className={`col-span-1 mb-2 p-4 rounded-md flex flex-col items-center text-xsm justify-evenly ${
                  item?.type == activeModal
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                    : "bg-[#333332]  text-[#A8A5A1]"
                } shadow-md text-lightGray`}
              >
                <img
                  className={`w-${item?.type === 1 ? 12 : 14} h-12`}
                  src={item.image}
                  alt="UPI Payment "
                />
                <p
                  className={`text-nowrap ${
                    item?.type == activeModal
                      ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                      : "bg-[#333332]  text-[#A8A5A1]"
                  }`}
                >
                  {item?.name}
                </p>
              </div>
            );
          })}
      </div>

      {/* Select Channel */}
      {activeModal === 0 ? (
        <div className="bg-[#333332] w-[376px] p-4 rounded-xl shadow-md">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            {/* <FaWallet className="text-[#D9AC4F]" /> */}
            <img src={selectionChanel} alt="" className="h-6 w-6" />
            <h2 className="text-white text-lg font-semibold">Select channel</h2>
          </div>

          {/* Grid of Options */}
          <div className="grid grid-cols-2 gap-2">
            {channels.map((channel) => (
              <div
                key={channel.name}
                onClick={() => setSelected(channel.name)}
                className={`p-2 rounded-md text-sm cursor-pointer transition-all duration-200 ${
                  selected === channel.name
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                    : "bg-[#3a3a3a] text-[#A8A5A1] hover:bg-[#4a4a4a]"
                }`}
              >
                <div className="font-semibold">{channel.name}</div>
                <div>Balance: {channel.balance}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
        // className="bg-[#333332] w-[376px] p-4 rounded-xl shadow-md"
        >
          {/* Header */}
          {/* <div className="flex items-center gap-2 mb-4">
            <FaWallet className="text-[#D9AC4F]" />
            <img src={selectionChanel} alt="" className="h-6 w-6" />
            <h2 className="text-white text-lg font-semibold">Select channel</h2>
          </div> */}

          {/* Grid of Options */}
          {/* <div className="grid grid-cols-1 gap-2">
            {channels2.map((channel) => (
              <div
                key={channel.name}
                onClick={() => setSelectedChannelUSDt(channel.name)}
                className={`p-3 rounded-md cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                  selectedChannelUSDt === channel.name
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                    : "bg-[#3a3a3a] text-[#A8A5A1] hover:bg-[#4a4a4a]"
                }`}
              >
              
                <img src={usdt_icon} alt="usdt" className="h-10 w-10" />

           
                <div className="flex flex-col text-sm leading-tight">
                  <div className="font-semibold">{channel.name}</div>
                  <div>Balance: {channel.balance}</div>
                  <div>2% bonus</div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      )}

      {activeModal === 0 && (
        <>
          <div className="mt-5 ">
            <div className="bg-customdarkBlue shadow-lg rounded-lg p-2">
              <h3 className="text-lg font-semibold text-bg2 flex items-center ">
                <img className="w-6 h-6" src={save_wallet} alt="sd" /> &nbsp;{" "}
                <p className="text-white">Deposit amount </p>
              </h3>
              <div className="grid grid-cols-3 mt-3 gap-3">
                {depositArray.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectAmount(item)}
                    className={`col-span-1 border-[0.2px] border-lightGray flex items-center justify-center gap-3 rounded-md py-1  
                        ${
                          selectedAmount == item
                            ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206] "
                            : "text-[#8F5409]"
                        }`}
                  >
                    <span
                      className={`${
                        selectedAmount == item
                          ? " text-white"
                          : "text-[#666462]"
                      }`}
                    >
                      ₹
                    </span>{" "}
                    &nbsp;&nbsp;
                    <p
                      className={`${
                        selectedAmount == item
                          ? " text-[#8F5409]"
                          : "text-[#D9AC4F]"
                      }`}
                    >
                      {" "}
                      {i === 3
                        ? "1K"
                        : i === 4
                        ? "5K"
                        : i === 5
                        ? "10K"
                        : i === 6
                        ? "20K"
                        : i === 7
                        ? "50K"
                        : i === 8
                        ? "100K"
                        : item}
                    </p>
                  </div>
                ))}
              </div>
              {/* <div className='grid grid-cols-3 mt-3 gap-3'>
                            {depositArray.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelectAmount(item)}
                                    className={`col-span-1 border-[1px] flex items-center justify-center gap-3 rounded-md py-1 border-border1  
                        ${selectedAmount == item ? 'bg-gradient-to-l from-[#ff9a8e] to-[#f95959] text-white' : 'text-lightGray'}`}>
                                    ₹&nbsp;&nbsp;<p className={`${selectedAmount == item ? ' text-white' : 'text-redLight'}`}>{i === 3 ? "1K" : i === 4 ? "5K" : i === 5 ? "10K" : i === 6 ? "20K" : i === 7 ? "50K" : i === 8 ? "100K" : item}</p>
                                </div>
                            ))}
                        </div> */}
              {amountError && (
                <p className="text-bg2 text-xs mt-2">{amountError}</p>
              )}
              <div className="flex items-center bg-red rounded-full text-sm mt-3 p-1">
                <div className="w-8 flex items-center justify-center text-[#D9AC4F] text-2xl font-bold">
                  ₹
                </div>
                <div className="w-px h-6 bg-[#676665] mx-1 opacity-60"></div>
                <input
                  value={upiAmount == 0 ? "" : upiAmount}
                  onChange={(e) => {
                    const numericAmount = Number(e.target.value);
                    setUpiAmount(numericAmount);
                    validateAmount(numericAmount);
                  }}
                  type="number"
                  placeholder="Please enter the amount"
                  className="w-full p-1 bg-red border-none focus:outline-none text-[#D9AC4F] placeholder:text-xsm"
                />

                <button
                  onClick={() => setUpiAmount("0")}
                  className="flex items-center justify-center text-lightGray p-2 rounded-full"
                >
                  <RxCrossCircled size={20} />
                </button>
              </div>
              {/* <button
                disabled={
                  upiAmount < paymenLimts?.INR_minimum_deposit ||
                  upiAmount > paymenLimts?.INR_maximum_deposit
                }
                onClick={payjarPayinHandler}
                className={`mt-4 w-full ${
                  upiAmount >= paymenLimts?.INR_minimum_deposit &&
                  upiAmount <= paymenLimts?.INR_maximum_deposit
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                    : "bg-[#6F7381] text-[#A2A5A1]"
                } py-3 rounded-full border-none text-xsm`}
              >
                Deposit
              </button> */}
            </div>

            <div className="bg-customdarkBlue shadow-lg rounded-lg p-2 my-10">
              <div className="flex items-center gap-3 font-bold">
                <img className="w-8 h-8" src={rechargeIns} alt="dfd" />
                <p className="text-white">Recharge instructions</p>
              </div>
              <div className="">
                <ul className="px-2 py-4 my-2 border-[#474654] border-thin rounded-lg text-xsm text-[#A8A5A1] ">
                  <li className="flex items-start">
                    <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                    If the transfer time is up, please fill out the deposit form
                    again.
                  </li>
                  <li className="flex items-start mt-2">
                    <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                    The transfer amount must match the order you created,
                    otherwise the money cannot be credited successfully.
                  </li>
                  <li className="flex items-start mt-2">
                    <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                    If you transfer the wrong amount, our company will not be
                    responsible for the lost amount!.
                  </li>
                  <li className="flex items-start mt-2">
                    <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                    Note: Do not cancel the deposit order after the money has
                    been transferred.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="w-full h-24 flex items-end justify-end px-4 -mt-16 mb-2">
            <button
              disabled={
                upiAmount < paymenLimts?.INR_minimum_deposit ||
                upiAmount > paymenLimts?.INR_maximum_deposit
              }
              onClick={payjarPayinHandler}
              className={`mt-4 w-full max-w-[120px] ${
                upiAmount >= paymenLimts?.INR_minimum_deposit &&
                upiAmount <= paymenLimts?.INR_maximum_deposit
                  ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                  : "bg-[#6F7381] text-[#A2A5A1]"
              } py-3 rounded-full border-none text-xsm`}
            >
              Deposit
            </button>
          </div> */}
          {/* <div className="sticky bottom-0 bg-[#2b2b2b] w-full px-4 py-8 z-50">
            <button
              disabled={
                upiAmount < paymenLimts?.INR_minimum_deposit ||
                upiAmount > paymenLimts?.INR_maximum_deposit
              }
              onClick={payjarPayinHandler}
              className={`w-full max-w-[120px] float-right ${
                upiAmount >= paymenLimts?.INR_minimum_deposit &&
                upiAmount <= paymenLimts?.INR_maximum_deposit
                  ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                  : "bg-[#6F7381] text-[#A2A5A1]"
              } py-3 rounded-full border-none text-xsm -mt-5`}
            >
              Deposit
            </button>
          </div> */}

          <div className="sticky bottom-0 bg-[#2b2b2b] w-full px-4 py-4 z-50">
            <div className="flex items-center justify-between">
              {/* Left Side: Recharge Method Text */}
              <div className="text-white text-sm leading-tight">
                <p className="text-gray-300">Recharge Method:</p>
                <p className="font-semibold">
                  <span className="text-white">{selected}</span>
                  <span className="text-gray-400">pay</span>
                </p>
              </div>

              {/* Right Side: Deposit Button */}
              <button
                disabled={
                  upiAmount < paymenLimts?.INR_minimum_deposit ||
                  upiAmount > paymenLimts?.INR_maximum_deposit
                }
                onClick={payjarPayinHandler}
                className={`w-full max-w-[120px] ${
                  upiAmount >= paymenLimts?.INR_minimum_deposit &&
                  upiAmount <= paymenLimts?.INR_maximum_deposit
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                    : "bg-[#6F7381] text-[#A2A5A1]"
                } py-3 rounded-full border-none text-xsm`}
              >
                Deposit
              </button>
            </div>
          </div>
        </>
      )}
      {activeModal == 1 && (
        <div className="mt-5 ">
          <div className="bg-[ #22275b] shadow-lg rounded-lg p-2">
            <div className="flex justify-center">
              <img
                src={qrcode || "/placeholder.png"}
                className="w-40 h-40"
                alt="usdtqrcode"
              />
            </div>
            <br/>
                      <div className="w-full max-w-md">
      <input
        type="text"
        value={walletaddress}
        readOnly
        onClick={handleCopy}
        title="Click to copy"
        className="w-full text-black px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      />
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
            
            <div className="flex justify-center mt-5">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setScreenshot(reader.result.split(",")[1]); // remove `data:image/...;base64,`
                  };
                  if (file) {
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="uploadScreenshot"
              />
              <label
                htmlFor="uploadScreenshot"
                className="bg-[#333332] w-full h-20 rounded-lg shadow-xl flex items-center justify-center cursor-pointer"
              >
                <p className="border-none  bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206] border-[1px] rounded-lg px-2 py-4">
                  Upload screenshot
                </p>
              </label>
            </div>
            {screenshot && (
              <div className="relative mt-4">
                <img
                  src={`data:image/png;base64,${screenshot}`}
                  alt="Preview"
                  className="w-full rounded-md"
                />
                <button
                  onClick={() => setScreenshot("")}
                  className="absolute top-2 right-2 bg-customred font-bold bg-opacity-60 text-white rounded-full py-1 px-2.5 hover:bg-opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            )}
            {/* <h3 className="text-lg font-semibold text-bg2 flex items-center ">
                            <img className='w-6 h-6' src={save_wallet} alt="sd" /> &nbsp; <p className='text-black'>Deposit amount </p>
                        </h3> */}
            {/* <div className='grid grid-cols-3 mt-3 gap-3'>
                            {USDTDepositArray.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleUSDTSelectAmount(item)}
                                    className={`col-span-1 border-[1px] flex items-center justify-center gap-3 rounded-md py-1 border-border1 text-lightGray 
                        ${USDTselectedAmount == item ? 'bg-gradient-to-l from-[#ff9a8e] to-[#f95959] text-white' : ''}`}>
                                    $&nbsp;&nbsp;<p className={`${USDTselectedAmount == item ? ' text-white' : 'text-redLight'}`}>{item}</p>
                                </div>
                            ))}
                        </div> */}

            {amountErrorUSDT && (
              <p className="text-red text-xs mt-2 ">{amountErrorUSDT}</p>
            )}
            {/* <div className="bg-[#374992] rounded-md p-3 flex flex-col mt-3 items-center justify-center">
              <div className="flex items-center bg-[#22275b] w-full rounded-full text-sm p-2">
                <img src={usdt_icon} alt="usdt" className="w-5 h-5" />
                <div className="w-[1px] mx-2 flex items-center justify-center bg-lightGray h-5"></div>
                <input
                  value={usdtAmount == 0 ? "" : usdtAmount}
                  onChange={(e) => {
                    const numericAmount = Number(e.target.value);
                    setUsdtAmount(numericAmount);
                    validateAmount(numericAmount);
                  }}
                  type="number"
                  placeholder="Please enter the amount"
                  className="w-full p-1 bg-[#22275b] border-none focus:outline-none text-white placeholder:text-lightGray text-xsm"
                />
              </div>

              <div className="flex items-center mt-3 bg-[#22275b] w-full rounded-full text-sm p-2">
                <div className="w-8 flex items-center justify-center text-xl font-bold text-white">
                  ₹
                </div>
                <div className="w-[1px] mx-2 bg-lightGray h-5"></div>
                <input
                  value={
                    usdtAmount == 0
                      ? ""
                      : usdtAmount * (paymenLimts?.deposit_conversion_rate || 1)
                  }
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setUsdtAmount(
                      value / (paymenLimts?.deposit_conversion_rate || 1)
                    );
                    validateAmount(
                      value / (paymenLimts?.deposit_conversion_rate || 1)
                    );
                  }}
                  type="number"
                  placeholder="Enter INR amount"
                  className="w-full p-1 bg-[#22275b] border-none focus:outline-none text-white placeholder:text-lightGray text-xsm"
                />
              </div>
            </div> */}
            {/* USDT Amount Selection Grid (same style as shown in image) */}
            {/* USDT Random Amount Selection + Input + Converter */}
            <div className="mt-5 bg-[#333332]">
              <p className="text-white font-bold text-[16px] mb-3 flex items-center py-2 px-2 ">
                <img src={usdt_icon} className="w-6 h-6 mr-2" /> Select amount
                of USDT
              </p>

              {/* Random amount options */}
              <div className="grid grid-cols-3 gap-3 px-2">
                {USDTDepositArray.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      handleUSDTSelectAmount(item);
                      setUsdtAmount(item);
                      validateAmount(item);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-md py-2 cursor-pointer border border-[#494949] transition-all
          ${
            USDTselectedAmount == item
              ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
              : " text-[#D9AC4F] "
          }`}
                  >
                    <img src={usdt_icon} className="w-4 h-4" alt="icon" />
                    <span className="text-sm font-semibold">
                      {item >= 1000 ? `${item / 1000}K` : item}
                    </span>
                  </div>
                ))}
              </div>

              {/* USDT & INR input converter */}
              <div className=" rounded-md p-3 flex flex-col mt-3 items-center justify-center">
                {/* USDT Input */}
                <div className="flex items-center bg-[#242424] w-full rounded-full text-sm p-2">
                  <img src={usdt_icon} alt="usdt" className="w-5 h-5" />
                  <div className="w-[1px] mx-2 bg-lightGray h-5" />
                  <input
                    value={usdtAmount === 0 ? "" : usdtAmount}
                    onChange={(e) => {
                      const numericAmount = Number(e.target.value);
                      setUsdtAmount(numericAmount);
                      validateAmount(numericAmount);
                      setUSDTselectedAmount(null); // optional: deselect grid if typing manually
                    }}
                    type="number"
                    placeholder="Please enter USDT amount"
                    className="w-full p-1 bg-[#242424] border-none focus:outline-none text-[#D7AB4E] placeholder:text-[#C8C9CC] text-xsm"
                  />
                </div>

                {/* INR Equivalent Input */}
                <div className="flex items-center mt-3 bg-[#242424] w-full rounded-full text-sm p-0">
                  <div className="w-8 flex items-center justify-center text-xl font-bold text-[#D7AB4E]">
                    ₹
                  </div>
                  <div className="w-[1px] mx-2 bg-lightGray h-5" />
                  <input
                    value={
                      usdtAmount === 0
                        ? ""
                        : usdtAmount *
                          (paymenLimts?.deposit_conversion_rate || 1)
                    }
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      const converted =
                        value / (paymenLimts?.deposit_conversion_rate || 1);
                      setUsdtAmount(converted);
                      validateAmount(converted);
                      setUSDTselectedAmount(null); // optional
                    }}
                    type="number"
                    placeholder="Please enter the amount"
                    className="w-full p-1 bg-[#242424] border-none focus:outline-none text-[#D7AB4E] placeholder:text-[#C8C9CC] text-xsm"
                  />
                </div>
              </div>
            </div>

            {/* <div className='bg-inputBg rounded-md p-3 flex flex-col mt-3 items-center justify-center'>
                            <div className="flex items-center bg-white w-full rounded-full text-sm p-2">
                                <div className="w-8 flex items-center justify-center text-xl font-bold text-bg2">$</div>
                                <div className="w-[1px] mx-2 flex items-center justify-center bg-lightGray h-5"></div>
                                <input
                                    value={usdtAmount == 0 ? "" : usdtAmount}
                                    onChange={(e) => {
                                        const numericAmount = Number(e.target.value);
                                        setUsdtAmount(numericAmount);
                                        validateAmount(numericAmount);
                                    }}

                                    type="number"
                                    placeholder="Please enter the amount"
                                    className="w-full p-1 bg-white border-none focus:outline-none text-redLight placeholder:text-lightGray text-xsm"
                                />
                                <button onClick={() => setUsdtAmount("0")} className="flex items-center justify-center text-lightGray p-2 rounded-full">
                                    <RxCrossCircled size={20} />
                                </button>
                            </div>
                            <div className="flex items-center bg-white w-full rounded-full text-sm mt-3 p-2">
                                <div className="w-8 flex items-center justify-center text-xl font-bold text-bg2">₹</div>
                                <div className="w-[1px] mx-2 flex items-center justify-center bg-lightGray h-5"></div>
                                <p
                                    className="w-full p-1 bg-white border-none focus:outline-none text-redLight placeholder:text-lightGray text-xsm"
                                >{usdtAmount * paymenLimts?.deposit_conversion_rate}</p>
                            </div>
                        </div> */}
            {/* <button
              onClick={payin_deposit}
              className={`mt-4 w-full ${
                usdtAmount >= paymenLimts?.USDT_minimum_deposit
                  ? "text-white bg-blue-500"
                  : "bg-gradient-to-l from-[#cfd1de] to-[#c7c9d9] text-gray"
              }   py-3 rounded-full border-none text-xsm `}
            >
              Deposit
            </button> */}
          </div>
          {/* <div className='bg-white shadow-lg rounded-lg p-2 my-10'>
                        <div className='flex items-center gap-3 font-bold'>
                            <img className='w-8 h-8' src={rechargeIns} alt="dfd" />
                            <p className='text-black'>Recharge instructions</p>
                        </div>
                        <div className='' >
                            <ul className="px-2 py-4 my-2 border-border1 border-[1px] rounded-lg text-xsm text-lightGray">
                                <li className="flex items-start">
                                    <span className="text-redLight font-bold mr-2">◆</span>
                                    If the transfer time is up, please fill out the deposit form again.
                                </li>
                                <li className="flex items-start mt-2">
                                    <span className="text-redLight font-bold mr-2">◆</span>
                                    The transfer amount must match the order you created, otherwise the money cannot be credited successfully.
                                </li>
                                <li className="flex items-start mt-2">
                                    <span className="text-redLight font-bold mr-2">◆</span>
                                    If you transfer the wrong amount, our company will not be responsible for the lost amount!.
                                </li>
                                <li className="flex items-start mt-2">
                                    <span className="text-redLight font-bold mr-2">◆</span>
                                    Note: Do not cancel the deposit order after the money has been transferred.
                                </li>
                                <li className="flex items-start mt-2">
                                    <span className="text-redLight font-bold mr-2">◆</span>
                                    <p className='bg-inputBg border-[1px] border-gray p-1 rounded-sm'>Cloud Pay</p>
                                </li>
                            </ul>
                        </div>
                    </div> */}
          <div className="bg-customdarkBlue shadow-lg rounded-lg p-2 my-10">
            <div className="flex items-center gap-3 font-bold">
              <img className="w-8 h-8" src={rechargeIns} alt="dfd" />
              <p className="text-white">Recharge instructions</p>
            </div>
            <div className="">
              <ul className="px-2 py-4 my-2 border-[#474654] border-thin rounded-lg text-xsm text-[#A8A5A1]y">
                <li className="flex items-start">
                  <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                  If the transfer time is up, please fill out the deposit form
                  again.
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                  The transfer amount must match the order you created,
                  otherwise the money cannot be credited successfully.
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                  If you transfer the wrong amount, our company will not be
                  responsible for the lost amount!.
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
                  Note: Do not cancel the deposit order after the money has been
                  transferred.
                </li>
              </ul>
            </div>
          </div>
          {/*  Deposit Button */}
          <div className="sticky bottom-0 bg-[#2b2b2b] w-full px-4 py-4 z-50">
            <div className="flex items-center justify-between">
              {/* Left Side: Recharge Method Text */}
              <div className="leading-tight">
                <p className="text-[12px] text-gray-300">Recharge Method:</p>
                <p className="text-sm font-semibold">
                  <span className="text-white">{selectedChannelUSDt}</span>
                </p>
              </div>

              {/* Right Side: Deposit Button */}
              <button
                // disabled={
                //   usdtAmount < paymenLimts?.USDT_minimum_deposit ||
                //   usdtAmount > paymenLimts?.USDT_maximum_deposit
                // }
                onClick={payin_deposit}
                className={`w-full max-w-[120px] ${
                  usdtAmount >= paymenLimts?.USDT_minimum_deposit
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206]"
                    : "bg-[#6F7381] text-[#A2A5A1]"
                } py-3 rounded-full border-none text-xsm`}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
      {activeModal === 2 && (
        <>
          <div className="flex justify-center">
            <img
              src={qrcode && qrcode[0]?.qr_code}
              // src={save_wallet}
              className="w-56 h-56"
              alt="fd"
            />
          </div>
          <div className="flex justify-center mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setScreenshot(reader.result.split(",")[1]); // remove `data:image/...;base64,`
                };
                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="uploadScreenshot"
            />
            <label
              htmlFor="uploadScreenshot"
              className="bg-bg4 w-full h-20 rounded-lg shadow-xl flex items-center justify-center cursor-pointer"
            >
              <p className="border-dotted border-[1px] rounded-lg px-2 py-4">
                Add screenshot +
              </p>
            </label>
          </div>
          {screenshot && (
            <div className="relative mt-4">
              <img
                src={`data:image/png;base64,${screenshot}`}
                alt="Preview"
                className="w-full rounded-md"
              />
              <button
                onClick={() => setScreenshot("")}
                className="absolute top-2 right-2 bg-customred font-bold bg-opacity-60 text-white rounded-full py-1 px-2.5 hover:bg-opacity-100 transition"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center mt-3 bg-bg4 w-full rounded-full text-sm p-2">
            <div className="w-8 flex items-center justify-center text-xl font-bold text-customlightbtn">
              ₹
            </div>
            <div className="w-[1px] mx-2 bg-lightGray h-5"></div>
            <input
              type="number"
              placeholder="Enter INR amount"
              className="w-full p-1 bg-bg4 border-none focus:outline-none text-white placeholder:text-lightGray text-xsm"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex items-center mt-3 bg-bg4 w-full rounded-full text-sm py-2 px-4">
            <input
              type="text"
              placeholder="Enter transaction id"
              className="w-full p-1 bg-bg4 border-none focus:outline-none text-white placeholder:text-lightGray text-xsm"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <button
            onClick={manualPyamentHandler}
            className={`mt-4 w-full ${
              upiAmount >= paymenLimts?.INR_minimum_deposit
                ? "text-white bg-gradient-to-r from-customlightbtn to-customdarkBluebtn"
                : "bg-gradient-to-l from-[#cfd1de] to-[#c7c9d9] text-gray"
            }   py-3 rounded-full border-none text-xsm `}
          >
            Deposit
          </button>
          {/* <button onClick={manualPyamentHandler} className={`mt-4 mb-10 w-full ${usdtAmount >= paymenLimts?.USDT_minimum_deposit ? "text-white bg-gradient-to-r from-customlightbtn to-customdarkBluebtn" : "bg-gradient-to-l from-[#cfd1de] to-[#c7c9d9] text-gray"}   py-3 rounded-full border-none text-xsm `}>
                        Deposit
                    </button> */}
        </>
      )}
    </div>
  );
}

export default Deposit;
