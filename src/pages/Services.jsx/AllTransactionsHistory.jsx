import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import apis from '../../utils/apis';
import no_data_available from '../../assets/images/no_data_available.png';
import Loader from '../../reusable_component/Loader/Loader';

function AllTransactionsHistory() {
  const [loading, setLoading] = useState(false);
  const [modalFirst, handleModalFirst] = useState(false);
  const [modalFirstValue, handleModalFirstValue] = useState("All");
  const [modalSecond, handleModalSecond] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [transactionHistoryData, setTransactionHistoryData] = useState([]);
  // const [confirmedDate, setConfirmedDate] = useState("");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  // const [confirmedDate, setConfirmedDate] = useState("Select date");
  const [confirmedDate, setConfirmedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`
  );
  const modalRef = useRef(null);
  const modalSecondRef = useRef(null);

  const userId = localStorage.getItem("userId");

  const AllTransactionsHistoryListHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${apis.transaction_history_list}`)
      console.log("res all transaction history:", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        setTransactionList(res?.data?.data)
        console.log("transactionList", res?.data?.data)
      } else if (res?.data?.status === 400) {
        setLoading(false)
        console.log(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const AllTransactionsHistoryDataHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${apis.transaction_history}${userId}`)
      console.log("res,res", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        setTransactionHistoryData(res?.data?.data)
      } else if (res?.data?.status === 400) {
        setLoading(false)
        console.log(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const filteredTransactions = transactionHistoryData?.filter((item) => {
    const matchesType = modalFirstValue === "All" || modalFirstValue === item.type;
    const matchesDate = !confirmedDate || item?.datetime.startsWith(confirmedDate);
    return matchesType && matchesDate;
  });
  useEffect(() => {
    AllTransactionsHistoryListHandler()
    AllTransactionsHistoryDataHandler()
  }, [userId])
  // Generate dynamic year list

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalFirst(false);
      }
    };

    if (modalFirst) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalFirst]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalSecondRef.current && !modalSecondRef.current.contains(event.target)) {
        handleModalSecond(false);
      }
    };

    if (modalSecond) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalSecond]);
  // console.log("transactionList", transactionHistoryData)

  const [dateModalOpen, setDateModalOpen] = useState(false);

  useEffect(() => {
    if (dateModalOpen) {
      // Delay to ensure rendering is complete
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
  return (
    <div className="mx-3">
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={() => handleModalFirst(!modalFirst)}
          className="bg-redLight text-[#A8A5A1] rounded-md text-xsm font-bold py-4 px-2 flex justify-between items-center shadow-md"
        >
          <p className="capitalize">{modalFirstValue}</p>
          <p>
            <IoIosArrowDown size={18} />
          </p>
        </button>
        {/* <button className="bg-redLight text-white rounded-md text-xsm font-bold py-4 px-2 flex justify-center items-center shadow-md">
          <input
            onChange={(e) => setConfirmedDate(e.target.value)}
            className="outline-none bg-redLightinput-white-icon  bg-redLight "
            type="date"
          />
        </button> */}
        <button
          onClick={() => setDateModalOpen(true)}
          className="bg-customdarkBlue text-[#A8A5A1] rounded-md text-xsm py-4 px-2 flex justify-between items-center shadow-md"
        >
          <p>
            {confirmedDate !== "Select date" ? confirmedDate : "Select date"}
          </p>
          <IoIosArrowDown size={18} />
        </button>
      </div>
      <div className=" rounded-b-md">
        {filteredTransactions && filteredTransactions.length > 0 ? (
          filteredTransactions.map((item, i) => (
            <div
              key={i}
              className="bg-[#1F1F1F] rounded-md mt-5 overflow-hidden border border-[#2A2A2A]"
            >
              {/* Header */}
              <div className="bg-[#4D4D4B] text-white font-medium p-2 text-sm">
                {item?.type}
              </div>

              {/* Rows */}
              <div className="bg-[#2F2F2F] rounded-md p-4 pl-1 pr-1">
                <div className="flex flex-col gap-y-2 text-xs">
                  {/* Row 1 - Detail */}
                  <div className="flex justify-between items-center bg-[#1A1A1A] px-4 py-3 rounded-md border border-[#2A2A2A]">
                    <span className="text-[#A8A5A1]">Detail</span>
                    <span className="text-[#A8A5A1] text-[12px]">
                      {item?.type}
                    </span>
                  </div>

                  {/* Row 2 - Time */}
                  <div className="flex justify-between items-center bg-[#1A1A1A] px-4 py-3 rounded-md border border-[#2A2A2A]">
                    <span className="text-[#A8A5A1]">Time</span>
                    <span className="text-[#A8A5A1] text-[12px]">
                      {item?.datetime}
                    </span>
                  </div>

                  {/* Row 3 - Balance */}
                  <div className="flex justify-between items-center bg-[#1A1A1A] px-4 py-3 rounded-md border border-[#2A2A2A]">
                    <span className="text-[#A8A5A1]">Balance</span>
                    <span
                      className={`font-semibold text-[12px] ${
                        i % 2 === 0 ? "text-[#969390]" : "text-[#969390]"
                      }`}
                    >
                      ₹{parseFloat(item?.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Box (Empty) */}
              <div className="bg-[#2F2F2F] h-14 border-t border-[#2A2A2A]"></div>
            </div>
          ))
        ) : (
          <>
            <img src={no_data_available} className="mt-20" alt="d" />
            <p className="text-white mt-10 bg-none text-center">No data</p>
          </>
        )}
      </div>

      {/* modals */}
      {modalFirst && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="p-0 rounded-t-xl h-[60%] w-full xsm:w-[400px] bg-[#1A1A1A] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#2F2F2F]">
              <button
                onClick={() => handleModalFirst(false)}
                className="text-[#A3A3A3] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleModalFirst(false)}
                className="text-[#D9AC4F] font-medium"
              >
                Confirm
              </button>
            </div>

            {/* Options List */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    handleModalFirstValue("All");
                  }}
                  className={`w-full py-3 text-center ${
                    modalFirstValue === "All"
                      ? "bg-[#333332] text-[#A8A5A1]"
                      : "text-[#6B6B6B]"
                  }`}
                >
                  All
                </button>
                {transactionList?.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleModalFirstValue(item?.name);
                      console.log("item?.name", item?.name);
                    }}
                    className={`w-full py-3 text-center capitalize ${
                      modalFirstValue === item?.name
                        ? "bg-[#333332] text-[#A8A5A1]"
                        : "text-[#6B6B6B]"
                    }`}
                  >
                    {item?.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Modal */}
      {dateModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
          <div className="p-3 rounded-t-xl h-auto w-full xsm:w-[400px] bg-[#1F1F1F]">
            {" "}
            {/* Outer wrapper */}
            {/* Header */}
            <div className="flex items-center justify-between mb-2 px-2 py-3 bg-[#2E2E2E] rounded-t-xl">
              <button
                onClick={() => setDateModalOpen(false)}
                className="text-[#96978B]"
              >
                Cancel
              </button>
              <button className="text-white font-semibold">
                Choose a date
              </button>
              <button
                onClick={() => {
                  const formattedDate = `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                  )}`;
                  setConfirmedDate(formattedDate);
                  setDateModalOpen(false);
                }}
                className="text-[#D9AC4F]"
              >
                Confirm
              </button>
            </div>
            {/* Scrollable Pickers */}
            <div className="flex justify-between gap-2 bg-[#191919] px-2 py-3 rounded-b-xl">
              {/* Year Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from(
                  { length: new Date().getFullYear() - 2022 + 1 },
                  (_, i) => {
                    const year = 2022 + i;
                    const isSelected = selectedDate.getFullYear() === year;
                    return (
                      <div
                        key={year}
                        ref={isSelected ? yearRef : null}
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              year,
                              selectedDate.getMonth(),
                              selectedDate.getDate()
                            )
                          )
                        }
                        className={`text-[#A8A5A1] py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : "bg-[#191919]"
                        }`}
                      >
                        {year}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Month Picker */}
              <div className="w-1/3 max-h-[200px] overflow-y-auto hide-scrollbar">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .filter((month) => {
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
                        className={`text-[#A8A5A1] py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : "bg-[#191919]"
                        }`}
                      >
                        {month.toString().padStart(2, "0")}
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
                    if (
                      selectedDate.getFullYear() === new Date().getFullYear() &&
                      selectedDate.getMonth() === new Date().getMonth()
                    ) {
                      return day <= new Date().getDate();
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
                        className={`text-[#A8A5A1] py-2 text-center rounded-md cursor-pointer ${
                          isSelected ? "bg-[#333332]" : "bg-[#191919]"
                        }`}
                      >
                        {day.toString().padStart(2, "0")}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTransactionsHistory