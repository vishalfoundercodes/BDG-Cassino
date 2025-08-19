import { useEffect, useState } from 'react'
import { getFirstDepositPlans } from './gameApi';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from "react-icons/fa";

function FirstDeposit() {
    const [getFirstDepositPlansData, setgetFirstDepositPlansData] = useState([])
    const userId = localStorage.getItem("userId")
        const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFirstDepositPlans(userId);
            setgetFirstDepositPlansData(data);
        };
        fetchData();
    }, [userId]);
    const rules = [
      "Exclusive for the first recharge of the account. There is only one chance. The more you recharge, the more rewards you will receive. The highest reward is ₹10,000.00;",
      "Activities cannot be participated in repeatedly;",
      "Rewards can only be claimed manually on IOS, Android, H5, and PC;",
      "The bonus (excluding the principal) given in this event requires 1 times the coding turnover (i.e. valid bets) before it can be withdrawn, and the coding does not limit the platform;",
      "This event is limited to normal human operations by the account owner. It is prohibited to rent, use plug-ins, robots, gamble with different accounts, brush each other, arbitrage, interfaces, protocols, exploit loopholes, group control or other technical means to participate, otherwise it will be canceled or Rewards will be deducted, frozen, or even blacklisted;",
      "In order to avoid differences in text understanding, the platform reserves the right of final interpretation of this event.",
    ];
    return (
      <>
        <div className="px-3">
          {getFirstDepositPlansData?.length > 0 ? (
            getFirstDepositPlansData?.map((item, i) => (
              <div className="bg-[#333332] w-full rounded-lg p-2 mt-3" key={i}>
                <div className="flex items-center justify-between">
                  <p className="text-white text-[12px]">
                    First deposit{" "}
                    <span className="text-[#DD8E37]">
                      {item?.first_deposit_ammount}
                    </span>
                  </p>
                  <p className="text-[#DD8E37]">+ {item?.bonus.toFixed(2)}</p>
                </div>
                <div className="text-[#A8A5A1] mt-2 text-[10px]">
                  Deposit <span>{item?.first_deposit_ammount}</span> for the
                  first time and you will receive <span>{item?.bonus}</span>{" "}
                  bonus
                </div>
                <div className="flex items-center justify-between w-full mt-4">
                  <p className=" py-0.5 px-2 bg-[#242424] rounded-full w-2/3 text-center">
                    {item?.status === 0 ? item?.first_deposit_ammount : "0"}/
                    {item?.first_deposit_ammount}
                  </p>
                  <button
                    disabled={item?.status === 0}
                    onClick={() =>
                      item?.status === 1 && navigate("/wallet/deposit")
                    }
                    className={`text-[#DD8E37] border border-[#DD8E37] py-1 px-5 rounded-lg ${
                      item?.status === 0 ? " cursor-not-allowed" : ""
                    }`}
                  >
                    {item?.status === 0 ? "Deposited" : "Deposit"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-10 text-white w-full text-center text-2xl">
              no data
            </div>
          )}
        </div>
        <div className="bg-[#1F1F1F] text-white rounded-xl max-w-md mx-auto p-4">
          {/* Title Banner */}
          <div className="bg-[#333333] text-white text-center font-bold rounded-t-xl py-2 relative">
            {/* <div className="absolute top-0 left-1/2  w-5 h-3 rounded-b-md bg-[#1F1F1F] z-10"></div> */}
            Activity Rules
          </div>

          {/* Rule List */}
          <div className="bg-[#333333] p-0 rounded-b-xl  text-[12px] text-[#9DA5A1] ">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#D9AC4F] pl-2">◆</span>
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}

export default FirstDeposit