// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import apis from "../../utils/apis"
// import { useNavigate } from 'react-router-dom'
// import moment from 'moment'
// import Loader from '../../reusable_component/Loader/Loader'
// function CommissionDetails() {
//   const [loading, setLoading] = useState(false);
//   const [commisionData, setCommisionData] = useState(null)
//   const userId = localStorage.getItem("userId")
//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const day = String(today.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
// };

// const [confirmedDate, setConfirmedDate] = useState(getCurrentDate());
//   const navigate = useNavigate()
//   const comHandler = async () => {
//     setLoading(true);

//     if (!userId) {
//         toast.error("User not logged in");
//         navigate("/login");
//         return;
//     }

//     try {
//         const res = await axios.get(`${apis.commisionDetails}${userId}&subtypeid=23&date=${confirmedDate}`);
        
//         console.log("commisionDetails", res);
        
//         if (res?.data?.status === 200) {
//             setLoading(false);
//             // Filter by current date to match API date format
//             const filteredData = res?.data?.data?.filter(item => 
//                 item.date.startsWith(confirmedDate) // Compare by date prefix
//             );
//             setCommisionData(filteredData);
//         } else {
//             setLoading(false);
//             toast?.error(res?.data?.message);
//         }
//     } catch (err) {
//         setLoading(false);
//         toast.error("Failed to fetch data.");
//     }
// };
//   // console.log("commisionData",commisionData)
//   useEffect(() => {
//     comHandler()
//   }, [userId,confirmedDate])
//   return (
//     <div className='w-full h-full p-2'>
//       {loading && <Loader setLoading={setLoading} loading={loading} />}
//       <button
//         className="bg-customdarkBlue text-white rounded-md text-xs  py-2.5  px-2 flex justify-center items-center shadow-md"
//       >
//         <input onChange={(e) => setConfirmedDate(e.target.value)} className='input-white-icon outline-none bg-customdarkBlue '  type="date" />
//       </button>
//       {commisionData?.length > 0 ? commisionData?.filter((item) => {

//         if (confirmedDate !== "Select date" && !item?.settlement_date.startsWith(confirmedDate)) {
//           return ;
//         }
//         return true;
//       })?.map((item, i) => (
//         <div key={i} className='bg-customdarkBlue px-2 py-3 text-xs text-white mt-3'>
//           <p>Settlement successful</p>
//           <p>{moment(item?.settlement_date).format("DD-MM-YYYY HH:mm:ss")}</p>
//           <p>The commission has been automatically credited to your balance </p>
//           <div className='mt-3 bg-white p-2 rounded-md flex items-center justify-between'>
//             <p>Number of bettors</p>
//             <p className='text-black font-semibold'>{item?.number_of_bettors ? item?.number_of_bettors : "0"} People</p>
//           </div>
//           <div className='mt-2 bg-white p-2 rounded-md flex items-center justify-between'>
//             <p>Bet amount</p>
//             <p className='text-black font-semibold'>{item?.bet_amount}</p>
//           </div>
//           <div className='mt-2 bg-white p-2 rounded-md flex items-center justify-between'>
//             <p>commission payout</p>
//             <p className='text-black font-semibold'>{item?.commission_payout}</p>
//           </div>
//           <div className='mt-2 bg-white p-2 rounded-md flex items-center justify-between'>
//             <p>Date</p>
//             <p className='text-black font-semibold'>{moment(item?.settlement_date).format("DD-MM-YYYY HH:mm:ss")}</p>
//           </div>
//         </div>
//       )) : <p className='text-white flex justify-center items-center'>no data</p>}
//     </div>
//   )
// }

// export default CommissionDetails

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "../../reusable_component/Loader/Loader";
import { IoIosArrowDown } from "react-icons/io";

