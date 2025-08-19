import apis from '../../utils/apis';
import axios from 'axios';
import { toast } from "react-toastify"; 
import React from 'react'
import { useState } from "react";
import { X } from "lucide-react"; // You already use <X />, so keep this import
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function WithdrawProblemForm() {
  const location = useLocation();
  const { depositOrderNumber, orderAmount } = location.state || {};
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Keep actual files for payload
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // Form fields
  const [receiverUpi, setReceiverUpi] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [pdfPassword, setPdfPassword] = useState("");

  const userId = localStorage.getItem("userId");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      // Validate video type before setting
      if (!["video/mp4", "video/quicktime", "video/mov"].includes(file.type)) {
        toast.error("Only MP4 or MOV videos are allowed.");
        return;
      }

      // Check file size (limit to 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        toast.error("Video file size must be less than 50MB.");
        return;
      }

      setVideoPreview(URL.createObjectURL(file));
      setVideoFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      // Check PDF file size (limit to 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("PDF file size must be less than 10MB.");
        return;
      }
      setPdfFile(file);
    } else {
      alert("Only PDF files are allowed");
    }
  };

  const removeFile = () => {
    setPdfFile(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (!receiverUpi) return toast.error("Please enter Receiver UPI ID");
    // if (!utrNumber) return toast.error("Please enter UTR number");
    if (!pdfPassword) return toast.error("Please enter PDF password");
    if (!imageFile)
      return toast.error("Please upload withdraw proof receipt image");
    if (!videoFile) return toast.error("Please upload bank transaction video");
    if (!pdfFile) return toast.error("Please upload PDF bank statement");

    // Additional validation for video file
    if (
      !["video/mp4", "video/quicktime", "video/mov"].includes(videoFile.type)
    ) {
      toast.error("Only MP4 or MOV videos are allowed.");
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("order_number", depositOrderNumber);
      formData.append("order_amount", orderAmount);
      formData.append("upi_id", receiverUpi);
    //   formData.append("utr_number", utrNumber);
      formData.append("pdf_password", pdfPassword);
      formData.append("deposit_proof_recipt", imageFile);

      // Don't create a new File object, use the original
      formData.append("bank_transaction_video", videoFile);
      formData.append("pdf_bank_statement", pdfFile);

      // Log FormData contents for debugging
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File - name: ${value.name}, type: ${value.type}, size: ${value.size} bytes`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const res = await axios.post(apis.withdrawProblem, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 60 seconds timeout for large files
      });

      if (res.status === 200) {
    toast.success(res.data.message);
    console.log("Response:", res.data);

    // Wait 1.5 seconds so the toast is visible before navigating
    setTimeout(() => {
      navigate("/customerservices");
    }, 1500);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
        toast.error("Failed to submit form");
      // More detailed error handling
      if (error.response?.status === 400) {
        const errorMessage =
          error.response.data?.errors ||
          error.response.data?.message ||
          "Validation failed";
        toast.error(errorMessage);
      } else if (error.response?.status === 413) {
        toast.error(
          "File size too large. Please reduce file sizes and try again."
        );
      } else if (error.code === "ECONNABORTED") {
        toast.error(
          "Upload timeout. Please check your internet connection and try again."
        );
      } else {
        toast.error(error.response?.data?.message || "Failed to submit form");
      }
    }
  };

  return (
    <div className="bg-[#F8F9FF] p-6 max-w-md mx-auto space-y-6">
      {/* Deposit Order Number */}
      <div>
        <label className="block text-gray text-sm font-medium mb-1">
          Withdraw Order Number<span className="text-[#DE4039]">*</span>
        </label>
        <input
          type="text"
          value={depositOrderNumber || ""}
          readOnly
          className="w-full border border-gray rounded-lg px-3 py-2 text-gray focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Order Amount */}
      <div>
        <label className="block text-gray text-sm font-medium mb-1">
          Order Amount <span className="text-[#DE4039]">*</span>
        </label>
        <input
          type="text"
          value={orderAmount || ""}
          readOnly
          className="w-full border border-gray rounded-lg px-3 py-2 text-gray focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Receiver UPI ID */}
      <div>
        <label className="block text-gray text-sm font-medium mb-1">
          Receiver UPI ID<span className="text-[#DE4039]">*</span>
        </label>
        <input
          type="text"
          value={receiverUpi}
          onChange={(e) => setReceiverUpi(e.target.value)}
          placeholder="Please enter content"
          className="w-full border border-gray rounded-lg px-3 py-2 placeholder-gray text-gray focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* UTR number */}
      {/* <div>
        <label className="block text-gray text-sm font-medium mb-1">
          UTR number<span className="text-[#DE4039]">*</span>
        </label>
        <input
          type="text"
          value={utrNumber}
          onChange={(e) => setUtrNumber(e.target.value)}
          placeholder="Please enter UTR"
          className="w-full border border-gray rounded-lg px-3 py-2 placeholder-gray text-gray focus:outline-none focus:border-blue-400"
        />
      </div> */}

      {/* Provide PDF Password */}
      <div>
        <label className="block text-gray text-sm font-medium mb-1">
          Provide PDF Password<span className="text-[#DE4039]">*</span>
        </label>
        <input
          type="text"
          value={pdfPassword}
          onChange={(e) => setPdfPassword(e.target.value)}
          placeholder="Please enter content"
          className="w-full border border-gray rounded-lg px-3 py-2 placeholder-gray text-gray focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray text-sm font-medium mb-2">
          Withdraw proof receipt detail<span className="text-[#DE4039]">*</span>
        </label>
        <div className="flex gap-4 mb-4">
          <div className="relative w-24 h-24 border border-gray rounded-lg flex flex-col items-center justify-center text-gray hover:border-blue-400">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  className="absolute top-1 right-1 bg-[#DE4039] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                >
                  ✕
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
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
                <span className="text-sm">Photo</span>
              </label>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="text-gray text-sm space-y-1 mb-4">
          <p>
            Please ensure the uploaded image clearly shows the UTR/UPI number.
          </p>
          <p>
            Uploading unrelated or inappropriate images may lead to failed
            withdraw verification.
          </p>
          <p>
            Repeated violations may result in a temporary or permanent
            restriction from submitting support tickets.
          </p>
        </div>

        {/* Video Upload */}
        <p className="text-gray text-sm mb-2">
          More than 24 hours not receive, attach with bank APP transaction flow
          video (Max 50MB, MP4 or MOV format)
        </p>
        <div className="relative w-24 h-24 border border-gray rounded-lg flex flex-col items-center justify-center text-gray hover:border-blue-400">
          {videoPreview ? (
            <>
              <video
                src={videoPreview}
                className="w-full h-full object-cover rounded-lg"
                controls
              />
              <button
                className="absolute top-1 right-1 bg-[#DE4039] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => {
                  setVideoPreview(null);
                  setVideoFile(null);
                }}
              >
                ✕
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/mov"
                className="hidden"
                onChange={handleVideoChange}
              />
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
                <path d="M3 4h5l2 3h11a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              </svg>
              <span className="text-xsm">Upload video</span>
            </label>
          )}
        </div>
      </div>

      {/* PDF Upload */}
      <div>
        <p className="text-gray text-sm mb-2">
          More than 24 hours not receive, attach PDF bank statement (Max 10MB)
          <span className="text-[#DE4039]">*</span>
        </p>
        <div className="flex flex-col">
          {!pdfFile ? (
            <label className="flex flex-col items-center cursor-pointer border border-gray rounded-lg p-2 w-24 h-24 justify-center">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
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
                className="w-8 h-8 mb-1 text-gray"
              >
                <path d="M3 4h5l2 3h11a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              </svg>
              <span className="text-xsm text-gray">Upload PDF</span>
            </label>
          ) : (
            <div className="relative border border-gray rounded-lg p-2 w-24 h-24 flex flex-col items-center justify-center">
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
                className="w-8 h-8 text-[#DE4039]"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p className="text-xs text-center mt-2 break-all text-[#DE4039]">
                {pdfFile.name}
              </p>
              <button
                onClick={removeFile}
                className="absolute top-1 right-1 p-1 bg-gray rounded-full shadow hover:bg-gray"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#F7C600] text-white font-medium py-3 rounded-full hover:opacity-90 transition"
      >
        Confirm
      </button>
    </div>
  );
}
