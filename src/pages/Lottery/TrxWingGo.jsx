import { useEffect, useRef, useState } from "react";
import zero from "../../assets/images/zero.png";
import one from "../../assets/images/one.png";
import two from "../../assets/images/two.png";
import three from "../../assets/images/three.png";
import four from "../../assets/images/four.png";
import five from "../../assets/images/five.png";
import six from "../../assets/images/six.png";
import seven from "../../assets/images/seven.png";
import eight from "../../assets/images/eight.png";
import nine from "../../assets/images/nine.png";
import howtoplay from "../../assets/icons/howtoplay.png";
import LotteryTimer from "../../reusable_component/LotteryTimer";
import TimerModal from "../../reusable_component/TimerModal";
import LotteryBetModal from "../../reusable_component/LotteryBetModal";
import { toast } from "react-toastify";
import apis from "../../utils/apis";
import axios from "axios";
import WingoMyHistory from "../../reusable_component/WingoMyHistory";
import WingoChart from "../../reusable_component/WingoChart";
import WingoWinnerAnnoucement from "../../reusable_component/WingoWinnerAnnoucement";
import GameHistoryBox from "../../reusable_component/WingoGameHistory";
import WingoPagination from "../../reusable_component/WingoPagination";
import countdownone from "../../assets/music/countdownone.mp3";
import mainWallet from "../../assets/usaAsset/wingo/mainWallet.png";
import voiceoff from "../../assets/usaAsset/wingo/voice-off.png";
import cutBg1 from "../../assets/usaAsset/trx/bg_cut.png";
import grayWatch from "../../assets/usaAsset/wingo/grayWatch.png";
import redWatch from "../../assets/usaAsset/wingo/redWatch.png";
import { Link, NavLink } from "react-router-dom";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { RiFireFill } from "react-icons/ri";
import Header from "../../components/Header";
import LotteryTimerTrx from "../../reusable_component/LotteryTimerTrx";
import GameHistoryBoxTrx from "../../reusable_component/GameHistoryBoxTrx";
import ChartTrx from "../../reusable_component/ChartTrx";
import MyHistoryTrx from "../../reusable_component/MyHistoryTrx";
import a from "../../assets/usaAsset/trx/a.png";
import b from "../../assets/usaAsset/trx/b.png";
import c from "../../assets/usaAsset/trx/c.png";
import d from "../../assets/usaAsset/trx/d.png";
import e from "../../assets/usaAsset/trx/e.png";
import f from "../../assets/usaAsset/trx/f.png";
import g from "../../assets/usaAsset/trx/g.png";
import h from "../../assets/usaAsset/trx/h.png";
import i from "../../assets/usaAsset/trx/i.png";
import j from "../../assets/usaAsset/trx/j.png";
import k from "../../assets/usaAsset/trx/k.png";
import l from "../../assets/usaAsset/trx/l.png";
import m from "../../assets/usaAsset/trx/m.png";
import n from "../../assets/usaAsset/trx/n.png";
import o from "../../assets/usaAsset/trx/o.png";
import p from "../../assets/usaAsset/trx/p.png";
import q from "../../assets/usaAsset/trx/q.png";
import r from "../../assets/usaAsset/trx/r.png";
import s from "../../assets/usaAsset/trx/s.png";
import t from "../../assets/usaAsset/trx/t.png";
import u from "../../assets/usaAsset/trx/u.png";
import v from "../../assets/usaAsset/trx/v.png";
import w from "../../assets/usaAsset/trx/w.png";
import x from "../../assets/usaAsset/trx/x.png";
import y from "../../assets/usaAsset/trx/y.png";
import z from "../../assets/usaAsset/trx/z.png";
import num0 from "../../assets/usaAsset/trx/num0.png";
import num1 from "../../assets/usaAsset/trx/num1.png";
import num2 from "../../assets/usaAsset/trx/num2.png";
import num3 from "../../assets/usaAsset/trx/num3.png";
import num4 from "../../assets/usaAsset/trx/num4.png";
import num5 from "../../assets/usaAsset/trx/num5.png";
import num6 from "../../assets/usaAsset/trx/num6.png";
import num7 from "../../assets/usaAsset/trx/num7.png";
import num8 from "../../assets/usaAsset/trx/num8.png";
import num9 from "../../assets/usaAsset/trx/num9.png";
import prize0 from "../../assets/usaAsset/trx/prize0.png";
import prize1 from "../../assets/usaAsset/trx/prize1.png";
import prize2 from "../../assets/usaAsset/trx/prize2.png";
import prize3 from "../../assets/usaAsset/trx/prize3.png";
import prize4 from "../../assets/usaAsset/trx/prize4.png";
import prize5 from "../../assets/usaAsset/trx/prize5.png";
import prize6 from "../../assets/usaAsset/trx/prize6.png";
import prize7 from "../../assets/usaAsset/trx/prize7.png";
import prize8 from "../../assets/usaAsset/trx/prize8.png";
import prize9 from "../../assets/usaAsset/trx/prize9.png";
import TimerModalTrx from "../../reusable_component/TimerModalTrx";
import WingoWinnerAnnoucementTrx from "../../reusable_component/WingoWinnerAnnoucementTrx";
import LotteryBetModalTrx from "../../reusable_component/LotteryBetModalTrx";
import { useSocket } from "../../shared/socket/SocketContext";
import walletbg from "../../assets/usaAsset/walletbg.png";

