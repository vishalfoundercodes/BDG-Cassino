/* eslint-disable react/prop-types */
const ChartTrx = ({ handlehistorybox, gameHistoryData }) => {
    if (handlehistorybox !== 1) return null;
  
    const renderGradientBackground = (num) => {
      if (num === '0') {
        return (
          <>
            <span
              className="absolute inset-0 bg-red rounded-full"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
            ></span>
            <span
              className="absolute inset-0 bg-violet-500 rounded-full"
              style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
            ></span>
          </>
        );
      }
      if (num === '5') {
        return (
          <>
            <span
              className="absolute inset-0 bg-green rounded-full"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
            ></span>
            <span
              className="absolute inset-0 bg-voilet rounded-full"
              style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
            ></span>
          </>
        );
      }
      return null;
    };

    const calculatePosition = (index, gameData) => {
      const totalGames = gameData.length;
      const rowHeight = window.innerWidth < 500 ? 48 : 48; // Adjust for small screens
      const colWidth = window.innerWidth < 380 ? 16 :window.innerWidth < 400 ? 18 :window.innerWidth < 420 ? 21 :window.innerWidth < 440 ? 22 :window.innerWidth < 460 ? 23  : 21;  // Adjust column width for smaller screens
      const x = (gameData[index]?.number || 0) * colWidth + 6; // Adjust circle position
      const y = index * rowHeight + 24; // Adjust for vertical position
      return { x, y };
    };
  
    const renderGameRow = (item) => {
      return (
        <div key={item?.games_no} className="w-full flex items-center justify-between relative">
          <div className="w-[39%] flex justify-start text-center">
            <p className="text-[12px">{item?.games_no}</p>
          </div>
          <div className="flex gap-1 w-[55%] justify-end px-1 h-10 text-[12px] items-center">
            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num, numIndex) => {
              const isHighlighted = num == item?.number;
              const isGreenNumber = [1, 3, 7, 9].includes(item?.number);
              const isRedNumber = [2, 4, 6, 8].includes(item?.number);
  
              return (
                <div
                  key={numIndex}
                  className={`relative border border-[#bbbbbb] h-3.5 xsm:h-4 w-3.5 xsm:w-4 col-span-1 rounded-full flex justify-center items-center ${isGreenNumber && isHighlighted
                    ? "bg-green"
                    : isRedNumber && isHighlighted
                      ? "bg-customred"
                      : ""
                    } ${isHighlighted ? "text-white" : "text-[#bbbbbb]"}`}
                >
                  {isHighlighted && renderGradientBackground(num)}
                  <span className="relative z-10">{num}</span>
                </div>
              );
            })}
          </div>
          <p
            className={`ml-2 border border-[#bbbbbb] ${[0, 1, 2, 3, 4].includes(item?.number)
              ? "bg-bg3"
              : "bg-yellow"
              } h-3.5 xsm:h-4 w-3.5 xsm:w-4 col-span-1 rounded-full flex justify-center items-center p-1 text-white`}
          >
            {[0, 1, 2, 3, 4].includes(item?.number) ? "S" : "B"}
          </p>
        </div>
      );
    };
    const renderLines = () => {
      let prevPosition = null; // Store the last valid position
  
      return gameHistoryData.map((item, index) => {
        const isHighlighted = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(item?.number);
  
        if (!isHighlighted) return null; // Skip non-highlighted numbers
  
        const { x, y } = calculatePosition(index, gameHistoryData);
  
        if (prevPosition) {
          const { x: x1, y: y1 } = prevPosition;
  
          // Update position for next connection
          prevPosition = { x, y };
  
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x}
              y2={y}
              stroke="red"
              strokeWidth="0.5"
            />
          );
        }
  
        // Store first highlighted number position
        prevPosition = { x, y };
        return null;
      });
    };
  
    return (
      <div className=" px-4 !w-full mt-5 relative hide-scrollbar overflow-x-hidden">
        <svg className="absolute mt-48 left-[42vw] xsm:left-[37%] mr-4 h-full pointer-events-none">
          {renderLines()}
        </svg>
        <div className="flex w-full bg-customdarkBlue rounded-t-lg py-2 font-semibold">
          <p className="text-xsm w-[35%] flex justify-center items-center">Period</p>
          <p className="text-xsm w-[65%] flex justify-center items-center">Number</p>
        </div>
        <div className="text-[10px] xsm:text-[12px] w-full bg-redLight text-white py-3 px-2">
          <div className="h-36">
            <p>Statistic (last 100 people)</p>
            <div className="flex items-center justify-between mt-1">
              <div className="text-nowrap">Winning number</div>
              <div className="flex items-center gap-0.5">
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">0</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">1</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">2</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">3</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">4</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">5</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">6</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">7</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">8</p>
                <p className="text-customred border-[1px] rounded-full w-5 h-5 flex items-center justify-center border-customred">9</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div>Missing</div>
              <div className="flex items-center gap-0.5 text-[#9da7b3]">
                <p className="rounded-full w-5 h-5 flex items-center justify-center">5</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">13</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">0</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">2</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">14</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">4</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">23</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">3</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">1</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">7</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div>Avg missing</div>
              <div className="flex items-center gap-0.5 text-[#9da7b3]">
                <p className="rounded-full w-5 h-5 flex items-center justify-center">9</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">5</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">8</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">11</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">10</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">10</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">13</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">11</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">7</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">5</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div>Frequency</div>
              <div className="flex items-center gap-0.5 text-[#9da7b3]">
                <p className="rounded-full w-5 h-5 flex items-center justify-center">9</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">19</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">11</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">7</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">10</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">9</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">8</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">8</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">13</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">6</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div>Max consecutive</div>
              <div className="flex items-center gap-0.5 text-[#9da7b3]">
                <p className="rounded-full w-5 h-5 flex items-center justify-center">1</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">3</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">1</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">1</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">2</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">2</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">2</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">2</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">3</p>
                <p className="rounded-full w-5 h-5 flex items-center justify-center">2</p>
              </div>
            </div>
          </div>
          {gameHistoryData?.map(renderGameRow)}
        </div>
      </div>
    );
  };
  
  export default ChartTrx;
  