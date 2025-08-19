/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useProfile } from "../../reusable_component/gameApi";
import usawinlogo from "../../assets/headerLogo-removebg.png";
import { motion } from "framer-motion";
import { AiTwotoneSound } from "react-icons/ai";
import { IoToggleSharp, IoWallet } from "react-icons/io5";
import { PiToggleLeftFill } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RiDeleteBack2Fill } from "react-icons/ri";
import bg_one from "../../assets/usaAsset/aviator/bg_one.png";
import bg_two from "../../assets/usaAsset/aviator/bg_two.png";
import bg_three from "../../assets/usaAsset/aviator/bg_three.png";
import bg_four from "../../assets/usaAsset/aviator/bg_four.png";
import bg_five from "../../assets/usaAsset/aviator/bg_five.png";
import backgroundMusic from "../../assets/music/backgroundMusic.mp3";
import crashmusic from "../../assets/music/crashmusic.mp3";
import { socket } from "./AviatorSocket";
import chakra from "../../assets/usaAsset/aviator/chakra.png";
import { useNavigate } from "react-router-dom";
import HowToPlayModal from "./HowTOPlay"

const bgImages = [chakra, bg_one, bg_two, bg_three, bg_four, bg_five];
function AviatorHeader({
  betApiHitted,
  changeBg,
  setChangeBg,
  isSoundOn,
  setIsSoundOn,
  isPathRemoved,
  setIsPathRemoved,
}) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  // console.log("userIduserIduserIduserIduserIduserIduserIduserId", userId)
  const { myDetails, loading, error, fetchProfileDetails } = useProfile(userId);
  const [hotAirData, setHotAirData] = useState(null);
  const modalRef = useRef(null); // Ref for modal
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const handleSocket = (hotair) => {
      const q = JSON.parse(hotair);
      setHotAirData(q);
    };

    // socket.on("demo_aviator", handleSocket);
    socket.on("bdgcasino_aviator", handleSocket);
    return () => socket.off("bdgcasino_aviator", handleSocket);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  // const [isSoundOn, setIsSoundOn] = useState(true);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const [bgMusicStatus, setBgMusicStatus] = useState(
    localStorage.getItem("avittor_bg_music") === "true"
  );
  const BackgroundMusicHandler = (status) => {
    setBgMusicStatus(status);
    localStorage.setItem("avittor_bg_music", status.toString());
  };

  useEffect(() => {
    const status = localStorage.getItem("avittor_bg_music");
    setBgMusicStatus(status === "true");
  }, []);

  const audioRef = useRef(null);
  const audioRefCrash = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("ended", handleEnded);

    if (bgMusicStatus === true) {
      audio.play().catch((error) => console.error("Audio play error:", error));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [bgMusicStatus]);
  useEffect(() => {
    fetchProfileDetails();
  }, [
    betApiHitted?.cancel1,
    betApiHitted?.cancel2,
    betApiHitted?.bet1,
    betApiHitted?.bet2,
    betApiHitted?.cashout1,
    betApiHitted?.cashout2,
  ]);

  // plane crash music
  useEffect(() => {
    if (audioRefCrash.current) {
      if (hotAirData?.status === 2) {
        audioRefCrash.current
          .play()
          .catch((error) => console.error("Audio play error:", error));
      } else {
        audioRefCrash.current.pause();
        audioRefCrash.current.currentTime = 0;
      }
    }
  }, [hotAirData?.status]);
  // console.log("'myDetails", changeBg)

  const bgHandler = (item, i) => {
    setIsOpen(false);
    setChangeBg({ modal: !changeBg?.modal, selectBg: true, image: item });
    localStorage.setItem("aviatorBg", JSON.stringify(i));
  };
  const im = localStorage.getItem("aviatorBg");
  return (
    <>
      <header className="flex items-center bg-blackAviator2 text-blackAviatorText justify-between h-[3.22rem] w-full px-3">
        <audio ref={audioRefCrash} src={crashmusic} preload="auto" />
        <audio ref={audioRef} src={backgroundMusic} preload="auto" />
        <img
          className="w-22 h-12  object-fill cursor-pointer"
          src={usawinlogo}
          alt="Logo"
          onClick={()=>navigate("/")}
        />
        <div className="flex items-center gap-2 text-xsm relative">
          {/* <div
            className="flex bg-yellow rounded-full px-2 py-1 text-white cursor-pointer"
            // onClick={() => setIsModalOpen(true)}
          >
            How to play?
          </div> */}
          <div className="text-green font-bold">{myDetails?.data?.wallet} </div>
          {/* Button to toggle modal */}
          <div onClick={toggleModal} className="cursor-pointer">
            <FiAlignJustify size={20} />
          </div>

          {isOpen && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute pointer-events-auto top-8 z-[60] right-0 text-white w-[310px] border-gray border-[1px] bg-blackAviator1 shadow-lg rounded-lg "
            >
              <div className="text-sm border-blackAviator4 border-b-[1px] p-2  flex items-center justify-between bg-blackAviator4 rounded-t-lg">
                <div className="flex items-center gap-5">
                  <img
                    src={myDetails?.data?.userimage}
                    alt="sdf"
                    className="w-12 h-12 rounded-full object-fill"
                  />
                  <p className="font-bold">{myDetails?.data?.username}</p>
                </div>
              </div>
              <div className="flex items-center border-blackAviator4 border-b-[1px] py-1.5 px-3 justify-between">
                <div className="flex items-center gap-3">
                  <p>
                    <AiTwotoneSound className="text-gray" size={20} />{" "}
                  </p>
                  <p>Sound</p>
                </div>
                {bgMusicStatus ? (
                  <button onClick={() => BackgroundMusicHandler(false)}>
                    <IoToggleSharp className="text-green" size={35} />{" "}
                  </button>
                ) : (
                  <button onClick={() => BackgroundMusicHandler(true)}>
                    <PiToggleLeftFill className="text-gray" size={35} />{" "}
                  </button>
                )}
              </div>
              <div className="flex items-center border-blackAviator4 border-b-[1px] p-3 justify-between">
                <div className="flex items-center gap-3">
                  <p>
                    <IoWallet className="text-gray" size={20} />{" "}
                  </p>
                  <p>Wallet </p>
                </div>
                <div>{myDetails?.data?.wallet} </div>
              </div>
              <div className="flex items-center border-blackAviator4 border-b-[1px] p-3 justify-between">
                <button
                  onClick={() =>
                    setChangeBg({
                      modal: !changeBg?.modal,
                      selectBg: false,
                      image: im,
                    })
                  }
                  className="flex items-center gap-3"
                >
                  <p>
                    <FaEdit className="text-gray" size={20} />{" "}
                  </p>
                  <p>Change Backgound </p>
                </button>
                <div></div>
              </div>
              {changeBg?.modal && (
                <div className="grid grid-cols-2 gap-1 p-2">
                  {bgImages?.map((item, i) => (
                    <img
                      key={i}
                      onClick={() => bgHandler(item, i)}
                      className="w-full bg-blackLight h-28 object-fill rounded-xl col-span-1"
                      src={item}
                      alt="df"
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center border-blackAviator4 border-b-[1px] p-3 justify-between">
                {isPathRemoved ? (
                  <button
                    onClick={() => setIsPathRemoved(false)}
                    className="flex items-center gap-3"
                  >
                    <p>
                      {" "}
                      <TiTick className="text-green" size={20} />{" "}
                    </p>
                    <p>Trajectory Removed</p>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPathRemoved(true)}
                    className="flex items-center gap-3"
                  >
                    <p>
                      <RiDeleteBack2Fill className="text-[#F85050]" size={20} />{" "}
                    </p>
                    <p>Remove Trajectory</p>
                  </button>
                )}
                <div></div>
              </div>

              <button
                onClick={toggleModal}
                className="mt-2 w-full font-bold text-center bg-red-500 text-white py-1 rounded-md text-xs"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      <HowToPlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      </header>
    </>
  );
}

export default AviatorHeader;
