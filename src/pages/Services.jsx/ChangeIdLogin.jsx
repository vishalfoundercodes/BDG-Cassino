// import React,{useState} from 'react'
// import Loader from "../../reusable_component/Loader/Loader";

// export default function ChangeIdLogin() {
//     const [loading, setLoading] = useState(false);
//   return (
//     <div className="bg-white">
//       {loading && <Loader setLoading={setLoading} loading={loading} />}
//       <h1 className='text-black'>change iD</h1>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import apis from "../../utils/apis";

const ChangeIdLogin = () => {
   const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const user_id = localStorage.getItem("userId");

  const [depositProof, setDepositProof] = useState(null);
  const [selfiePassbook1, setSelfiePassbook1] = useState(null);
  const [selfieIdCard, setSelfieIdCard] = useState(null);

  const [errors, setErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const handleImageChange = (setter, name) => (e) => {
    if (e.target.files[0]) {
      setter(e.target.files[0]);
      setImageErrors((prev) => ({ ...prev, [name]: "" })); // remove error on upload
    }
  };

  const handleRemoveImage = (setter, name) => () => {
    setter(null);
    setImageErrors((prev) => ({ ...prev, [name]: "Please upload this image" }));
  };

  const validate = () => {
    const newErrors = {};
    const newImageErrors = {};

    if (!userId.trim()) newErrors.userId = "Please enter User ID";
    else if (userId.length > 12)
      newErrors.userId = "User ID must be max 12 characters";

    if (!password.trim()) newErrors.password = "Please enter new password";

    if (!depositProof) newImageErrors.depositProof = "Please upload this image";
    if (!selfiePassbook1)
      newImageErrors.selfiePassbook1 = "Please upload this image";
    if (!selfieIdCard) newImageErrors.selfieIdCard = "Please upload this image";

    setImageErrors(newImageErrors);
    return newErrors;
  };

  const renderImageUpload = (label, file, setter, name) => (
    <div className="mb-6 w-full text-black">
      <label className="block text-sm  mb-2">
        {label} <span className="text-[#FF717B]">*</span>
      </label>
      {file ? (
        <div className="relative h-[120px] w-[120px]">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="h-full w-full object-cover rounded"
          />
          <button
            type="button"
            onClick={handleRemoveImage(setter, name)}
            className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <label className="flex items-center justify-center rounded-md h-[120px] w-[120px] cursor-pointer bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange(setter, name)}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
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
          {imageErrors[name] && (
            <p className="text-[#FF717B] text-sm mt-1">{imageErrors[name]}</p>
          )}
        </>
      )}
    </div>
  );

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (
    Object.keys(validationErrors).length === 0 &&
    Object.keys(imageErrors).length === 0
  ) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("password", password);
    formData.append("bdg_win_id", userId); // if same as userId
    formData.append("latest_deposit_receipt", depositProof);
    formData.append("photo_selfie_hold_passbook", selfiePassbook1);
    formData.append("photo_selfie_hold_identity_card", selfieIdCard);

    // Optional: log for debug
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(apis.change_login_password, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
  }
};

  return (
    <div className="min-h-screen bg-white px-4 py-6 font-sans max-w-md mx-auto text-black">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm  mb-2">
            New Password <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="Please enter New Password"
            className="w-full px-4 py-2 rounded-md text-sm bg-[#f7f7f7] 
              shadow-[0_2px_4px_rgba(0,0,0,0.1)] 
              focus:outline-none focus:ring-0 focus:border-none"
          />
          {errors.password && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm  mb-2">
            BDG Cassino ID <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={userId}
            maxLength={12}
            onChange={(e) => {
              setUserId(e.target.value);
              setErrors((prev) => ({ ...prev, userId: "" }));
            }}
            placeholder="Please enter User ID"
            className="w-full px-4 py-2 rounded-md text-sm bg-[#f7f7f7] 
              shadow-[0_2px_4px_rgba(0,0,0,0.1)] 
              focus:outline-none focus:ring-0 focus:border-none"
          />
          {errors.userId && (
            <p className="text-[#fe3442] text-sm mt-1">{errors.userId}</p>
          )}
        </div>

        {renderImageUpload(
          "Latest Deposit Receipt Proof",
          depositProof,
          setDepositProof,
          "depositProof"
        )}
        {renderImageUpload(
          "Photo Selfie Hold Passbook Bank",
          selfiePassbook1,
          setSelfiePassbook1,
          "selfiePassbook1"
        )}
        {renderImageUpload(
          "Photo Selfie Hold Identity Card",
          selfieIdCard,
          setSelfieIdCard,
          "selfieIdCard"
        )}

        <button
          type="submit"
          className="w-full py-2 bg-[#EDC100] hover:bg-[#EDC100] text-white rounded-full  text-sm"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ChangeIdLogin;





