import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apis from "../../utils/apis";

const UsdtNonIndian = () => {
  const [platformName, setPlatformName] = useState("");
  const [walletType, setWalletType] = useState("");
  const user_id = localStorage.getItem("userId");
  const [images, setImages] = useState({
    bdgwinId: null,
    governmentCard: null,
    deposit1: null,
    deposit2: null,
    bindAddress: null,
    newAddress: null,
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
    if (!platformName.trim()) newErrors.platformName = "Please enter content";
    if (!walletType.trim()) newErrors.walletType = "Please enter content";
    Object.entries(images).forEach(([key, value]) => {
      if (!value) newErrors[key] = "Photo is required";
    });
    return newErrors;
  };

  // usdt_user_verification;
const handleSubmit = async(e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const formData = new FormData();

    // 🔹 Get user_id from storage or context
    const userId = localStorage.getItem("user_id"); // or however you're managing auth

    formData.append("user_id", user_id);
    formData.append("region_status", "2"); // non-Indian
    formData.append("wallet_type", walletType);
    formData.append("exchange_name", platformName);

    // 🔹 File mappings
    formData.append("screenshot_bdgwin_id", images.bdgwinId);
    formData.append("photo_government_card", images.governmentCard);
    formData.append("photo_deposit_proof1", images.deposit1);
    formData.append("photo_deposit_proof2", images.deposit2);
    formData.append("photo_usdt_bind_bdgwin", images.bindAddress);
    formData.append("photo_new_usdt_address", images.newAddress);

    // OPTIONAL: If you add this upload field in UI:
    // formData.append("photo_adhaar_card", images.adhaarCard);

    // 🧾 Logging preview
    const formDataDisplay = {};
    for (let [key, value] of formData.entries()) {
      formDataDisplay[key] = value instanceof File ? value.name : value;
    }
    console.log("Submitted FormData:", formDataDisplay);

    try {
      console.log(`Submitting USDT verification to ${apis.usdt_user_verification}`);
        const response = await axios.post(
          apis.usdt_user_verification,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", response.data);
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

    // toast.success("USDT verification submitted successfully!", {
    //   position: "top-center",
    //   autoClose: 2000,
    //   onClose: () => navigate("/customerservices"),
    // });
  }
};

  const renderInput = (label, value, setter, errorKey) => (
    <div>
      <label className="block text-sm mb-2">
        {label} <span className="text-[#FF717B]">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setter(e.target.value);
          setErrors((prev) => ({ ...prev, [errorKey]: "" }));
        }}
        placeholder="Please enter content"
        className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
      />
      {errors[errorKey] && (
        <p className="text-[#FF717B] text-sm mt-1">{errors[errorKey]}</p>
      )}
    </div>
  );

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
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderInput(
          "Name of crypto exchange platform",
          platformName,
          setPlatformName,
          "platformName"
        )}
        {renderInput(
          "Text type of wallet address",
          walletType,
          setWalletType,
          "walletType"
        )}

        {renderImageUpload("Screenshot of BDGWIN ID", "bdgwinId")}
        {renderImageUpload("Photo of government card", "governmentCard")}
        {renderImageUpload("Photo Deposit Receipt Proof 1", "deposit1")}
        {renderImageUpload("Photo of Deposit Receipt Proof 2", "deposit2")}
        {renderImageUpload(
          "Photo of your own USDT address bind at BDG Cassino",
          "bindAddress"
        )}
        {renderImageUpload("Photo of your new USDT address", "newAddress")}

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

export default UsdtNonIndian;
