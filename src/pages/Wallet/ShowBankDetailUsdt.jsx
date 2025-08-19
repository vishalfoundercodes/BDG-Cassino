// import React,{useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { FaPlus } from "react-icons/fa6";
// import showBankDetailsaddAccount from "../../assets/usaAsset/wallet/showBankDetails-addAccount.png";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import apis from '../../utils/apis'

// export default function ShowBankDetailUsdt() {
//    const navigate = useNavigate()
//    const [viewAccountDetailsUSDT, setViewAccountDetailsUSDT] = useState(null);
//    const userId = localStorage.getItem("userId");
//    const fetchdata=async()=>{
//     try {
//       const res = await axios.get(`${apis.usdtaccountView}${userId}`);
//       console.log(`usdt account view: ${apis.usdtaccountView}${userId}`);
//       console.log("res for usdt account view:", res.data);
//       if (res?.data?.status === 200 || res?.data?.success === true) {
//         console.log("res?.data?.data at full ", res?.data?.data);
//         setViewAccountDetailsUSDT(res?.data?.data);
//       } else {
//         // toast.error("Error: " + res?.data?.message);
//         console.log(error)
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       // toast.error("Something went wrong");
//     }
//    }
//    useEffect(() => {
//     fetchdata()
//    }, [])
   
//   return (
//     <div className="min-h-screen bg-[#1a1a1a] text-white font-roboto">
//       {/* Header */}
//       <div className="flex items-center justify-between px-3 bg-[#333332] text-white h-[3.2rem]">
//         <Link to={-1}>
//           <MdKeyboardArrowLeft className="text-3xl" />
//         </Link>
//         <p className="text-sm font-medium">USDT Address</p>
//         <div className="w-6" />
//       </div>

//       {/* Body Content */}
//       <div className="px-4 pt-4 space-y-4">
//         {/* Bank Account Card */}
//         {viewAccountDetailsUSDT && viewAccountDetailsUSDT.length > 0 ? (
//           viewAccountDetailsUSDT.map((item, index) => (
//             <div
//               key={item.id || index}
//               className="bg-[#2c2c2c] rounded-xl overflow-hidden"
//             >
//               {/* Gold Header Bar */}
//               <div className="h-10 bg-gradient-to-r from-[#EDD188] to-[#C79744] flex items-center px-4">
//                 {/* <span className="text-sm font-medium text-black">USDT Wallet</span> */}
//               </div>

//               {/* USDT Details */}
//               <div className="p-4 space-y-2">
//                 <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm text-[#9FA5A1]">
//                   <span className="text-[#9FA5A1]">Name</span>
//                   <span className="text-white">{item?.name || "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
//                   <span className="text-[#9FA5A1] flex-shrink-0">
//                     USDT Address
//                   </span>
//                   <span className="text-white max-w-[60%] truncate text-right">
//                     {item?.usdt_wallet_address || "N/A"}
//                   </span>
//                 </div>

//                 {/* Select Option */}
//                 <label className="flex items-center space-x-2 pt-2">
//                   <input
//                     type="radio"
//                     className="accent-[#FFD24C]"
//                     name="selectedBank"
//                     defaultChecked={index === 0}
//                   />
//                   <span>Select</span>
//                 </label>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400">
//             No USDT Wallet Address Found
//           </p>
//         )}

//         {/* Add Bank Account Button */}
//         <div className="bg-[#2c2c2c] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
//           <div
//             className=" rounded-lg p-3"
//             onClick={() => navigate("/wallet/withdrawal/addusdtwalletaddress")}
//           >
//             {/* <FaPlus className="text-gray-400 text-xl" /> */}
//             <img
//               src={showBankDetailsaddAccount}
//               alt="showBankDetailsaddAccount"
//               className="w-10 h-10"
//             />
//           </div>
//           <p className="text-sm text-gray-400">Add a bank account number</p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import showBankDetailsaddAccount from "../../assets/usaAsset/wallet/showBankDetails-addAccount.png";
import axios from "axios";
import apis from "../../utils/apis";

export default function ShowBankDetailUsdt() {
  const navigate = useNavigate();
  const [viewAccountDetailsUSDT, setViewAccountDetailsUSDT] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(
    localStorage.getItem("selectedUSDTAccountId") || null
  );

  const userId = localStorage.getItem("userId");

  const fetchdata = async () => {
    try {
      const res = await axios.get(`${apis.usdtaccountView}${userId}`);
      if (res?.data?.status === 200 || res?.data?.success === true) {
        setViewAccountDetailsUSDT(res?.data?.data);
        // If nothing is selected yet, set the first account as default
        if (!selectedAccountId && res?.data?.data?.length > 0) {
          const firstId = res.data.data[0].id;
          setSelectedAccountId(firstId);
          localStorage.setItem("selectedUSDTAccountId", firstId);
        }
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // ✅ Handle radio selection
  const handleSelect = (id) => {
    setSelectedAccountId(id);
    localStorage.setItem("selectedUSDTAccountId", id); // store in localStorage
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-roboto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 bg-[#333332] text-white h-[3.2rem]">
        <Link to={-1}>
          <MdKeyboardArrowLeft className="text-3xl" />
        </Link>
        <p className="text-sm font-medium">USDT Address</p>
        <div className="w-6" />
      </div>

      {/* Body Content */}
      <div className="px-4 pt-4 space-y-4">
        {viewAccountDetailsUSDT?.length > 0 ? (
          viewAccountDetailsUSDT.map((item) => (
            <div
              key={item.id}
              className="bg-[#2c2c2c] rounded-xl overflow-hidden"
            >
              {/* Gold Header Bar */}
              <div className="h-10 bg-gradient-to-r from-[#EDD188] to-[#C79744]" />

              {/* USDT Details */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1]">Name</span>
                  <span className="text-white">{item?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between bg-[#3a3a3a] p-2 rounded-md text-sm">
                  <span className="text-[#9FA5A1]">USDT Address</span>
                  <span className="text-white max-w-[60%] truncate text-right">
                    {item?.usdt_wallet_address || "N/A"}
                  </span>
                </div>

                {/* ✅ Radio Selection */}
                <label className="flex items-center space-x-2 pt-2">
                  <input
                    type="radio"
                    className="accent-[#FFD24C]"
                    name="usdtAccount"
                    checked={selectedAccountId == item.id}
                    onChange={() => handleSelect(item.id)}
                  />
                  <span>Select</span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No USDT Wallet Address Found
          </p>
        )}

        {/* Add New Account Button */}
        {/* <div
          className="bg-[#2c2c2c] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate("/wallet/withdrawal/addusdtwalletaddress")}
        >
          <img
            src={showBankDetailsaddAccount}
            alt="Add"
            className="w-10 h-10"
          />
          <p className="text-sm text-gray-400">Add a bank account number</p>
        </div> */}
      </div>
    </div>
  );
}
