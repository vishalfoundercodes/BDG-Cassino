import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
// import person from "../../assets/usaAsset/wallet/person.png"
import person from "../../assets/usaAsset/wallet/AddressAlias.png"
import exclamation from "../../assets/usaAsset/account/exclamation.png"
import usdtAdress from "../../assets/usaAsset/wallet/usdtaddress.png"
import trcusdt from "../../assets/usaAsset/wallet/trcusdt.png"
import { useState } from "react";
import Loader from "../../reusable_component/Loader/Loader";
const AddUSDTWalletADdress = () => {
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: "",
            usdt_wallet_address: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            usdt_wallet_address: Yup.string()
                .required("USDT address is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const payload = {
                user_id: userId,
                name: values.name,
                usdt_wallet_address: values.usdt_wallet_address,
            };

            try {
              console.log("add usdt acount payload:",payload)
              console.log(`usdt wallet address: ${apis.add_usdt_account}`);
                const res = await axios.post(apis.add_usdt_account, payload);
                if (res?.data?.status === 200) {
                    setLoading(false)
                    navigate("/wallet/withdrawal")
                    toast.success(res?.data?.message);
                } else {
                    setLoading(false)
                    toast.success(res?.data?.message);
                    navigate("/wallet/withdrawal")
                }
            } catch (err) {
                setLoading(false)
                console.error(err);
                toast.error("Something went wrong");
            }
        },
    });

    return (
      <div className="min-h-screen  flex flex-col items-center justify-start pb-10 pt-3 px-3">
        {loading && <Loader setLoading={setLoading} loading={loading} />}
        {/* Alert */}
        <div className="w-full max-w-md bg-redLight text-white rounded-full px-2 py-1 mt-1 ">
          <p className="flex items-center text-xsm ">
            <span className="mr-2">
              <img src={exclamation} alt="sd" className="w-6 h-5" />
            </span>
            To ensure the safety of your funds, please link your wallet
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md text-white"
        >
          <div className="mb-8 mt-8">
            <label className="text-gray-600 text-sm flex items-center">
              <img src={trcusdt} alt="sfd" className="w-8 h-8 mr-2 " />
              Select main network
            </label>
            <select
              className="w-full placeholder:text-xsm text-white placeholder:font-bold outline-none mt-3 px-4 py-3 focus:border-[1px] border-redLight rounded-lg bg-redLight"
              name="network"
            >
              <option value="TRC">TRC</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="text-gray-600 text-sm flex items-center">
              <img src={usdtAdress} alt="sfd" className="w-8 h-8 mr-2" />
              USDT address
            </label>
            <input
              type="text"
              name="usdt_wallet_address"
              placeholder="Please enter the USDT address"
              className="w-full placeholder:text-xsm text-white outline-none mt-3 px-4 py-3 focus:border-[1px] border-redLight rounded-lg bg-redLight"
              value={formik.values.usdt_wallet_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.usdt_wallet_address &&
            formik.errors.usdt_wallet_address ? (
              <p className="text-red text-xs mt-1">
                {formik.errors.usdt_wallet_address}
              </p>
            ) : null}
          </div>

          <div className="mb-8">
            <label className="text-gray-600 text-sm flex items-center">
              <img src={person} className=" w-7 h-7 mr-2" alt="fg" />
              Address Alias
            </label>
            <input
              type="text"
              name="name"
              placeholder="Please enter a remark  of the withdrawal address"
              className="w-full placeholder:text-xsm text-white outline-none mt-3 px-4 py-3 focus:border-[1px] border-redLight rounded-lg bg-redLight"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red text-xs mt-1">{formik.errors.name}</p>
            ) : null}
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className={`w-full tracking-[2.5px] text-sm font-semibold py-2 rounded-full shadow-md transition-all duration-300
                        ${
                          formik.isValid && formik.dirty
                            ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-white"
                            : "bg-[#CBCDDB] text-white cursor-not-allowed"
                        }`}
          >
            Save
          </button>
        </form>
      </div>
    );
};

export default AddUSDTWalletADdress;
