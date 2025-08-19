/* eslint-disable no-unused-vars */
import { PiCopySimpleFill } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import apis from '../../utils/apis'
import { toast } from 'react-toastify'
import Loader from '../../reusable_component/Loader/Loader'
import boxBg from "../../assets/usaAsset/boxBg.png"
import blindMail from "../../assets/usaAsset/blindMail.png";
import updateVersion from "../../assets/usaAsset/updateVersion.png";
import lockPassword from "../../assets/usaAsset/lockPassword.png";
import password from "../../assets/usaAsset/password.png"
import email_tab from "../../assets/usaAsset/email_tab.png"
import phone from "../../assets/usaAsset/phone.png"
import dialogNickname from "../../assets/usaAsset/dialogNickname.png"
import close from "../../assets/usaAsset/close.png"
import copy from "../../assets/usaAsset/copy.png"

function Setting() {
  const [loading, setLoading] = useState(false);
  const [nickNameModal, setNicknameModal] = useState(false)
  const [myDetails, setMyDetails] = useState(null)
  const [isUidCopied, setIsUidCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const profileDetails = async (userId) => {
    try {
      console.log(`profile details api: ${apis.profile}${userId}`);
      console.log(`profile details userId: ${userId}`);
      const res = await axios.get(`${apis.profile}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data?.data)
        console.log("myDetails", res?.data?.data);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const changeNameHandler = async () => {
    setLoading(true)
    const payload={
      id:userId,
      username: editedName,
    }
    try {
      console.log(`update profile api: ${apis.update_profile}`);
      console.log(`update profile payload: ${payload}`);
      const res = await axios.post(`${apis.update_profile}`, payload);
      if (res?.data?.status === 200) {
        setLoading(false)
        toast.success("Nickname updated successfully!");
        setIsEditing(false);
        setNicknameModal(false)
        profileDetails(userId)
      }
    } catch (err) {
      setLoading(false)
      toast.error("Failed to update nickname.");
    }
  };

  useEffect(() => {
    if (userId) {
      profileDetails(userId);
    }
  }, [userId]);
  const handleCopyUID = () => {
    if (myDetails?.u_id) {
      navigator.clipboard
        .writeText(myDetails?.u_id)
        .then(() => {
          setIsUidCopied(true)
        })
        .catch(() => {
          toast.error('Failed to copy UID.');
        });
    } else {
      toast.error('UID is not available.');
    }
  };
  useEffect(() => {
    if (isUidCopied) {
      const timer = setTimeout(() => {
        setIsUidCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isUidCopied, setIsUidCopied]);
  const cancelModal = () => {
    setNicknameModal(false)
    setIsEditing(false)
  }
  // console.log("isEditing",myDetails)
  return (
    <div className="">
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div
        className="bg-gradient-to-r from-[#EDD188] to-[#C79744] rounded-b-3xl h-40
       w-full"
      ></div>
      <div className="bg-redLight rounded-lg -mt-36 text-white mx-3 p-3">
        <div className="flex items-center justify-between">
          <img
            src={myDetails?.userimage}
            className="h-20 w-20 rounded-full"
            alt="ds"
          />
          <Link to="/changeavatar">
            {" "}
            <p className="text-[#A8A5A1] flex items-center">
              Change Avatar{" "}
              <MdKeyboardArrowRight className="text-[#A8A5A1]" size={28} />
            </p>
          </Link>
        </div>
        <button
          onClick={() => setNicknameModal(true)}
          className="w-full flex mt-5 border-border1 border-b-[1px] pb-5 items-center justify-between text-xsm"
        >
          <p className="text-[#A8A5A1]">Nickname</p>
          <p className="flex items-center">
            {myDetails?.username}{" "}
            <MdKeyboardArrowRight className="text-lightGray" size={28} />
          </p>
        </button>
        <div className="flex mt-5 pb-5 items-center justify-between text-xsm">
          <p className="text-[#A8A5A1]">UID</p>
          <p className="flex items-center gap-2">
            {myDetails?.u_id}
            <div className="h-5 w-5" onClick={handleCopyUID}>
              <img src={copy} alt="" />
            </div>
          </p>
        </div>
      </div>
      <div className=" mt-5 py-10">
        <div className="border-l-4 pl-3 mx-5  font-bold text-white border-redLight">
          Security Information
        </div>
        <div className="mx-5 ">
          <button className="w-full mt-5 ">
            <Link
              to="/changepassword"
              className="py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-white bg-redLight"
            >
              <div className="flex items-center gap-3 ml-2">
                <div
                  className="h-10 w-10 flex items-center justify-center"
                  // style={{
                  //   backgroundImage: `url(${boxBg})`,
                  //   backgroundPosition: "center",
                  //   backgroundSize: "contain",
                  //   backgroundRepeat: "no-repeat",
                  // }}
                >
                  <img className="h-10 w-10" src={lockPassword} alt="" />
                </div>
                <p>Login Password</p>
              </div>
              <p className="flex text-[#A8A5A1] items-center gap-2">
                Edit
                <MdKeyboardArrowRight size={28} className="text-2xl" />
              </p>
            </Link>
          </button>
          <button className="w-full mt-10">
            <Link
              to="#"
              className="pl-2 py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-white bg-redLight"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 flex items-center justify-center"
                  // style={{
                  //   backgroundImage: `url(${boxBg})`,
                  //   backgroundPosition: "center",
                  //   backgroundSize: "contain",
                  //   backgroundRepeat: "no-repeat",
                  // }}
                >
                  <img className="h-10 w-10" src={blindMail} alt="" />
                </div>
                <p>Blind mailbox</p>
              </div>
              <p className="flex text-[#A8A5A1] items-center gap-2">
                to bind
                <MdKeyboardArrowRight size={28} className="" />
              </p>
            </Link>
          </button>
          {/* <button className='w-full mt-10'>
            <Link to="#" className='pl-2 py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-black bg-white'>
              <div className='flex items-center gap-3'>
                <TfiEmail size={20} className='text-redLight' />
                <p>Google Verification</p>
              </div>
              <p className='flex text-lightGray items-center gap-2'>
                unopened
                <MdKeyboardArrowRight
                  size={28} className='' />
              </p>
            </Link>
          </button> */}
          <button className="w-full mt-10">
            <Link
              to="#"
              className="pl-2 py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-white bg-redLight"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 flex items-center justify-center"
                  // style={{
                  //   backgroundImage: `url(${boxBg})`,
                  //   backgroundPosition: "center",
                  //   backgroundSize: "contain",
                  //   backgroundRepeat: "no-repeat",
                  // }}
                >
                  <img className="h-10 w-10" src={updateVersion} alt="" />
                </div>
                <p>Updated version</p>
              </div>
              <p className="flex text-[#A8A5A1] items-center gap-2">
                1.0.0
                <MdKeyboardArrowRight size={28} className="" />
              </p>
            </Link>
          </button>
        </div>
      </div>
      {nickNameModal && (
        <div className="fixed bg-black bg-opacity-50 z-50 transition-opacity  inset-0 flex flex-col items-center justify-center ">
          <div className="h-96 w-[370px] bg-redLight p-2 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center py-3 font-bold px-5">
              <div className="bg-gradient-to-r from-white to-transparent rounded-sm transform scale-x-[-1] w-14 h-0.5"></div>

              <p className="px-7">Change Nickname</p>
              <div className="bg-gradient-to-r to-white from-transparent rounded-sm transform scale-x-[-1] w-14 h-0.5"></div>
            </div>
            <div className="bg-customdarkBlue rounded-lg h-full pt-4 flex flex-col items-center justify-between w-full p-3">
              <div className="w-full">
                <div className="w-full flex gap-2 justify-start items-center">
                  <div
                    className="h-8 w-8 flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${dialogNickname})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <p className="text-white">Nickname</p>
                </div>
                <div className="text-white bg-red rounded-full pl-6 mt-5 p-3 w-full">
                  {!isEditing ? (
                    <div
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <p>{myDetails?.username}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="bg-red outline-none rounded px-2"
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={changeNameHandler}
                type="submit"
                className="mt-5 w-full font-bold py-2 rounded-full border-none bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206] shadow-lg flex items-center justify-center"
              >
                Confirm
              </button>
            </div>
          </div>
          <div
            className="h-8 w-8 flex items-center justify-center mt-3"
            style={{
              backgroundImage: `url(${close})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            onClick={cancelModal}
          ></div>
          {/* <div className=' text-black mt-2 border-[1px] h-7 w-7 border-lightGray rounded-full ' >
            <button className='p-0.5' onClick={cancelModal}><RxCross2 className='text-gray font-bold' size={20} />    </button>
          </div> */}
        </div>
      )}
      {isUidCopied && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="h-28 w-36 bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <p className="text-center">
              UID copied to <br />
              clipboard!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting