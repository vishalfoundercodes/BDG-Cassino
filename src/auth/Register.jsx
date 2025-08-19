import {
  MdKeyboardArrowDown,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apis from "../utils/apis";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../reusable_component/Loader/Loader";
import phoneUsa from "../assets/usaAsset/phone.png";
import passwordUsa from "../assets/usaAsset/password.png";
import tikki from "../assets/usaAsset/tikki.png";
import inviteCode from "../assets/usaAsset/invitationCode.png";
import email_tab from "../assets/usaAsset/email_tab.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";


const register = apis?.register;

function Register() {
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { referralCode: referralCodeFromPath } = useParams();

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    const codeFromQuery = searchParams.get("referral");
    const code = codeFromQuery || referralCodeFromPath;

    if (code) {
      setReferralCode(code);
      formik.setFieldValue("referral_code", code);
    }

    formik.setFieldValue("country_code", selectedCountryCode);
  }, [searchParams, selectedCountryCode, referralCodeFromPath]);

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number cannot exceed 10 digits"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"
      ),

    password_confirmation: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .min(6, "Password confirmation must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"
      ),

    // referral_code: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      country_code: selectedCountryCode,
      password: "",
      password_confirmation: "",
      referral_code: referralCode,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!checkAgreement) {
        toast.warn("Please check Privacy Agreement");
        return;
      }
      // console.log("values",values)
      setLoading(true);
      try {
        // console.log("register values:",values)
        const res = await axios.post(register, values, {
          headers: { "Content-Type": "application/json" },
        });
        // console.log("resresres", res)
        if (res?.data?.status === 200) {
          localStorage.setItem("userId", res?.data?.data?.userId);
          navigate("/");
          toast.success("You have been registered successfully");
        } else {
          toast.error(res?.data?.message);
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    const code = searchParams.get("referral");
    if (code) {
      setReferralCode(code);
      formik.setFieldValue("referral_code", code);
    }
    formik.setFieldValue("country_code", selectedCountryCode);
  }, [searchParams, selectedCountryCode]);

  const countryCodeHandler = async () => {
    try {
      const res = await axios.post(apis.country);
      // console.log("res", res)
      if (res?.data?.status === "success") {
        setCountryCodeData(res?.data?.data);
      }
    } catch (err) {
      // console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };
  const handleSelectCountry = (code) => {
    setSelectedCountryCode(code);
    setIsModalOpen(false);
  };

  useEffect(() => {
    countryCodeHandler();
  }, []);
  const naivatorhandle = () => {
    localStorage.setItem("abousType", "6");
  };



  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <section className=" w-full flex flex-col items-start dark:text-gray">
        <div className="bg-gradient-to-l from-red to-redLight w-full">
          <div className=" text-white pb-5">
            <h1 className="text-sm px-5 font-bold mt-2">Register</h1>
            <p className="text-[10px] px-5 my-2">
              Please register by phone number or email.{" "}
            </p>
          </div>
        </div>
        <div className=" px-5 flex flex-col h-full w-full  items-center justify-center mx-auto lg:py-0">
          <div className="flex  flex-col items-center justify-center w-full py-2 border-b-[1px] mx-5 text-customlightBlue border-customlightBlue">
            <div>
              <img className="w-5 h-6" src={phoneUsa} alt="sd" />
            </div>
            <div className="text-sm text-customlightBlue mt-2">
              Register your phone
            </div>
          </div>
          <div className="w-full h-full text-white">
            <form
              className="space-y-4 w-full md:space-y-6 my-5"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <div className=" flex items-center gap-2 py-2">
                  <div>
                    <img className="w-5 h-6" src={phoneUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="mobile"
                    className=" text-sm text-white font-medium"
                  >
                    Phone number
                  </label>
                </div>
                <div className="relative flex items-center gap-2 mt-2">
                  <p
                    className="bg-customdarkBlue  w-[30%] text-white opacity-50 p-3 flex items-center justify-center rounded-md cursor-pointer"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    {selectedCountryCode} <MdKeyboardArrowDown size={20} />
                  </p>
                  {isModalOpen && (
                    <div className="absolute left-0 top-12 h-48 overflow-auto w-full bg-customdarkBlue  shadow-lg border rounded-md z-10">
                      {countryCodeData
                        ?.sort((a, b) =>
                          a.phone_code === "+91"
                            ? -1
                            : b.phone_code === "+91"
                            ? 1
                            : 0
                        )
                        .map((item, i) => (
                          <p
                            key={i}
                            className={`p-2 cursor-pointer text-blackLight ${
                              selectedCountryCode === item?.phone_code
                                ? "bg-red text-white"
                                : ""
                            }`}
                            onClick={() =>
                              handleSelectCountry(item?.phone_code)
                            }
                          >
                            {item?.phone_code} - {item?.name}
                          </p>
                        ))}
                    </div>
                  )}
                  <input
                    {...formik.getFieldProps("mobile")}
                    type="text"
                    name="mobile"
                    // disabled={otpbuttondisable}
                    placeholder="Enter your phone number"
                    className="col-span-[60%] bg-customdarkBlue text-[14px] focus:border-[1px] border-customlightBlue rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white"
                    onInput={(e) => {
                      const value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      e.target.value = value;
                      formik.setFieldValue("mobile", value);

                      // ✅ Trigger OTP only if number is complete (10 digits) and different from the last sent
                    
                    }}
                  />
                </div>
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="text-customred text-xs">
                    {formik.errors.mobile}
                  </div>
                )}
              </div>
              {/* otp input */}
            

              <div className="">
                <div className="flex items-center gap-2 py-2">
                  <div>
                    <img className="w-6 h-6" src={email_tab} alt="sd" />
                  </div>
                  <label
                    htmlFor="referral_code"
                    className="text-sm text-white font-medium"
                  >
                    {" "}
                    Email
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  name="email"
                  id="email"
                  // disabled={!otpbuttondisable}
                  placeholder="Please enter the Email"
                  className="bg-customdarkBlue mt-2 border-[1px] border-transparent focus:border-customlightBlue text-[14px] rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white transition-all duration-200 ease-in-out"
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.".split(
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
                  }}
                />
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
                    Set Password
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("password")}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  // disabled={!otpbuttondisable}
                  placeholder="Password"
                  className="bg-customdarkBlue mt-2 border-[1px] border-transparent focus:border-customlightBlue text-[14px] rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white transition-all duration-200 ease-in-out"
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
                  className="absolute inset-y-0 right-0 top-10 pr-3 flex items-center text-white opacity-70"
                >
                  {passwordVisible ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility
                      className="dark:text-white opacity-85"
                      size={20}
                    />
                  )}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-customred text-xs">
                    {formik.errors.password}
                  </div>
                )}
              </div>
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
                  {...formik.getFieldProps("password_confirmation")}
                  type={passwordVisible ? "text" : "password"}
                  name="password_confirmation"
                  id="password_confirmation"
                  // disabled={!otpbuttondisable}
                  placeholder="Confirm Password"
                  className="bg-customdarkBlue mt-2 border-[1px] border-transparent focus:border-customlightBlue text-[14px] rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white transition-all duration-200 ease-in-out"
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
                  className="absolute inset-y-0 right-0 top-10 pr-3 flex items-center dark:text-white opacity-85"
                >
                  {passwordVisible ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility
                      className="dark:text-white opacity-85"
                      size={20}
                    />
                  )}
                </button>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <div className="text-customred text-xs">
                      {formik.errors.password_confirmation}
                    </div>
                  )}
              </div>
              <div className="">
                <div className="flex items-center gap-2 py-2">
                  <div>
                    <img className="w-6 h-6" src={inviteCode} alt="sd" />
                  </div>
                  <label
                    htmlFor="referral_code"
                    className="text-sm text-white font-medium"
                  >
                    {" "}
                    Invite Code
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("referral_code")}
                  type="text"
                  name="referral_code"
                  id="referral_code"
                  placeholder="Please enter the invitation code"
                  className="bg-customdarkBlue mt-2 border-[1px] border-transparent focus:border-customlightBlue text-[14px] rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white transition-all duration-200 ease-in-out"
                />
              </div>
              <div className="flex items-center mt-4">
                <div
                  onClick={() => setCheckAgreement(!checkAgreement)}
                  className={`flex items-center  w-5 h-5 cursor-pointer rounded-full ${
                    checkAgreement
                      ? "text-lightGray bg-white "
                      : "text-chocolate"
                  }`}
                >
                  {checkAgreement ? (
                    <img className="w-5 h-5" src={tikki} alt="df" />
                  ) : (
                    <div className="border-[1px] border-[#c8c9cc] p-2 rounded-full"></div>
                  )}
                </div>
                <label
                  htmlFor="agree"
                  className="text-gray ml-2 text-xs sm:text-base md:text-xs"
                >
                  I have read and agree{" "}
                </label>
                <a
                  onClick={naivatorhandle}
                  href="/aboutus/child"
                  className="ml-2 text-customred  text-xs sm:text-base md:text-xs"
                >
                  【Privacy Agreement】
                </a>
              </div>
              <div className="flex flex-col w-full font-bold items-center justify-center">
                <button
                  type="submit"
                  className="w-[90%] font-bold tracking-[0.20333rem] py-2.5 rounded-full border-none  text-[#8F5206] bg-gradient-to-r from-[#EDD188] to-[#CA9D4B] shadow-lg flex items-center justify-center"
                >
                  Register
                </button>
                <p className="border w-[90%] text-xs border-customlightBlue mt-5 tracking-[2px] text-[#A8A5A1]  rounded-full p-2 flex gap-2 items-center justify-center">
                  I have an account{" "}
                  <Link
                    to="/login"
                    className="font-bold text-sm hover:underline text-customlightBlue tracking-[0.20333rem] "
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
