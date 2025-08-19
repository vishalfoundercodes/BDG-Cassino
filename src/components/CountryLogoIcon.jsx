import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("EN");

  const languages = [
    {
      code: "EN",
      flag: "https://flagcdn.com/us.svg",
    },
    {
      code: "HD",
      flag: "https://flagcdn.com/in.svg",
    },
  ];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative z-50">
      {/* Language Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1 bg-transparent rounded text-white"
      >
        {/* <img
          src={languages.find((l) => l.code === selected)?.flag}
          alt="flag"
          className="w-6 h-6 rounded-full"
        /> */}
        <img
          src={languages.find((l) => l.code === selected)?.flag}
          alt="flag"
          className="w-6 h-6 rounded-full object-cover"
        />

        <span className="text-[#8F5206] font-semibold">{selected}</span>
      </button>

      {/* Bottom Popup Panel */}
      {open && (
        <>
          {/* Optional: backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-[#1f1f1f]  border-gray-700 z-50 rounded-t-xl p-4 animate-slideUp">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => {
                  setSelected(lang.code);
                  setOpen(false);
                }}
                className={`flex justify-between items-center p-3 cursor-pointer rounded-lg ${
                  selected === lang.code ? "bg-[#333333]" : "hover:bg-[#2b2b2b]"
                }`}
              >
                <div className="flex items-center gap-2 text-white">
                  <img
                    src={lang.flag}
                    alt={lang.code}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{lang.code}</span>
                </div>
                {selected === lang.code ? (
                  <FaCheckCircle className="text-[#D9AC4F]" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-500" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
