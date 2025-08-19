import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WingoWinStreak = () => {
  const [streakTimes, setStreakTimes] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [endPeriod, setEndPeriod] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const validStreakValues = ["8", "18", "28", "38", "48"];

    const isValidFormat = /^(\d+)(\/\d+)*$/.test(streakTimes.trim());

    if (!streakTimes.trim() || !isValidFormat) {
      newErrors.streakTimes =
        "Enter numbers in format like 8/12/15/25/36 (use `/` between numbers)";
    }
    
    if (!startPeriod.trim()) newErrors.startPeriod = "Start period is required";
    if (!endPeriod.trim()) newErrors.endPeriod = "End period is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = {
        streakTimes,
        startPeriod,
        endPeriod,
      };

      console.log("Submitted:", formData);

      toast.success("Submitted successfully!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/customerservices"),
      });
    }
  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen px-4 py-6 max-w-md mx-auto font-sans text-black">
      {/* Heading */}
      {/* <p className="text-[19px] font-medium text-black truncate whitespace-nowrap overflow-hidden mb-6">
        Wingo 1 Min Win Streak Submission
      </p> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Streak Times */}
        <div>
          <label className="block text-sm mb-2">
            Consecutive Win Streak Times (8/18/28/38/48)
            <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={streakTimes}
            onChange={(e) => {
              setStreakTimes(e.target.value);
              setErrors((prev) => ({ ...prev, streakTimes: "" }));
            }}
            placeholder="Please enter content"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
          />
          {errors.streakTimes && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.streakTimes}</p>
          )}
        </div>

        {/* Start Period */}
        <div>
          <label className="block text-sm mb-2">
            Start of winning period <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={startPeriod}
            onChange={(e) => {
              setStartPeriod(e.target.value);
              setErrors((prev) => ({ ...prev, startPeriod: "" }));
            }}
            placeholder="Please enter content"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
          />
          {errors.startPeriod && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.startPeriod}</p>
          )}
        </div>

        {/* End Period */}
        <div>
          <label className="block text-sm mb-2">
            End of winning period <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={endPeriod}
            onChange={(e) => {
              setEndPeriod(e.target.value);
              setErrors((prev) => ({ ...prev, endPeriod: "" }));
            }}
            placeholder="Please enter content"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
          />
          {errors.endPeriod && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.endPeriod}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-[#EDC100] hover:opacity-90 text-white rounded-full font-semibold text-sm"
        >
          Confirm
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default WingoWinStreak;
