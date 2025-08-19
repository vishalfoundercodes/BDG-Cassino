const gameRules = {
    1: {
      bgColor: "bg-red",
      headerBg: "bg-redLight",
      textColor: "text-white",
      rules: [
        "30 seconds 1 issue, 25 seconds to order, 5 seconds waiting for the draw. It opens all day. The total number of trade is 2880 issues.",
        "If you spend 100 to trade, after deducting service fee 2%, contract amount : 98",
        "1. Select green: if the result shows 1,3,7,9 you will get (98*2)=196; If the result shows 5, you will get (98*1.5) 147",
        "2. Select red: if the result shows 2,4,6,8 you will get (98*2)=196; If the result shows 0, you will get (98*1.5) 147",
        "3. Select violet: if the result shows 0 or 5, you will get (98*2)=196",
        "4. Select number: if the result is the same as the number you selected, you will get (98*9)=882",
        "5. Select big: if the result shows 5,6,7,8,9 you will get (98*2)=196",
      ],
    },
    2: {
        bgColor: "bg-red",
        headerBg: "bg-redLight",
        textColor: "text-white",
      rules: [
        "1 minute 1 issue, 45 seconds to order, 15 seconds waiting for the draw. It opens all day. The total number of trade is 1440 issues.",
        "If you spend 100 to trade, after deducting 2% service fee, contract amount : 98",
        "1. Select green: if the result shows 1,3,7,9 you will get (98*2)=196; If the result shows 5, you will get (98*1.5) 147",
        "2. Select red: if the result shows 2,4,6,8 you will get (98*2)=196; If the result shows 0, you will get (98*1.5) 147",
        "3. Select violet: if the result shows 0 or 5, you will get (98*4.5)=441",
        "4. Select number: if the result is the same as the number you selected, you will get (98*9)=882",
        "5. Select big: if the result shows 5,6,7,8,9 you will get (98*2)=196",
      ],
    },
    3: {
        bgColor: "bg-red",
        headerBg: "bg-redLight",
        textColor: "text-white",
      rules: [
        "3 minutes 1 issue, 2 minutes 45 seconds to order, 15 seconds waiting for the draw. It opens all day. The total number of trade is 480 issues.",
        "If you spend 100 to trade, after deducting 2% service fee, contract amount : 98",
        "1. Select green: if the result shows 1,3,7,9 you will get (98*2)=196; If the result shows 5, you will get (98*1.5) 147",
        "2. Select red: if the result shows 2,4,6,8 you will get (98*2)=196; If the result shows 0, you will get (98*1.5) 147",
        "3. Select violet: if the result shows 0 or 5, you will get (98*4.5)=441",
        "4. Select number: if the result is the same as the number you selected, you will get (98*9)=882",
        "5. Select big: if the result shows 5,6,7,8,9 you will get (98*2)=196",
      ],
    },
    4: {
        bgColor: "bg-red",
        headerBg: "bg-redLight",
        textColor: "text-white",
      rules: [
        "5 minutes 1 issue, 4 minutes 45 seconds to order, 15 seconds waiting for the draw. It opens all day. The total number of trade is 288 issues.",
        "If you spend 100 to trade, after deducting 2% service fee, contract amount : 98",
        "1. Select green: if the result shows 1,3,7,9 you will get (98*2)=196; If the result shows 5, you will get (98*1.5) 147",
        "2. Select red: if the result shows 2,4,6,8 you will get (98*2)=196; If the result shows 0, you will get (98*1.5) 147",
        "3. Select violet: if the result shows 0 or 5, you will get (98*4.5)=441",
        "4. Select number: if the result is the same as the number you selected, you will get (98*9)=882",
        "5. Select big: if the result shows 5,6,7,8,9 you will get (98*2)=196",
      ],
    },
  };
  
  const WingoRules = ({ playRule, gameDetails, setPlayRule }) => {
    if (!playRule || !gameDetails?.gameId || !gameRules[gameDetails.gameId]) return null;
  
    const { bgColor, headerBg, textColor, rules } = gameRules[gameDetails.gameId];
  
    return (
      <div className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
        <div className={`relative w-[281px] h-[450px] z-50 ${bgColor} rounded-lg shadow-lg flex flex-col items-center`}>
          <p className={`absolute text-[16px] top-0 left-0 w-full text-center ${headerBg} py-2 rounded-t-lg`}>
            How to play
          </p>
          <div className={`px-2 text-[12.8px] overflow-y-scroll h-full mt-12 ${textColor}`}>
            {rules.map((rule, index) => (
              <p key={index}>{rule}</p>
            ))}
          </div>
          <div className="w-full rounded-b-lg bg-redLight p-3 h-28 flex items-center justify-center">
            <button
              className="bg-gradient-to-r from-customlightbtn to-customdarkBluebtn text-white px-16 py-2 rounded-full"
              onClick={() => setPlayRule(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  export default WingoRules