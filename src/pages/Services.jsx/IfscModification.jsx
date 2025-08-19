import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apis from "../../utils/apis";
import axios from "axios";


const IfscModification = () => {
  const [bankNumber, setBankNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const user_id = localStorage.getItem("userId");

  const validate = () => {
    const newErrors = {};
    if (!bankNumber.trim()) {
      newErrors.bankNumber = "Please enter Bank Number";
    }
    if (!ifsc.trim()) {
      newErrors.ifsc = "Please enter IFSC";
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    // if (Object.keys(validationErrors).length === 0) {
    //   const formData = new FormData();
    //   formData.append("bankNumber", bankNumber);
    //   formData.append("ifsc", ifsc);

    //   for (let pair of formData.entries()) {
    //     console.log(pair[0] + ": ", pair[1]);
    //   }

    //   console.log("ifsc modification Form submitted successfully!:",formData);
    // //   navigate("/customerservices");
    //   toast.success("IFSC updated successfully!", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     onClose: () => navigate("/customerservices"),
    //   });
    // }
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("account_no", bankNumber);
      formData.append("ifsc_code", ifsc);
      formData.append("user_id", user_id);

      // Log all form data in one object
      const formObject = {};
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }
      console.log("FormData submitted:", formObject);

      try{
      const response = await axios.post(apis.ifsc_modification, formObject);
      console.log("FormData submitted:", response);
      if (response.status === 200) {
  toast.success(response.data.message, {
    position: "top-center",
    autoClose: 2000,
    onClose: () => navigate("/customerservices"),
  });
      }
      else{
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
      
      console.log("Feedback submitted successfully:", response.data);
       
      }
      catch (error) {
        console.log("Error submitting feedback:", error);
      }
    }

  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen px-4 py-6 max-w-md mx-auto font-sans text-black">
      {/* <h2 className="text-center font-semibold text-lg mb-6">
        IFSC Modification
      </h2> */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bank Number Input */}
        <div>
          <label className="block text-sm mb-2">
            Bank number <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text" // change from "number" to "text" to control length properly
            inputMode="numeric"
            value={bankNumber}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 16);
              setBankNumber(onlyDigits);
              if (onlyDigits.trim()) {
                setErrors((prev) => ({ ...prev, bankNumber: "" }));
              }
            }}
            placeholder="Please enter Bank Number"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] 
    focus:outline-none focus:ring-0 focus:border-none"
          />

          {errors.bankNumber && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.bankNumber}</p>
          )}
        </div>

        {/* IFSC Input */}
        <div>
          <label className="block text-sm mb-2">
            Correct IFSC code <span className="text-[#FF717B]">*</span>
          </label>
          <input
            type="text"
            value={ifsc}
            onChange={(e) => {
              const raw = e.target.value.toUpperCase(); // optional: auto uppercase
              const alphanumeric = raw
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(0, 10);
              setIfsc(alphanumeric);
              if (alphanumeric.trim()) {
                setErrors((prev) => ({ ...prev, ifsc: "" }));
              }
            }}
            placeholder="Please enter IFSC"
            className="w-full px-4 py-2 rounded-md text-sm bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] 
    focus:outline-none focus:ring-0 focus:border-none"
          />

          {errors.ifsc && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.ifsc}</p>
          )}
        </div>

        {/* Submit Button */}
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

export default IfscModification;
