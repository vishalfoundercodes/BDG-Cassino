import { MdKeyboardArrowDown, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Loader from '../reusable_component/Loader/Loader';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import loginPhone from "../assets/icons/loginPhone.png"
import phoneUsa from "../assets/usaAsset/phone.png";
import passwordUsa from "../assets/usaAsset/password.png";
import passwordUsa2 from "../assets/icons/passwordUsa.png";
import apis from "../utils/apis";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({});
  
  const navigate=useNavigate()
  const [allInputs, setAllInputs] = useState({
    mobile: "",
    otp: "",
    userid: "",
    email: "",
    password: "",
    password_confirmation: "",
    referral_code: "",
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Error messages for each field
  const errors = {
    mobile:
      allInputs.mobile.length !== 10
        ? "Enter a valid 10-digit mobile number"
        : "",
    password:
      allInputs.password.length < 8
        ? "Password must be at least 8 characters"
        : "",
    password_confirmation:
      allInputs.password !== allInputs.password_confirmation
        ? "Passwords do not match"
        : "",
    referral_code:
      allInputs.referral_code.length !== 6 ? "Enter 6-digit OTP" : "",
    agreement: !checkAgreement ? "You must agree to the Privacy Agreement" : "",
  };

  // Overall form validity
  const isFormValid =
    !errors.mobile &&
    !errors.password &&
    !errors.password_confirmation &&
    !errors.referral_code &&
    checkAgreement;

    const handleBlur = (field) => {
      setTouched({ ...touched, [field]: true });
    };


  const handleotp = async (mobilenumber) => {
    if (!mobilenumber) {
      //  alert("Please enter a valid mobile number");
      toast.warn("Please enter a valid mobile number");
      return;
    }

    if(mobilenumber.length!=10){
      toast.warn("Please enter a valid 10-digit mobile number");
      return
    }

    try {
      const res = await axios.post(`${apis.sendOtp}${mobilenumber}`);
      // console.log("otp res data:", res.data);

      if (res.data.error === "200") {
        toast.success(`OTP sent to ${mobilenumber}`);
        setotpVisible(true);
      }
    } catch (error) {
      console.error("OTP API Error:", error.response?.data || error.message);
    }
  };

 const handleReset = async (e) => {
   e.preventDefault();

   if (!isFormValid) {
     toast.error("Please correct the errors before submitting");
     return;
   }

   try {
     // ✅ use the entered OTP from referral_code
     const otpCode = allInputs.referral_code;

    //  console.log(
    //    `Verifying OTP for mobile: ${allInputs.mobile}, otp: ${otpCode}`
    //  );

     const res = await axios.post(
       `${apis.verifyOtp}${allInputs.mobile}&otp=${otpCode}`
     );

    //  console.log("OTP verification response:", res.data);

     if (res.data.error === "200") {
       toast.success(res.data.msg);

       // ✅ Now send reset password API after OTP verification
       const resetPayload = {
         mobile: allInputs.mobile,
         password: allInputs.password,
       };

      //  console.log("Sending reset password payload:", resetPayload);

       const resetRes = await axios.post(apis.forget_password, resetPayload);
      //  console.log("forget response: ", resetRes)
       if (resetRes.data.status === 200) {
         toast.success("Password reset successfully");
         navigate("/login")
       } else {
         toast.warn(resetRes.data.msg || "Password reset failed");
       }
     } else if (res.data.error === "400") {
       toast.warn(res.data.msg);
     }
   } catch (error) {
     console.error(
       "OTP/Reset API Error:",
       error.response?.data || error.message
     );
     toast.error("Something went wrong while resetting password");
   }
 };


  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <section className=" w-full flex flex-col items-start dark:text-gray">
        <div className="bg-gradient-to-r from-[#EDD188] to-[#C79744] w-full">
          <div className=" text-white pb-5">
            <h1 className="text-sm px-5 font-bold mt-2">Forgot password</h1>
            <p className="text-[13px] px-5 my-2">
              Please retrieve/change your password through your mobile phone
              number or email{" "}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-l from-red to-redLight px-5 flex flex-col h-full w-full  items-center justify-center mx-auto lg:py-0">
          <div className="flex  flex-col items-center justify-center w-full py-2 border-b-2 mx-5 text-[#D9AC4F] border-[#D9AC4F]">
            <div>
              {/* <img className="w-6 h-6" src={loginPhone} alt="sd" /> */}
              <img className="w-5 h-6" src={phoneUsa} alt="sd" />
            </div>
            <div className="text-sm mt-2"> phone reset </div>
          </div>
          <div className="w-full h-full text-white">
            <form className="space-y-4 w-full md:space-y-6 my-5" action="#">
              <div className="w-full">
                <div className=" flex items-center py-2">
                  <div>
                    <img className="w-5 h-6" src={phoneUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="mobile"
                    className=" text-sm text-white font-medium pl-2"
                  >
                    Phone number
                  </label>
                </div>
                <div className="flex items-center w-full gap-1">
                  <p className="bg-[#333332] w-[30%] text-gray p-2.5 flex items-center rounded-md">
                    +91 <MdKeyboardArrowDown size={20} />
                  </p>
                  <input
                    value={allInputs.mobile}
                    onChange={(e) => {
                      setAllInputs({
                        ...allInputs,
                        mobile: e.target.value,
                      });
                    }}
                    onBlur={() => handleBlur("mobile")}
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your phone number"
                    //   className={`col-span-[60%] bg-slate-100 text-[14px] focus:border-[1px] border-bg2 rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-gray`}
                    //   className="bg-slate-100 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-gray"
                    className="bg-[#333332] focus:border-[0.5px] text-[14px]  rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-white"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      formik.setFieldValue("mobile", e.target.value);
                    }}
                  />
                </div>
                {touched.mobile && errors.mobile && (
                  <p className="text-customred text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center py-2 gap-2">
                  <div>
                    <img className="w-6 h-6" src={passwordUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="password"
                    className="text-sm text-white font-medium"
                  >
                    A new Password
                  </label>
                </div>
                <input
                  onChange={(e) => {
                    setAllInputs({
                      ...allInputs,
                      password: e.target.value,
                    });
                  }}
                  type={passwordVisible ? "text" : "password"}
                  onBlur={() => handleBlur("password")}
                  name="password"
                  id="password"
                  placeholder="A new Password"
                  className="bg-[#333332] focus:border-[1px] text-[14px]  rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-white "
                  minLength={8}
                  maxLength={20}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@".split(
                        ""
                      ),
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "Delete",
                    ];
                    if (!allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }

                    // Optional: block further input if length >= 10
                    if (
                      formData.password.length >= 20 &&
                      ![
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                        "Delete",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[a-zA-Z0-9@]*$/.test(pasted) || pasted.length > 20) {
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 top-10 pr-3 flex items-center text-[#B4B4B4]"
                >
                  {passwordVisible ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility className="text-[#B4B4B4]" size={20} />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-customred text-xs mt-1">{errors.password}</p>
              )}
              <div className="relative">
                <div className="flex items-center py-2 gap-2">
                  <div>
                    <img className="w-6 h-6" src={passwordUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="password_confirmation"
                    className="text-sm text-white font-medium"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  onChange={(e) => {
                    setAllInputs({
                      ...allInputs,
                      password_confirmation: e.target.value,
                    });
                  }}
                  type={passwordVisible ? "text" : "password"}
                  onBlur={() => handleBlur("password_confirmation")}
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder="Confirm new password"
                  className="bg-[#333332] focus:border-[1px] text-[14px]   rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-white"
                  minLength={8}
                  maxLength={20}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@".split(
                        ""
                      ),
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "Delete",
                    ];
                    if (!allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }

                    // Optional: block further input if length >= 10
                    if (
                      formData.password.length >= 20 &&
                      ![
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                        "Delete",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[a-zA-Z0-9@]*$/.test(pasted) || pasted.length > 20) {
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 top-10 pr-3 flex items-center dark:text-gray opacity-35"
                >
                  {passwordVisible ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility
                      className="dark:text-gray opacity-65"
                      size={20}
                    />
                  )}
                </button>
              </div>
              {touched.password_confirmation &&
                errors.password_confirmation && (
                  <p className="text-customred text-xs mt-1">
                    {errors.password_confirmation}
                  </p>
                )}
              <div className="">
                <div className="flex items-center gap-2 py-2">
                  <div>
                    <img className="w-6 h-6" src={passwordUsa2} alt="sd" />
                  </div>
                  <label
                    htmlFor="referral_code"
                    className="text-sm text-white font-medium"
                  >
                    {" "}
                    Verification Code
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="confirmation_code"
                    id="confirmation_code"
                    placeholder="Please enter the confirmation code"
                    onBlur={() => handleBlur("referral_code")}
                    value={allInputs.referral_code}
                    // onChange={(e) =>
                    //   setAllInputs({
                    //     ...allInputs,
                    //     referral_code: e.target.value,
                    //   })
                    // }
                    onChange={(e) =>
                      setAllInputs({
                        ...allInputs,
                        referral_code: e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 6),
                      })
                    }
                    className="bg-[#333332] focus:border-[1px] text-[14px]  rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleotp(allInputs.mobile)}
                    className="px-7 py-1.5 text-xsm rounded-full border-none bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#A25206] shadow-lg flex items-center justify-center"
                  >
                    Send
                  </button>
                </div>
                {errors.referral_code && (
                  <p className="text-customred text-xs mt-1">
                    {errors.referral_code}
                  </p>
                )}
              </div>
              <div className="flex items-center mt-4">
                <div
                  onClick={() => setCheckAgreement(!checkAgreement)}
                  className={`flex items-center cursor-pointer rounded-full ${
                    checkAgreement
                      ? "text-chocolate bg-white "
                      : "text-chocolate"
                  }`}
                >
                  {checkAgreement ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <FaRegCircle size={20} />
                  )}
                </div>
                <label
                  htmlFor="agree"
                  className="text-gray ml-2 text-xs sm:text-base md:text-xs"
                >
                  I have read and agree{" "}
                </label>
                <a
                  href="/aboutus/risk"
                  className="ml-2 text-red underline text-xs sm:text-base md:text-xs"
                >
                  Privacy Agreement
                </a>
              </div>
              <div className="flex flex-col w-full font-bold items-center justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!isFormValid}
                  className={`w-[90%] mx-auto py-2.5 rounded-full font-bold shadow-lg ${
                    isFormValid
                      ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#A25206]"
                      : "bg-gray text-black cursor-not-allowed"
                  }`}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword