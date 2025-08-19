import { AiOutlineExclamationCircle } from "react-icons/ai";
import account_yellow from "../../assets/usaAsset/wallet/person.png";
import bank from "../../assets/usaAsset/wallet/bank.png";
import ifsc_code from "../../assets/usaAsset/wallet/ifsc.png";
import acc_number from "../../assets/usaAsset/wallet/card.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../utils/apis";
import { useEffect, useState } from "react";

const EditBankAccountDetails = () => {
  const navigate = useNavigate();
  const [viewAccountDetails, setViewAccountDetails] = useState(null);
  const [details, setDetails] = useState({
    userid: "",
    name: "",
    account_number: "",
    bank_name: "",
    ifsc_code: "",
  });
  const [isEditing, setIsEditing] = useState({});

  const userId = localStorage.getItem("userId");

  const accountView = async () => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${apis.accountView}?userid=${userId}`);
      console.log("res",res)
      if (res?.data?.status === "200") {
        setViewAccountDetails(res?.data?.data[0]);
        setDetails(res?.data?.data[0]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    accountView();
  }, []);

  const editAccountdetailsHandler = async () => {
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    console.log("details",details)
    try {
      const res = await axios.post(`${apis?.account_update}${userId}`, { ...details, userid: userId });
      console.log("res",res)
      if (res.data?.status == 200) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const renderField = (label, field, icon, type = "text") => (
    <div className="mb-8">
      <label className=" text-xsm font-medium flex items-center">
        <img src={icon} alt="icon" className="w-7 h-7 mr-2" />
        {label}
      </label>
      {!isEditing[field] ? (
        <div
          onClick={() => setIsEditing({ ...isEditing, [field]: true })}
          className="w-full text-xsm text-gray mt-2 px-4 py-3 border-[1px] border-transparent rounded-lg bg-inputBg cursor-pointer"
        >
          {details[field] || `Please enter ${label.toLowerCase()}`}
        </div>
      ) : (
        <input
          autoFocus
          type={type}
          value={details[field]}
          onChange={(e) => setDetails({ ...details, [field]: e.target.value })}
          onBlur={() => setIsEditing({ ...isEditing, [field]: false })}
          className="w-full text-xsm text-gray mt-2 px-4 py-3 border-[1px] border-redLight rounded-lg bg-inputBg outline-none"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pb-10 pt-2 px-3">
      <div className="w-full max-w-md bg-inputBg text-redLight rounded-full px-2 py-1 mt-1">
        <p className="flex items-center text-xsm font-semibold ">
          <span className="mr-2 text-[#B1835A]">
            <AiOutlineExclamationCircle size={20} />
          </span>
          To ensure the safety of your funds, please bind your bank account
        </p>
      </div>

      <div className="w-full max-w-md text-black rounded-lg mt-5">
        {renderField("Bank name", "bank_name", bank)}
        {renderField("Full recipient's name", "name", account_yellow)}
        {renderField("Bank account number", "account_num", acc_number, "number")}
        {renderField("IFSC code", "ifsc_code", ifsc_code)}

        <button
          onClick={editAccountdetailsHandler}
          className="w-full tracking-[2.5px] bg-[#CBCDDB] text-white text-sm font-semibold py-2 rounded-full shadow-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBankAccountDetails;
