import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apis from "../../utils/apis";


const AviatorLuckyBonus = () => {
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const user_id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!userId.trim()) newErrors.userId = "Please enter User ID";
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("bdg_u_id", userId);
      formData.append("user_id", user_id);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      try{
        const res = await axios.post(apis.aviator_lucky_bonus, formData); 
        console.log("Response:", res.data);
        if (res.data.status === 200) {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            onClose: () => navigate("/customerservices"),
          });
        }
      }catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit request. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }

    }
  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen px-4 py-6 max-w-md mx-auto font-sans text-black">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User ID */}
        <div>
          <label className="block text-sm mb-2">
            BDG Cassino ID <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              if (e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, userId: "" }));
              }
            }}
            placeholder="Please enter User ID"
            className="w-full px-4 py-3 rounded-md text-sm bg-white shadow-md focus:outline-none"
          />
          {errors.userId && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.userId}</p>
          )}
        </div>

        {/* Bank Name */}

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#EDC100] text-white rounded-full font-semibold text-sm hover:opacity-90"
        >
          Confirm
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AviatorLuckyBonus;
