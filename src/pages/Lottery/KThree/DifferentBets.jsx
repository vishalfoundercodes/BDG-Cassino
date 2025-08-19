/* eslint-disable react/prop-types */
import React from 'react'

function DifferentBets({oneToSix,timerModal}) {
    return (
        <div className='mt-2'>
            <p className='flex items-center'>3 different number: odds(34.56) &nbsp;  <div className='h-4 w-4 text-xs bg-customred rounded-[100%] flex items-center justify-center'>
                ?
            </div> </p>
            <div className='grid grid-cols-6 gap-2 mt-1'>
                {oneToSix?.map((item, i) => (
                    <button key={i} className={`col-span-1 ${timerModal ? "" : "relative z-10"}  rounded-lg bg-[#E3B6FF] flex items-center justify-center h-10 w-full`}>
                        {item}
                    </button>
                ))}
            </div>
            <p className='flex items-center mt-5'>3 continuous numbers: odds(8.64) &nbsp;  <div className='h-4 w-4 text-xs bg-customred rounded-[100%] flex items-center justify-center'>
                ?
            </div> </p>
            <button className={`w-full bg-[#FDADAD] h-10 rounded-lg ${timerModal ? "" : "relative z-10"}  mt-1`}>3 continuous numbers</button>
            <p className='flex items-center mt-5'>2 different number: odds(6.91) &nbsp;  <div className='h-4 w-4 text-xs bg-customred rounded-[100%] flex items-center justify-center'>
                ?
            </div> </p>
            <div className='grid grid-cols-6 gap-2 mt-1'>
                {oneToSix?.map((item, i) => (
                    <button key={i} className={`col-span-1 ${timerModal ? "" : "relative z-10"}  rounded-lg bg-[#E3B6FF] flex items-center justify-center h-10 w-full`}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DifferentBets