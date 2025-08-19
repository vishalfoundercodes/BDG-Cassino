/* eslint-disable react/prop-types */
const GameHistoryBox = ({ isVisible, gameHistoryData }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full px-4 mt-5">
      {/* Header */}
      <div className="flex text-xsm w-full bg-[#3A3947] rounded-t-lg py-2 font-semibold">
        <p className="  w-[34%] flex justify-center items-center">Period</p>
        <p className="  w-[22%] flex justify-center items-center">Number</p>
        <p className="  w-[22%] flex justify-center items-center">Big Small</p>
        <p className="  w-[22%] flex justify-center items-center">Color</p>
      </div>
      {/* Data Rows */}
      {gameHistoryData?.map((item, i) => {
        const json = JSON.parse(item?.json);
        return (
          <div
            key={i}
            className="flex w-full border-b-[0.5px] border-border1 text-white text-xsm bg-redLight py-2"
          >
            <p className="w-[34%] flex justify-center text-[12px] items-center">
              {item?.games_no}
            </p>
            <div className="flex h-[30px]  text-[26.6px] justify-center items-center w-[22%] font-bold relative">
              {item?.number === 0 && (
                <>
                  <span
                    className="absolute inset-0 rounded-full text-customred"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item?.number}
                  </span>
                  <span
                    className="absolute inset-0 rounded-full text-voilet"
                    style={{
                      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item?.number}
                  </span>
                </>
              )}
              {item?.number === 5 && (
                <>
                  <span
                    className="absolute inset-0 rounded-full text-green"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item?.number}
                  </span>
                  <span
                    className="absolute inset-0 rounded-full text-voilet"
                    style={{
                      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item?.number}
                  </span>
                </>
              )}
              {item?.number !== 0 && item?.number !== 5 && (
                <span
                  className={`absolute inset-0 rounded-full ${
                    item?.number === 1 ||
                    item?.number === 3 ||
                    item?.number === 7 ||
                    item?.number === 9
                      ? "text-green"
                      : "text-customred"
                  }`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item?.number}
                </span>
              )}
              {item?.number !== 0 && item?.number !== 5 && (
                <span
                  className={`absolute inset-0 rounded-full ${
                    item?.number === 1 ||
                    item?.number === 3 ||
                    item?.number === 7 ||
                    item?.number === 9
                      ? "text-green"
                      : "text-customred"
                  }`}
                  style={{
                    clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item?.number}
                </span>
              )}
            </div>
            <p className="w-[22%] text-[12.8px] flex justify-center items-center">
              {json[1]}
            </p>
            <div className="flex justify-center items-center w-[22%] gap-2">
              <p
                className={`h-3 w-3 bg-${
                  json[0] == 0
                    ? "customred"
                    : json[0] == 5
                    ? "green"
                    : json[0] == 1
                    ? "green"
                    : json[0] == 3
                    ? "green"
                    : json[0] == 7
                    ? "green"
                    : json[0] == 9
                    ? "green"
                    : "customred"
                } rounded-full flex justify-center items-center`}
              ></p>
              <p
                className={`${
                  json[0] == 0 ? "block" : json[0] == 5 ? "block" : "hidden"
                } h-3 w-3 bg-${
                  json[2] === "Green"
                    ? "green"
                    : json[2] === "Red"
                    ? "red"
                    : "voilet"
                } rounded-full flex justify-center items-center`}
              ></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameHistoryBox;
