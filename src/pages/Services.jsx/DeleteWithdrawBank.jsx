import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apis from "../../utils/apis";
import axios from "axios";


const DeleteWithdrawBank = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [passbookImage, setPassbookImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [depositReceipt, setDepositReceipt] = useState(null);
  const [errors, setErrors] = useState({});
  const user_id = localStorage.getItem("userId");
  // console.log("User ID:", user_id);
  const navigate = useNavigate();

  const handleImageChange = (setter) => (e) => {
    if (e.target.files[0]) {
      setter(e.target.files[0]);
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!accountNumber.trim() || !/^[0-9]+$/.test(accountNumber)) {
      newErrors.accountNumber = "Please enter valid Bank Account Number";
    }
    if (!accountName.trim() || !/^[a-zA-Z ]+$/.test(accountName)) {
      newErrors.accountName = "Please enter valid Bank Account Name";
    }
    if (!ifscCode.trim() || !/^[a-zA-Z0-9]+$/.test(ifscCode)) {
      newErrors.ifscCode = "Please enter valid IFSC Code";
    }
    if (!passbookImage)
      newErrors.passbookImage = "Please upload passbook photo";
    if (!selfieImage) newErrors.selfieImage = "Please upload selfie with ID";
    if (!depositReceipt)
      newErrors.depositReceipt = "Please upload deposit receipt";
    return newErrors;
  };

// const handleSubmit = async(e) => {
//   e.preventDefault();
//   const validationErrors = validate();
//   setErrors(validationErrors);

//   if (Object.keys(validationErrors).length === 0) {
//     const formData = new FormData();
//     formData.append("account_no", accountNumber);
//     formData.append("accountName", accountName);
//     formData.append("ifsc_code", ifscCode);
//     formData.append("passbook_photo", passbookImage);
//     formData.append("identity_card_photo", selfieImage);
//     formData.append("last_deposit_proof", depositReceipt);
//     formData.append("user_id", user_id);


//     // Log all FormData entries (including image files)
//     const formObject = {};
//     for (let [key, value] of formData.entries()) {
//       formObject[key] =`${value.name}`
//     }

//          try{
//       const response = await axios.post(apis.delete_account, formObject);
//       console.log("FormData submitted:", response);
//       if (response.status === 200) {
//   toast.success(response.data.message, {
//     position: "top-center",
//     autoClose: 2000,
//     onClose: () => navigate("/customerservices"),
//   });
//       }
//       else{
//         toast.error(response.data.message, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       }
      
//       console.log("Feedback submitted successfully:", response.data);
       
//       }
//       catch (error) {
//         console.log("Error submitting feedback:", error);
//       }

//     console.log("Submitted FormData:", formObject);

//     toast.success("Request Submitted Successfully!", {
//       position: "top-center",
//       autoClose: 2000,
//     });

//     setTimeout(() => navigate("/customerservices"), 2000);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const formData = new FormData();
    formData.append("account_no", accountNumber);
    formData.append("accountName", accountName);
    formData.append("ifsc_code", ifscCode);
    formData.append("passbook_photo", passbookImage);
    formData.append("identity_card_photo", selfieImage);
    formData.append("last_deposit_proof", depositReceipt);
    formData.append("user_id", user_id); // This is working

    try {
      console.log("form delete withdraw Data:", formData);
      const response = await axios.post(apis.delete_account, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
  }
};


  const renderImageUpload = (label, file, setter, errorKey) => (
    <div className="mb-6 w-full text-black">
      <label className="block text-sm font-medium mb-2">
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
            onClick={() => setter(null)}
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
            onChange={(e) => {
              if (e.target.files[0]) {
                setter(e.target.files[0]);
                setErrors((prev) => ({ ...prev, [errorKey]: "" }));
              }
            }}
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
      )}

      {errors[errorKey] && (
        <p className="text-[#FF717B] text-sm mt-1">{errors[errorKey]}</p>
      )}
    </div>
  );
  

  return (
    <div className="bg-[#f9f9ff] min-h-screen px-4 py-6 max-w-md mx-auto font-sans text-black">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2">
            Bank Account Number <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {
              const onlyNumbers = e.target.value
                .replace(/\D/g, "")
                .slice(0, 16); // remove non-digits
              setAccountNumber(onlyNumbers);
              setErrors((prev) => ({ ...prev, accountNumber: "" }));
            }}
            placeholder="Please enter Bank Account Number"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
          />

          {errors.accountNumber && (
            <p className="text-[#FF717B] text-sm mt-1">
              {errors.accountNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">
            Bank Account Name <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => {
              const onlyAlphabets = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // allow spaces too
              setAccountName(onlyAlphabets);
              setErrors((prev) => ({ ...prev, accountName: "" }));
            }}
            placeholder="Please enter Bank Account Name"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
          />

          {errors.accountName && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.accountName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2">
            IFSC Code <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={ifscCode}
            onChange={(e) => {
              setIfscCode(e.target.value);
              setErrors((prev) => ({ ...prev, ifscCode: "" }));
            }}
            placeholder="Please enter IFSC"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow focus:outline-none"
          />
          {errors.ifscCode && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.ifscCode}</p>
          )}
        </div>

        {renderImageUpload(
          "Photo of Bank Passbook",
          passbookImage,
          setPassbookImage,
          "passbookImage"
        )}
        {renderImageUpload(
          "Photo Selfie Holding Identity Card",
          selfieImage,
          setSelfieImage,
          "selfieImage"
        )}
        {renderImageUpload(
          "Latest Deposit Receipt for proof",
          depositReceipt,
          setDepositReceipt,
          "depositReceipt"
        )}

        <button
          type="submit"
          className="w-full py-2 bg-[#EDC100] hover:bg-[#EDC100] text-white rounded-full font-semibold text-sm"
        >
          Confirm
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DeleteWithdrawBank;
