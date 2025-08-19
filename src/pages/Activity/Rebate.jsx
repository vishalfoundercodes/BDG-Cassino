import { useEffect, useState } from "react"
// import rebateVector from "../../assets/icons/rebateVector.png"
// import rebatewallet from "../../assets/icons/rebatewallet.png"
import coin_purse from "../../assets/usaAsset/activity/coin_purse.png"
import realTime from "../../assets/usaAsset/activity/realTime.png";
import rebateRed from "../../assets/usaAsset/activity/rebateRed.png"
import apis from "../../utils/apis"
import axios from "axios"
import { toast } from "react-toastify"
import no_data_available from "../../assets/images/no_data_available.png"
import Loader from "../../reusable_component/Loader/Loader"
function Rebate() {
  const [dataValue, setDataValue] = useState(null)
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId")
  const handler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${apis.betting_rebate_history}${userId}&subtypeid=25`)
      if (res?.data?.status === 200) {
        setLoading(false)
        setDataValue(res?.data)
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    handler()
  }, [])
  console.log("res", dataValue)
  return (
    <div className="px-3 mt-3">
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="bg-customdarkBlue text-lightGray p-2 rounded-lg text-xs">
        <h1 className="text-lg text-white">All total betting rebate </h1>
        <div className="flex items-center gap-1 border-[1px] border-[#D9AC4F] text-[#D9AC4F] px-2 w-32 py-1 rounded mt-1">
          {/* <svg
            className="w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06 text-customlightbtn"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="VerifiedUserIcon"
          >
            <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9z" className="fill-current"></path>
          
           
          </svg> */}
          <img className="w-4 h-4" src={realTime} alt="" />
          <p>Real-Time count</p>
        </div>
        <div className="flex items-center gap-2 w-40 mt-3">
          <img className="w-7 h-7" src={coin_purse} alt="" />
          <p className="text-lg text-white font-bold">
            {dataValue?.data1[0]?.rebate_amount.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#4D4D4C] w-72 px-2  text-xs text-[#A8A5A1] rounded py-1.5 mt-3 text-start">
          Upgrade VIP level to increase rebate rate
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="col-span-1 bg-[#4D4D4C] text-[#A8A5A1] rounded flex flex-col items-start px-2 py-1 justify-center">
            <p>Today rebate</p>
            <p className="text-bg2 text-xsm font-bold mt-1">
              {dataValue?.data1[0]?.rebate_rate}
            </p>
          </div>
          <div className="col-span-1 bg-[#4D4D4C] text-[#A8A5A1] rounded flex flex-col items-start px-2 py-1 justify-center">
            <p>Total rebate</p>
            <p className="text-bg2 text-xsm font-bold mt-1">
              {dataValue?.data1[0]?.betting_rebate.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[#A8A5A1]">
          Automatic code washing at 01:00:00 every morning{" "}
        </p>
        <button className="bg-[#6A6E7D] text-white rounded-full w-full text-sm py-2 mt-3">
          One-Click rebate
        </button>
      </div>
      <div className="mt-5 pb-20">
        <div className="border-l-4 border-customlightbtn pl-5 text-white text-lg font-bold">
          Rebate History
        </div>
        {dataValue ? (
          dataValue?.data1?.map((item, i) => (
            <div
              key={i}
              className="bg-bg-[#374992] rounded-lg text-white py-2 px-2 mt-5"
            >
              <p className="py-4 flex items-center justify-between border-b border1 ">
                <div>
                  <p>Lottery</p>
                  <p className="text-xs">{item?.datetime}</p>
                </div>
                <div>Completed</div>
              </p>
              <div className="flex text-xsm mt-3 items-center justify-between">
                <div className="flex items- gap-1">
                  <div>
                    <img className="h-20 w-full" src={rebateRed} alt="sd" />
                  </div>
                  <div className="">
                    <p className="">Bet amount</p>
                    <p className="mt-2.5">Deposit amount</p>
                    <p className="mt-2.5">Commission</p>
                  </div>
                </div>
                <div>
                  <p className="">{item?.betting_rebate}</p>
                  <p className="mt-2.5">{item?.rebate_rate}</p>
                  <p className="mt-2.5">{item?.rebate_amount}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <img src={no_data_available} alt="ds" />
            <p className="text-white w-full text-center">No data</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rebate