import { useEffect, useRef, useState } from 'react';
import zero from "../../assets/images/zero.png"
import one from "../../assets/images/one.png"
import two from "../../assets/images/two.png"
import three from "../../assets/images/three.png"
import four from "../../assets/images/four.png"
import five from "../../assets/images/five.png"
import six from "../../assets/images/six.png"
import seven from "../../assets/images/seven.png"
import eight from "../../assets/images/eight.png"
import nine from "../../assets/images/nine.png"
import LotteryTimer from '../../reusable_component/LotteryTimer';
import TimerModal from '../../reusable_component/TimerModal';
import LotteryBetModal from '../../reusable_component/LotteryBetModal';
import { toast } from 'react-toastify';
import apis from '../../utils/apis'
import axios from 'axios';
import WingoMyHistory from '../../reusable_component/WingoMyHistory';
import WingoChart from '../../reusable_component/WingoChart';
import WingoWinnerAnnoucement from '../../reusable_component/WingoWinnerAnnoucement';
import GameHistoryBox from '../../reusable_component/WingoGameHistory';
import WingoPagination from '../../reusable_component/WingoPagination';
import countdownone from '../../assets/music/countdownone.mp3';
import mainWallet from "../../assets/usaAsset/wingo/mainWallet.png"
// src = "/src/assets/usaAsset/account/withdrawHis.png";
import mainWallet2 from "../../assets/usaAsset/account/wingoWallet.png";
import cutBg1 from "../../assets/usaAsset/wingo/timerbg.png"
import grayWatch from "../../assets/usaAsset/wingo/grayWatch.png"
import redWatch from "../../assets/usaAsset/wingo/redWatch.png"
import walletbg from "../../assets/usaAsset/walletbg.png"
import { Link } from 'react-router-dom';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';
import { RiFireFill } from 'react-icons/ri';
import Header from '../../components/Header';
import { useSocket } from "../../shared/socket/SocketContext"
import WingoRules from './WingoRules';
import micphone from "../../assets/usaAsset/micphone.png"
const profileApi = apis.profile
const wingo_bet_api = apis.wingo_bet
const wingo_my_history = apis.wingo_my_history
const wingo_game_history = apis.wingo_game_history
const wingo_win_amount_announcement = apis.wingo_win_amount_announcement
const images = [zero, one, two, three, four, five, six, seven, eight, nine];
const notes = [
  "Notice:To visit our official website, be sure to use the link below,https://bdgcassino.com / Please re",
  "Notice:To visit our official website, be sure to use the link below,https://bdgcassino.com / Please re",
  "Notice:To visit our official website, be sure to use the link below,https://bdgcassino.com / Please re",
];
const WinGo = () => {
  const [myDetails, setMyDetails] = useState(null)
  const [betGameId, setBetGameId] = useState(null);
  const [selectedIMgIndex, setSelectedImgIndex] = useState("30s");
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);
  const [handlehistorybox, sethandlehistorybox] = useState(0);
  const [callTimer, setCallTimer] = useState(30)
  const [timerModal, setTimerModal] = useState(false);
  const [betModal, setBetModal] = useState(false);
  const [fifthDivWidth, setFifthDivWidth] = useState(null);
  const fifthDivRef = useRef();
  const [gameDetails, setGameDetails] = useState({ gameId: 1, betButtonId: "", colorCode: "" })
  const [noteValue, setNoteValue] = useState(notes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [gameHistoryData, setGameHistoryData] = useState([])
  const [gameHistoryDataPagination, setGameHistoryDataPagination] = useState("")
  const [myHistoryData, setMyHistoryData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [myHistoryCurrentPage, setMyHistoryCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMyHistory, setIsLoadingMyHistory] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [myHistoryHasMore, setMyHistoryHasMore] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBetDone, setIsBetDone] = useState(false);
  const [playRule, setPlayRule] = useState(false);
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(1)
  const [timeLeft, setTimeLeft] = useState(0);
  const { timers, setEventName } = useSocket();

  useEffect(() => {
    // setEventName("demo_wingotrx");
    setEventName("bdgcasino_wingo");
  }, [setEventName]);
  useEffect(() => {
    const selectedTime =
      gameDetails.gameId === 1 ? timers.type1 :
        gameDetails.gameId === 2 ? timers.type2 :
          gameDetails.gameId === 3 ? timers.type3 :
            gameDetails.gameId === 4 ? timers.type4 :
              timers.type1;

    setTimeLeft(selectedTime);
  }, [timers, gameDetails.gameId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const audioRef = useRef(null);
  const [isAudioOn, setIsAudioOn] = useState(true)
  const userId = localStorage.getItem("userId");
  const limit = 10;

  useEffect(() => {

    if (timers.type1 === 28) {
      // console.log("winAmountAnnouncement1")
      winAmountAnnouncement1(1)
      profileDetails()
      myHistory()
      gameHistory()
    }
    if (timers.type2 === 58) {
      // console.log("winAmountAnnouncement2")
      winAmountAnnouncement2(2)
      profileDetails()
      myHistory()
      gameHistory()
    }
    if (timers.type3 === 178) {
      // console.log("winAmountAnnouncement2")
      winAmountAnnouncement3(3)
      profileDetails()
      myHistory()
      gameHistory()
    }
    if (timers.type4 === 298) {
      // console.log("winAmountAnnouncement4")
      winAmountAnnouncement4(4)
      profileDetails()
      myHistory()
      gameHistory()
    }
    if (timers.type1 === 6) {
      setBetModal(false)
    }
    if (timers.type2 === 6) {
      setBetModal(false)
    }
    if (timers.type3 === 6) {
      setBetModal(false)
    }
    if (timers.type4 === 6) {
      setBetModal(false)
    }
  }, [timeLeft])

  const handleTimerClick = (item, duration) => {
    setSelectedImgIndex(item);
    setCallTimer(duration)
  };
  const gameDetailsHandler = (item) => {
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      gameId: item?.gameid
    }));
    handleTimerClick(item.time, item.duration);
  };
  const handleBtnClick = (color, betButtonId, numericValueFromProps = null) => {
    const numericValue = numericValueFromProps !== null ? numericValueFromProps : -1;
    setBetModal(true);
    setBetGameId(gameDetails.gameId)
    setGameDetails({ ...gameDetails, betButtonId: betButtonId, colorCode: color, numericValue });
  };
  const handleRandomClick = (numericValueFromProps = null) => {
    const totalImages = 10;
    let currentIndex = 0;

    const randomIndices = Array.from({ length: totalImages }, (_, i) => i).sort(() => Math.random() - 0.5);

    const zoomImage = () => {
      if (currentIndex < randomIndices.length) {
        const buttons = document.querySelectorAll('.image-button');
        const currentButton = buttons[randomIndices[currentIndex]];

        if (currentButton) {
          currentButton.classList.add('scale-125', 'transition-transform', 'duration-500');
          setTimeout(() => {
            currentButton.classList.remove('scale-125');
            currentIndex += 1;
            zoomImage();
          }, 200);
        }
      } else {
        const randomIndex = Math.floor(Math.random() * totalImages);
        const ballColor =
          [0].includes(randomIndex) ? "rv" :
            [5].includes(randomIndex) ? "gv" :
              [2, 4, 6, 8].includes(randomIndex) ? "r" :
                "g";
        handleBtnClick(ballColor, randomIndex, numericValueFromProps);
      }
    };

    zoomImage();
  };

  const handlehistoryClick = (buttonValue) => {
    setSelectedHistoryIndex(buttonValue);
    sethandlehistorybox(buttonValue)
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
        setNoteValue(notes[(currentIndex + 1) % notes.length]);

        setAnimate(false);
      }, 1000);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentIndex, notes]);

  const handleCloseModal = (v) => {
    // console.log("vvvvvvvvvvvvvvvvvv",v)
    setTimerModal(v);
  };

  useEffect(() => {
    if (fifthDivRef.current) {
      setFifthDivWidth(fifthDivRef.current.offsetWidth);
    }
  }, []);

  const profileDetails = async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await axios.get(`${profileApi}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data?.data)
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      profileDetails();
    }
  }, [userId]);

  const winAmountAnnouncement1 = async (i) => {
    // console.log("111111 primnntttttt")

    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log("resres url url", `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)

      console.log("resres hai hai 3030", res?.data?.data)
      if (res?.data?.status === 200) {
        console.log("wingo win announcement api: ", `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)
        try {
          const resp = await axios.get(`${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)
          console.log("wingo win announcement res:", resp);
          if (resp?.data?.status === 200) {
            // console.log("res 1", resp)
            // toast.success(`You ${resp?.data?.data?.result} ${resp?.data?.data?.win} for 30s`)
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  const winAmountAnnouncement2 = async (i) => {
    // console.log("2222")
    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log("resres hai hai", res)
      // console.log("resres url url", `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)
      if (res?.data?.status === 200) {
        try {
          const resp = await axios.get(`${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)
          if (resp?.data?.status === 200) {
            // console.log("res 2", resp)
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  const winAmountAnnouncement3 = async (i) => {
    // console.log("3333")

    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log('333', res)
      if (res?.data?.status === 200) {
        try {
          const resp = await axios.get(`${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)
          if (resp?.data?.status === 200) {
            // console.log("res 3", resp)
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  const winAmountAnnouncement4 = async (i) => {
    // console.log("44444")
    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log("4444", res)
      if (res?.data?.status === 200) {
        try {
          const resp = await axios.get(`${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`)
          if (resp?.data?.status === 200) {
            // console.log("res 4", resp)
            // toast.success(`You ${resp?.data?.data?.result} ${resp?.data?.data?.win} for 5 min`)
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const myHistory = async () => {
    if (!userId) {
      return;
    }
    if (isLoadingMyHistory || !myHistoryHasMore) return
    setIsLoadingMyHistory(true)
    const offset = (myHistoryCurrentPage - 1) * limit;
    const payload = {
      userid: userId,
      game_id: gameDetails?.gameId,
      limit,
      offset
    }
    try {
      console.log(`my history api : ${wingo_my_history}`)
      const res = await axios.post(`${wingo_my_history}`, payload)
      console.log("my history:",res)
      if (res?.status === 200) {
        setMyHistoryData(res?.data)
        if (res?.data?.data?.length < limit) {
          setMyHistoryHasMore(true);
        }
      }
    } catch (err) {
      console.log(err)
      setMyHistoryData(err?.data);
    } finally {
      setIsLoadingMyHistory(false);
    }
  }
  const gameHistory = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * limit;
       console.log(
         `result api:${wingo_game_history}?game_id=${gameDetails?.gameId}&limit=${limit}&offset=${offset}`
       );
      const res = await axios.get(
        `${wingo_game_history}?game_id=${gameDetails?.gameId}&limit=${limit}&offset=${offset}`
      );
      // console.log(`result res:`,res)
      if (res?.data?.status === 200) {
        setGameHistoryData(res?.data?.data);
        setGameHistoryDataPagination(res?.data);
        if (res?.data?.data?.length < limit) {
          setHasMore(true);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const nextPage = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const myHistoryNextPage = () => {
    if (myHistoryHasMore) {
      setMyHistoryCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const myHistoryPrevPage = () => {
    if (myHistoryCurrentPage > 1) {
      setMyHistoryCurrentPage((prevPage) => prevPage - 1);
    }
  };


  useEffect(() => {
    myHistory()
    gameHistory()
  }, [gameDetails?.gameId, currentPage, myHistoryCurrentPage])
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioOn && timeLeft > 0 && timeLeft < 6) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [timeLeft, isAudioOn]);
  // console.log("myDetails",myDetails)
  return (
    <>
      {isModalVisible && modalData && (
        <div className="relative z-50 font-roboto">
          <WingoWinnerAnnoucement
            data={modalData}
            onClose={() => setIsModalVisible(false)}
          />
        </div>
      )}
      <Header
        audioRef={audioRef}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
      />
      <div className="h-screen overflow-scroll hide-scrollbar">
        <audio ref={audioRef} src={countdownone} preload="auto" />
        <div className=" h-full font-roboto">
          <div className="bg-red h-[19rem] rounded-b-[55px] px-4 pt-2">
            {/* 1st div */}
            <div
              className="p-5 h-[9rem] text-white bg-[#4D4D4C] rounded-3xl "
              style={{
                backgroundImage: `url(${walletbg})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex justify-center gap-0 items-center">
                <p className="font-semibold text-xl">
                  <span className="text-white"> ₹</span>
                  <b className="text-xl"></b> &nbsp;
                  {myDetails?.wallet?.toFixed(2)}
                </p>
                <button onClick={profileDetails}>
                  <HiArrowPathRoundedSquare size={20} className="text-gray " />
                </button>
              </div>
              <div className="flex justify-center gap-2 items-center">
                <img className="h-5 w-5 " src={mainWallet2} alt="not found" />
                <p className="text-xsm ">Wallet balance </p>
              </div>
              <div className="mt-6 text-white flex justify-between items-center">
                <Link to="/wallet/withdrawal">
                  <button className="bg-rose-800 text-base font-semibold w-32 h-9 rounded-full">
                    Withdraw
                  </button>
                </Link>
                <Link to="/wallet/deposit">
                  <button className="bg-green text-base font-semibold w-32 h-9 rounded-full">
                    Deposit
                  </button>
                </Link>
              </div>
            </div>

            {/* 2nd div */}
            <div className="flex justify-between w-full bg-redLight p-2 rounded-full text-white opacity-75 mt-6 items-center">
              <div className="h-7 flex items-center overflow-hidden">
                <img className="h-5 w-5" src={micphone} alt="ds" />{" "}
                <div
                  className={`flex-1 xsm:flex-0 font-bold w-full pl-1  text-[10px] xsm:text-xs overflow-hidden text-ellipsis whitespace-normal break-words transition-transform duration-1000 ease-in-out ${
                    animate
                      ? "transform -translate-y-full"
                      : "transform translate-y-0"
                  }`}
                  style={{
                    transform: animate ? "translateY(-100%)" : "translateY(0)",
                  }}
                >
                  {noteValue}
                </div>
              </div>
              <div className="shrink-0 py-0.5 text-xsm px-4 bg-gradient-to-r from-[#EDD188] to-[#C79744] text-black  flex gap-1 justify-center items-center  rounded-3xl">
                <RiFireFill className="text-black" />
                Detail
              </div>
            </div>

            {/* game id 3rd div */}
            <div className="bg-redLight text-[12.8px] grid grid-cols-4 w-full rounded-xl mt-5">
              {[
                { label: "Win Go", time: "30s", duration: 30, gameid: 1 },
                { label: "Win Go", time: "1Min", duration: 60, gameid: 2 },
                { label: "Win Go", time: "3Min", duration: 180, gameid: 3 },
                { label: "Win Go", time: "5Min", duration: 300, gameid: 4 },
              ].map((item) => (
                <div
                  key={item.time}
                  className={`flex flex-col col-span-1 rounded-xl items-center px-2 py-2 cursor-pointer ${
                    selectedIMgIndex === item.time
                      ? "bg-gradient-to-b from-[#EDD188] to-[#C79744] text-[#975206]"
                      : ""
                  }`}
                  onClick={() => {
                    gameDetailsHandler(item);
                    handleTimerClick(item.time, item.duration);
                  }}
                >
                  <img
                    src={selectedIMgIndex === item.time ? redWatch : grayWatch}
                    className="h-12  w-12"
                    alt="timer"
                  />
                  <p
                    className={`text-nowrap font-normal ${
                      selectedIMgIndex === item.time
                        ? ""
                        : "text-white opacity-60"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`font-normal  ${
                      selectedIMgIndex === item.time
                        ? ""
                        : "text-white opacity-60"
                    }`}
                  >
                    {item.time}
                  </p>
                </div>
              ))}
            </div>

            {/* game timer 4th div */}
            <div
              className="flex  justify-between p-3 mt-5 rounded-2xl"
              style={{
                backgroundImage: `url(${cutBg1})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
              }}
            >
              <div className="w-[50%] pr-3 text-[#975206]">
                <button
                  onClick={() => setPlayRule(true)}
                  className="flex items-center justify-center  border border-red w-full text-xsm  py-0.5 rounded-2xl "
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M23.67 3H12.33C6.66 3 5.25 4.515 5.25 10.56V27.45C5.25 31.44 7.44 32.385 10.095 29.535L10.11 29.52C11.34 28.215 13.215 28.32 14.28 29.745L15.795 31.77C17.01 33.375 18.975 33.375 20.19 31.77L21.705 29.745C22.785 28.305 24.66 28.2 25.89 29.52C28.56 32.37 30.735 31.425 30.735 27.435V10.56C30.75 4.515 29.34 3 23.67 3ZM11.67 18C10.845 18 10.17 17.325 10.17 16.5C10.17 15.675 10.845 15 11.67 15C12.495 15 13.17 15.675 13.17 16.5C13.17 17.325 12.495 18 11.67 18ZM11.67 12C10.845 12 10.17 11.325 10.17 10.5C10.17 9.675 10.845 9 11.67 9C12.495 9 13.17 9.675 13.17 10.5C13.17 11.325 12.495 12 11.67 12ZM24.345 17.625H16.095C15.48 17.625 14.97 17.115 14.97 16.5C14.97 15.885 15.48 15.375 16.095 15.375H24.345C24.96 15.375 25.47 15.885 25.47 16.5C25.47 17.115 24.96 17.625 24.345 17.625ZM24.345 11.625H16.095C15.48 11.625 14.97 11.115 14.97 10.5C14.97 9.885 15.48 9.375 16.095 9.375H24.345C24.96 9.375 25.47 9.885 25.47 10.5C25.47 11.115 24.96 11.625 24.345 11.625Z"
                      fill="currentColor"
                    ></path>
                  </svg>{" "}
                  How to play
                </button>
                <p className="text-xsm  mt-4">
                  Win Go {selectedIMgIndex}
                </p>
                <div className="flex text-black items-center justify-between mt-3">
                  <img
                    src={images[gameHistoryData[0]?.number]}
                    className="w-7"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[1]?.number]}
                    className="w-7"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[2]?.number]}
                    className="w-7"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[3]?.number]}
                    className="w-7"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[4]?.number]}
                    className="w-7"
                    alt="asdf"
                  />
                </div>
              </div>
              <div className="w-[50%] text-[#975206]">
                <p className="text-xsm  text-end font-semibold">
                  Time remaining
                </p>
                <div className="flex justify-end items-center gap-1 mt-1 w-full text-sm">
                  <LotteryTimer timeLeft={timeLeft} duration={callTimer} />
                </div>
                <p className="flex justify-end text-sm 3xl:text-[1.2rem] font-extrabold mt-3">
                  {Number(gameHistoryData[0]?.games_no) + 1}
                </p>
              </div>
            </div>
          </div>
          {/* betting buttons 5th divv */}
          <div
            ref={fifthDivRef}
            className=" bg-redLight mt-[13rem] xsm:mt-[12.5rem] md:mt-[12rem]  p-3 mx-4 rounded-2xl"
          >
            <div className="flex items-center bg-rose-900 justify-center mr-1">
              <TimerModal
                timeLeft={timeLeft}
                duration={callTimer}
                isOpen={false}
                parentRef={fifthDivRef}
                onClose={(v) => handleCloseModal(v)}
                style={{ width: fifthDivWidth }}
              />
            </div>
            <div className="flex justify-between gap-5">
              <button
                onClick={() => handleBtnClick("green", 10)}
                className={`${
                  timerModal ? "" : "relative z-10"
                }  w-24  h-10 rounded-bl-lg rounded-tr-lg  bg-green text-xsm  `}
              >
                Green
              </button>
              <button
                onClick={() => handleBtnClick("voilet", 20)}
                className={`${
                  timerModal ? "" : "relative z-10"
                } w-24 h-10 rounded-lg  bg-voilet text-xsm `}
              >
                Violet
              </button>
              <button
                onClick={() => handleBtnClick("red", 30)}
                className={`${
                  timerModal ? "" : "relative z-10"
                } w-24 h-10  rounded-tl-lg rounded-br-lg  bg-customred text-xsm `}
              >
                Red
              </button>
            </div>
            <div className="bg-red mt-5 rounded-lg p-2">
              {[0, 1].map((row) => (
                <div
                  key={row}
                  className={`flex items-center gap-2 ${
                    row === 1 ? "mt-2" : ""
                  }`}
                >
                  {images.slice(row * 5, row * 5 + 5).map((imgSrc, index) => {
                    const actualIndex = row * 5 + index;
                    const ballColor = [0].includes(actualIndex)
                      ? "rv"
                      : [5].includes(actualIndex)
                      ? "gv"
                      : [2, 4, 6, 8].includes(actualIndex)
                      ? "r"
                      : "g";
                    return (
                      <button
                        key={index}
                        className={`image-button ${
                          timerModal ? "" : "relative z-10"
                        } w-[18%] xsm:w-[61.5px] h-[18%] xsm:h-[50.5px]`}
                      >
                        <img
                          onClick={() => handleBtnClick(ballColor, actualIndex)}
                          src={imgSrc}
                          className="h-full xsm:h-14 w-full"
                          alt="ball"
                        />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleRandomClick(selectedBtnIndex)}
                className={`${
                  timerModal ? "" : "relative z-10"
                }flex items-center justify-center text-xsm w-[26%] py-1 sm:py-2 text-customred border border-customred rounded-lg`}
              >
                Random
              </button>
              {["X1", "X5", "X10", "X20", "X50", "X100"].map((value, i) => {
                const numericValue = parseInt(value.slice(1), 10);
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedBtnIndex(numericValue)}
                    className={`${
                      timerModal ? "" : "relative z-10"
                    } flex items-center justify-center text-xs w-[11%] rounded-lg ${
                      selectedBtnIndex === numericValue
                        ? "bg-green text-white"
                        : "bg-red text-gray"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            <div className="w-full mt-3 flex">
              <button
                onClick={() => handleBtnClick("yellow", 40)}
                className={`${
                  timerModal ? "bg-yellow" : "relative z-10 bg-yellow"
                } rounded-l-full w-[50%] py-2 text-center text-xsm`}
              >
                Big
              </button>
              <button
                onClick={() => handleBtnClick("bg3", 50)}
                className={`${
                  timerModal ? "bg-bg3" : "relative z-10 bg-bg3"
                } rounded-r-full w-[50%] py-2 text-center text-xsm `}
              >
                Small
              </button>
            </div>
          </div>
          <div className="mt-3 px-4 flex gap-2">
            {["Game History", "Chart", "My history"].map((value, i) => (
              <button
                key={i}
                onClick={() => handlehistoryClick(i)}
                className={`flex items-center justify-center w-[33%] text-xsm py-2 rounded-lg ${
                  selectedHistoryIndex === i
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#925506] font-semibold"
                    : "bg-[#333332] text-[#929285]"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* game history  */}
          <GameHistoryBox
            isVisible={handlehistorybox === 0}
            gameHistoryData={gameHistoryData}
          />
          {/* Chart */}
          <WingoChart
            handlehistorybox={handlehistorybox}
            gameHistoryData={gameHistoryData}
          />
          {/* my history */}
          <WingoMyHistory
            myHistoryData={myHistoryData}
            handlehistorybox={handlehistorybox}
          />
          {/* pagination div */}

          {handlehistorybox === 2 ? (
            <WingoPagination
              currentPage={myHistoryCurrentPage}
              totalPages={`/${Math.ceil(myHistoryData?.total_bets / 10)}`}
              hasMore={myHistoryHasMore}
              onPrevClick={myHistoryPrevPage}
              onNextClick={myHistoryNextPage}
              prevDisabled={myHistoryCurrentPage === 1}
              nextDisabled={!myHistoryHasMore}
            />
          ) : handlehistorybox === 1 ? (
            <div className="-mt-[30px] z-50">
              <WingoPagination
                currentPage={currentPage}
                totalPages={`/${Math.ceil(
                  gameHistoryDataPagination?.total_result / 10
                )}`}
                hasMore={hasMore}
                onPrevClick={prevPage}
                onNextClick={nextPage}
                prevDisabled={currentPage === 1}
                nextDisabled={!hasMore}
              />
            </div>
          ) : (
            <WingoPagination
              currentPage={currentPage}
              totalPages={`/${Math.ceil(
                gameHistoryDataPagination?.total_result / 10
              )}`}
              hasMore={hasMore}
              onPrevClick={prevPage}
              onNextClick={nextPage}
              prevDisabled={currentPage === 1}
              nextDisabled={!hasMore}
            />
          )}
        </div>
        {/* bet modal */}
        {betModal && !false && (
          <div className="relative z-50">
            <LotteryBetModal
              gameHistoryData={gameHistoryData}
              setIsBetDone={setIsBetDone}
              profileDetails={profileDetails}
              myHistory={myHistory}
              bet_api={wingo_bet_api}
              gameDetails={gameDetails}
              onClose={() => setBetModal(false)}
            />
          </div>
        )}
        <WingoRules
          playRule={playRule}
          gameDetails={gameDetails}
          setPlayRule={setPlayRule}
        />
      </div>
    </>
  );
};

export default WinGo;