import React from "react";

const RebateRatio = () => {
  const rebateData = [
    {
      level: "L0",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.6%" },
        { description: "2 level lower level commission rebate", rate: "0.18%" },
        { description: "3 level lower level commission rebate", rate: "0.054%" },
        { description: "4 level lower level commission rebate", rate: "0.016%" },
        { description: "5 level lower level commission rebate", rate: "0.0048%" },
        { description: "6 level lower level commission rebate", rate: "0.0014%" },
      ],
    },
    {
      level: "L1",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.7%" },
        { description: "2 level lower level commission rebate", rate: "0.24%" },
        { description: "3 level lower level commission rebate", rate: "0.085%" },
        { description: "4 level lower level commission rebate", rate: "0.03%" },
        { description: "5 level lower level commission rebate", rate: "0.01%" },
        { description: "6 level lower level commission rebate", rate: "0.0036%" },
      ],
    },
    {
      level: "L2",
      details: [
        { description: "1 level lower level commission rebate", rate: "0.75%" },
        { description: "2 level lower level commission rebate", rate: "0.28%" },
        { description: "3 level lower level commission rebate", rate: "0.1%" },
        { description: "4 level lower level commission rebate", rate: "0.039%" },
        { description: "5 level lower level commission rebate", rate: "0.014%" },
        { description: "6 level lower level commission rebate", rate: "0.0055%" },
      ],
    },
  ];

  return (
    <div className="  min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md">
        {/* Rebate Levels */}
        <div className="p-4 space-y-4 ">
          {rebateData.map((rebate, index) => (
            <div key={index} className="bg-customdarkBlue  rounded-lg p-4">
              <h2 className="text-[15px] flex items-center gap-2 text-white mb-3">
                Rebate level{" "}
                <p className="font-bold text-xl text-[#D9AC4F] italic">
                  {rebate.level}
                </p>
              </h2>
              <ul className="space-y-2">
                {rebate.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-xsm"
                  >
                    <div className="flex items-center justify-between text-xsm gap-2">
                      <div className="border-[1px] border-[#D9AC4F] rounded-full h-[14px] flex items-center justify-center w-[14px] bg-white">
                        <p className="w-[5px] h-[5px] p-1 bg-[#D9AC4F] rounded-full"></p>
                      </div>
                      <span className="text-[#9DA5A1] tetx-start">
                        {detail.description}
                      </span>
                    </div>
                    <span className="text-white">{detail.rate}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RebateRatio;
