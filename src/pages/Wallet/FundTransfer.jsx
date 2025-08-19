import avatar from '../../assets/usaAsset/wallet/avatar.svg'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import apis from '../../utils/apis'
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../../reusable_component/Loader/Loader';
const profileApi = apis.profile

function FundTransfer() {
  const [loading, setLoading] = useState(false);
    const [myDetails, setMyDetails] = useState(null)
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
  
    const profileDetails = async (userId) => {
      setLoading(true)
      if (!userId) {
        toast.error("User not logged in");
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get(`${profileApi}${userId}`);
        setLoading(false)
        if (res?.data?.success === 200) {
          setLoading(false)
          setMyDetails(res?.data)
        }
      } catch (err) {
        setLoading(false)
        toast.error(err);
      }
    };
  
    useEffect(() => {
      if (userId) {
        profileDetails(userId);
      }
    }, [userId]);
    return (
        <div>
          {loading && <Loader setLoading={setLoading} loading={loading} />}
            <div className='bg-gradient-to-r from-[#A8ECF3] to-[#C8F1F4] px-3 flex flex-col items-center'>
                <img className='w-16 h-16 mt-5' src={avatar} alt="df" />
                <p className='mt-3 text-lg font-bold pb-28'>{myDetails?.data?.name}</p>
            </div>
        </div>
    )
}

export default FundTransfer