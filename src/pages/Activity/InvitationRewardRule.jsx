/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
// import rulehead from "../../assets/icons/rulehead.png"
import axios from "axios";
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../reusable_component/Loader/Loader";
function InvitationRewardRule() {
    const [invitationListData, setInvitationListData] = useState([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const InvitationListHandler = async () => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${apis.invitation_bonus_list}${userId}`)
            if (res?.data?.status === 200) {
                setLoading(false)
                setInvitationListData(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            console.log("Internal server error")
        }
    }

    useEffect(() => {
        InvitationListHandler()
    }, [])
   
    return (
      <div>
        {loading && <Loader setLoading={setLoading} loading={loading} />}
        <div className="px-3 mt-3 text-[16px] font-roboto text-white opacity-65">
          <p>Invite friends and recharge to get additional platform rewards!</p>
          <p>
            After being claimed, the rewards will be directly distributed to the
            wallet balance within 10 minutes.
          </p>
        </div>
        <div className="mt-5 px-3">
          <table className="w-full text-sm overflow-hidden rounded-lg">
            <thead className="bg-[#3A3947] p-4">
              <tr>
                <th className="py-4 text-center">Invite Account</th>
                <th className="text-center">Deposit Amount</th>
                <th className="text-center">Bonus</th>
              </tr>
            </thead>
            <tbody className="">
              {invitationListData?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0 ? "bg-[#333332]" : "bg-[#282730]"
                  } text-white opacity-65 text-sm  ${
                    index === 0 ? "first:rounded-t-lg" : ""
                  } ${
                    index === invitationListData?.length - 1
                      ? "last:rounded-b-lg"
                      : ""
                  }`}
                >
                  <td className="text-center py-2">{item?.no_of_user}</td>
                  <td className="text-center">{item.amount}</td>
                  <td className="text-center">{item.claim_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-3 pb-5 rounded-lg bg-[#333332]  text-white mx-3">
          <div
            className="mt-5 bg-no-repeat"
            // style={{
            //     backgroundImage: `url(${rulehead})`,
            //     backgroundPosition: "center",
            //     backgroundSize: "contain",

            // }}
          >
            <div className=" text-center font-bold text-ls rounded-t-2xl py-2">
              Rules
            </div>
          </div>
          {/* <ul className="space-y-4 text-xs font-bold border-[#374992] border-b-2 border-l-2 border-r-2 -mt-2 px-2 py-5"> */}
          <ul className="space-y-4 text-xsm -mt-2 px-2 py-5 text-[#9DA5A1]">
            <li className="flex items-start">
              <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
              Only when the number of invited accounts is reached and each
              account can meet the recharge amount can you receive the bonus.
            </li>
            <li className="flex items-start">
              <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
              The invitation account meets the requirements, but the recharge
              amount of the account does not meet the requirements, and the
              bonus cannot be claimed.
            </li>
            <li className="flex items-start">
              <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
              Please claim the event bonus within the event period. All bonuses
              will be cleared after the event expires.
            </li>
            <li className="flex items-start">
              <span className="text-[#D9AC4F] font-bold mr-2">◆</span>
              Please complete the task within the event period. After the event
              expires, the invitation record will be cleared.
            </li>
          </ul>
        </div>
      </div>
    );
}

export default InvitationRewardRule