// import React, { useEffect, useState } from "react";
// import logo from "../../assets/usawinlogo3.png"; 
// import logo2 from "../../assets/splashImage.png";  
// // replace with your image path

// const SplashScreen = () => {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!showSplash) return null;

//   return (
//     // <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center w-full xsm:w-[400px]">
//     //   <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
//     //   <p className="text-white text-lg font-bold tracking-widest">BDG</p>
//     // </div>
//     <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center w-full xsm:w-[400px] left-1/2 transform -translate-x-1/2">
//       {/* <p className="text-white text-lg font-bold tracking-widest">BDG</p> */}
//       <img src={logo2} alt="Logo" className="w-80 h-50 mb-2" />
//       <p className="text-[#D9AC4F] text-lg font-bold tracking-widest mb-6">
//         Withdraw fast safe and stable
//       </p>

//       <img src={logo} alt="Logo" className="w-44 h-44 mb-4" />
//     </div>
//   );
// };

// export default SplashScreen;

import React, { useEffect, useState } from "react";
import logo from "../../assets/usawinlogo3.png";
import logo2 from "../../assets/splashImage.png";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const splashShown = localStorage.getItem("splash_shown");

    if (!splashShown) {
      setShowSplash(true);

      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("splash_shown", "true"); // ✅ Mark as shown
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center w-full xsm:w-[400px] left-1/2 transform -translate-x-1/2">
      <img src={logo2} alt="Logo" className="w-80 h-50 mb-2" />
      <p className="text-[#D9AC4F] text-lg font-bold tracking-widest mb-6">
        Withdraw fast safe and stable
      </p>
      <img src={logo} alt="Logo" className="w-44 h-44 mb-4" />
    </div>
  );
};

export default SplashScreen;
