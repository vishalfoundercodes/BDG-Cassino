/* eslint-disable react/prop-types */
import React from 'react'

function ThreeSameBets({ threeSameNums,timerModal }) {
    return (
        <div className='mt-2'>
            <p className='flex items-center'>3 of the same number: odds(207.36) &nbsp;  <div className='h-4 w-4 text-xs bg-customred rounded-[100%] flex items-center justify-center'>
                ?
            </div> </p>
            <div className='grid grid-cols-6 gap-2 mt-1'>
                {threeSameNums?.map((item, i) => (
                    <button key={i} className={`col-span-1 rounded-lg bg-[#E3B6FF] flex items-center justify-center h-10 w-full`}>
                        {item}
                    </button>
                ))}
            </div>
            <p className='flex items-center mt-5'>Any 3 of the same: odds(34.56) &nbsp;  <div className='h-4 w-4 text-xs bg-customred rounded-[100%] flex items-center justify-center'>
                ?
            </div> </p>
            <button className='w-full bg-[#FDADAD] h-10 rounded-lg mt-1'>Any 3 of the same: odds</button>
        </div>
    )
}

export default ThreeSameBets