const profileApi = apis.profile;
const wingo_bet_api = apis.wingo_bet;
const wingo_my_history = apis.wingo_my_history;
const wingo_game_history = apis.wingo_game_history;
const get_result_trx = apis.get_result_trx;
const wingo_win_amount_announcement = apis.wingo_win_amount_announcement;
const images = [zero, one, two, three, four, five, six, seven, eight, nine];
const imagesNum = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];
const imagesPrize = [
  prize0,
  prize1,
  prize2,
  prize3,
  prize4,
  prize5,
  prize6,
  prize7,
  prize8,
  prize9,
];
const imagesAlphbet = [
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  x,
  y,
  z,
];
const notes = [
  "Notice:To visit our official website, be sure to use the link below,https://gameon.deals/",
  "Notice:To visit our official website, be sure to use the link below,https://gameon.deals/",
  "Notice:To visit our official website, be sure to use the link below,https://gameon.deals/",
  // "Please be sure to always use our official website for playing the games with the fol",
  // "If your deposit is not received, Please send it directly to Tiranga Games Self-service Ce"
];
const TrxWinGo = () => {
  const { timers, setEventName } = useSocket();
  const [myDetails, setMyDetails] = useState(null);
  const [betGameId, setBetGameId] = useState(null);
  const [selectedIMgIndex, setSelectedImgIndex] = useState("1Min");
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);
  const [handlehistorybox, sethandlehistorybox] = useState(0);
  const [callTimer, setCallTimer] = useState(60);
  const [timerModal, setTimerModal] = useState(false);
  const [betModal, setBetModal] = useState(false);
  const [fifthDivWidth, setFifthDivWidth] = useState(null);
  const fifthDivRef = useRef();
  const [gameDetails, setGameDetails] = useState({
    gameId: 6,
    betButtonId: "",
    colorCode: "",
  });
  const [timeLeft, setTimeLeft] = useState(0);
  const [noteValue, setNoteValue] = useState(notes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [gameHistoryData, setGameHistoryData] = useState([]);
  const [gameHistoryDataPagination, setGameHistoryDataPagination] =
    useState("");
  const [myHistoryData, setMyHistoryData] = useState([]);
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
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(1);
  const audioRef = useRef(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [nextPeriod, setnextPeriod] = useState(
    Number(gameHistoryData[0]?.period)
  );
  const userId = localStorage.getItem("userId");
  const limit = 10;
  useEffect(() => {
    setEventName("demo_wingotrx");
  }, [setEventName]);
  useEffect(() => {
    const selectedTime =
      gameDetails.gameId === 6
        ? timers.type2
        : gameDetails.gameId === 7
        ? timers.type3
        : gameDetails.gameId === 8
        ? timers.type4
        : gameDetails.gameId === 9
        ? timers.type5
        : timers.type2;

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
  const handleTimerClick = (item, duration) => {
    setSelectedImgIndex(item);
    setCallTimer(duration);
  };
  const gameDetailsHandler = (item) => {
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      gameId: item?.gameid,
    }));
    handleTimerClick(item.time, item.duration);
  };
  const handleBtnClick = (color, betButtonId, numericValueFromProps = null) => {
    const numericValue =
      numericValueFromProps !== null ? numericValueFromProps : -1;
    setBetModal(true);
    setBetGameId(gameDetails.gameId);
    setGameDetails({
      ...gameDetails,
      betButtonId: betButtonId,
      colorCode: color,
      numericValue,
    });
  };
  const handleRandomClick = (numericValueFromProps = null) => {
    const totalImages = 10;
    let currentIndex = 0;

    const randomIndices = Array.from({ length: totalImages }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );

    const zoomImage = () => {
      if (currentIndex < randomIndices.length) {
        const buttons = document.querySelectorAll(".image-button");
        const currentButton = buttons[randomIndices[currentIndex]];

        if (currentButton) {
          currentButton.classList.add(
            "scale-125",
            "transition-transform",
            "duration-500"
          );
          setTimeout(() => {
            currentButton.classList.remove("scale-125");
            currentIndex += 1;
            zoomImage();
          }, 200);
        }
      } else {
        const randomIndex = Math.floor(Math.random() * totalImages);
        const ballColor = [0].includes(randomIndex)
          ? "rv"
          : [5].includes(randomIndex)
          ? "gv"
          : [2, 4, 6, 8].includes(randomIndex)
          ? "r"
          : "g";

        handleBtnClick(ballColor, randomIndex, numericValueFromProps);
      }
    };

    zoomImage();
  };

  const handlehistoryClick = (buttonValue) => {
    setSelectedHistoryIndex(buttonValue);
    sethandlehistorybox(buttonValue);
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
        setMyDetails(res?.data?.data);
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
    // console.log("111111", i);
    try {
      const offset = (currentPage - 1) * limit;
      // console.log("`${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`",`${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`)
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log("res?.data?.data", res);
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        try {
          const resp = await axios.get(
            `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`
          );
          // console.log(
          //   "sfsgdr",
          //   `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`
          // );
          // console.log("announcement", resp);
          if (resp?.data?.status === 200) {
            // console.log("res 1", resp);
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const winAmountAnnouncement2 = async (i) => {
    // console.log("2222");
    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log("resres hai hai", res);
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        try {
          // console.log(
          //   "sfsgdr",
          //   `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&period_no=${res?.data?.data[0]?.games_no}`
          // );
          const resp = await axios.get(
            `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&period_no=${res?.data?.data[0]?.games_no}`
          );
          // console.log("res 2", resp);
          if (resp?.data?.status === 200) {
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const winAmountAnnouncement3 = async (i) => {
    // console.log("3333");

    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        try {
          const resp = await axios.get(
            `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`
          );

          if (resp?.data?.status === 200) {
            // console.log("res 3", resp);
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const winAmountAnnouncement4 = async (i) => {
    // console.log("44444");
    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${i}&limit=${limit}&offset=${offset}`
      );
      // console.log("first", res);
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        try {
          const resp = await axios.get(
            `${wingo_win_amount_announcement}?userid=${userId}&game_id=${i}&games_no=${res?.data?.data[0]?.games_no}`
          );
          if (resp?.data?.status === 200) {
            // console.log("res 4", resp);
            const data = resp?.data?.data;
            setModalData(data);
            setIsModalVisible(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const myHistory = async () => {
    if (!userId) {
      return;
    }
    // if (isLoadingMyHistory || !myHistoryHasMore) return toast.error("failed my histro");
    if (isLoadingMyHistory || !myHistoryHasMore) return;
    setIsLoadingMyHistory(true);
    const offset = (myHistoryCurrentPage - 1) * limit;
    const payload = {
      userid: userId,
      game_id: gameDetails?.gameId,
      limit,
      offset,
    };
    // console.log("my history payload",wingo_my_history)
    try {
      const res = await axios.post(`${wingo_my_history}`, payload);
      // console.log("my history", res);
      if (res?.status === 200) {
        setMyHistoryData(res?.data);
        // console.log("res?.data", res?.data)
        if (res?.data?.data?.length < limit) {
          setMyHistoryHasMore(true);
        }
      }
    } catch (err) {
      console.log(err);
      setMyHistoryData(err?.data);
    } finally {
      setIsLoadingMyHistory(false);
    }
  };
  const gameHistory = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get(
        `${wingo_game_history}?game_id=${gameDetails?.gameId}&limit=${limit}&offset=${offset}`
      );
      // console.log("urls", `${'${wingo_game_history}'}?gameid=${gameDetails?.gameId}&offset=${offset}&limit=${limit}`)
      // console.log("res game histiry", res);
      if (res?.data?.status === "200" || res?.data?.status === 200) {
        // console.log("Number(res?.data?.data[0]?.period)",(typeof Number(res?.data?.data[0]?.period)))
        setGameHistoryData(res?.data?.data);
        // console.log("res?.data?.data[0]",res?.data?.data[0])
        const n = res?.data?.data[0]?.games_no.slice(7);
        setnextPeriod(n);
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
    if (timers.type2 === 58) {
      winAmountAnnouncement1(6);
      profileDetails();
      myHistory();
      gameHistory();
    }
    if (timers.type3 === 178) {
      winAmountAnnouncement2(7);
      profileDetails();
      myHistory();
      gameHistory();
    }
    if (timers.type4 === 298) {
      winAmountAnnouncement3(8);
      profileDetails();
      myHistory();
      gameHistory();
    }
    if (timers.type5 === 598) {
      winAmountAnnouncement4(9);
      profileDetails();
      myHistory();
      gameHistory();
    }
    if (timers.type2 === 11) {
      setBetModal(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    myHistory();
    gameHistory();
    // const betStatus = localStorage.getItem("betStatus")
    // if (betStatus == 1) {
    //   // winAmountAnnouncement()
    // }
  }, [gameDetails?.gameId, currentPage, myHistoryCurrentPage]);
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioOn && timeLeft > 0 && timeLeft < 11) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [timeLeft, isAudioOn]);
  // console.log("gameHistoryDatagameHistoryData", gameHistoryData);
  // const result = gameHistoryData?.length>0&& gameHistoryData[0]?.token;
  // const firstChar =gameHistoryData?.length>0&& gameHistoryData[0]?.five_digit_value[0];
  // // console.log("firstCharfirstChar",firstChar)
  // let imageSrc;

  // if (!isNaN(firstChar) && Number(firstChar) === result) {
  //   imageSrc = imagesPrize[Number(firstChar)];
  // } else if (!isNaN(firstChar)) {
  //   imageSrc = imagesNum[Number(firstChar)];
  // } else {
  //   const charIndex = firstChar?.toLowerCase()?.charCodeAt(0) - 97;
  //   imageSrc = imagesAlphbet[charIndex];
  // }

  // const secondChar =gameHistoryData?.length>0&& gameHistoryData[0]?.five_digit_value[1];
  // // console.log("firstCharfirstChar",firstChar)
  // let imageSrc1;

  // if (!isNaN(secondChar) && Number(secondChar) === result) {
  //   imageSrc1 = imagesPrize[Number(secondChar)];
  // } else if (!isNaN(secondChar)) {
  //   imageSrc1 = imagesNum[Number(secondChar)];
  // } else {
  //   const charIndex = secondChar?.toLowerCase()?.charCodeAt(0) - 97;
  //   imageSrc1 = imagesAlphbet[charIndex];
  // }
  // const thirdChar = gameHistoryData[0]?.five_digit_value[2];
  // // console.log("firstCharfirstChar",firstChar)
  // let imageSrc2;

  // if (!isNaN(thirdChar) && Number(thirdChar) === result) {
  //   imageSrc2 = imagesPrize[Number(thirdChar)];
  // } else if (!isNaN(thirdChar)) {
  //   imageSrc2 = imagesNum[Number(thirdChar)];
  // } else {
  //   const charIndex = thirdChar?.toLowerCase()?.charCodeAt(0) - 97;
  //   imageSrc2 = imagesAlphbet[charIndex];
  // }

  // const fourthChar = gameHistoryData[0]?.five_digit_value[3];
  // // console.log("firstCharfirstChar",firstChar)
  // let imageSrc3;

  // if (!isNaN(fourthChar) && Number(fourthChar) === result) {
  //   imageSrc3 = imagesPrize[Number(fourthChar)];
  // } else if (!isNaN(fourthChar)) {
  //   imageSrc3 = imagesNum[Number(fourthChar)];
  // } else {
  //   const charIndex = fourthChar?.toLowerCase()?.charCodeAt(0) - 97;
  //   imageSrc3 = imagesAlphbet[charIndex];
  // }
  // const fiveChar = gameHistoryData[0]?.five_digit_value[4];
  // // console.log("firstCharfirstChar",firstChar)
  // let imageSrc4;

  // if (!isNaN(fiveChar) && Number(fiveChar) === result) {
  //   imageSrc4 = imagesPrize[Number(fiveChar)];
  // } else if (!isNaN(fiveChar)) {
  //   imageSrc4 = imagesNum[Number(fiveChar)];
  // } else {
  //   const charIndex = fiveChar?.toLowerCase()?.charCodeAt(0) - 97;
  //   imageSrc4 = imagesAlphbet[charIndex];
  // }
  // console.log("modalDatamodalData",modalData)
  // console.log("gameHistoryDataPaginationgameHistoryDataPaginati  on", BigInt(gameHistoryDataPagination?.nextPeriod)+BigInt(1))
  // console.log("gameHistoryDataPaginationgameHistoryDataPagination", modalData)
  return (
    <>
      {isModalVisible && modalData && (
        <div className="relative z-50 font-roboto">
          <WingoWinnerAnnoucementTrx
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
              className="p-5 h-[9rem] text-white bg-[#374992] rounded-3xl "
              style={{
                backgroundImage: `url(${walletbg})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex justify-center gap-8 items-center">
                <p className="font-semibold text-xl">
                  <b className="text-xl"></b> &nbsp;
                  {myDetails?.wallet.toFixed(2)}
                </p>
                <button onClick={profileDetails}>
                  <HiArrowPathRoundedSquare
                    size={20}
                    className="text-lightGray "
                  />
                </button>
              </div>
              <div className="flex justify-center gap-2 items-center">
                <img className="h-5 w-5 " src={mainWallet} alt="not found" />
                <p className="text-xsm ">Wallet balance </p>
              </div>
              <div className="mt-6 text-white flex justify-between items-center">
                <Link to="/wallet/withdrawal">
                  <button className="bg-customred text-base font-semibold w-32 h-9 rounded-full">
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
            <div className="flex justify-between w-full bg-redLight p-2 rounded-full text-white opacity-60 mt-6 items-center">
              <div className="h-7 flex items-center overflow-hidden">
                <div
                  className={`flex-1 xsm:flex-0 font-bold w-full  text-[10px] xsm:text-xs overflow-hidden text-ellipsis whitespace-normal break-words transition-transform duration-1000 ease-in-out ${
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
              <div className="shrink-0 py-0.5 text-xsm px-4 bg-red text-white  flex gap-1 justify-center items-center  rounded-3xl">
                <RiFireFill className="text-white" />
                Detail
              </div>
            </div>

            {/* game id 3rd div */}
            <div className="bg-redLight text-[12.8px] grid grid-cols-4 w-full rounded-xl mt-5">
              {[
                { label: "GUC Win", time: "1Min", duration: 60, gameid: 6 },
                { label: "GUC Win", time: "3Min", duration: 180, gameid: 7 },
                { label: "GUC Win", time: "5Min", duration: 300, gameid: 8 },
                { label: "GUC Win", time: "10Min", duration: 600, gameid: 9 },
              ].map((item) => (
                <div
                  key={item.time}
                  className={`flex flex-col col-span-1 rounded-xl items-center px-2 py-2 cursor-pointer ${
                    selectedIMgIndex === item.time
                      ? "bg-gradient-to-b from-customlightbtn to-customdarkBluebtn"
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
                        : "text-white opacity-55"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`font-normal  ${
                      selectedIMgIndex === item.time
                        ? ""
                        : "text-white opacity-55"
                    }`}
                  >
                    {item.time}
                  </p>
                </div>
              ))}
            </div>

            {/* game timer 4th div */}
            <div
              className="flex  h-[11rem] xs:h-[12rem] justify-between p-2 mt-3 rounded-2xl"
              style={{
                backgroundImage: `url(${cutBg1})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
              }}
            >
              <div className="w-[50%]  pr-3">
                <div className="flex items-center  justify-between">
                  <button className="flex border border-white  items-center justify-center px-2 text-xs py-0.5 rounded-lg ">
                    Period
                  </button>
                  <button
                    onClick={() => setPlayRule(true)}
                    className="flex items-center justify-center text-white bg-red  px-2 text-xs py-0.5 rounded-2xl "
                  >
                    How to play
                  </button>
                </div>
                <p className="text-xs mt-4">GUC Win {selectedIMgIndex}</p>
                <p className="flex justify-start text-[14px] font-semibold">
                  {gameHistoryData?.length > 0 && gameHistoryData[0]?.games_no?.slice(0, 7)}  
                  {Number(nextPeriod) + 1}
                </p>
                <div className="flex text-black items-center justify-center gap-4 mt-6 xsm:mt-9">
                  {/* <img src={imageSrc} className="w-12" alt="game result" />
                  <img src={imageSrc1} className="w-12" alt="game result" /> */}
                  <img
                    src={images[gameHistoryData[0]?.number]}
                    className="w-12"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[1]?.number]}
                    className="w-12"
                    alt="asdf"
                  />
                </div>
              </div>
              <div className="w-[50%] ">
                <div className="flex items-center justify-end">
                  <NavLink
                    to="/lottery/trxwingo/tronscan"
                    className="text-xs inline text-end text-white bg-red py-0.5 px-2 rounded-full"
                  >
                    Public chain Query
                  </NavLink>
                </div>
                {/* <TronscanViewer /> */}
                <div className="flex justify-end items-center gap-1 mt-5 w-full text-sm">
                  <LotteryTimerTrx timeLeft={timeLeft} duration={callTimer} />
                </div>
                <div className="flex text-black items-center justify-start gap-4 -ml-5 mt-7 xsm:mt-10">
                  {/* <img src={imageSrc2} className="w-12" alt="game result" />
                  <img src={imageSrc3} className="w-12" alt="game result" />
                  <img src={imageSrc4} className="w-12" alt="game result" /> */}
                  <img
                    src={images[gameHistoryData[2]?.number]}
                    className="w-12"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[3]?.number]}
                    className="w-12"
                    alt="asdf"
                  />
                  <img
                    src={images[gameHistoryData[4]?.number]}
                    className="w-12"
                    alt="asdf"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* betting buttons 5th divv */}
         <div ref={fifthDivRef} className=" bg-redLight mt-[16.5rem] xsm:mt-[17.5rem] md:mt-[16.5rem]  p-3 mx-4 rounded-2xl">
            <div className='flex items-center bg-rose-900 justify-center mr-1'>
              <TimerModalTrx timeLeft={timeLeft} duration={callTimer} isOpen={false} parentRef={fifthDivRef} onClose={(v) => handleCloseModal(v)} style={{ width: fifthDivWidth }} />
            </div>
            <div className='flex justify-between gap-5'>
              <button onClick={() => handleBtnClick("green", 10)} className={`${timerModal ? "" : "relative z-10"}  w-24  h-10 rounded-bl-lg rounded-tr-lg  bg-green text-xsm  `}>Green</button>
              <button onClick={() => handleBtnClick("voilet", 20)} className={`${timerModal ? "" : "relative z-10"} w-24 h-10 rounded-lg  bg-voilet text-xsm `}>Violet</button>
              <button onClick={() => handleBtnClick("red", 30)} className={`${timerModal ? "" : "relative z-10"} w-24 h-10  rounded-tl-lg rounded-br-lg  bg-customred text-xsm `}>Red</button>
            </div>
            <div className='bg-red mt-5 rounded-lg p-2'>
              {[0, 1].map(row => (
                <div key={row} className={`flex items-center gap-2 ${row === 1 ? 'mt-2' : ''}`}>
                  {images.slice(row * 5, row * 5 + 5).map((imgSrc, index) => {
                    const actualIndex = row * 5 + index;
                    const ballColor =
                      [0].includes(actualIndex) ? "rv" :
                        [5].includes(actualIndex) ? "gv" :
                          [2, 4, 6, 8].includes(actualIndex) ? "r" :
                            "g";
                    return (
                      <button
                        key={index}
                        className={`image-button ${timerModal ? "" : "relative z-10"} w-[18%] xsm:w-[61.5px] h-[18%] xsm:h-[50.5px]`}
                      >
                        <img onClick={() => handleBtnClick(ballColor, actualIndex)} src={imgSrc} className="h-full xsm:h-14 w-full" alt="ball" />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className='mt-3 flex gap-2'>
              <button onClick={() => handleRandomClick(selectedBtnIndex)} className={`${timerModal ? "" : "relative z-10"}flex items-center justify-center text-xsm w-[26%] py-1 sm:py-2 text-customred border border-customred rounded-lg`}>
                Random
              </button>
              {['X1', 'X5', 'X10', 'X20', 'X50', 'X100'].map((value, i) => {
                const numericValue = parseInt(value.slice(1), 10);
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedBtnIndex(numericValue)}
                    className={`${timerModal ? "" : "relative z-10"} flex items-center justify-center text-xs w-[11%] rounded-lg ${selectedBtnIndex === numericValue ? 'bg-green text-white' : 'bg-red text-gray'
                      }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
            <div className='w-full mt-3 flex'>
              <button
                onClick={() => handleBtnClick("yellow", 40)}
                className={`${timerModal ? "bg-yellow" : "relative z-10 bg-yellow"} rounded-l-full w-[50%] py-2 text-center text-xsm`}>
                Big
              </button>
              <button onClick={() => handleBtnClick("bg3", 50)} className={`${timerModal ? "bg-bg3" : "relative z-10 bg-bg3"} rounded-r-full w-[50%] py-2 text-center text-xsm `}>Small</button>
            </div>
          </div>
          <div className="mt-3 px-4 flex gap-2">
            {["Game History", "Chart", "My history"].map((value, i) => (
              <button
                key={i}
                onClick={() => handlehistoryClick(i)}
                className={`flex items-center justify-center  w-[33%] text-xsm py-2 rounded-lg ${
                  selectedHistoryIndex === i
                    ? "bg-gradient-to-r from-[#EDD188] to-[#C79744] text-[#8F5206] font-semibold"
                    : "bg-redLight text-white opacity-60"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* game history  */}
          <GameHistoryBoxTrx
            isVisible={handlehistorybox === 0}
            gameHistoryData={gameHistoryData}
          />
          {/* Chart */}
          <ChartTrx
            handlehistorybox={handlehistorybox}
            gameHistoryData={gameHistoryData}
          />
          {/* my history */}
          <MyHistoryTrx
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
            <LotteryBetModalTrx
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
        {playRule && gameDetails?.gameId === 6 && (
          <div className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
            <div className="relative w-[281px] h-[450px] z-50 bg-white rounded-lg shadow-lg flex flex-col items-center">
              <p className="absolute text-[16px] top-0 left-0 w-full text-center bg-gradient-to-r from-red to-redLight py-2 rounded-t-lg">
                GUC Hash
              </p>
              <div className="px-2 text-[12.8px] overflow-y-scroll h-full mt-12 text-[#1e2637]">
                <p>What is a hash value?</p>
                <p>
                  Anyone who knows the basics of Bitcoin will be exposed to a
                  concept, a hash value. Bitcoin&apos;s block header has a hash
                  of the previous block in it, which is used to point to the
                  previous block.
                </p>
                <p>
                  Hash is the transliteration of English hash, so hash value is
                  also called hash value. A hash value is a value calculated
                  with a hash function. To understand hash values, one must
                  understand the nature of hash functions.
                </p>
                <p>
                  A hash function can transform an input of arbitrary length
                  into an output of fixed length. If the input value is the
                  same, the output hash value is the same. If the input values
                  are different, the output hashes are usually different.
                </p>
                <p>
                  Every block has a unique, random, unbreakable, and unforgeable
                  hash value, which ensures the integrity of the blockchain.
                </p>
                <p className="font-bold">How many types of USDT are there?</p>
                <p>1. Omni-USDT (Bitcoin network, BTC address)</p>
                <p>2. ERC20-USDT (Ethereum network, ETH address)</p>
                <p>3. TRC20-USDT (TRON network, TRON address)</p>
                <p className="font-bold">TrxHash:</p>
                <p>
                  GUCHash is the TRC20-USDT Block hash based on the TRON
                  network. The last number is used as the result of the lottery
                  to determine whether you have won.
                </p>
                <p className="font-bold">Game Rules:</p>
                <p>1. 1 lottery draw per minute, bet within 45 seconds.</p>
                <p>2. Purchase All Day Unlock. Total daily purchases: 1440.</p>
                <p>
                  3. The last digit of the Block hash determines the result.
                </p>
                <p className="font-bold">Example:</p>
                <p>Hash **b569 → Lottery result: 9</p>
                <p>Hash **d14c → Lottery result: 4</p>
                <p className="font-bold">Odds:</p>
                <p>
                  1. Select Green: If result is 1,3,7,9 → Payout (98×2) = 196
                </p>
                <p>2. Select Red: If result is 2,4,6,8 → Payout (98×2) = 196</p>
                <p>
                  3. Select Violet: If result is 0 or 5 → Payout (98×4.5) = 441
                </p>
                <p>
                  4. Select Number: If the result matches the selected number →
                  Payout (98×9) = 882
                </p>
              </div>
              <div className="w-full rounded-b-2xl bg-white p-3 h-28 flex items-center justify-center">
                <button
                  className="bg-gradient-to-r from-red to-redLight text-white px-16 py-2 rounded-full"
                  onClick={() => setPlayRule(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {playRule && gameDetails?.gameId === 7 && (
          <div className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
            <div className="relative w-[281px] h-[450px] z-50 bg-white rounded-lg shadow-lg flex flex-col items-center">
              <p className="absolute text-[16px] top-0 left-0 w-full text-center bg-gradient-to-r from-red to-redLight py-2 rounded-t-lg">
                Game Rules
              </p>
              <div className="px-2 text-[12.8px] overflow-y-scroll h-full mt-12 text-[#1e2637]">
                <p>
                  The last digit of the Block hash is used as the lottery
                  result.
                </p>

                <p className="font-bold">Example:</p>
                <p>Hash **b569 → Lottery result: 9</p>
                <p>Hash **d14c → Lottery result: 4</p>

                <p>
                  3 minutes per period: 2 minutes and 55 seconds to place
                  orders, 5 seconds waiting for the draw. The game runs all day,
                  with a total of 480 rounds daily.
                </p>

                <p className="font-bold">Handling Fee:</p>
                <p>
                  A 2% handling fee is charged on all single bets. For example,
                  if you bet 100, after deducting the fee, the actual betting
                  amount will be 98.
                </p>

                <p className="font-bold">Odds:</p>
                <p>
                  1. Select Green: If result is 1,3,7,9 → Payout (98×2) = 196;
                  If result is 5 → Payout (98×1.5) = 147
                </p>
                <p>
                  2. Select Red: If result is 2,4,6,8 → Payout (98×2) = 196; If
                  result is 0 → Payout (98×1.5) = 147
                </p>
                <p>
                  3. Select Violet: If result is 0 or 5 → Payout (98×4.5) = 441
                </p>
                <p>
                  4. Select Number: If the result matches the selected number →
                  Payout (98×9) = 882
                </p>
                <p>
                  5. Select Big: If result is 5,6,7,8,9 → Payout (98×2) = 196
                </p>
                <p>
                  6. Select Small: If result is 0,1,2,3,4 → Payout (98×2) = 196
                </p>

                <p className="font-bold">Game Rules:</p>
                <p>
                  - It is not allowed to make 2-sided bets in 1 game period
                  (e.g., choosing both Green and Red, or Big and Small in the
                  same period).
                </p>
                <p>
                  - For number bets: A maximum of 7 numbers can be selected in 1
                  period (no more).
                </p>
              </div>

              <div className="w-full rounded-b-2xl bg-white p-3 h-28 flex items-center justify-center">
                <button
                  className="bg-gradient-to-r from-red to-redLight text-white px-16 py-2 rounded-full"
                  onClick={() => setPlayRule(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {playRule && gameDetails?.gameId === 8 && (
          <div className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
            <div className="relative w-[281px] h-[450px] z-50 bg-white rounded-lg shadow-lg flex flex-col items-center">
              <p className="absolute text-[16px] top-0 left-0 w-full text-center bg-gradient-to-r from-red to-redLight py-2 rounded-t-lg">
                Game Rules
              </p>
              <div className="px-2 text-[12.8px] overflow-y-scroll h-full mt-12 text-[#1e2637]">
                <p>
                  The last digit of the Block hash is used as the lottery
                  result.
                </p>

                <p className="font-bold">Example:</p>
                <p>Hash **b569 → Lottery result: 9</p>
                <p>Hash **d14c → Lottery result: 4</p>

                <p>
                  5 minutes per period: 4 minutes and 55 seconds to place
                  orders, 5 seconds waiting for the draw. The game runs all day,
                  with a total of 288 rounds daily.
                </p>

                <p className="font-bold">Handling Fee:</p>
                <p>
                  A 2% handling fee is charged on all single bets. For example,
                  if you bet 100, after deducting the fee, the actual betting
                  amount will be 98.
                </p>

                <p className="font-bold">Odds:</p>
                <p>
                  1. Select Green: If result is 1,3,7,9 → Payout (98×2) = 196;
                  If result is 5 → Payout (98×1.5) = 147
                </p>
                <p>
                  2. Select Red: If result is 2,4,6,8 → Payout (98×2) = 196; If
                  result is 0 → Payout (98×1.5) = 147
                </p>
                <p>
                  3. Select Violet: If result is 0 or 5 → Payout (98×4.5) = 441
                </p>
                <p>
                  4. Select Number: If the result matches the selected number →
                  Payout (98×9) = 882
                </p>
                <p>
                  5. Select Big: If result is 5,6,7,8,9 → Payout (98×2) = 196
                </p>
                <p>
                  6. Select Small: If result is 0,1,2,3,4 → Payout (98×2) = 196
                </p>

                <p className="font-bold">Game Rules:</p>
                <p>
                  - It is not allowed to make 2-sided bets in 1 game period
                  (e.g., choosing both Green and Red, or Big and Small in the
                  same period).
                </p>
                <p>
                  - For number bets: A maximum of 7 numbers can be selected in 1
                  period (no more).
                </p>
              </div>

              <div className="w-full rounded-b-2xl bg-white p-3 h-28 flex items-center justify-center">
                <button
                  className="bg-gradient-to-r from-red to-redLight text-white px-16 py-2 rounded-full"
                  onClick={() => setPlayRule(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {playRule && gameDetails?.gameId === 9 && (
          <div className="fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
            <div className="relative w-[281px] h-[450px] z-50 bg-white rounded-lg shadow-lg flex flex-col items-center">
              <p className="absolute text-[16px] top-0 left-0 w-full text-center bg-gradient-to-r from-red to-redLight py-2 rounded-t-lg">
                Game Rules
              </p>
              <div className="px-2 text-[12.8px] overflow-y-scroll h-full mt-12 text-[#1e2637]">
                <p>
                  The last digit of the Block hash is used as the lottery
                  result.
                </p>

                <p className="font-bold">Example:</p>
                <p>Hash **b569 → Lottery result: 9</p>
                <p>Hash **d14c → Lottery result: 4</p>

                <p>
                  10 minutes per period: 9 minutes and 55 seconds to place
                  orders, 5 seconds waiting for the draw. The game runs all day,
                  with a total of 144 rounds daily.
                </p>

                <p className="font-bold">Handling Fee:</p>
                <p>
                  A 2% handling fee is charged on all single bets. For example,
                  if you bet 100, after deducting the fee, the actual betting
                  amount will be 98.
                </p>

                <p className="font-bold">Odds:</p>
                <p>
                  1. Select Green: If result is 1,3,7,9 → Payout (98×2) = 196;
                  If result is 5 → Payout (98×1.5) = 147
                </p>
                <p>
                  2. Select Red: If result is 2,4,6,8 → Payout (98×2) = 196; If
                  result is 0 → Payout (98×1.5) = 147
                </p>
                <p>
                  3. Select Violet: If result is 0 or 5 → Payout (98×4.5) = 441
                </p>
                <p>
                  4. Select Number: If the result matches the selected number →
                  Payout (98×9) = 882
                </p>
                <p>
                  5. Select Big: If result is 5,6,7,8,9 → Payout (98×2) = 196
                </p>
                <p>
                  6. Select Small: If result is 0,1,2,3,4 → Payout (98×2) = 196
                </p>

                <p className="font-bold">Game Rules:</p>
                <p>
                  - It is not allowed to make 2-sided bets in 1 game period
                  (e.g., choosing both Green and Red, or Big and Small in the
                  same period).
                </p>
                <p>
                  - For number bets: A maximum of 7 numbers can be selected in 1
                  period (no more).
                </p>
              </div>

              <div className="w-full rounded-b-2xl bg-white p-3 h-28 flex items-center justify-center">
                <button
                  className="bg-gradient-to-r from-red to-redLight text-white px-16 py-2 rounded-full"
                  onClick={() => setPlayRule(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrxWinGo;
