/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const ProgressBarIndicator = ({ timer }) => {
  const [progress, setProgress] = useState(100); // Start at 100%

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1; // Decrease by 1% each step
      });
    }, timer); // Timer defines the speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center max-w-lg mx-auto mt-2">
      <div className="w-[50%] h-2 bg-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-red transition-all duration-50"
          style={{
            width: `${progress}%`, // Width decreases over time
          }}
        ></div>
      </div>
      {/* <p className="text-center mt-2 text-gray-700">{progress}%</p> */}
    </div>
  );
};

export default ProgressBarIndicator;
