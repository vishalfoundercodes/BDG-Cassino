import { useEffect, useState } from 'react'
import MyBets from './MyBets';
import AllBets from './AllBets';

function AllBetsHome({ betApiHitted }) {
    const [betType, setbetType] = useState(false);
    const [totalBetValue, setTotalBetValue] = useState(() => {
        return parseFloat(localStorage.getItem('totalBetValue')) || 0;
    });

    // Update localStorage whenever totalBetValue changes
    useEffect(() => {
        localStorage.setItem('totalBetValue', totalBetValue.toFixed(2));
    }, [totalBetValue]);

    // const bet="https://admin.xgamblur.com/api/aviator_bet"
    // {
    //     "uid" : "4",
    //     "number" : number.toString(),
    //     "amount" : amount.toString(),
    //     "game_id" : "5",
    //     "game_sr_num" : srNo.toString()
    //   }

    //   cancel ="aviator_bet_cancel"
    //   userid=4&game_sr_num=$data&number=$number


    //   my bet 
    // aviator_history
    // {"uid":"4", "game_id":"5"}

    // aviator_last_five_result

    // static const String aviatorBetCashOut = "${baseUrl}aviator_cashout?salt=
    // {
    //       "uid": "4",
    //       "multiplier": multipier,
    //       "game_sr_num": srNo,
    //       "number": number
    //     }
    return (
        <>
            <div className='border-b-2 border-black  py-0.5'>
                <div className='flex items-center justify-center '>
                    <div className="flex bg-black w-[60%] justify-center  rounded-full">
                        <button
                            className={`px-10 text-nowrap w-full py-0.5 rounded-full ${!betType ? "bg-blackAviator3 text-white" : "bg-black text-white"}`}
                            onClick={() => setbetType(false)}
                        >
                            All Bets
                        </button>
                        <button
                            className={`px-10 text-nowrap w-full py-1 rounded-full ${betType ? "bg-blackAviator3 text-white" : "bg-black text-white"}`}
                            onClick={() => setbetType(true)}
                        >
                            My Bets
                        </button>
                    </div>
                </div>
                {!betType && <div className='text-white text-lg'>
                    <p className=''>All Bets</p>
                    <p className=''>{totalBetValue.toFixed(2)}</p>
                </div>}
            </div>
            <div className='overflow-y-auto hide-scrollbar  h-[calc(100%-5.5rem)]' >
                {!betType ? <AllBets setTotalBetValue={setTotalBetValue} />
                    : <MyBets betApiHitted={betApiHitted} />
                }
            </div>
        </>
    )
}

export default AllBetsHome
