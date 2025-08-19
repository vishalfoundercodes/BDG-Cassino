/* eslint-disable react/prop-types */
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import usaserviceIcon from "./assets/icons/usaServiceIcon.png";
import AvitatorLayout from "./pages/AviatorGame/AvitatorLayout";
import AviatorHome from "./pages/AviatorGame/AviatorHome";
import ChickenRoadGame from "./pages/ChickenRoadGame/GameComponent/Game"
import ChickenRoadLayout from "./pages/ChickenRoadGame/GameComponent/ChickenRoadLayout";
import SplashScreen from "./pages/Home/SplashScreen";

const Layout = () => {
    const location = useLocation();
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    // const bgColor = location?.pathname === "/" ? "bg-bg1" : "bg-bg1";
  const bgColor = location?.pathname?.startsWith("/customerservices")
    ? "bg-white"
    : "bg-bg1";


    const hiddenFooterPaths = new Set(["/login", "/register"]);
    const visibleFooterPaths = new Set(["/", "/activity", "/profile", "/promotion", "/wallet"]);

    const footerDisplay = hiddenFooterPaths.has(location?.pathname)
        ? "hidden"
        : visibleFooterPaths.has(location?.pathname)
            ? "block"
            : "hidden";


    const headerDisplay =
      location?.pathname === "/login" ||
      location?.pathname === "/forgotPassword" ||
      location?.pathname === "/register" ||
      location.pathname.startsWith("/register/") ||
      location?.pathname === "/" ||
      location?.pathname === "/allFirstDepositPlans" ||
      // location?.pathname === "/lottery/wingo" ||
      // location?.pathname === "/lottery/trxwingo" ||
      location?.pathname === "/allgames" ||
      location?.pathname === "/activity" ||
      location?.pathname === "/activity/details" ||
      location?.pathname === "/activity/invitationbonus" ||
      location?.pathname === "/activity/award" ||
      location?.pathname === "/activity/invitationbonus/invitationrewardrule" ||
      location?.pathname === "/activity/invitationbonus/invitationrecord" ||
      location?.pathname === "/activity/rebate" ||
      location?.pathname === "/activity/superJackpot" ||
      location?.pathname === "/activity/gifts" ||
      location?.pathname === "/activity/attendance" ||
      location?.pathname === "/activity/attendacehistory" ||
      location?.pathname === "/activity/gamerule" ||
      location?.pathname === "/promotion" ||
      location?.pathname === "/promotion/newSuboridnate" ||
      location?.pathname === "/promotion/subordinatedata" ||
      location?.pathname === "/promotion/commissiondetail" ||
      location?.pathname === "/promotion/invitationrules" ||
      location?.pathname === "/promotion/rebateratio" ||
      location?.pathname === "/wallet" ||
      location?.pathname === "/wallet/transfer" ||
      location?.pathname === "/wallet/deposit" ||
      location?.pathname === "/wallet/withdrawal" ||
      location?.pathname === "/wallet/deposithistory" ||
      location?.pathname === "/wallet/withdrawalhistory" ||
      location?.pathname === "/wallet/withdrawal/addbankaccount" ||
      location?.pathname === "/wallet/withdrawal/editbankaccount" ||
      location?.pathname === "/wallet/withdrawal/addbankaccount/selectbank" ||
      location?.pathname === "/wallet/withdrawal/addusdtwalletaddress" ||
      location?.pathname === "/notifications" ||
      location?.pathname === "/vip" ||
      location?.pathname === "/gamehistory" ||
      location?.pathname === "/alltransactionhistory" ||
      location?.pathname === "/setting" ||
      location?.pathname === "/changepassword" ||
      location?.pathname === "/bindmail" ||
      location?.pathname === "/feedback" ||
      location?.pathname === "/customerservices" ||
      location?.pathname === "/customerservices/changeIdLogin" ||
      location?.pathname === "/customerservices/gameProblem" ||
      location?.pathname === "/customerservices/ifscModification" ||
      location?.pathname === "/customerservices/depositNotRecieve" ||
      location?.pathname === "/customerservices/depositNotRecieveform" ||
      location?.pathname === "/customerservices/deleteWithdrawBank" ||
      location?.pathname === "/customerservices/changeBankName" ||
      location?.pathname === "/customerservices/usdtNonIndian" ||
      location?.pathname === "/customerservices/usdtIndian" ||
      location?.pathname === "/customerservices/deleteUsdtAddress" ||
      location?.pathname === "/customerservices/withdrawProblem" ||
      location?.pathname === "/customerservices/withdrawProblemform" ||
      location?.pathname === "/customerservices/aviatorLuckyBonus" ||
      location?.pathname === "/customerservices/WingoWinStreak" ||
      location?.pathname === "/beginnersguide" ||
      location?.pathname === "/aboutus" ||
      location?.pathname === "/aboutus/child" ||
      location?.pathname === "/aboutus/confidential" ||
      location?.pathname === "/aboutus/risk" ||
      location?.pathname === "/aboutus/tc" ||
      location?.pathname === "/aboutus/faqs" ||
      location?.pathname === "/changeavatar" ||
      location?.pathname === "/dragonTiger" ||
      location?.pathname === "/dragonTiger/history" ||
      location?.pathname === "/andarbahar" ||
      location?.pathname === "/andarbahar/history"
        ? "block"
        : "hidden";

    const outletPadding = location?.pathname === "/" ? "pb-5" : "pb-0";
    const handleDrag = (e) => {
        setPosition({
            x: e.clientX - 35,
            y: e.clientY - 35,
        });
    };

    const handleDragTouch = (e) => {
        const x = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
        const y = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;

        setPosition({
            x: x - 35,
            y: y - 35,
        });
    };

    const handleDragEnd = (e) => {
        setPosition({
            x: e.clientX - 35,
            y: e.clientY - 35,
        });
    };

    const handleDragEndTouch = (e) => {
        const x = e.type === "mouseup" ? e.clientX : e.changedTouches[0].clientX;
        const y = e.type === "mouseup" ? e.clientY : e.changedTouches[0].clientY;

        setPosition({
            x: x - 35,
            y: y - 35,
        });
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setDragImage(new Image(), 0, 0);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
    };

    return (
      <>
        {/* {location?.pathname === "/aviator" ? <AvitatorLayout component={<AviatorHome/>} /> : <div className="flex h-screen font-inter">
                <div className="flex-1 bg-[#9195A3]"></div>
                <div
                    className={`${bgColor} shrink-0 bg-red flex flex-col h-screen overflow-hidden  w-full xsm:w-[400px] text-white `}
                >
                    <div className={`h-[3.22rem]  w-full xsm:w-[400px] z-50 fixed top-0  ${headerDisplay}`}>
                        <Header />
                    </div>
                    <div
                        className={`flex-1 h-full overflow-auto ${headerDisplay === "hidden" ? "mt-0" : "mt-[3.22rem]"} hide-scrollbar  pb-${outletPadding}`}
                    >
                        <Outlet />
                    </div>
                    <div
                        className={`fixed bottom-0 z-40  w-full xsm:w-[400px] bg-transparent ${footerDisplay}`}
                    >
                        <Footer />
                    </div>
                    <div
                        className={`fixed z-50 ${location?.pathname === "/login" ||
                            location?.pathname === "/register" ? "hidden" : "block"} `}
                        style={{
                            top: `${position.y}px`,
                            left: `${position.x}px`,
                            cursor: "grab",
                        }}
                        draggable
                        onDrag={handleDrag}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleDragTouch}
                        onTouchEnd={handleDragEndTouch}
                    >
                        <Link to="/customerservices">
                            <img
                                src={usaserviceIcon}
                                className="h-14 bg-white rounded-full p-0.5 w-14"
                                alt="Service Icon"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex-1 bg-[#9195A3]"></div>
            </div>} */}

        {location?.pathname === "/aviator" ? (
          <AvitatorLayout component={<AviatorHome />} />
        ) : location?.pathname === "/chickenRoadGame" ? (
          <ChickenRoadLayout component={<ChickenRoadGame />} />
        ) : (
          <div className="flex h-screen font-inter">
            <div className="flex-1 bg-[#9195A3]"></div>

            <div
              className={`${bgColor} shrink-0 bg-red flex flex-col h-screen overflow-hidden w-full xsm:w-[400px] text-white`}
            >
              {/* Header */}
              {/* <SplashScreen /> */}
              <div
                className={`h-[3.22rem] w-full xsm:w-[400px] z-50 fixed top-0 ${headerDisplay}`}
              >
                <Header />
              </div>
              {/* Main content area */}
              <div
                className={`flex-1 h-full overflow-auto ${
                  headerDisplay === "hidden" ? "mt-0" : "mt-[3.22rem]"
                } hide-scrollbar pb-${outletPadding}`}
              >
                <Outlet />
              </div>
              {/* Footer */}
              <div
                className={`fixed bottom-0 z-40 w-full xsm:w-[400px] bg-transparent ${footerDisplay}`}
              >
                <Footer />
              </div>
              {/* Floating draggable button */}
              <div
                className={`fixed z-50 ${
                  location?.pathname === "/login" ||
                  location?.pathname === "/register" ||
                  location?.pathname === "/register/"
                    ? "hidden"
                    : "block"
                }`}
                style={{
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                  cursor: "grab",
                }}
                draggable
                onDrag={handleDrag}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleDragTouch}
                onTouchEnd={handleDragEndTouch}
              >
                <Link to="/customerservices">
                  <img
                    src={usaserviceIcon}
                    className="h-14 bg-white rounded-full p-0.5 w-14"
                    alt="Service Icon"
                  />
                </Link>
              </div>
            </div>

            <div className="flex-1 bg-[#9195A3]"></div>
          </div>
        )}
      </>
    );
};

export default Layout;
