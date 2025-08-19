/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import no_data_available from "../../assets/images/no_data_available.png"
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../utils/apis";
import { useEffect, useState } from "react";
import Loader from "../../reusable_component/Loader/Loader";
function InvitationRecord() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [invitationRecordData, setInvitationRecordData] = useState([])
    const userId = localStorage.getItem("userId");
    const InvitationRecord = async () => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${apis.Invitation_records}${userId}`)
            if (res?.data?.status === 200) {
                setLoading(false)
                setInvitationRecordData(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
           toast.error(err?.response?.data?.message || "Something went wrong");
            // console.log("Internal server error")
        }
    }

    useEffect(() => {
        InvitationRecord()
    }, [])
    //    console.log("invitationRecordData",invitationRecordData)
    const array = [{ name: 21375, uid: 6962905, registrationTime: "2025-04-20 02:48:52", amount: 0 }, { name: 21375, uid: 6962905, registrationTime: "2025-04-20 02:48:52", amount: 0 }]
    return (
        <>
        {loading && <Loader setLoading={setLoading} loading={loading} />}
            {invitationRecordData ? <div className=" px-3 text-lightGray font-roboto">
                {invitationRecordData?.map((item, i) => (
                    <div key={i} className="bg-customdarkBlue shadow-md rounded-lg mt-3 flex justify-between p-2">
                        <div className="w-[50%]">
                            <p className="text-sm text-white">Member{item.name}</p>
                            <p className="text-xs mt-5 text-white opacity-80">Registration Time</p>
                            <p className="text-xsm mt-3 text-white opacity-80">Deposit Amount</p>
                        </div>
                        <div className="w-[50%] flex flex-col items-end">
                            <p className="text-sm text-white">UID:{item.u_id}</p>
                            <p className="text-xs mt-5 text-white">{item.created_at}</p>
                            <p className="text-xsm text-customlightbtn mt-3">{item.first_recharge_amount}</p>
                        </div>
                    </div>
                ))}
            </div> :
                <div className="px-3">
                    <img className="mt-10" src={no_data_available} alt="ds" />
                    <p className="text-center mt-10">No Data</p>
                </div>}
        </>
    )
}

export default InvitationRecord