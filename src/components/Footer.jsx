
import { Link, useLocation } from "react-router-dom"
import diamond from "../assets/images/diamond.png"
import footerBg from "../assets/usaAsset/homeScreen/footerBg.png"
import home_color from "../assets/usaAsset/footer/home_color.png"
import activity_color from "../assets/usaAsset/footer/activity_color.png"
import wallet_color_bg from "../assets/usaAsset/footer/wallet_color_bg.png"
import account_color from "../assets/usaAsset/footer/account_color.png"
import homeLight from "../assets/usaAsset/footer/homeLight.png"
import activityLight from "../assets/usaAsset/footer/activityLight.png"
import walletLight from "../assets/usaAsset/footer/walletLight.png"
import accountLight from "../assets/usaAsset/footer/accountLight.png"
function Footer() {
  const location = useLocation()
  return (
    <div
      className="z-40 relative grid grid-cols-5 pt-2 items-center h-[5rem] xsm:h-[5rem] bg-[#333332]"
      style={{
        // backgroundImage: `url(${footerBg})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderTopLeftRadius: "1.5rem",
        borderTopRightRadius: "1.5rem",
      }}
    >
      <Link to="/" className="z-40 col-span-1 flex flex-col items-center">
        <img
          src={location.pathname === "/" ? home_color : homeLight}
          className="w-8 h-8 "
          alt=""
        />
        {/* <p
          className={`text-xs ${
            location.pathname === "/"
              ? "bg-gradient-to-r from-[#43b5ec] to-[#759fde]"
              : "bg-gradient-to-r from-[#759fde] to-[#759fde]"
          } bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-[#DD9B46]`}
        >
          Home
        </p> */}
        <p
          className={`text-xs ${
            location.pathname === "/" ? "text-[#DD9B46]" : "text-[#B6B6B6]"
          }`}
        >
          Home
        </p>
      </Link>
      <Link
        to="/activity"
        className="z-40 col-span-1 flex flex-col items-center"
      >
        <img
          src={
            location.pathname === "/activity" ? activity_color : activityLight
          }
          className="w-8 h-8 "
          alt=""
        />
        {/* <p
          className={`text-xs ${
            location.pathname === "/activity"
              ? "bg-gradient-to-r from-[#43b5ec] to-[#759fde]"
              : "bg-gradient-to-r from-[#759fde] to-[#759fde]"
          } bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-[#a5a39c]`}
        >
          Activity
        </p> */}

        <p
          className={`text-xs ${
            location.pathname === "/activity"
              ? "text-[#DD9B46]"
              : "text-[#B6B6B6]"
          }`}
        >
          Activity
        </p>
      </Link>

      <Link
        to="/promotion"
        className="z-40 -mt-9 xsm:-mt-8 col-span-1 flex flex-col items-center "
      >
        <div className="flex items-center justify-center  h-50 w-40 xsm:h-50 xsm:w-50">
          <img
            src={diamond}
            className="h-54 !w-20 -mt-3 object-fill "
            alt="diamond not found"
          />
        </div>
        {/* <p
          className={`text-xs ${
            location.pathname === "/promotion"
              ? "bg-gradient-to-r from-[#43b5ec] to-[#759fde]"
              : "bg-gradient-to-r from-[#759fde] to-[#759fde]"
          } bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-[#a5a39c] `}
        >
          Promotion
        </p> */}

        <p
          className={`text-xs ${
            location.pathname === "/promotion"
              ? "text-[#DD9B46]"
              : "text-[#B6B6B6]"
          }`}
        >
          Promotion
        </p>
      </Link>
      <Link to="/wallet" className="z-40 col-span-1 flex flex-col items-center">
        <img
          src={location.pathname === "/wallet" ? wallet_color_bg : walletLight}
          className="w-8 h-8 "
          alt=""
        />
        {/* <p
          className={`text-xs ${
            location.pathname === "/wallet"
              ? "bg-gradient-to-r from-[#43b5ec] to-[#759fde]"
              : "bg-gradient-to-r from-[#759fde] to-[#759fde]"
          } bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-[#a5a39c]`}
        >
          Wallet
        </p> */}
        <p
          className={`text-xs ${
            location.pathname === "/wallet"
              ? "text-[#DD9B46]"
              : "text-[#B6B6B6]"
          }`}
        >
          Wallet
        </p>
      </Link>
      <Link
        to="/profile"
        className="z-40 col-span-1 flex flex-col items-center"
      >
        <img
          src={location.pathname === "/profile" ? account_color : accountLight}
          className="w-8 h-8 "
          alt=""
        />
        {/* <p
          className={`text-xs ${
            location.pathname === "/profile"
              ? "bg-gradient-to-r from-[#43b5ec] to-[#759fde]"
              : "bg-gradient-to-r from-[#759fde] to-[#759fde]"
          } bg-gradient-to-r from-[#43b5ec] to-[#759fde] bg-clip-text text-transparent text-[#a5a39c]`}
        >
          Account
        </p> */}
        <p
          className={`text-xs ${
            location.pathname === "/profile"
              ? "text-[#DD9B46]"
              : "text-[#B6B6B6]"
          }`}
        >
          Account
        </p>
      </Link>
    </div>
  );
}

export default Footer