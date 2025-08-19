
import React from "react";

const InvitationRules = () => {
  const rules = [
    {
      id: 1,
      text: "There are 6 subordinate levels in inviting friends, if A invites B, then B is a level 1 subordinate of A. If B invites C, then C is a level 1 subordinate of B and also a Level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A.",
    },
    {
      id: 2,
      text: "When inviting friends to register, you must send the invitation link provided or enter the invitation code manually so that your friends become your level 1 subordinates.",
    },
    {
      id: 3,
      text: "The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately.",
    },
    {
      id: 4,
      text: "The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record.",
    },
    {
      id: 5,
      text: "Commission rates vary depending on your agency level on that day. Number of Teams: How many downline deposits you have to date. Team Deposits: The total number of deposits made by your downline in one day.",
    },
  ];
  const tableData = [
    { level: "L0", teamNumber: 0, teamBetting: "0", teamDeposit: "0" },
    { level: "L1", teamNumber: 5, teamBetting: "500K", teamDeposit: "100K" },
    { level: "L2", teamNumber: 10, teamBetting: "1,000K", teamDeposit: "200K" },
    { level: "L3", teamNumber: 15, teamBetting: "2.50M", teamDeposit: "500K" },
    { level: "L4", teamNumber: 20, teamBetting: "3.50M", teamDeposit: "700K" },
    { level: "L5", teamNumber: 25, teamBetting: "5M", teamDeposit: "1,000K" },
    { level: "L6", teamNumber: 30, teamBetting: "10M", teamDeposit: "2M" },
    { level: "L7", teamNumber: 100, teamBetting: "50M", teamDeposit: "10M" },
    { level: "L8", teamNumber: 250, teamBetting: "250M", teamDeposit: "50M" },
    { level: "L9", teamNumber: 500, teamBetting: "500M", teamDeposit: "100M" },
    { level: "L10", teamNumber: 2500, teamBetting: "1,000M", teamDeposit: "200M" },
  ];

  const rules2 = [
    "The commission percentage depends on the membership level. The higher the membership level, the higher the bonus percentage. Different game types also have different payout percentages.",
    "TOP20 commission rankings will be randomly awarded with a separate bonus.",
    "The final interpretation of this activity belongs to usawin.",
  ];

  return (
    <div className=" min-h-screen flex flex-col items-center pb-6">
      <div className="w-full max-w-md text-black rounded-lg shadow-lg">
        {/* Promotion Title */}
        <div className="p-4 text-center text-lg">
          <h2 className="text-[#D9AC4F] font-bold">
            【Promotion partner】program
          </h2>
          <p className="text-white opacity-65 text-[15px]">
            This activity is valid for a long time
          </p>
        </div>

        {/* Rules List */}
        <div className="p-4 space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className=" bg-customdarkBlue rounded-lg p-4 text-[12px] text-[#A8A5A1]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-redLight font-bold h-1 w-1 bg-redLight rounded-full"></span>
                <span className="text-redLight font-bold h-1 w-1 bg-redLight rounded-full"></span>
              </div>
              <p className="text-xsm ">{rule.text}</p>
            </div>
          ))}
        </div>
        <div className="">
          <table className="w-full border-collapse border border-redLight">
            <thead>
              <tr className="text-xs font-bold  text-white bg-redLight">
                <th className=" text-nowrap px-1 py-3">Rebate Level</th>
                <th className=" text-nowrap px-1 py-3">Team Number</th>
                <th className=" text-nowrap px-1 py-3">Team Betting</th>
                <th className=" text-nowrap px-1 py-3">Team Deposit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`text-xs
                    }`}
                >
                  <td className="border border-redLight text-customlightbtn py-1  text-center">
                    {row.level}
                  </td>
                  <td className="border border-redLight text-white  text-center">
                    {row.teamNumber}
                  </td>
                  <td className="border border-redLight text-white  text-center">
                    {row.teamBetting}
                  </td>
                  <td className="border border-redLight text-white  text-center">
                    {row.teamDeposit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rules Section */}
        <div className="p-4 space-y-4">
          {rules2.map((rule, index) => (
            <div
              key={index}
              className="bg-customdarkBlue  rounded-lg p-4 text-sm text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold h-1 w-1 bg-redLight rounded-full"></span>
                <span className="text-redLight font-bold h-1 w-1 bg-redLight rounded-full"></span>
              </div>
              <p className="text-xsm">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvitationRules;
