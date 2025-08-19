/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function TwoSameBets({ setBetModal, twoSameNums, oneToSix, timerModal }) {
  const [selectedFirstTwoSameNums, setSelectedFirstTwoSameNums] = useState([]);
  const [selectedSecondTwoSameNums, setSelectedSecondTwoSameNums] = useState([]);
  const [selectedOneToSix, setSelectedOneToSix] = useState([]);

  const handleFirstTwoSameNumsClick = (index) => {
    setSelectedFirstTwoSameNums(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSecondTwoSameNumsClick = (index) => {
    setSelectedSecondTwoSameNums(prev => {
      let newSelected = [...prev];
      if (selectedOneToSix.includes(index)) {
        // If oneToSix at same index is selected, unselect it
        setSelectedOneToSix(prev2 => prev2.filter(i => i !== index));
      }
      if (prev.includes(index)) {
        newSelected = prev.filter(i => i !== index);
      } else {
        newSelected.push(index);
      }
      return newSelected;
    });
  };

  const handleOneToSixClick = (index) => {
    setSelectedOneToSix(prev => {
      let newSelected = [...prev];
      if (selectedSecondTwoSameNums.includes(index)) {
        // If twoSameNums at same index is selected, unselect it
        setSelectedSecondTwoSameNums(prev2 => prev2.filter(i => i !== index));
      }
      if (prev.includes(index)) {
        newSelected = prev.filter(i => i !== index);
      } else {
        newSelected.push(index);
      }
      return newSelected;
    });
  };

  const checkBetModalCondition = () => {
    if (selectedFirstTwoSameNums.length > 0) {
      setBetModal(true);
    } else if (
      selectedSecondTwoSameNums.length > 0 &&
      selectedOneToSix.length > 0
    ) {
      setBetModal(true);
    } else {
      setBetModal(false);
    }
  };

  useEffect(() => {
    checkBetModalCondition();
  }, [selectedFirstTwoSameNums, selectedSecondTwoSameNums, selectedOneToSix]);

  return (
    <div className="mt-2">
      <p className="flex items-center">
        2 matching numbers: odds(13.83)&nbsp;
        <div className="h-4 w-4 text-xs bg-customred rounded-full flex items-center justify-center">?</div>
      </p>

      {/* First twoSameNums */}
      <div className="grid grid-cols-6 gap-2 mt-1">
        {twoSameNums?.map((item, i) => (
          <button
            key={i}
            onClick={() => handleFirstTwoSameNumsClick(i)}
            className={`${timerModal ? "" : "relative z-10"} col-span-1 rounded-lg flex items-center justify-center h-10 w-full cursor-pointer ${
              selectedFirstTwoSameNums.includes(i) ? "bg-[#C86EFF]" : "bg-[#E3B6FF]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="flex items-center mt-5">
        A pair of three numbers: odds(69.12)&nbsp;
        <div className="h-4 w-4 text-xs bg-customred rounded-full flex items-center justify-center">?</div>
      </p>

      {/* Second twoSameNums + oneToSix */}
      <div className="grid grid-cols-6 gap-2 mt-1">
        {twoSameNums?.map((item, i) => (
          <div
            key={`second-${i}`}
            onClick={() => handleSecondTwoSameNumsClick(i)}
            className={`${timerModal ? "" : "relative z-10"} col-span-1 rounded-lg flex items-center justify-center h-10 w-full cursor-pointer ${
              selectedSecondTwoSameNums.includes(i) ? "bg-customred" : "bg-[#FDADAD]"
            }`}
          >
            {item}
          </div>
        ))}

        {oneToSix?.map((item, i) => (
          <div
            key={`oneToSix-${i}`}
            onClick={() => handleOneToSixClick(i)}
            className={`col-span-1 rounded-lg ${timerModal ? "" : "relative z-10"} flex items-center justify-center h-10 w-full cursor-pointer ${
              selectedOneToSix.includes(i) ? "bg-green" : "bg-[#8BDAAF]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TwoSameBets;

