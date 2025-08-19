import { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import bankLogo from "../../assets/bankLogo.png"; 
import { useNavigate } from "react-router-dom";
// Replace with actual bank logo path

function BankDetailsCard({ viewAccountDetails }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate= useNavigate()

  // const handleToggle = () => setShowDetails((prev) => !prev);
  const handleToggle = () =>
    navigate("/walletwithdrawal/addbankaccount/showdetails");

  const details = viewAccountDetails?.[0];

  const maskedAccount = details?.account_number
    ? `${details.account_number.slice(0, 2)}*****${details.account_number.slice(
        -3
      )}`
    : "***********";

  return (
    <div className="text-[#9FA58A] font-roboto w-full">
      {/* Top Section */}
      <div
        className=" p-3 rounded-xl flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-3">
          {/* Logo + Bank Name Vertical */}
          <div className="flex flex-col items-center min-w-[60px]">
            <img src={bankLogo} alt="Bank" className="w-7 h-7 object-contain" />
            <p className="text-xs text-[#9FA58A] text-center truncate max-w-[60px]">
              {details?.bank_name || "Bank Name"}
            </p>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-[#555]" />

          {/* Masked Account */}
          <p className="text-sm text-[#9FA58A]">{maskedAccount}</p>
        </div>

        {/* Toggle Icon */}
        {showDetails ? (
          <MdKeyboardArrowDown size={22} className="text-gray-300" />
        ) : (
          <MdKeyboardArrowRight size={22} className="text-gray-300" />
        )}
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="mt-3 text-xs bg-[#1e1e1e] p-4 rounded-lg border border-[#3a3a3a] space-y-1">
          <p>
            <b className="text-customlightbtn">Bank name:</b>{" "}
            <span className="text-white">{details?.bank_name}</span>
          </p>
          <p>
            <b className="text-customlightbtn">Branch name:</b>{" "}
            <span className="text-white">{details?.branch}</span>
          </p>
          <p>
            <b className="text-customlightbtn">Recipient's Name:</b>{" "}
            <span className="text-white">{details?.name}</span>
          </p>
          <p>
            <b className="text-customlightbtn">Account Number:</b>{" "}
            <span className="text-white">{details?.account_number}</span>
          </p>
          <p>
            <b className="text-customlightbtn">IFSC:</b>{" "}
            <span className="text-white">{details?.ifsc_code}</span>
          </p>
          <p>
            <b className="text-customlightbtn">UPI Id:</b>{" "}
            <span className="text-white">{details?.upi_id}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BankDetailsCard;
