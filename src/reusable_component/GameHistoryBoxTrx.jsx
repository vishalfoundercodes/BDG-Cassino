import { NavLink } from "react-router-dom";
import ques from "../assets/usaAsset/trx/ques.png"
/* eslint-disable react/prop-types */
const GameHistoryBoxTrx = ({ isVisible, gameHistoryData }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full px-2 mt-5">
      {/* Header */}
      <div className="flex text-[12px] w-full bg-redLight rounded-t-lg py-2 gap-0.5 font-normal">
        <p className=" text-nowrap w-[29%] flex justify-center items-center">Period</p>
        <p className="  w-[24%] flex text-nowrap justify-center items-center">Block height</p>
        {/* <p className="  w-[24%] flex text-nowrap justify-center items-center">Block time</p> */}
        <p className="  w-[24%] flex text-nowrap justify-center items-center">Hash value</p>
        <p className="  w-[21%] flex text-nowrap justify-center items-center">Result</p>
      </div>
      {/* Data Rows */}
      {gameHistoryData?.length>0&&gameHistoryData?.map((item, i) => {
        return (
          <div key={i} className='flex w-full border-b-[0.2px] border-border1 text-white text-[12px] bg-redLight p-2'>
            <p className='w-[33%] flex justify-start items-center text-[12px]'>
              {item?.games_no?.slice(0, 3)}***
              {item?.games_no?.slice(-4)}
            </p>

            <NavLink to={`/lottery/trxwingo/tronscan2?blockid=${item?.block}`} className='w-[22%] flex flex-col justify-center items-center text-[12px]'>
              <p>
                <img src={ques} alt="d" className="w-4 h-4" />
              </p>
              <p>{item?.block}</p>
            </NavLink>
            {/* <p className='w-[22%] flex flex-col justify-center items-center'>
              <p>{item?.blocktime.slice(-8)}</p>
            </p> */}
            <p className='w-[22%] flex flex-col justify-center items-center text-[12px]'>
              <p>{item?.token}</p>
            </p>
            <div className='flex h-[30px]  text-sm justify-center items-center w-[22%] relative'>
              {item?.number === 0 && (
                <>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-red"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.number}
                  </span>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-voilet"
                    style={{
                      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.number}
                  </span>
                  <p className="text-bg3 absolute -mr-6">S</p>
                </>
              )}
              {item?.number === 5 && (
                <>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-red"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.number}
                  </span>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-voilet"
                    style={{
                      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.number}
                  </span>
                  <p className="text-yellow absolute -mr-6">B</p>
                </>
              )}

              {/* {item?.number !== 0 && item?.number !== 5 && (
                <span
                  className={`absolute inset-0 rounded-full ${item?.number === 1 || item?.number === 3 || item?.number === 7 || item?.number === 9 ? 'text-green' : 'text-red'}`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item?.number}
                </span>
              )} */}
              {item?.number !== 0 && item?.number !== 5 && (
                <div className="flex items-center gap-1 text-[12px]">
                  <p className={`w-5 h-5 rounded-full text-white text-[12px] flex items-center justify-center ${[1, 3, 7, 9].includes(item?.number) ? "bg-green" : "bg-customred"}`} >{item?.number}</p>
                  <p className={`${[0, 1, 2, 3, 4].includes(item?.number) ? "text-bg3 text-[12px]" : "text-yellow"}`}>{[0, 1, 2, 3, 4].includes(item?.number) ? "S" : "B"}</p>

                  {/* <span
                    className={`absolute inset-0 w-5 h-5 text-white rounded-full ${item?.number === 1 || item?.number === 3 || item?.number === 7 || item?.number === 9 ? 'bg-green' : 'bg-red'}`}
                    style={{
                      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                  {item?.number}
                  </span> */}
                </div>
              )}
            </div>
            {/* <p className='w-[22%] text-[12.8px] flex justify-center items-center'>{json[1]}</p>
              <div className='flex justify-center items-center w-[22%] gap-2'>
                <p className={`h-3 w-3 bg-${json[0] == 0 ? "red" : json[0] == 5 ? "green" : json[0] == 1 ? "green" : json[0] == 3 ? "green" : json[0] == 7 ? "green" : json[0] == 9 ? "green" : "red"} rounded-full flex justify-center items-center`}></p>
                <p className={`${json[0] == 0 ? "block" : json[0] == 5 ? "block" : "hidden"} h-3 w-3 bg-${json[2] === "Green" ? "green" : json[2] === "Red" ? "red" : "voilet"} rounded-full flex justify-center items-center`}></p>
              </div> */}
          </div>
        )
      })}
    </div>
  );
};

export default GameHistoryBoxTrx;
