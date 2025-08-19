// import React from 'react'

// export default function ShowBankDetails() {
//   return (
//     <div>
//       hii
//     </div>
//   )
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { FaPlus } from "react-icons/fa6";


// export default function ShowBankDetails() {
//   return (
//     <div className="min-h-screen bg-[#] text-white font-roboto p-4 space-y-0">
//       {/* Header */}
//       <div className="flex px-0 items-center justify-between bg-[#333332] text-white h-[3.22rem]">
//         <Link to={-1}>
//           <MdKeyboardArrowLeft className="text-3xl" />
//         </Link>
//         <p className="text-sm font-medium">Add a bank account</p>
//         <div className="w-6" />{" "}
//         {/* Optional right action, leave blank for spacing */}
//       </div>

//       {/* Bank Account Box */}
//       <div className="bg-[#2c2c2c] rounded-xl overflow-hidden space-y-4">
//         {/* Gold Bar */}
//         <div className="h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-[#CFA554] flex items-center px-4">
//           {/* <span className="text-sm font-medium text-black">
//             Punjab National Bank
//           </span> */}
//         </div>

//         {/* Details */}
//         <div className="p-4 space-y-3">
//           <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
//             <span className="text-gray-300">Bank name</span>
//             <span>Punjab National Bank</span>
//           </div>
//           <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
//             <span className="text-gray-300">Bank account number</span>
//             <span>789654****230</span>
//           </div>
//           <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
//             <span className="text-gray-300">Phone number</span>
//             <span>91123****</span>
//           </div>

//           {/* Select Radio */}
//           <label className="flex items-center space-x-2 pt-1">
//             <input
//               type="radio"
//               className="accent-yellow-400"
//               name="selectedBank"
//               defaultChecked
//             />
//             <span>Select</span>
//           </label>
//         </div>
//       </div>

//       {/* Add Bank Account Box */}
//       <div className="bg-[#2c2c2c] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer">
//         <div className="border border-gray-500 rounded-lg p-3">
//           <FaPlus className="text-gray-400 text-xl" />
//         </div>
//         <p className="text-sm text-gray-400">Add a bank account number</p>
//       </div>
//     </div>
//   );
// }

import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import showBankDetailsaddAccount from "../../assets/usaAsset/wallet/showBankDetails-addAccount.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";

export default function ShowBankDetails() {
  const navigate = useNavigate()
   const [viewAccountDetailsIndian, setViewAccountDetailsIndian] = useState(null);
      const [selectedBankId, setSelectedBankId] = useState(
        localStorage.getItem("selectedBankAccountId") || null
      );

      const userId = localStorage.getItem("userId");
const fetchdata = async () => {
  try {
    const res = await axios.get(`${apis.accountView}?user_id=${userId}`);
    console.log("accountview payjaar full----", res.data.data);

    if (res?.data?.status === "200" || res?.data?.status === 200) {
      const accounts = res?.data?.data;
      setViewAccountDetailsIndian(accounts);

      // ✅ Auto-select first account if no selection exists
      if (!selectedBankId && accounts?.length > 0) {
        const firstId = accounts[0].id;
        setSelectedBankId(firstId);
        localStorage.setItem("selectedBankAccountId", firstId);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

  useEffect(()=>{
    fetchdata()
  },[])
    const handleSelectBank = (id) => {
      setSelectedBankId(id);
      localStorage.setItem("selectedBankAccountId", id);
    };


  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-roboto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 bg-[#333332] text-white h-[3.2rem]">
        <Link to={-1}>
          <MdKeyboardArrowLeft className="text-3xl" />
        </Link>
        <p className="text-sm font-medium">Bank account</p>
        <div className="w-6" />
      </div>

      {/* Body Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Bank Account Card */}
        {viewAccountDetailsIndian && viewAccountDetailsIndian.length > 0 ? (
          viewAccountDetailsIndian.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#2c2c2c] rounded-xl overflow-hidden"
            >
              {/* Gold Header Bar */}
              <div className="h-10 bg-gradient-to-r from-[#EDD188] to-[#C79744] flex items-center px-4">
                {/* <span className="text-sm font-medium text-black">
                  {item?.bank_name}
                </span> */}
              </div>

              {/* Bank Details */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1] flex-shrink-0">
                    Bank name
                  </span>
                  <span className="text-white max-w-[60%] truncate text-right">
                    {item?.bank_name || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1] flex-shrink-0">
                    Account Number
                  </span>
                  <span className="text-white max-w-[60%] truncate text-right">
                    {item?.account_number || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1] flex-shrink-0">Branch</span>
                  <span className="text-white max-w-[60%] truncate text-right">
                    {item?.branch || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1] flex-shrink-0">
                    IFSC Code
                  </span>
                  <span className="text-white max-w-[60%] truncate text-right">
                    {item?.ifsc_code || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1] flex-shrink-0">
                    Account Holder
                  </span>
                  <span className="text-white max-w-[60%] truncate text-right">
                    {item?.name || "N/A"}
                  </span>
                </div>

                {/* Select Option */}
                <label className="flex items-center space-x-2 pt-2">
                  <input
                    type="radio"
                    className="accent-[#FFD24C]"
                    name="selectedBank"
                    
                    checked={selectedBankId == item.id} // ✅ Controlled by state
                    onChange={() => handleSelectBank(item.id)} // ✅ Update on change
                  />
                  <span>Select</span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No Bank Account Found</p>
        )}

        {/* Add Bank Account Button */}
        {/* <div className="bg-[#2c2c2c] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
          <div
            className=" rounded-lg p-3"
            onClick={() => navigate("/wallet/withdrawal/addbankaccount")}
          >
          
            <img
              src={showBankDetailsaddAccount}
              alt="showBankDetailsaddAccount"
              className="w-10 h-10"
            />
          </div>
          <p className="text-sm text-gray-400">Add a bank account number </p>
        </div> */}
      </div>
    </div>
  );
}
