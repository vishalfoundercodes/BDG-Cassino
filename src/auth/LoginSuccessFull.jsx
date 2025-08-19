
  

// export default LoginSuccessPopup;

// import React from "react";
// import { FaCheckSquare } from "react-icons/fa";
// import { ImCross } from "react-icons/im";

// const LoginSuccessPopup = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="w-full xsm:w-[400px] flex flex-col items-center justify-center">
//         <div className="bg-[#333333] text-white h-[80vh] w-[90%] rounded-xl shadow-lg">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-[#FFD700] to-[#E3B23C] text-[#2B2B2B] font-bold rounded-t-xl flex items-center justify-center h-16">
//             <h2 className="text-xl">Login Welcome</h2>
//           </div>

//           {/* Content Scrollable */}
//           <div className="p-4 overflow-y-auto h-[calc(100%-120px)] hide-scrollbar text-sm font-medium">
//             <p className="mb-4">
//               <span className="text-yellow-400">⭐ BDGWINgame.COM ⭐</span>
//             </p>

//             <p className="mb-3">
//               ⚠️ Due to the recent emergence of many fake platforms, <br />
//               BDG has made a statement to prevent members or agents from being
//               deceived.
//             </p>

//             <p className="mb-3">
//               ❓ How to correctly identify plagiarized platforms?
//             </p>

//             <p className="mb-4">
//               👉 Open :{" "}
//               <span className="bg-yellow-300 px-1 text-black font-semibold">
//                 BDGWINgame.com
//               </span>{" "}
//               and enter the URL to verify the authenticity!
//             </p>

//             <p className="flex items-center gap-2 mb-2 text-green-400">
//               <FaCheckSquare /> Official Telegram Group
//             </p>
//             <p className="flex items-center gap-2 mb-2 text-green-400">
//               <FaCheckSquare /> Official customer service
//             </p>
//             <p className="flex items-center gap-2 mb-2">
//               ⭐ BDGwin has been operating for more than 5 years
//             </p>
//             <p className="flex items-center gap-2 mb-2">
//               ⭐ The most professional games
//             </p>
//             <p className="flex items-center gap-2 mb-2">
//               ⭐ High-quality agent benefits
//             </p>
//           </div>

//           {/* Confirm Button */}
//           <div className="flex items-center justify-center bg-[#2B2B2B] h-16 rounded-b-xl">
//             <button
//               onClick={onClose}
//               className="bg-gradient-to-r from-[#EDD188] to-[#C79744] px-10 py-2 font-bold text-[#8F5206] rounded-full"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>

//         {/* Close Button (bottom) */}
//         <button onClick={onClose} className="mt-4 text-white">
//           <ImCross
//             className="border-4 p-1 border-white rounded-full"
//             size={32}
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginSuccessPopup;

// import React from "react";
// import { FaCheckSquare } from "react-icons/fa";

// const LoginSuccessPopup = ({ onClose }) => {
//     const handleClose=()=>{
//         onClose();
//         localStorage.removeItem("loginPopupShown");
//     }
//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
//       <div className="bg-[#2B2B2B] text-white rounded-xl w-[90%] max-w-sm shadow-lg flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#252628] font-bold text-center py-3 text-lg">
//           Login Welcome
//         </div>

//         {/* Scrollable Content */}
//         <div className="p-4 space-y-3 text-sm max-h-[60vh] overflow-y-auto">
//           <p className="text-[#252628] bg-[#FFFF00] font-bold text-center">
//             ⭐ BDGWINgame.COM ⭐
//           </p>

//           <p>
//             <span className="text-yellow-300">📌</span> Due to the recent
//             emergence of many fake platforms, BDG has made a statement to
//             prevent members or agents from being deceived.
//           </p>

//           <p className="text-white font-semibold">
//             ❓ How to correctly identify plagiarized platforms?
//           </p>

//           <p>
//             Open :{" "}
//             <span className="bg-[#FFFF00] text-black px-1 font-semibold">
//               BDGWINgame.com
//             </span>{" "}
//             and enter the URL to verify the authenticity!
//           </p>

//           <p className="flex items-center gap-2 ">
//             <FaCheckSquare className="text-green" /> Official Telegram Group
//           </p>

//           <p className="flex items-center gap-2 ">
//             <FaCheckSquare className="text-green" /> Official customer service
//           </p>

//           <p className="flex items-center gap-2 text-yellow-300">
//             ⭐ BDGwin has been operating for more than 5 years
//           </p>

//           <p className="flex items-center gap-2 text-yellow-300">
//             ⭐ The most professional games
//           </p>

//           <p className="flex items-center gap-2 text-yellow-300">
//             ⭐ High-quality agent benefits
//           </p>
//         </div>

//         {/* Confirm Button */}
//         <div className="flex justify-center py-4">
//           <button
//             onClick={handleClose}
//             className="bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#252628] px-10 py-2 font-bold rounded-full"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSuccessPopup;


import React from "react";

const LoginSuccessPopup = ({ onClose }) => {
  const handleClose = () => {
    onClose();
    localStorage.removeItem("loginPopupShown");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center font-sans">
      <div className="bg-[#2B2B2B] text-white rounded-xl w-[80%] max-w-[22rem] shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#252628] font-bold text-center py-3 text-lg">
          Login Welcome
        </div>

        {/* Scrollable Content */}
        <div className="p-4 space-y-1 text-sm max-h-[60vh] overflow-y-auto text-center">
          <div className="flex justify-center items-center  py-0">
            <span className="text-[#555] text-lg bg-[#FFFF00]"></span>
            <span className="font-bold text-black text-sm px-2 bg-[#FFFF00]">
              ⭐ BDGCasino.COM ⭐
            </span>
            <span className="text-[#555] text-lg bg-[#FFFF00]"></span>
          </div>

          <div className="text-center text-white font-semibold space-y-0">
            <p>📌 Due to the recent emergence of many</p>
            <p>fake platforms,</p>
            <p>BDG has made a statement to prevent</p>
            <p>members or agents from being deceived.</p>
          </div>

          <p className="font-semibold">
            ❓ How to correctly identify plagiarized platforms?
          </p>

          <p>
            Open :{" "}
            <span className="bg-[#FFFF00] text-black px-1 font-semibold">
              BDGCasino.com
            </span>{" "}
            and enter the URL to verify the authenticity!
          </p>

          <div className="space-y-0">
            <p>✅ Official Telegram Group</p>
            <p>✅ Official customer service</p>
          </div>

          <div className="text-center text-white font-semibold space-y-0 text-[15px]">
            <p>
              ⭐ BDGwin has been operating for more
              <br />
              than 5 years
            </p>
            <p>⭐ The most professional games</p>
            <p>⭐ High-quality agent benefits</p>
            <p>
              ⭐ The number one casino game <br /> platform
            </p>
          </div>

          <div className="text-center space-y-2">
            {/* Top clickable promo line */}
            <p className="inline-block bg-[#FFFF00] px-0 py-0 text-[#1004EE] font-bold text-[16px] rounded">
              💎 Click to promote – become an agent
            </p>

            {/* Separated diamond + line below */}
            <div className="flex flex-col items-center space-y-1">
              <span className="bg-[#FFFF00] inline-block px-0 py-0 space-y-0 ">
                💎
              </span>
              <p className="text-white font-semibold">Get income every day</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center py-4 px-6">
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#252628] w-full py-2 font-bold rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPopup;