function CommissionDetails() {
  const [loading, setLoading] = useState(false);
  const [commisionData, setCommisionData] = useState(null);
  const userId = localStorage.getItem("userId");

  // ✅ Date states
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [confirmedDate, setConfirmedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`
  );
  const [dateModalOpen, setDateModalOpen] = useState(false);

  // ✅ Refs for smooth scroll
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const navigate = useNavigate();

  // ✅ Scroll on modal open
  useEffect(() => {
    if (dateModalOpen) {
      setTimeout(() => {
        yearRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        monthRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        dayRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  }, [dateModalOpen]);

  // ✅ API call
  const comHandler = async () => {
    setLoading(true);

    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `${apis.commisionDetails}${userId}&subtypeid=23&date=${confirmedDate}`
      );
      if (res?.data?.status === 200) {
        const filteredData = res?.data?.data?.filter((item) =>
          item.date?.startsWith(confirmedDate)
        );
        setCommisionData(filteredData);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (err) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    comHandler();
  }, [userId, confirmedDate]);

  return (
    <div className="w-full h-full p-2">
      {loading && <Loader setLoading={setLoading} loading={loading} />}

      {/* ✅ Custom Date Selection Button */}
      <button
        onClick={() => setDateModalOpen(true)}
        className="bg-customdarkBlue text-white rounded-md text-xs py-2.5 px-3 flex justify-between items-center shadow-md w-28"
      >
        {confirmedDate}
        <IoIosArrowDown size={18} />
      </button>

      {/* ✅ Date Selection Modal */}
      {dateModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
          <div className="p-3 rounded-t-xl w-full xsm:w-[400px] bg-[#1F1F1F]">
            <div className="flex items-center justify-between mb-2 px-2 py-3 bg-[#2E2E2E] rounded-t-xl">
              <button
                onClick={() => setDateModalOpen(false)}
                className="text-[#96978B]"
              >
                Cancel
              </button>
              <span className="text-white font-semibold">Choose a Date</span>
              <button
                onClick={() => {
                  const formatted = `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                  )}`;
                  setConfirmedDate(formatted);
                  setDateModalOpen(false);
                }}
                className="text-[#D9AC4F]"
              >
                Confirm
              </button>
            </div>

            {/* Scrollable Year / Month / Day */}
            <div className="flex justify-between gap-2 bg-[#191919] px-2 py-3 rounded-b-xl">
              {/* Year Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from(
                  { length: new Date().getFullYear() - 2022 + 1 }, // Only years from 2022 to current year
                  (_, i) => 2022 + i
                )
                  .filter((year) => year <= new Date().getFullYear()) // ✅ No future years
                  .map((year) => (
                    <div
                      key={year}
                      ref={selectedDate.getFullYear() === year ? yearRef : null}
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            year,
                            selectedDate.getMonth(),
                            selectedDate.getDate()
                          )
                        )
                      }
                      className={`text-white py-2 text-center rounded-md cursor-pointer ${
                        selectedDate.getFullYear() === year
                          ? "bg-[#333332]"
                          : ""
                      }`}
                    >
                      {year}
                    </div>
                  ))}
              </div>

              {/* Month Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .filter((month) => {
                    // ❌ Disallow months greater than current if same year
                    if (
                      selectedDate.getFullYear() === new Date().getFullYear()
                    ) {
                      return month <= new Date().getMonth() + 1;
                    }
                    return true;
                  })
                  .map((month) => {
                    const isSelected = selectedDate.getMonth() + 1 === month;
                    return (
                      <div
                        key={month}
                        ref={isSelected ? monthRef : null}
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              selectedDate.getFullYear(),
                              month - 1,
                              selectedDate.getDate()
                            )
                          )
                        }
                        className={`text-white py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : ""
                        }`}
                      >
                        {String(month).padStart(2, "0")}
                      </div>
                    );
                  })}
              </div>

              {/* Day Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from(
                  {
                    length: new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      0
                    ).getDate(),
                  },
                  (_, i) => i + 1
                )
                  .filter((day) => {
                    const now = new Date();
                    // ❌ Disallow future days if year & month are current
                    if (
                      selectedDate.getFullYear() === now.getFullYear() &&
                      selectedDate.getMonth() === now.getMonth()
                    ) {
                      return day <= now.getDate();
                    }
                    return true;
                  })
                  .map((day) => {
                    const isSelected = selectedDate.getDate() === day;
                    return (
                      <div
                        key={day}
                        ref={isSelected ? dayRef : null}
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              day
                            )
                          )
                        }
                        className={`text-white py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : ""
                        }`}
                      >
                        {String(day).padStart(2, "0")}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Data Display */}
      {commisionData?.length > 0 ? (
        commisionData.map((item, i) => (
          <div
            key={i}
            className="bg-customdarkBlue px-2 py-3 text-xs text-white mt-3"
          >
            <p>Settlement successful</p>
            <p>{moment(item?.settlement_date).format("DD-MM-YYYY HH:mm:ss")}</p>
            <p>
              The commission has been automatically credited to your balance
            </p>
            <div className="mt-3 bg-white p-2 rounded-md flex justify-between">
              <p>Number of bettors</p>
              <p className="text-black font-semibold">
                {item?.number_of_bettors || "0"} People
              </p>
            </div>
            <div className="mt-2 bg-white p-2 rounded-md flex justify-between">
              <p>Bet amount</p>
              <p className="text-black font-semibold">{item?.bet_amount}</p>
            </div>
            <div className="mt-2 bg-white p-2 rounded-md flex justify-between">
              <p>Commission payout</p>
              <p className="text-black font-semibold">
                {item?.commission_payout}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white flex justify-center items-center">no data</p>
      )}
    </div>
  );
}

export default CommissionDetails;
