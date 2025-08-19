/* eslint-disable react/prop-types */

const CircularIndicator = ({ percentage = 0, color }) => {
  const circleRadius = 45; // Radius of the circle
  const circleCircumference = 2 * Math.PI * circleRadius; // Circumference of the circle
  const strokeDashoffset = circleCircumference * (1 - percentage / 100); // Dynamic offset

  return (
    <div className="relative w-32 h-32">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Define Gradient */}
        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4D4D4C" /> {/* Red */}
            <stop offset="100%" stopColor="#4D4D4C" /> {/* Pink */}
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="#4D4D4C" /* Tailwind gray-200 */
          strokeWidth="7"
        />

        {/* Progress Circle with Gradient */}
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="url(#gradientStroke)" /* Apply Gradient */
          strokeWidth="7"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xsm text-white font-semibold">
          {percentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CircularIndicator;
