import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apis from "../../utils/apis";
  
const DeleteUsdtAddress = () => {
  const user_id = localStorage.getItem("userId");
  const [images, setImages] = useState({
    selfieUsdt: null,
    selfieId: null,
    depositProof: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (key) => (e) => {
    if (e.target.files[0]) {
      setImages((prev) => ({ ...prev, [key]: e.target.files[0] }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(images).forEach(([key, value]) => {
      if (!value) newErrors[key] = "Photo is required";
    });
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const formData = new FormData();

    // ✅ Add user ID from localStorage
    formData.append("user_id", user_id);

    // ✅ Append image files
    Object.entries(images).forEach(([key, file]) => {
      formData.append(key, file);
    });

    // ✅ Optional: For debugging
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value instanceof File ? value.name : value;
    }

    console.log("🧾 FormData Submitted:", formDataObject);

    // ✅ Optionally make API call
    try {
      const response = await axios.post(apis.delete_usdt_address, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response.data);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/customerservices"),
        });
      } else {
        toast.error(response.data.message || "Request failed", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }
};



  const renderImageUpload = (label, key) => (
    <div className="mb-6 text-black">
      <label className="block text-sm mb-2">
        {label} <span className="text-[#FF717B]">*</span>
      </label>
      {images[key] ? (
        <div className="relative h-[120px] w-[120px]">
          <img
            src={URL.createObjectURL(images[key])}
            alt="preview"
            className="h-full w-full object-cover rounded"
          />
          <button
            type="button"
            onClick={() => setImages((prev) => ({ ...prev, [key]: null }))}
            className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center rounded-md h-[120px] w-[120px] cursor-pointer bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange(key)}
            className="hidden"
          />
          <div className="flex flex-col items-center text-gray-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 mb-1 text-gray-400"
            >
              <path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10" />
              <path d="M3 21h18" />
              <path d="M12 12v6" />
              <path d="M9 15l3-3 3 3" />
              <circle cx="9" cy="9" r="1" />
            </svg>
            photo
          </div>
        </label>
      )}
      {errors[key] && (
        <p className="text-[#FF717B] text-sm mt-1">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-[#f9f9ff] min-h-screen px-4 py-6 max-w-md mx-auto font-sans text-black">
      {/* Heading */}
      {/* <p className="text-[19px] font-medium text-black truncate whitespace-nowrap overflow-hidden mb-6">
        Delete Old USDT Address
      </p> */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderImageUpload("Photo Selfie Hold USDT Address", "selfieUsdt")}
        {renderImageUpload("Photo Selfie Holding Identity Card", "selfieId")}
        {renderImageUpload("Deposit Receipt Proof", "depositProof")}

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

export default DeleteUsdtAddress;
