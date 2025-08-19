/* eslint-disable react/prop-types */

import BetButtonOne from "./BetButtonOne";
import BetButtonTwo from "./BetButtonTwo";

const BetSection = ({ setBtn, setBetApiHitted, myDetails }) => {
  return (
    <div className=" lg:flex h-full gap-2 rounded-lg ">
      {/* Left Bet Box */}
      <BetButtonOne
        setBtn={setBtn}
        setBetApiHitted={setBetApiHitted}
        myDetails={myDetails}
      />
      {/* <div className="mt-2 w-full lg:mt-0"> */}
      <BetButtonTwo
        setBtn={setBtn}
        setBetApiHitted={setBetApiHitted}
        myDetails={myDetails}
      />
    </div>
    // </div>
  );
};

export default BetSection;
