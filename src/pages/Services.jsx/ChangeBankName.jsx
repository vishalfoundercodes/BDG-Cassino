import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apis from "../../utils/apis";
import axios from "axios";



const ChangeBankName = () => {
  const [userId, setUserId] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [errors, setErrors] = useState({});
  const user_id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!userId.trim()) newErrors.userId = "Please enter User ID";
    if (!bankName.trim()) newErrors.bankName = "Please enter correct bank  name";
    if (!bankNumber.trim())
      newErrors.bankNumber = "Please enter Bank Number";
    return newErrors;
  };

const handleSubmit = async(e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("bank_name", bankName);
    formData.append("account_no", bankNumber);
    formData.append("user_id", user_id);

    // ✅ Build object for logging
    const formDataDisplay = {};
    for (let [key, value] of formData.entries()) {
      formDataDisplay[key] =
        value instanceof File ? ` (${value.type})` : value;
    }

        try {
      const response = await axios.post(apis.bank_name_modification,formDataDisplay);

      console.log("FormData submitted:", response);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/customerservices"),
        });
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    console.log("FormData Submitted:", formDataDisplay);

  }
};


  return (
    <div className="bg-[#f9f9ff] min-h-screen px-4 py-6 max-w-md mx-auto font-sans text-black">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User ID */}
        <div>
          <label className="block text-sm mb-2">
            BDGWIN ID <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="number"
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
        <div>
          <label className="block text-sm mb-2">
            Correct bank name <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => {
              setBankName(e.target.value);
              if (e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, bankName: "" }));
              }
            }}
            placeholder="Please enter correct bank name"
            className="w-full px-4 py-3 rounded-md text-sm bg-white shadow-md focus:outline-none"
          />
          {errors.bankName && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.bankName}</p>
          )}
        </div>

        {/* Bank Number */}
        <div>
          <label className="block text-sm mb-2">
            Bank number <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="number"
            value={bankNumber}
            onChange={(e) => {
              setBankNumber(e.target.value);
              if (e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, bankNumber: "" }));
              }
            }}
            placeholder="Please enter Bank Number"
            className="w-full px-4 py-3 rounded-md text-sm bg-white shadow-md focus:outline-none"
          />
          {errors.bankNumber && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.bankNumber}</p>
          )}
        </div>

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

export default ChangeBankName;
