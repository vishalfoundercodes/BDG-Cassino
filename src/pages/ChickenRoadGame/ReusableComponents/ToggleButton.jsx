import React, { useState } from 'react';

function ToggleButton({toggle,setToggle,w=8,h=4}) {

  const toggleSwitch = () => setToggle((prev) => !prev);
// console.log("toggle",toggle)
  return (
    <button
      onClick={toggleSwitch}
      className={`w-8 h-4 z-50 flex items-center px-0.5 rounded-full transition-colors duration-300 ${
        toggle ? 'bg-[#22C55E]' : 'bg-[#9CA3AF]'
      }`}
    >
      <div
        className={`w-3.5 h-3.5 bg-white rounded-full transform transition-transform duration-300 ${
          toggle ? 'translate-x-3.5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default ToggleButton;
