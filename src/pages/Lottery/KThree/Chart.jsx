/* eslint-disable react/prop-types */
import one from "../../../assets/usaAsset/kthree/1.png";
import two from "../../../assets/usaAsset/kthree/2.png";
import three from "../../../assets/usaAsset/kthree/3.png";
import four from "../../../assets/usaAsset/kthree/4.png";
import five from "../../../assets/usaAsset/kthree/5.png";
import six from "../../../assets/usaAsset/kthree/6.png";
function Chart({ isVisible }) {
    if (!isVisible) return null;

    return (
        <div className="w-full px-4 mt-5">
            <div className="flex text-xsm w-full bg-customred rounded-t-lg py-2 font-semibold">
                <p className="  w-[40%] flex justify-center items-center">Period</p>
                <p className="  w-[30%] flex justify-center items-center"> Results</p>
                <p className="  w-[30%] flex justify-center items-center">Number</p>
            </div>
            <div className='flex w-full border-b-[0.5px] border-border1 text-white text-xsm bg-redLight py-2'>
                <div className='w-[40%] flex justify-center text-[12px] items-center'>123456789023456</div>
                <div className='w-[30%] gap-1 flex justify-center text-[12px] items-center'>
                    <img src={one} className="w-6 h-6" alt="sd" />
                    <img src={two} className="w-6 h-6" alt="sd" />
                    <img src={three} className="w-6 h-6" alt="sd" />
                </div>
                <div className='w-[30%] flex justify-center text-[12px] items-center'>
                   3 different numbers
                </div>
            </div>
        </div>
    )
}

export default Chart