import { MdKeyboardArrowDown, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apis from '../utils/apis';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../reusable_component/Loader/Loader';
import phoneUsa from "../assets/usaAsset/phone.png"
import passwordUsa from "../assets/usaAsset/password.png"
import tikki from "../assets/usaAsset/tikki.png"
import cutomerService from "../assets/usaAsset/custoservice.png"
import email_tab from "../assets/usaAsset/email_tab.png"
import email_tab_color from "../assets/usaAsset/email_tab_color.png"
import phoneDesable from "../assets/usaAsset/phoneDesable.png"
const loginEndpoint = apis?.login;

function Login() {
  const [loading, setLoading] = useState(false);
  const [togglelogin, settogglelogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const MyProfileFn = async (userid) => {
    // const loginTokenFromLocalStorage = localStorage.getItem("login_token");
    try {
      const response = await axios.get(`${apis.profile}${userid}`);
      // console.log("login profile respones",response)
      // const profileToken = response?.data?.data?.login_token;
      if (response?.data?.success === 423) {
        // console.log("blocked")
        toast.error("Blocked by admin")
      } else {
        localStorage.setItem("userId", userid)
        setLoading(false)
        toast.success("Login successful!");
        navigate("/")
      }
    } catch (e) {
      // console.error(e);
      setLoading(false)
      toast.error("Blocked by admin")
    }
  };

  const generateToken = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const token = generateToken()
    try {
      const payload = { identity: !togglelogin?formData.mobile:formData.email, country_code: selectedCountryCode, password: formData.password, login_token: token };
      console.log("payload",payload)
      const response = await axios.post("https://admin.gameon.deals/api/login", payload);
      console.log("resresrers",response)
      if (response?.data?.status === 200||response?.data?.status === "200") {
        localStorage.setItem("login_token", token)
        await MyProfileFn(response?.data?.id)
      } else {
        
        toast.error(response?.data?.message);
        setLoading(false)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setLoading(false)
      console.log("Error:", err);
    }
  };

  const countryCodeHandler = async () => {
    try {
      const res = await axios.post(apis.country)
      // console.log("res", res)
      if (res?.data?.status === "success") {
        setCountryCodeData(res?.data?.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleSelectCountry = (code) => {
    setSelectedCountryCode(code);
    setIsModalOpen(false);
  };

  useEffect(() => {
    countryCodeHandler()
  }, [])
  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <section className="h-[100vh] font-inter w-full flex  flex-col items-start dark:text-white">
        <div className="bg-gradient-to-l from-red to-redLight w-full pb-5">
          <h1 className="text-sm font-bold font-inter px-10 mt-2">Log in</h1>
          <p className="text-[10px] px-10 mt-2">Please login with your phone number or email </p>
          <p className="text-[10px] px-10">If you forget your password,please contact customer service </p>
        </div>
        <div className="flex flex-col w-full items-center justify-center px-5 lg:py-0">
          <div className=" w-full  text-white">
            <div className='flex w-full items-center justify-center'>
              <div onClick={
                () => settogglelogin(false)
              } className={`flex  flex-col items-center justify-center w-full py-2 border-b-[1px] text-redLight 
              ${togglelogin === false ? 'border-customdarkBluebtn' : 'border-customdarkBlue'} `}>

                <div>
                  <img className='w-6 h-6' src={togglelogin === false ?phoneUsa:phoneDesable} alt="sd" />

                </div>

                <div className={`text-sm mt-2 ${togglelogin === false ? 'text-customlightBlue' : 'text-white opacity-55'}`}>Log in with phone</div>
              </div>
              <div onClick={
                () => settogglelogin(true)
              } className={`flex  flex-col items-center justify-center w-full py-2 border-b-[1px] text-redLight 
               ${togglelogin === true ? 'border-customdarkBluebtn ' : 'border-customdarkBlue'} `} >

                <div>
                  <img className='w-6 h-6' src={togglelogin === true ? email_tab : email_tab_color} alt="sd" />

                </div>

                <div className={`text-sm mt-2 ${togglelogin === true ? 'text-customlightBlue' : 'text-white opacity-55'}`} >Log in with email</div>
              </div>

            </div>
            <div>

              <form className="space-y-4 md:space-y-6 mt-3 " onSubmit={handleLogin}>
              {togglelogin?  <div className="">
                    <div className=' flex items-center gap-2 py-2 '>
                      <div>
                        <img className='w-6 h-6' src={email_tab} alt="sd" />
                      </div>
                      <label htmlFor="mobile" className=" text-sm text-white font-medium">Email </label>
                    </div>
                    <div className="relative flex items-center gap-2 ju">
                     
                    
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Please enter the email"
                        className="col-span-[60%] bg-customdarkBlue text-[14px] focus:border-[0.5px] border-customlightBlue rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                </div>:
                <div className="">
                   
                    <div className=' flex items-center gap-2 py-2 '>
                      <div>
                        <img className='w-6 h-6' src={phoneUsa} alt="sd" />
                      </div>
                      <label htmlFor="mobile" className=" text-sm text-white font-medium">Phone</label>
                    </div>
                    <div className="relative flex items-center gap-2 ju">
                      <p
                        className="bg-customdarkBlue w-[30%] text-white opacity-55 p-3 flex items-center justify-center rounded-md cursor-pointer"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                      >
                        {selectedCountryCode} <MdKeyboardArrowDown size={20} />
                      </p>
                      {isModalOpen && (
                        <div className="absolute left-0 top-12 h-48 overflow-auto w-full bg-customdarkBlue shadow-lg border rounded-md z-10">
                          {countryCodeData
                            ?.sort((a, b) => (a.phone_code === "+91" ? -1 : b.phone_code === "+91" ? 1 : 0))
                            .map((item, i) => (
                              <p
                                key={i}
                                className={`p-2 cursor-pointer text-blackLight ${selectedCountryCode === item?.phone_code ? "bg-red text-white" : ""
                                  }`}
                                onClick={() => handleSelectCountry(item?.phone_code)}
                              >
                                {item?.phone_code} - {item?.name}
                              </p>
                            ))}
                        </div>
                      )}
                      <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        placeholder="Please enter the phone number"
                        className="col-span-[60%] bg-customdarkBlue text-[14px] focus:border-[0.5px] border-customlightBlue rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                </div>}
                <div className="relative">
                  <div className='flex items-center py-2 gap-2'>
                    <div>
                      <img className='w-6 h-6' src={passwordUsa} alt="sd" />
                    </div>
                    <label htmlFor="password" className="text-sm text-white font-medium"> Password</label>
                  </div>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-customdarkBlue  mt-2 focus:border-[1px] text-[14px] border-customlightBlue rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-white"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 top-12 pr-3 flex items-center text-white opacity-80"
                  >
                    {passwordVisible ? <MdVisibilityOff size={20} /> : <MdVisibility className='dark:text-white opacity-65' size={20} />}
                  </button>
                </div>
                <div className="flex items-center mt-4">
                  <div onClick={() => setCheckAgreement(!checkAgreement)} className={`flex items-center cursor-pointer rounded-full ${checkAgreement ? "text-lightGray bg-white " : "text-chocolate"}`}>
                    {checkAgreement ? (
                      <img className='w-5 h-5' src={tikki} alt="df" />
                    ) : (
                      <div className='border-[1px] border-[#c8c9cc] p-2 rounded-full'></div>
                    )}
                  </div>
                  <label htmlFor="agree" className="text-white opacity-50 ml-2 text-xs sm:text-base md:text-xs">Remember Password</label>
                </div>
                <div className='flex flex-col font-bold items-center justify-center'>
                  <button
                    type="submit"
                    className="w-[90%] font-bold tracking-[0.20333rem] py-2.5 
                  rounded-full border-none bg-gradient-to-b from-customlightbtn to-customdarkBluebtn shadow-lg flex items-center justify-center"
                  >
                    Log in
                  </button>
                  <button className='w-[90%] border border-customlightbtn mt-5 tracking-[2px] rounded-full p-2'> <Link to="/register" className="font-bold text-sm hover:underline text-customlightbtn tracking-[0.20333rem] ">Register</Link>
                  </button>
                </div>
              </form>
            </div>

          </div>
          <div className='grid grid-cols-2 w-full text-white text-xsm mt-10'>
            <Link to="/forgotPassword" className='col-span-1 flex flex-col items-center justify-center'>
              <img className='w-8 h-9' src={passwordUsa} alt="sd" />
              <p>Forgot Password</p>
            </Link>
            <Link to="/customerservices" className='col-span-1 flex flex-col items-center justify-center'>
              <img className='w-11 h-10' src={cutomerService} alt="sd" />
              <p>Customer Service</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
