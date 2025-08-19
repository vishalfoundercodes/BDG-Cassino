import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import depo_wallet from "../../assets/icons/depo_wallet.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import plus from "../../assets/usaAsset/wallet/plus.png";
import withdrawBg from "../../assets/usaAsset/wallet/withdrawBg.png";
import axios from "axios";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import usdt_icon from "../../assets/images/usdt_icon.png";
import indianpaylogo from "../../assets/images/indianpaylogo.png";
// import razorpay_icon from '../../assets/razorpay2.png'
import Loader from "../../reusable_component/Loader/Loader";
import camlenios from "../../assets/usaAsset/wallet/camlenios.png";
import indianpay from "../../assets/usaAsset/wallet/indianpay.png";
import payzaar from "../../assets/payzaar.png";
import BankDetailsCard from "./Bankdetails";
import UsdtBankDetail from "./UsdtBankDetail";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

function Withdrawal() {
  const [loading, setloading] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [amountErrorCamlenio, setAmountErrorCamlenio] = useState("");
  const [amountErrorUSDT, setAmountErrorUSDT] = useState("");
  const [paymenLimts, setPaymenLimts] = useState({});
  const [upiAmount, setUpiAmount] = useState(300);
  const [upiAmountCamlenio, setUpiAmountCamlenio] = useState(500);
  const [usdtwalletaddress, setusdtwalletaddress] = useState("");
  const [usdtAmount, setUsdtAmount] = useState(10);
  const [activeModal, setActiveModal] = useState(0);
  // const [payModesList, setPayModesList] = useState(0);
  const [viewAccountDetails, setViewAccountDetails] = useState(null);
  const [viewAccountDetailsUSDT, setViewAccountDetailsUSDT] = useState(null);
  const [myDetails, setMyDetails] = useState(null);
  const [showDetailsUSDT, setShowDetailsUSDT] = useState(false);
  const [selectedUSDTAccountId, setSelectedUSDTAccountId] = useState(null);
  const [accountId,setaccountId]=useState("")

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const toggleModal = (modalType) => {
    setActiveModal((prev) => (prev === modalType ? modalType : modalType));
  };

  const getPaymentLimits = async () => {
    setloading(true);
    try {
      const res = await axios.get(`${apis.getPaymentLimits}`);
      if (res?.data?.status === 200) {
        setloading(false);
        setPaymenLimts(res?.data?.data);
      }
    } catch (err) {
      setloading(false);
      toast.error(err);
    }
  };
  // console.log("paymenLimts", paymenLimts)
  const validateAmount = (amount) => {
    // console.log("amount", amount)
    if (!paymenLimts) return;
    let minAmount, maxAmount;
    if (activeModal === 0) {
      minAmount = paymenLimts?.INR_minimum_withdraw;
      maxAmount = paymenLimts?.INR_maximum_withdraw;
    } else {
      minAmount = paymenLimts?.USDT_minimum_withdraw;
      maxAmount = paymenLimts?.USDT_maximum_withdraw;
    }
    amount = Number(amount);
    if (isNaN(amount) || amount < minAmount || amount > maxAmount) {
      setAmountError(`Amount must be between ₹${minAmount} - ₹${maxAmount}`);
      setAmountErrorCamlenio(
        `Amount must be between ₹${minAmount} - ₹${maxAmount}`
      );
      setAmountErrorUSDT(
        `Amount must be between $${minAmount} - $${maxAmount}`
      );
    } else {
      setAmountError("");
      setAmountErrorUSDT("");
      setAmountErrorCamlenio("");
    }
  };
  useEffect(() => {
    if (activeModal == 1) {
      validateAmount(usdtAmount);
    } else if (activeModal == 0) {
      validateAmount(upiAmount);
    } else if (activeModal == 2) {
      validateAmount(upiAmountCamlenio);
    }
  }, [activeModal]);

  const accountView = async (userid) => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      console.log(
        `api of payZaar bank detail: ${apis.accountView}?user_id=${userid}`
      );
      const res = await axios.get(`${apis.accountView}?user_id=${userid}`);
      console.log("accountview payjaar ----", res.data);
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        setViewAccountDetails(res?.data?.data);
        setaccountId(res?.data?.data[0]?.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const accountViewUSDT = async () => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      console.log(`api of usdt account view: ${apis.usdtaccountView}${userId}`);
      const res = await axios.get(`${apis.usdtaccountView}${userId}`);
      console.log(`usdt account view: ${apis.usdtaccountView}${userId}`);
      console.log("res for usdt account view:", res);
      if (res?.data?.status === 200 || res?.data?.success === true) {
        console.log("res?.data?.data", res?.data?.data);
        setViewAccountDetailsUSDT(res?.data?.data);
      } else {
        // toast.error("Error: " + res?.data?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
      // toast.error("Something went wrong");
    }
  };
  // console.log("myDetails", myDetails)
  const profileDetails = async (userId) => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${apis.profile}${userId}`);
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
  useEffect(() => {
    if (userId) {
      profileDetails(userId);
      accountView(userId);
      accountViewUSDT();
    }
  }, [userId]);

  // console.log("viewAccountDetails usdt", viewAccountDetailsUSDT);
  console.log("viewAccountDetails", viewAccountDetails);

  const payoutWithdrawHandler = async () => {
    // alert("dfdf")
    setloading(true);
    console.log(userId, viewAccountDetails);
  if (
    !userId 
  ) {
    // alert("⚠️ User ID ya Bank Account missing hai!");
    toast.error("User not logged in or account not found");
    setloading(false); // optional: stop loader before redirect
    navigate("/wallet/withdrawal");
    return;
  }

    // alert("dfdg")
    let payload;
    // let payload1
    const storedUSDTAccountId = parseInt(
      localStorage.getItem("selectedUSDTAccountId"),
      10
    );
    const selectedBankId = parseInt(
      localStorage.getItem("selectedBankAccountId"),
      10
    );

    if (activeModal === 1) {
      payload = {
        user_id: userId,
        type: activeModal,
        usdt_amount: usdtAmount,
        usdt_wallet_address: viewAccountDetailsUSDT[0].usdt_wallet_address,
        amount_inr:
          usdtAmount == 0
            ? ""
            : usdtAmount * (paymenLimts?.withdraw_conversion_rate || 1),
        account_id: storedUSDTAccountId,
      };
      // console.log('wwwww',payloadusdt)
      console.log("urlurl",activeModal===0? apis?.usdtpayout_withdraw:apis?.payout_withdraw,)
    } else if (activeModal === 0) {
      payload = {
        user_id: userId,
        type: 2,
        amount: upiAmount,
        account_id: accountId,
      };
    }
   
    try {
      // console.log("payout" ,payout_withdraw);
      //  console.log("payout_withdraw",apis?.payout_withdraw )
      console.log(" withdraw payload", payload);
      console.log(" withdraw usdt api", apis?.usdtpayout_withdraw);
      const res = await axios.post(
        activeModal === 0 ? apis?.payout_withdraw : apis?.usdtpayout_withdraw,
        payload
      );
      // const res = await axios.post(apis?.payout_withdraw,payload)
      console.log("res of withdraw", res);
      //  console.log("response fghj",res )
      if (
        res?.data?.status === 200 ||
        res?.data?.status === true ||
        res?.data?.status === "200" ||
        res?.data?.success === true
      ) {
        setloading(false);
        profileDetails(userId);
        toast.success(res?.data?.message);
        setUpiAmountCamlenio("");
        setUsdtAmount("");
        setUpiAmount("");
        setusdtwalletaddress("");
      } else {
        setloading(false);
        toast.error(res?.data?.message);
      }
    } catch (err) {
      console.log("wirthredr", err);
      setloading(false);
      toast.error(err?.response?.data?.message);
    }
  };
  // console.log("cricket match",myDetails)
  const payMethod = [
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
   
  ];
  return (
    <div className="px-3 h-full ">
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
          <p className="text-[#8F5206]">Availale Balance</p>
        </p>
        <p className="mt-2 text-2xl flex items-center gap-2 font-bold text-[#8F5206]">
          <p>
            ₹ {myDetails?.data?.wallet + myDetails?.data?.third_party_wallet}
          </p>
          <HiArrowPathRoundedSquare
            onClick={() => profileDetails(userId)}
            className=" "
            size={22}
          />
        </p>
      </div>
      <div className="w-full grid grid-cols-3 gap-3 mt-2">
        {payMethod &&
          payMethod?.map((item, i) => (
            <div
              onClick={() => toggleModal(item?.type)}
              key={i}
              className={`col-span-1 mb-2 p-4 rounded-md flex flex-col items-center text-xsm justify-evenly ${
                item?.type == activeModal
                  ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#A45206] "
                  : "bg-redLight text-gray"
              } shadow-md `}
            >
              <img
                className={`w-${item?.type === 2 ? 10 : 50} h-8`}
                src={item.image}
                alt="UPI Payment"
              />
              <p className="text-nowrap">{item?.name}</p>
            </div>
          ))}
      </div>

      {activeModal == 0 && (
        <div className="mt-5 ">
          <div className="">
            {viewAccountDetails && viewAccountDetails.length > 0 ? (
              <div className="bg-redLight rounded-lg p-2">
                {/* <BankDetailsCard viewAccountDetails={viewAccountDetails} /> */}
                <BankDetailsCard
                  viewAccountDetails={
                    activeModal === 2
                      ? viewAccountDetailsUSDT
                      : viewAccountDetails
                  }
                />
              </div>
            ) : (
              <div className="">
                <button className="w-full bg-redLight rounded-lg p-2">
                  <Link
                    to="/wallet/withdrawal/addbankaccount"
                    className="flex flex-col items-center rounded-l-full text-sm p-1"
                  >
                    <img className="w-12 h-12" src={plus} alt="sd" />
                    <h3 className="text-xsm mt-2 text-blackLight flex items-center ">
                      Add a bank account number
                    </h3>
                  </Link>
                </button>
                <div>
                  <p className="text-xs text-bg2">
                    Need to add beneficiary information to be able to withdraw
                    money
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-redLight rounded-lg p-2 mt-3 mb-20">
            {amountError && (
              <p className="text-[#D23834] text-xs mt-2 pl-2">{amountError}</p>
            )}
            <div className=" rounded-md p-3 flex mt-3 items-center justify-center">
              <div className="flex items-center bg-red w-full rounded-full text-sm p-2">
                <div className="w-8 flex items-center justify-center text-xl font-bold text-[#D9AC4F]">
                  ₹
                </div>
                <div className="w-[1px] mx-2 flex items-center justify-center bg-lightGray h-5"></div>
                <input
                  value={upiAmount == 0 ? "" : upiAmount}
                  onChange={(e) => {
                    const numericAmount = Number(e.target.value);
                    setUpiAmount(numericAmount);
                    validateAmount(numericAmount);
                  }}
                  type="number"
                  placeholder="Please enter the amount"
                  className="w-full p-1 bg-red border-none focus:outline-none text-[#D9AC4F] placeholder:text-[#D9AC4F] text-xsm"
                />
              </div>
            </div>
            {/* <p className="text-[#D9AC4F] text-xsm pl-4">
              Withdrawable Balance {"  "}₹
              {myDetails?.data?.winning_amount +
                myDetails?.data?.third_party_wallet}
            </p> */}
            <button
              onClick={payoutWithdrawHandler}
              className={`mt-4 w-full ${
                upiAmount >= paymenLimts?.INR_minimum_withdraw
                  ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#A45206] "
                  : "bg-gradient-to-l from-[#cfd1de] to-[#c7c9d9] text-gray"
              }   py-3 rounded-full border-none text-xsm `}
            >
              Withdraw
            </button>

            <div className="mt-10">
              <ul className="px-2 py-4 my-2 bg-redLight   border-[#464553] border-[0.5px] rounded-lg text-xs  text-[#A8A5A1]">
                <li className="flex items-start">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Need to bet{" "}
                  <p className="text-[#D23838]">
                    {" "}
                    &nbsp; ₹{myDetails?.data?.recharge}&nbsp;
                  </p>{" "}
                  to be able to withdraw.
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Withdraw time:{" "}
                  <p className="text-[#D23838]">&nbsp;00:00-23:59&nbsp;</p>
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Inday Remaining Withdrawal Times{" "}
                  <p className="text-[#D23838]">&nbsp;3&nbsp;</p>
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Withdrawal amount range{" "}
                  <p className="text-[#D23838]">
                    &nbsp;₹{paymenLimts?.INR_minimum_withdraw?.toFixed(2)} - ₹
                    {paymenLimts?.INR_maximum_withdraw?.toFixed(2)}&nbsp;
                  </p>
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Please confirm your beneficial account information before
                  withdrawing.If your information is incorrect, our company will
                  not be liable for the amount of loss
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  If your beneficial information is incorrect, please contact to
                  customer service.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeModal === 1 && (
        <div className="mt-5">
          <div className="p-2">
            {viewAccountDetailsUSDT && viewAccountDetailsUSDT.length > 0 ? (
              <div className="bg-redLight rounded-lg p-2">
                {/* Toggleable Card */}
                <UsdtBankDetail
                  viewAccountDetailsUSDT={viewAccountDetailsUSDT}
                />
              </div>
            ) : (
              <div>
                <div className="bg-redLight rounded-lg">
                  <button className="w-full">
                    <Link
                      to="/wallet/withdrawal/addusdtwalletaddress"
                      className="flex flex-col items-center rounded-l-full text-sm mt-3 p-1"
                    >
                      <img className="w-12 h-12" src={plus} alt="sd" />
                      <h3 className="text-xsm mt-2 text-blackLight flex items-center ">
                        Add address
                      </h3>
                    </Link>
                  </button>
                </div>

                <div>
                  <p className="text-xs text-bg2">
                    Need to add beneficiary information to be able to withdraw
                    money
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-redLight rounded-lg pt-2 mt- mb-10">
            {amountErrorUSDT && (
              <p className="text-[#D23834] text-xs mt-2 pl-2">
                {amountErrorUSDT}
              </p>
            )}
            <div className="bg-redLight rounded-md p-3 flex flex-col mt-3 items-center justify-center">
              {/* INR Input */}
              <div className="flex items-center mt-0 bg-red w-full rounded-full text-sm p-2">
                <div className="w-8 flex items-center justify-center text-xl font-bold text-[#D9AC4F]">
                  ₹
                </div>
                <div className="w-[1px] mx-2 bg-[#5A616F] h-5"></div>
                <input
                  value={
                    usdtAmount === 0
                      ? ""
                      : Math.floor(
                          usdtAmount *
                            (paymenLimts?.withdraw_conversion_rate || 1)
                        )
                  }
                  onChange={(e) => {
                    const maxAmount =
                      paymenLimts?.USDT_maximum_withdraw *
                       paymenLimts?.withdraw_conversion_rate || Infinity;

                    // Keep only integer digits
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    let numericValue = Number(value);

                    // Clamp to maxAmount
                    if (numericValue > maxAmount) {
                      return; // just stop — don't update state
                    }

                    setUsdtAmount(
                      numericValue /
                        (paymenLimts?.withdraw_conversion_rate || 1)
                    );
                    validateAmount(
                      numericValue /
                        (paymenLimts?.withdraw_conversion_rate || 1)
                    );
                  }}
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter INR amount"
                  className="w-full p-1 bg-red border-none focus:outline-none text-[#D9AC4F] placeholder:text-[#D9AC4F] text-xsm"
                />
              </div>

              {/* USD Input (Read-only now) */}
              <div className="flex items-center bg-red w-full rounded-full text-sm p-2 mt-2">
                <div className="w-8 flex items-center justify-center text-xl font-bold text-[#D9AC4F]">
                  $
                </div>
                <div className="w-[1px] mx-2 flex items-center justify-center bg-[#5A616F] h-5"></div>
                <input
                  value={usdtAmount === 0 ? "" : usdtAmount}
                  readOnly // 🔹 make it non-editable
                  type="number"
                  placeholder="USD amount"
                  className="w-full p-1 bg-red border-none focus:outline-none text-[#D9AC4F] placeholder:text-[#D9AC4F] text-xsm"
                />
              </div>
            </div>
            {/* <p className="text-[#D9AC4F] text-xsm pl-4">
              Withdrawable Balance {"  "}₹
              {myDetails?.data?.USDT_maximum_withdraw +
                myDetails?.data?.third_party_wallet}
            </p> */}
            <button
              onClick={payoutWithdrawHandler}
              className={`mt-4 w-full ${
                usdtAmount >= paymenLimts?.USDT_minimum_withdraw
                  ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#A45206] "
                  : "bg-gradient-to-l from-[#cfd1de] to-[#c7c9d9] text-gray"
              }   py-3 rounded-full border-none text-xsm `}
            >
              Withdraw USDT
            </button>
            <div className="mt-10 mx-4">
              <ul className="px-2 py-4 my-2  border-[#464553] border-[0.5px]  rounded-lg text-xs text-[#7F7A88]">
                <li className="flex items-start">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Need to bet{" "}
                  <p className="text-[#B43532]">
                    {" "}
                    &nbsp; ₹{myDetails?.data?.recharge}&nbsp;
                  </p>{" "}
                  to be able to withdraw.
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Withdraw time:{" "}
                  <p className="text-[#B43532]">&nbsp;00:00-23:59&nbsp;</p>
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Inday Remaining Withdrawal Times{" "}
                  <p className="text-[#B43532]">&nbsp;3&nbsp;</p>
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Withdrawal amount range{" "}
                  <p className="text-[#B43532]">
                    &nbsp;${paymenLimts?.USDT_minimum_withdraw} - $
                    {paymenLimts?.USDT_maximum_withdraw}&nbsp;
                  </p>
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  Please confirm your beneficial account information before
                  withdrawing.If your information is incorrect, our company will
                  not be liable for the amount of loss
                </li>
                <li className="flex items-start mt-2">
                  <span className="text-[#D9AC4F]  mr-2">◆</span>
                  If your beneficial information is incorrect, please contact to
                  customer service.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdrawal;
