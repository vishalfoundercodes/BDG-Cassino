import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import apis from "../../utils/apis";
import axios from "axios";


const GameProblemForm = () => {
    const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [errors, setErrors] = useState({});
 const user_id = localStorage.getItem("userId");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setScreenshot(e.target.files[0]);
      setErrors((prev) => ({ ...prev, screenshot: "" }));
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // base64 string
      reader.onerror = (error) => reject(error);
    });

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    setErrors((prev) => ({
      ...prev,
      screenshot: "Please upload a screenshot",
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const newErrors = {};
const base64Image = await getBase64(screenshot);
    if (!description.trim()) {
      newErrors.description = "Please enter content";
    }

    if (!screenshot) {
      newErrors.screenshot = "Please upload a screenshot";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", base64Image);
      formData.append("user_id", user_id);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }
    try{
       
            const response = await axios.post(apis.game_problem, formData);
            console.log("FormData submitted:", response);
            console.log("FormData submitted:", response.status);
            console.log("FormData submitted:", response.data.message);
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textarea Section */}
        <div>
          <label className="block text-sm mb-2 leading-5">
            Explain the issue happen to you inside the game clear and detail
            <span className="text-[#FF717B]">*</span>
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={500}
            rows={5}
            placeholder="Please enter content"
            className="w-full px-4 py-2 rounded-md text-sm bg-white resize-none 
              shadow-[0_2px_4px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-0 focus:border-none"
          />
          {/* Error Message */}
          {errors.description && (
            <p className="text-[#FF717B] text-sm mt-1">{errors.description}</p>
          )}
          <div className="text-right text-sm text-gray-400 mt-1">
            {description.length}/500
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Attach photo / screenshot issue clearly
          </label>
          {screenshot ? (
            <div className="relative h-[120px] w-[120px]">
              <img
                src={URL.createObjectURL(screenshot)}
                alt="screenshot"
                className="h-full w-full object-cover rounded"
              />
              <button
                type="button"
                onClick={handleRemoveScreenshot}
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
                onChange={handleFileChange}
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
          {/* Error Message */}
          {errors.screenshot && (
            <p className="text-[#FF717B] text-sm mt-2">{errors.screenshot}</p>
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

export default GameProblemForm;
