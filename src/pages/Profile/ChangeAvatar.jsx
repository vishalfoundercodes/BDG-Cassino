import axios from "axios"
import apis from "../../utils/apis"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../../reusable_component/Loader/Loader";

function ChangeAvatar() {
  const [allavatar, setAllAvatar] = useState([])
  const [loading, setLoading] = useState(false);
  const [myDetails, setMyDetails] = useState(null)
  const userId = localStorage.getItem("userId");
  const profileDetails = async () => {
    try {
      const res = await axios.get(`${apis.profile}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data?.data)
      }
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    if (userId) {
      profileDetails();
    }
  }, [userId]);
  const navigate = useNavigate()
  const AllAvatarHandler = async () => {
    setLoading(true)
    try {
      console.log(`all avatar api: ${apis.allAvatar}`);
      console.log(`userId: ${userId}`);
      const res = await axios.get(`${apis.allAvatar}`)
      if (res?.data?.success === "200") {
        setLoading(false)
        profileDetails()
        setAllAvatar(res?.data?.data)
        
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const changeavatarHandler = async (image) => {
    setLoading(true)
    const payload = {
      id: userId,
      userimage:image
    }
    try {
      console.log(`change avatar api: ${apis.update_profile}`);
      console.log(`change avatar payload: ${payload}`);
      const res = await axios.post(apis.update_profile, payload)
      if (res?.data?.status === 200) {
        setLoading(false)
        toast.success("Avatar changes successfully")
        navigate("/setting")
      }
      // console.log("res", res)
    } catch (err) {
      setLoading(false)
      console.log("er", err)
    }
  }

  useEffect(() => {
    if (userId) AllAvatarHandler()
  }, [userId])
  return (
    <div className='grid grid-cols-3 p-2 gap-2'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      {allavatar?.map((item, i) => (
        <button onClick={() => changeavatarHandler(item?.image)} key={i}>
          <img src={item?.image} className={`col-span-1 w-full ${myDetails?.image == item?.image ? "bg-red" : ""} h-28 p-1 rounded-lg`} alt="sd" />
         {myDetails?.image == item?.image ? <p className="flex items-center justify-end"><FaCheckCircle className='-mt-10 text-red rounded-full bg-white' size={20} /></p>:""}
        </button>
      ))}
    </div>
  )
}

export default ChangeAvatar