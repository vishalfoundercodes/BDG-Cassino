import { useEffect, useRef, useState } from "react"
import { handleGameContainerType } from "../../features/AllGamesContainerSlice";
import { useDispatch, useSelector } from "react-redux";
import AllGamesContainer from "../../reusable_component/AllGamesContainer";
import Jilli from "./Jilli";
import ImageCarousel from "../../reusable_component/ImageCarousel";
import { RiFireFill } from "react-icons/ri";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import bgActiveCategory from "../../assets/usaAsset/homeScreen/bgActiveCategory.png"
import gamecategoryLottery from "../../assets/usaAsset/homeScreen/gamecategoryLottery.png"
import gamecategoryminigames from "../../assets/usaAsset/homeScreen/gamecategoryminigames.png"
import gamecategorypopular from "../../assets/usaAsset/homeScreen/gamecategorypopular.png"
import gamecategoryslots from "../../assets/usaAsset/homeScreen/sloticon.png"
import gamecategoryfish from "../../assets/usaAsset/homeScreen/fishingicon.png"
import gamecategorycasino from "../../assets/usaAsset/homeScreen/winninginfo2.png";
import gamecategoryloby from "../../assets/usaAsset/homeScreen/sportsicon.png"
import gamecategorypoker from "../../assets/usaAsset/homeScreen/gamecategorypoker.png"
import lotterycategorywingo from "../../assets/usaAsset/homeScreen/winninginfo3.png";
import lotterycategorytrx from "../../assets/usaAsset/homeScreen/winninginfo1.png";
import person1 from "../../assets/usaAsset/homeScreen/person1.png"
import person2 from "../../assets/usaAsset/homeScreen/person2.png"
import person3 from "../../assets/usaAsset/homeScreen/person3.png"
import person4 from "../../assets/usaAsset/homeScreen/person4.png"
import person5 from "../../assets/usaAsset/homeScreen/person5.png"
import person6 from "../../assets/usaAsset/homeScreen/person6.png"
import person7 from "../../assets/usaAsset/homeScreen/person7.png"
import person8 from "../../assets/usaAsset/homeScreen/person8.png"
import person9 from "../../assets/usaAsset/homeScreen/person9.png"
import person10 from "../../assets/usaAsset/homeScreen/person10.png"
import person11 from "../../assets/usaAsset/homeScreen/person11.png"
import person12 from "../../assets/usaAsset/homeScreen/person12.png"
import person13 from "../../assets/usaAsset/homeScreen/person13.png"
import person14 from "../../assets/usaAsset/homeScreen/person14.png"
import person15 from "../../assets/usaAsset/homeScreen/person15.png"
import person16 from "../../assets/usaAsset/homeScreen/person16.png"
import person17 from "../../assets/usaAsset/homeScreen/person17.png"
import person18 from "../../assets/usaAsset/homeScreen/person18.png"
import person19 from "../../assets/usaAsset/homeScreen/person19.png"
import person20 from "../../assets/usaAsset/homeScreen/person20.png"
import DailyProfitRankStage from "../../assets/usaAsset/homeScreen/Stage.png"
import rankbg1 from "../../assets/usaAsset/homeScreen/rankbg1.png"
import rankbg2 from "../../assets/usaAsset/homeScreen/rankbg2.png"
import rankbg3 from "../../assets/usaAsset/homeScreen/rankbg3.png"
import no1badge from "../../assets/usaAsset/homeScreen/no1badge.png"
import no2badge from "../../assets/usaAsset/homeScreen/no2badge.png"
import no3badge from "../../assets/usaAsset/homeScreen/no3badge.png"
import crownno1 from "../../assets/usaAsset/homeScreen/crownno1.png"
import crownno2 from "../../assets/usaAsset/homeScreen/crownno2.png"
import crownno3 from "../../assets/usaAsset/homeScreen/crownno3.png"
import popularbg from "../../assets/usaAsset/homeScreen/popularbg.png"
import lotterybg from "../../assets/usaAsset/homeScreen/lotterybg.png"
import slotbg from "../../assets/usaAsset/homeScreen/slotbg.png"
import casinobg from "../../assets/usaAsset/homeScreen/casinobg.png"
import fishbg from "../../assets/usaAsset/homeScreen/fishbg.png"
import sportsbg from "../../assets/usaAsset/homeScreen/sportsbg.png"
import pokerbg from "../../assets/usaAsset/homeScreen/pokerbg.png"
import orignal from "../../assets/usaAsset/homeScreen/orignal.png"
import cup from "../../assets/usaAsset/homeScreen/cup.png"
import lotteryicons from "../../assets/usaAsset/homeScreen/lotteryicons.png"
import HomeoriginalBg from "../../assets/usaAsset/homeScreen/HomeoriginalBg.png";
import HomeRummyBg from "../../assets/usaAsset/homeScreen/HomeRummyBg.png";
import HomeSportsBg from "../../assets/usaAsset/homeScreen/HomeSportsBg.png";
import HomeFishingBg from "../../assets/usaAsset/homeScreen/HomeFishingBg.png";
import HomeCasinoBg from "../../assets/usaAsset/homeScreen/HomeCasinoBg.png";
import casinoicon from "../../assets/usaAsset/homeScreen/casinoicon.png"
import micphone from "../../assets/usaAsset/micphone.png"
import aviatornew from "../../assets/usaAsset/homeScreen/AvaitorGoldenCoins.png";
import chickenRoadImage from "../../assets/ChickenRoadGame/chicken loading.png";
import apis from "../../utils/apis";
import axios from "axios";
import { toast } from "react-toastify";
import FirstDepositModal from "../../reusable_component/FirstDepositModal";
import Loader from "../../reusable_component/Loader/Loader";
import { updateUserWalletFromJili, updateUserWalletFromSpribe } from "../../reusable_component/gameApi";
import { FaBullhorn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import LoginSuccessPopup from "../../auth/LoginSuccessFull";
const notes = [
    "Welcome to the BDG Casino! Greetings, Gamers and Enthusiasts! the BDG Casino",
    "Please be sure to always use our official website for playing the games with the fol",
    "If your deposit is not received, Please send it directly to BDG Casino Self-service Ce"
];
function Home() {
   const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [currentIndexWin, setCurrentIndexWin] = useState(0);
    const [firstDepsoitModal, setFirstDepsoitModal] = useState(localStorage.getItem("firstDepositModalValue") === "1");
    const [noteValue, setNoteValue] = useState(notes[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [bannerData, setBannerData] = useState([])
    const [showLoginPopup, setShowLoginPopup]=useState(false)
    const { gameName } = useSelector((state) => state.AllGamesContainer);

    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId");
// console.log("user id h",userId)
    const buttonRef = useRef(null);
    const fixedScrollHeight = 500;
    const handleLotteryContainer = (item) => {
        const height = "5rem";
        const gameName = "lottery";
        dispatch(handleGameContainerType({ height, gameName }));
        console.log("handle Lottery",item)
    };
    const handleMiniGamesContainer = () => {
        const height = "5rem";
        const gameName = "minigames";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handlePopularContainer = () => {
        const height = "5rem";
        const gameName = "popular";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handleSlotsContainer = () => {
        const height = "5rem";
        const gameName = "slots";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handleFishingContainer = () => {
        const height = "5rem";
        const gameName = "fishing";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handleFlashContainer = () => {
        const height = "5rem";
        const gameName = "flash";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handleCasinoContainer = () => {
        const height = "5rem";
        const gameName = "casino";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handleLobbyContainer = () => {
        const height = "5rem";
        const gameName = "lobby";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handlePokerContainer = () => {
        const height = "5rem";
        const gameName = "poker";
        dispatch(handleGameContainerType({ height, gameName }));
    };
    const handleWingo = () => {
       navigate("/lottery/wingo");
    };
    const handleAviator = () => {
       navigate("/aviator");
    };
    const handleChickenRoad = () => {
       navigate("/chickenRoadGame");
    };

    const profileDetails = async () => {
        if (!userId) {
          return;
        }
        try {
          const res = await axios.get(`${profileApi}${userId}`);
          console.log("res profie",res)
          if (res?.data?.success === 200) {
            setMyDetails(res?.data?.data)
          }
        } catch (err) {
          toast.error(err);
        }
      };
    
      useEffect(() => {
        if (userId) {
          profileDetails(userId);
        }
      }, [userId]);

    const buttonData = [
      // { onClick: handlePopularContainer, key: "popular", bg: popularbg, icon: cup, label: "Popular" },
      {
        // onClick: handleLotteryContainer,
        onClick: handleWingo,
        key: "lottery",
        bg: lotterybg,
        icon: lotteryicons,
        label: "Lottery",
        route: "/lottery/wingo",
      },
      {
        // onClick: handleLotteryContainer,
        onClick: handleAviator,
        key: "Avaitor",
        bg: aviatornew,
        icon: aviatornew,
        label: "Avaitor",
        route: "/aviator",
      },
      // { onClick: handleCasinoContainer, key: "casino", bg: slotbg, icon: casinoicon, label: "Casino" },
      {
        // onClick: handleSlotsContainer,
        onClick: handleChickenRoad,
        key: "chickenRoadImage",
        bg: chickenRoadImage,
        icon: chickenRoadImage,
        label: "ChickenRoad",
        route: "/chickenRoadGame",
      },
      {
        onClick: handleSlotsContainer,
        key: "slots",
        bg: casinobg,
        icon: gamecategoryslots,
        label: "Slots",
      },
      {
        onClick: handleFishingContainer,
        key: "fishing",
        bg: fishbg,
        icon: gamecategoryfish,
        label: "Fishing",
      },
      {
        onClick: handleFlashContainer,
        key: "flash",
        bg: pokerbg,
        icon: gamecategoryloby,
        label: "Flash",
      },
      // { onClick: handlePokerContainer, key: "rummy", bg: sportsbg, icon: gamecategorycasino, label: "Rummy" },
      // { onClick: handleLobbyContainer, key: "sports", bg: pokerbg, icon: gamecategoryloby, label: "Sports" },
      // { onClick: handleMiniGamesContainer, key: "orignal", bg: orignal, icon: gamecategoryminigames, label: "Orignal" },
    ];

    const buttonData2 = [
      // { onClick: handlePopularContainer, key: "popular", bg: popularbg, icon: cup, label: "Popular" },
      {
        onClick: handleLotteryContainer,
        key: "Sports",
        bg: HomeSportsBg,
        icon: HomeSportsBg,
        label: "Sports",
        route: "/lottery/wingo",
      },
      {
        onClick: handleLotteryContainer,
        key: "Casino",
        bg: HomeCasinoBg,
        icon: HomeCasinoBg,
        label: "Casino",
        route: "/aviator",
      },
      // { onClick: handleCasinoContainer, key: "casino", bg: slotbg, icon: casinoicon, label: "Casino" },
      {
        onClick: handleSlotsContainer,
        key: "Rummy",
        bg: HomeRummyBg,
        icon: HomeRummyBg,
        label: "Rummy",
        route: "/chickenRoadGame",
      },
    ];
    const buttonData3 = [
      // { onClick: handlePopularContainer, key: "popular", bg: popularbg, icon: cup, label: "Popular" },
      {
        onClick: handleFishingContainer,
        key: "Fishing",
        bg: HomeFishingBg,
        icon: HomeFishingBg,
        label: "Fishing",
        route: "/lottery/wingo",
      },
      {
        // onClick: handleLotteryContainer,
        key: "Original",
        bg: HomeoriginalBg,
        icon: HomeoriginalBg,
        label: "Original",
        route: "/aviator",
      },
      // { onClick: handleCasinoContainer, key: "casino", bg: slotbg, icon: casinoicon, label: "Casino" },
      {
        onClick: handleSlotsContainer,
        key: "Rummy",
        bg: HomeRummyBg,
        icon: HomeRummyBg,
        label: "Rummy",
        route: "/chickenRoadGame",
      },
    ];

      // const hotgames = [
      //   {
      //     id: 1,
      //     name: "Avaitor",
      //     bgimage: aviatornew,
      //     image: aviatornew,
      //     route: "/aviator",
      //     description1: "Guess Number",
      //     description2: "Green/Red/Violet to win",
      //     bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      //   },
      //   // { id: 2, name: "Plinko", bgimage: Plinko, image: Plinko, route: "/plinko", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 3, name: "Mines", bgimage: mines, image: mines, route: "/mines", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 4, name: "Head n Tails", bgimage: hntBg, image: hntBg, route: "/headsntails", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 5, name: "Keno", bgimage: keno, image: keno, route: "/keno", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 6, name: "Spin To Wheel", bgimage: spintowheel, image: spintowheel, route: "/spintowheel", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 7, name: "Dice", bgimage: dice, image: dice, route: "/dice", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 8, name: "In Out ", bgimage: andharBahar, image: andharBahar, route: "/andarbahar", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 9, name: "Dragon Tiger", bgimage: dragontiger, image: dragontiger, route: "/dragonTiger", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 10, name: "7UpDown", bgimage: updown, image: updown, route: "/sevenupdown", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 11, name: "Red vs Black", bgimage: redBlack, image: redBlack, route: "/rednblack", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 12, name: "Jhandi Munda", bgimage: jhndimunda_gamelogo, image: jhndimunda_gamelogo, route: "/jhandimunda", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 13, name: "HiLo", bgimage: hilo, image: hilo, route: "/hilo", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 14, name: "Jackpot", bgimage: jackpot, image: jackpot, route: "/jackpot", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 15, name: "Hot air ballon", bgimage: hotairballoon, image: hotairballoon, route: "/hotairballon", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 16, name: "Teenpatti", bgimage:teenpatti , image: teenpatti, route: "/teenpatti", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 17, name: "Mini Roulette", bgimage: miniroulette, image: miniroulette, route: "/miniroulette", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 18, name: "Gameon lottery", bgimage: game_on_lottery, image: game_on_lottery, route: "/gameonlottery", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 19, name: "Titli kabooter", bgimage: titli, image: titli, route: "/titli", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 20, name: "Lucky 12", bgimage: lucky_12, image: lucky_12, route: "/lucky12", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 21, name: "Lucky 16", bgimage: d_lucky_16, image: d_lucky_16, route: "/lucky16", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 22, name: "Fun Target", bgimage: funtarget, image: funtarget, route: "/funtarget", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   // { id: 23, name: "Triple Chance", bgimage: triple_chance, image: triple_chance, route: "/triplechance", description1: "Guess Number", description2: "Green/Red/Violet to win", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
      //   {
      //     id: 24,
      //     name: "Chicken Road Game",
      //     bgimage: chickenRoadImage,
      //     image: chickenRoadImage,
      //     route: "/chickenRoadGame",
      //     description1: "Guess Number",
      //     description2: "Green/Red/Violet to win",
      //     bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      //   },
      // ];
    const bannerDataHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.get(apis.slider)
            console.log("banner api:", apis.slider);
            console.log("res for banner:", res.data)
            if (res?.data?.status === 200) {
                setLoading(false)
                setBannerData(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        bannerDataHandler()
    }, [])
    useEffect(() => {
        if (gameName && buttonRef.current) {
            const buttonPosition = buttonRef.current.getBoundingClientRect().top + window.scrollY;
            const positionToScroll = Math.max(buttonPosition - fixedScrollHeight, 0);
            window.scrollTo({
                top: positionToScroll,
                behavior: "smooth",
            });
        }
    }, [gameName]);
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
    const winningData = [
        { id: 1, avatar: person1, gameImage: gamecategorycasino, name: "Mem***CQF", amount: "600.00" },
        { id: 2, avatar: person2, gameImage: lotterycategorywingo, name: "Mem***CDM", amount: "95.00" },
        { id: 3, avatar: person3, gameImage: lotterycategorytrx, name: "Mem***JVW", amount: "540.00" },
        { id: 4, avatar: person4, gameImage: gamecategorycasino, name: "Mem***QGS", amount: "170.00" },
        { id: 5, avatar: person5, gameImage: gamecategorycasino, name: "Mem***UUQ", amount: "600.00" },
        { id: 6, avatar: person6, gameImage: gamecategorycasino, name: "Mem***GTR", amount: "85.00" },
        { id: 7, avatar: person7, gameImage: lotterycategorywingo, name: "Mem***WTY", amount: "430.00" },
        { id: 8, avatar: person8, gameImage: gamecategorycasino, name: "Mem***HSD", amount: "190.00" },
        { id: 9, avatar: person9, gameImage: lotterycategorytrx, name: "Mem***JKL", amount: "310.00" },
        { id: 10, avatar: person10, gameImage: gamecategorycasino, name: "Mem***PQR", amount: "725.00" },
        { id: 11, avatar: person11, gameImage: gamecategorycasino, name: "Mem***XYZ", amount: "245.00" },
        { id: 12, avatar: person12, gameImage: lotterycategorywingo, name: "Mem***AAA", amount: "560.00" },
        { id: 13, avatar: person13, gameImage: lotterycategorytrx, name: "Mem***BBB", amount: "670.00" },
        { id: 14, avatar: person14, gameImage: gamecategorycasino, name: "Mem***CCC", amount: "380.00" },
        { id: 15, avatar: person15, gameImage: lotterycategorywingo, name: "Mem***DDD", amount: "290.00" },
        { id: 16, avatar: person16, gameImage: lotterycategorytrx, name: "Mem***EEE", amount: "820.00" },
        { id: 17, avatar: person17, gameImage: lotterycategorytrx, name: "Mem***FFF", amount: "430.00" },
        { id: 18, avatar: person18, gameImage: lotterycategorytrx, name: "Mem***GGG", amount: "600.00" },
        { id: 19, avatar: person19, gameImage: gamecategorycasino, name: "Mem***HHH", amount: "950.00" },
        { id: 20, avatar: person20, gameImage: gamecategorycasino, name: "Mem***III", amount: "110.00" },
    ];
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndexWin((prevIndex) =>
                prevIndex + 1 >= winningData.length ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(intervalId);
    }, [winningData.length]);

    const visibleData = [
        ...winningData.slice(currentIndexWin, currentIndexWin + 5),
        ...(currentIndexWin + 5 > winningData.length
            ? winningData.slice(0, (currentIndexWin + 5) % winningData.length)
            : []),
    ].slice(0, 5);

    useEffect(() => {
        const userid = localStorage.getItem("userId")
        // console.log("userid",userid)
        const status = localStorage.getItem("firstDepositModalValue");
        if (status === "0" && userid) {
            setFirstDepsoitModal(true);
        } else {
            setFirstDepsoitModal(false);
        }

        const loginPop = localStorage.getItem("loginPopupShown");
        const loginpopup=JSON.parse(loginPop)
        if (loginpopup === true) {
          // alert("login popup");
          setShowLoginPopup(true);
        }
    }, [])
    // useEffect(() => {
    //     const updateWallet = async () => {

    //         const statusJili = localStorage.getItem("jilligamePlayed") || "0";
    //         const statusSpribe = localStorage.getItem("spribegamePlayed") || "0";
    //         if (statusJili === "1") {
    //             await updateUserWalletFromJili();
    //             localStorage.setItem("jilligamePlayed", "0");
    //         }
    //         if (statusSpribe === "1") {
    //             await updateUserWalletFromSpribe();
    //             localStorage.setItem("spribegamePlayed", "0");
    //         }
    //     };
    //     updateWallet();
    //     const handleVisibilityChange = () => {
    //         if (!document.hidden) {
    //             updateWallet();
    //         }
    //     };
    //     const handleStorageChange = (event) => {
    //         if (event.key === "jilligamePlayed" || event.key === "spribegamePlayed") {
    //             updateWallet();
    //         }
    //     };
    //     document.addEventListener("visibilitychange", handleVisibilityChange);
    //     window.addEventListener("storage", handleStorageChange);
    //     return () => {
    //         document.removeEventListener("visibilitychange", handleVisibilityChange);
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, []);

    return (
      <>
        <SplashScreen />
        {loading && <Loader setLoading={setLoading} loading={loading} />}
        {firstDepsoitModal && (
          <div className="relative z-50 font-roboto">
            <FirstDepositModal
              firstDepsoitModal={firstDepsoitModal}
              setFirstDepsoitModal={setFirstDepsoitModal}
              onClose={() => setFirstDepsoitModal(false)}
            />
          </div>
        )}
        {showLoginPopup && (
          <LoginSuccessPopup
            onClose={() => {
              setShowLoginPopup(false);
              navigate("/");
            }}
          />
        )}
        <div className="mb-28 font-roboto w-full">
          {/* <NavLink to="/aviator">fdsfds</NavLink> */}
          <div className="rounded-xl px-3 mt-2">
            <ImageCarousel imagesData={bannerData} />
          </div>
          <div className="p-4 flex items-center justify-center w-full">
            <div className="px-3 flex shadow-lg justify-between w-full gap-1 items-center   p-1 rounded-full ">
              <div className="shrink-0">
                {" "}
                <img className="h-5 w-5" src={micphone} alt="ds" />{" "}
                {/* <FaBullhorn className="text-[#E4B650] w-6 h-6" /> */}
              </div>
              <div className="h-9 flex items-center overflow-hidden">
                <div
                  className={`flex-1 font-bold xsm:flex-0 text-white w-[80%] xsm:w-[19rem] text-[10px] xsm:text-[12px] overflow-hidden text-ellipsis whitespace-normal break-words transition-transform duration-1000 ease-in-out ${
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
              <div className="shrink-0 w-[20%] font-bold xsm:w-[22%] py-1 text-black text-xs bg-gradient-to-l from-[#EDD188] to-[#CA9D4B] flex gap-1 justify-center items-center  rounded-3xl">
                <RiFireFill className="" />
                Detail
              </div>
            </div>
          </div>
          <div>
            <div className=" w-full p-1 gap-2">
              {/* First Row - 2 Items */}
              {/* <div className="col-span-3 grid grid-cols-3 px-2 gap-3">
                {buttonData?.slice(0, 5)?.map((item, i) => (
                  <button
                    onClick={item.onClick}
                    key={i}
                    style={{
                      backgroundImage: `url(${item?.bg})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="h-[90px] w-[100%] flex items-center justify-center text-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className=" flex w-full  items-center justify-between ">
                      <div className="w-1/2 flex items-center justify-center  ">
                        <img src={item.icon} alt="" className="w-[70%]" />
                      </div>
                      <div className="w-1/2 text-start -pl-5  pr-[4.35rem] font-serif  font-bold">
                        {item?.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div> */}

              <div className="col-span-3 grid grid-cols-3 gap-3 px-2 mt-2">
                {buttonData?.slice(0, 6)?.map((item, i) => (
                  <button
                    key={i}
                    onClick={item.onClick || item.route}
                    className="bg-gradient-to-b from-[#EDD188] to-[#C79744] h-[90px] rounded-xl flex flex-col items-center justify-center shadow-md"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-20 object-contain -mt-5"
                    />
                    <p
                      // className="text-sm font-semibold text-black mt-1"
                      className="text-sm font-semibold text-[#292929] pl-2 pb-2 text-left w-full"
                    >
                      {item.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* <div className="col-span-3 grid grid-cols-3 mt-2 mx-2 gap-2">
                {buttonData?.slice(3)?.map((item, i) => (
                  <button
                    onClick={item.onClick}
                    key={i}
                    style={{
                      backgroundImage: `url(${item?.bg})`,
                      backgroundPosition: "center",
                    }}
                    className="h-[70px] w-full flex  text-white text-[12px] rounded-lg shadow-lg  pr-2 pt-2 font-serif  font-bold"
                  >
                    <div className=" flex w-full   justify-between ">
                      <img src={item.icon} alt="" />
                    </div>
                    {item?.label}
                  </button>
                ))}
              </div> */}
            </div>
          </div>

          <div className="w-full p-3  pt-0">
            <div className="bg-gradient-to-b from-[#EDD188] to-[#C79744] rounded-xl px-2 py-2 mt-2">
              <div className="grid grid-cols-3 divide-x divide-[#E9C985] text-center">
                {buttonData2?.slice(0, 3)?.map((item, i) => (
                  <button
                    key={i}
                    // onClick={() => navigate(item.route)}

                    className="flex flex-col items-center justify-center px-2"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-16 object-contain -mt-2"
                    />
                    <p className="text-sm font-semibold text-[#292929] mt-1">
                      {item.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full px-3 pt-0">
            <div className="grid grid-cols-2 gap-4 mt-2">
              {buttonData3?.slice(0, 2)?.map((item, i) => (
                <button
                  key={i}
                  // onClick={() => navigate(item.route)}
                  onClick={item.onClick}
                  className="relative flex items-center bg-gradient-to-b from-[#EDD188] to-[#C79744] rounded-xl px-3 py-2 h-[70px] shadow-md overflow-hidden"
                >
                  {/* Icon on left center */}
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-16 w-16 object-contain"
                  />

                  {/* Label at bottom-right */}
                  <p className="absolute bottom-2 right-3 text-sm font-semibold text-[#292929]">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-scroll pl-3 pr-0.5 w-full mt-5 flex items-start justify-between hide-scrollbar">
            {/* <div className="w-[20%]">
                        {buttonData?.map((item, i) => {
                            return (
                                <button
                                    key={i}
                                    onClick={item.onClick}
                                    className="flex flex-col pt-1 w-[74.5px] mb-3 h-[69.5px] bg-cover bg-no-repeat  justify-between items-center rounded-md"
                                    style={{
                                        backgroundImage: `url(${gameName === item.key ? item.bg : ""})`,
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <img src={item.icon} className="w-12 h-10" alt="lotterycase not found" />
                                    <p className={`text-xs pb-1 font-semibold ${gameName === item.key ? "text-white" : "text-black"} `}>{item.label}</p>
                                </button>
                            )
                        })}
                    </div> */}

            {/* Lottery and other games */}
            <div className=" w-[100%]">
              <AllGamesContainer />
            </div>
            {/* <div className=" w-[100%]"><Jilli /></div> */}
          </div>
          {/* winnng info div */}
          <div className="p-3 text-[#D9AC4F] max-w-md mx-auto mt-0">
            <h2 className="text-lg font-semibold mb-4">Winning information</h2>
            <div className="space-y-2 overflow-hidden">
              {visibleData
                .slice()
                .reverse() // Reverse to add new data at the top
                .map((data) => (
                  <div
                    key={data.id}
                    className="flex items-center justify-start gap-6 p-3 rounded-lg shadow-md transform transition-transform duration-500 ease-in-out bg-customdarkBlue"
                    style={{
                      animation: `fadeInFromTop 300ms ease-in-out`,
                    }}
                  >
                    <div className="flex items-center space-x-1 xsm:space-x-2 w-[35%]">
                      <img
                        src={data.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="text-xs 3xl:text-xs font-semibold text-[#A1A4A8]">
                        {data.name}
                      </p>
                    </div>
                    <div className="flex w-[65%] gap-6">
                      <div className="bg-redLight flex justify-center items-center rounded-lg w-[4.2rem] h-12">
                        <img
                          src={data.gameImage}
                          alt="Game"
                          className="w-12 h-9 rounded-md object-fill"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-xsm text-nowrap text-[#FAE59F] font-bold">
                          Receive {data.amount}
                        </p>
                        <p className="text-[10px] text-nowrap text-slate-300 font-normal ">
                          Winning amount
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-2">
            <div className="h-4 flex items-center gap-2">
              <div className="w-[3px] h-full bg-red"></div>
              <p className="text-[#D9AC4F] text-lg font-semibold">
                Today&apos;s earnings chart
              </p>
            </div>
            <div className="mt-10">
              <div className="text-black flex items-end justify-around">
                <div className="-mb-[7rem] xs:-mb-[7.2rem] xsm:-mb-[7rem]  flex flex-col justify-center items-center w-[30%]">
                  <div
                    className="object-fill -mb-2 flex items-center justify-center bg-cover w-16 h-16"
                    style={{
                      backgroundImage: `url(${rankbg2})`,
                    }}
                  >
                    <div
                      className="object-fill bg-cover w-14 h-14 rounded-full"
                      style={{
                        backgroundImage: `url(${person2})`,
                      }}
                    >
                      <img src={crownno2} className="-ml-5 -mt-7" alt="sd" />
                    </div>
                  </div>
                  <img className="w-16" src={no2badge} alt="ds" />
                  <p className="text-xsm text-[#A55206] font-bold z-10 mt-3">
                    Mem***566
                  </p>
                  <p className="text-xsm mt-1 xs:mt-2 font-bold z-10 rounded-full w-full py-1 text-center  text-[#A55206]  bg-gradient-to-b from-[#EDD188] to-[#CA9D4B] ">
                    588,900.00
                  </p>
                </div>
                <div className="-mb-[5.6rem] xs:-mb-[6rem] xsm:-mb-[6rem] flex flex-col justify-center items-center w-[40%]">
                  <div
                    className=" object-fill -mb-2 flex items-center justify-center bg-cover w-16 h-16"
                    style={{
                      backgroundImage: `url(${rankbg1})`,
                    }}
                  >
                    <div
                      className="object-fill z-30 bg-cover w-14 h-14 rounded-full"
                      style={{
                        backgroundImage: `url(${person1})`,
                      }}
                    >
                      <img src={crownno1} className=" -ml-5 -mt-7" alt="sd" />
                    </div>
                  </div>
                  <img className="z-30 w-16" src={no1badge} alt="ds" />
                  <p className="text-xsm text-[#A55206] z-30 font-bold mt-3">
                    Mem***387
                  </p>
                  <p className="text-xsm mt-2 font-bold z-30 rounded-full px-3 py-1 text-center  text-[#A55206]  bg-gradient-to-b from-[#EDD188] to-[#CA9D4B] ">
                    2,853,503.00
                  </p>
                </div>
                <div className="-mb-[7rem] xs:-mb-[7.2rem] xsm:-mb-[7rem] flex flex-col justify-center items-center w-[30%]">
                  <div
                    className="object-fill -mb-2 flex items-center justify-center bg-cover w-16 h-16"
                    style={{
                      backgroundImage: `url(${rankbg3})`,
                    }}
                  >
                    <div
                      className="object-fill bg-cover w-14 h-14 rounded-full"
                      style={{
                        backgroundImage: `url(${person3})`,
                      }}
                    >
                      <img src={crownno3} className="-ml-5 -mt-7" alt="sd" />
                    </div>
                  </div>
                  <img className="w-16" src={no3badge} alt="ds" />
                  <p className="text-xsm text-[#A55206] z-30 font-bold mt-3">
                    Mem***453
                  </p>
                  <p className="text-xsm mt-2 font-bold z-30 rounded-full w-full py-1 text-center text-[#A55206]  bg-gradient-to-b from-[#EDD188] to-[#CA9D4B] ">
                    240,438.00
                  </p>
                </div>
              </div>
              <img
                className="object-fill mt-3"
                src={DailyProfitRankStage}
                alt="sd"
              />
              <div className="w-full flex items-center justify-between text-black rounded-md bg-customdarkBlue shadow-lg p-2">
                <div className="flex items-center text-[#A5A2A1] gap-4">
                  <p>4</p>
                  <div className="flex items-center space-x-2 w-[35%]">
                    <img
                      src={person5}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-xsm font-semibold">Mem***879</p>
                  </div>
                </div>
                <p className="text-xsm mt-2 font-bold rounded-full px-7 py-1 text-center text-[#A55206]  bg-gradient-to-b from-[#EDD188] to-[#CA9D4B]">
                  85,467.00
                </p>
              </div>
              <div className="w-full flex items-center mt-2 justify-between text-black rounded-md bg-customdarkBlue shadow-lg p-2">
                <div className="flex items-center text-[#A5A2A1] gap-4">
                  <p>5</p>
                  <div className="flex items-center space-x-2 w-[35%]">
                    <img
                      src={person6}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-xsm font-semibold">Mem***113</p>
                  </div>
                </div>
                <p className="text-xsm mt-2 font-bold rounded-full px-7 py-1 text-center text-[#A55206]  bg-gradient-to-b from-[#EDD188] to-[#CA9D4B]">
                  80,928.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;
