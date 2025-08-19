import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import account_yellow from "../../assets/usaAsset/wallet/person.png";
import bank from "../../assets/usaAsset/wallet/bank.png";
import ifsc_code from "../../assets/usaAsset/wallet/ifsc.png";
import acc_number from "../../assets/usaAsset/wallet/acc_number.png";
import exclamation from "../../assets/usaAsset/account/exclamation.png";
import { useEffect, useState } from "react";
import Loader from "../../reusable_component/Loader/Loader";

const validationSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    account_number: yup
        .string()
        .matches(/^\d{9,18}$/, "Account number must be 9-18 digits")
        .required("Account number is required"),
    bank_name: yup.string().required("Bank name is required"),
    ifsc_code: yup
        .string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
        .required("IFSC code is required"),
    branch_name: yup.string().required("Branch name is required"),
    upi_id: yup
        .string()
        .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format")
        .required("UPI ID is required"),
});


const AddBankAccountDetails = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const addAccountdetailsHandler = async (data) => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }

        const payload = { user_id: userId, ...data };
        console.log('daraaaa',payload)

        try {
            const res = await axios.post(apis?.addAccount, payload);
            if (res.data?.status === "200"||res.data?.status === 200) {
                setLoading(false)
                toast.success(res?.data?.message);
                navigate("/wallet/withdrawal")
            } else {
                setLoading(false)
                toast.error(res?.data?.message);
            }
        } catch (err) {
            setLoading(false)
            toast.error(err);
        }
    };
    const getBranchnameByIfscHandler = async (ifscCode) => {
        
        try {
            const res = await axios.get(`${apis.getBranchnameByIfsc}${ifscCode}`);
            if (res?.data?.status === "success") {
                const { bank, branch } = res.data.data;
                setValue("bank_name", bank, { shouldValidate: true });
                setValue("branch", branch, { shouldValidate: true });
            } else {
                toast.error("Invalid IFSC Code");
            }
        } catch (err) {
            toast.error("Error fetching branch details");
        }
    };

    useEffect(() => {
        const ifscCode = watch("ifsc_code");
        if (ifscCode?.length === 11) {
            getBranchnameByIfscHandler(ifscCode);
        } else {
            setValue("bank_name", "", { shouldValidate: true });
            setValue("branch_name", "", { shouldValidate: true });
        }
    }, [watch("ifsc_code")]);
    return (
        <div className="min-h-screen  flex flex-col items-center justify-start pb-10 pt-2 px-3">
           {loading && <Loader setLoading={setLoading} loading={loading} />}
            {/* Alert */}
            <div className="w-full max-w-md bg-redLight text-white rounded-full px-2 py-1 mt-1">
                <p className="flex items-center text-xsm font-semibold ">
                    <span className="mr-2 text-[#B1835A]">
                        <img src={exclamation} alt="alert" className="w-7 h-5" />
                    </span>
                    To ensure the safety of your funds, please bind your bank account
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(addAccountdetailsHandler)}
                className="w-full max-w-md text-black rounded-lg mt-5"
            >
                {/* Full recipient's name */}
                <div className="mb-6">
                    <label className="text-xsm font-medium flex items-center text-white">
                        <img src={account_yellow} alt="icon" className="w-7 h-7 mr-2" />
                        Full recipient&apos;s name
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Enter recipient's name"
                        className="w-full text-xsm text-white placeholder:font-bold outline-none mt-2 px-4 py-3 border border-redLight rounded-lg bg-redLight"
                    />
                    {errors.name && <p className="text-bg2 text-xs">{errors.name.message}</p>}
                </div>
    {/* Bank upi id */}
                <div className="mb-6">
                    <label className="text-xsm font-medium flex items-center text-white">
                        <img src={acc_number} alt="icon" className="w-7 h-7 mr-2" />
                        Bank UPI Id
                    </label>
                    <input
                        {...register("upi_id")}
                        type="text"
                        placeholder="Enter bank UPI Id"
                        className="w-full text-xsm text-white placeholder:font-bold outline-none mt-2 px-4 py-3 border border-redLight rounded-lg bg-redLight"
                    />
                    {errors.upi_id && <p className="text-bg2 text-xs">{errors.upi_id.message}</p>}
                </div>

                {/* Bank account number */}
                <div className="mb-6">
                    <label className="text-xsm font-medium flex items-center text-white">
                        <img src={acc_number} alt="icon" className="w-7 h-7 mr-2" />
                        Bank account number
                    </label>
                    <input
                        {...register("account_number")}
                        type="number"
                        placeholder="Enter bank account number"
                        className="w-full text-xsm text-white placeholder:font-bold outline-none mt-2 px-4 py-3 border border-redLight rounded-lg bg-redLight"
                    />
                    {errors.account_number && <p className="text-bg2 text-xs">{errors.account_number.message}</p>}
                </div>

                {/* IFSC code (Auto-Capitalized) */}
                <div className="mb-6">
                    <label className="text-xsm font-medium flex items-center text-white">
                        <img src={ifsc_code} alt="icon" className="w-7 h-7 mr-2" />
                        IFSC code
                    </label>
                    <input
                        {...register("ifsc_code")}
                        type="text"
                        maxLength={11}
                        placeholder="Enter IFSC code"
                        className="w-full text-xsm text-white placeholder:font-bold outline-none mt-2 px-4 py-3 border border-redLight rounded-lg bg-redLight"
                        onChange={(e) => {
                            const upperValue = e.target.value.toUpperCase();
                            setValue("ifsc_code", upperValue, { shouldValidate: true });
                        }}
                    />
                    {errors.ifsc_code && <p className="text-bg2 text-xs">{errors.ifsc_code.message}</p>}
                </div>

                {/* Bank name */}
                <div className="mb-6">
                    <label className="text-xsm font-medium flex items-center text-white">
                        <img src={bank} alt="icon" className="w-7 h-7 mr-2" />
                        Bank name
                    </label>
                    <input
                        {...register("bank_name")}
                        type="text"
                        placeholder="Bank name"
                        className="w-full text-xsm text-white placeholder:font-bold outline-none mt-2 px-4 py-3 border border-redLight rounded-lg bg-redLight"
                        readOnly
                    />
                    {errors.bank_name && <p className="text-bg2 text-xs">{errors.bank_name.message}</p>}
                </div>

                {/* Branch name */}
                <div className="mb-6">
                    <label className="text-xsm font-medium flex items-center text-white">
                        <img src={bank} alt="icon" className="w-7 h-7 mr-2" />
                        Branch name
                    </label>
                    <input
                        {...register("branch")}
                        type="text"
                        placeholder="Branch name"
                        className="w-full text-xsm text-white placeholder:font-bold outline-none mt-2 px-4 py-3 border border-redLight rounded-lg bg-redLight"
                        readOnly
                    />
                    {errors.branch_name && <p className="text-bg2 text-xs">{errors.branch_name.message}</p>}
                </div>
                <button
                    type="submit"
                    className={`w-full tracking-[2.5px] text-white text-sm font-semibold py-2 rounded-full shadow-md transition-colors duration-300
    ${isValid ? "bg-gradient-to-l from-customlightbtn to-customdarkBluebtn" : "bg-[#CBCDDB]"}`}
                    disabled={!isValid}
                >
                    Save
                </button>

            </form>
        </div>
    );
};

export default AddBankAccountDetails;
