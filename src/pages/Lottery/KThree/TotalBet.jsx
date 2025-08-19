/* eslint-disable react/prop-types */
import green_plain_k3 from "../../../assets/usaAsset/kthree/green_plain_k3.png";
import red_plain_k3 from "../../../assets/usaAsset/kthree/red_plain_k3.png";
function TotalBet({ betNumbers, handleBtnClick, timerModal }) {
    return (
        <>
            <div className='grid grid-cols-4 rounded-lg p-2'>
                {betNumbers?.map((item, i) => {
                    const remainder = item?.num % 2 === 1
                    const bg = remainder ? red_plain_k3 : green_plain_k3
                    return (
                        <div key={i} className='col-span-1 h-[70px] flex flex-col items-center justify-center'>
                            <button onClick={() => handleBtnClick({ betType: 10, color: remainder ? "customred" : "green", betButtonId: i + 3 })} className={`${timerModal ? "" : "relative z-10"} bg-contain flex items-center justify-center font-bold text-${remainder ? "customred" : "green"} text-2xl bg-no-repeat bg-center w-12  h-12 `}
                                style={{ backgroundImage: `url(${bg})` }}
                            >{item?.num}</button>
                            <p className='text-xs'>{item?.multi}x</p>
                        </div>
                    )
                })}
            </div>
            <div className='flex justify-between gap-1'>
                <button onClick={() => handleBtnClick({ betType: 10, color: "yellow", betButtonId: 40 })} className={`${timerModal ? "" : "relative z-10"}  w-24  h-14 rounded-lg bg-yellow text-xsm  `}>Big <br />1.92x </button>
                <button onClick={() => handleBtnClick({ betType: 10, color: "bg3", betButtonId: 50 })} className={`${timerModal ? "" : "relative z-10"}  w-24  h-14 rounded-lg bg-bg3 text-xsm  `}>Small <br />1.92x</button>
                <button onClick={() => handleBtnClick({ betType: 10, color: "customred", betButtonId: 60 })} className={`${timerModal ? "" : "relative z-10"}  w-24  h-14 rounded-lg bg-customred text-xsm  `}>Odd <br />1.92x</button>
                <button onClick={() => handleBtnClick({ betType: 10, color: "green", betButtonId: 70 })} className={`${timerModal ? "" : "relative z-10"} w-24 h-14 rounded-lg  bg-green text-xsm `}>Even <br />1.92x</button>
            </div>
        </>
    )
}

export default TotalBet