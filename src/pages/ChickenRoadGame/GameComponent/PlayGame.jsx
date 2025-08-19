
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Fire from "../assets/Game2/fireGif.gif";
import GreyCoin from "../assets/Game/blue-coin.png";
import GreyBackground from "../assets/Game2/sli-1.png";
import ChickenGif from "../assets/Game/CHIK-K-K.gif";
import cuttedChicken from "../assets/Game2/cuttedChicken.gif";
import fregement1 from "../assets/Game2/chicken-1.png";
import fregement2 from "../assets/Game2/2-stnd-linw-12.png";
import goldenBackground from "../assets/Game2/ns-122.png";
import GoldenChicken from "../assets/Game/goldEgg.png";
import golden_egg_wall from "../assets/Game/golden_egg_wall.png";
import greenBackground from "../assets/Game2/greenBackground2.png";
import greenCoin from "../assets/Game/green-coin.png";
import RedChicken from "../assets/Game/pinkcoin.webp";
// import bigFire from "../assets/Game/bigFire.gif";
// import bigFire from "../assets/Game/fire-big.gif";
import bigFire from "../assets/Game/FIRE--R.gif";
// import bigFire from "../assets/Game2/ns-12.png";
import goldEgg from "../assets/Game/golden_egg.png";
import tandoriPlate from "../assets/Game/tandoorinplate.png";
import "./PlayGame.css";
import Notification from "./Notifiaction";
import strip from "../assets/Game2/strip.png";
import { toast } from "react-toastify";
import apis  from "../../../utils/apis";
import useApi from "../hooks/useApi";

export default function PlayGame({
  containerRef,
  fragmentCount,
  regularFragmentCount,
  dinoIndex,
  multiplier,
  difficulty,
  setDifficultyArray,
  difficultyArray,
  setActiveDifficulty,
  activeDifficulty,
  fragmentWidthVW,
  currentAmount,
  goldenEgg,
  goldEgg2,
  goldEgg,
  restartGame,
  resetCoinsTrigger,
  setActiveFireIndex,
  activeFireIndex,
  setIslastSecondSegment,
  islastSecondSegment,
  setCashoutIdByWhenByButton,
  cashoutIdByWhenByButton,
  toggleSound,
  setToggleSound,
  playChickenDeadSound,
  setIsProcessingFragment,
  dinoLandedIndex,
  setDinoLandedIndex,
}) {
  const controls = useAnimation();
  const [currentX, setCurrentX] = useState(0);
  // const [dinoLandedIndex, setDinoLandedIndex] = useState(null);
  const [greenFragments, setGreenFragments] = useState([]);
  const [goldenFragments, setGoldenFragments] = useState([]);
  const [redFragments, setRedFragments] = useState([]);
  const [fireHitFragments, setFireHitFragments] = useState([]);
  const [flipStates, setFlipStates] = useState({});
  // const [bottom, setBottom] = useState("52px");
  const [fireStages, setFireStages] = useState({});

  useEffect(() => {
    setGreenFragments([]);
    setGoldenFragments([]);
    setRedFragments([]);
    setFireHitFragments([]);
    setFlipStates({});
    setDinoLandedIndex(null);
  }, [resetCoinsTrigger]);

  const vw = window.innerWidth / 100;
  const fragmentWidth = fragmentWidthVW * vw;
  const frequency =
    difficulty?.length > 0 ? difficulty[activeDifficulty - 1]?.frequency : [];
  // console.log("frequency", frequency);
  const intervalTime = 1000 / frequency;
  // Fire logic
  // useEffect(() => {
  //   // console.log("heheheehehhe", difficultyArray);

  //   let toggle = false;
  //   const interval = setInterval(() => {
  //     const possibleTargets = Array.from(
  //       { length: fragmentCount },
  //       (_, i) => i + 1
  //     ).filter(
  //       (i) =>
  //         !greenFragments.includes(i) &&
  //         !goldenFragments.includes(i) &&
  //         !redFragments.includes(i)
  //     );

  //     if (possibleTargets.length === 0) {
  //       setActiveFireIndex(null);
  //       return;
  //     }
  //     if (possibleTargets.length === 1) {
  //       // 🔁 Blink fire ON/OFF at the last segment
  //       toggle = !toggle;
  //       setActiveFireIndex(toggle ? possibleTargets[0] : null);
  //       return;
  //     }

  //     const randomIndex =
  //       possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
  //     setActiveFireIndex(randomIndex);
  //   }, intervalTime);

  //   return () => clearInterval(interval);
  // }, [
  //   fragmentCount,
  //   greenFragments,
  //   goldenFragments,
  //   redFragments,
  //   activeDifficulty,
  // ]);

  // Fire logic
  useEffect(() => {
    // 👇 condition to prevent random fire if roast_multiplier is set
    if (difficultyArray?.roast_multiplier > 0) {
      setActiveFireIndex(null);
      return;
    }

    let toggle = false;
    const interval = setInterval(() => {
      const possibleTargets = Array.from(
        { length: fragmentCount },
        (_, i) => i + 1
      ).filter(
        (i) =>
          !greenFragments.includes(i) &&
          !goldenFragments.includes(i) &&
          !redFragments.includes(i)
      );

      if (possibleTargets.length === 0) {
        setActiveFireIndex(null);
        return;
      }

      if (possibleTargets.length === 1) {
        toggle = !toggle;
        setActiveFireIndex(toggle ? possibleTargets[0] : null);
        return;
      }

      const randomIndex =
        possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
      setActiveFireIndex(randomIndex);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [
    fragmentCount,
    greenFragments,
    goldenFragments,
    redFragments,
    activeDifficulty,
    difficultyArray?.roast_multiplier, // 👈 add this dependency too
  ]);

  const userid = localStorage.getItem("userId");
  const { get } = useApi();
  const [status, setStatus] = useState("");
  const profileHandler = () => {
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        // console.log("response profile", res);
        if (res?.data?.status === true) {
          // setProfileData(res?.data?.profile);
          // console.log("status: ",res?.data?.profile.status);
          if (res?.data?.profile.status == 2) {
            // console.log("you are blocked")
            localStorage.removeItem("userid");
            restartGame();
          }
          setStatus(res?.data?.profile.status);
        }
      })
      .catch(console.error);
  };
  // Dino logic
  useEffect(() => {
    const newX = dinoIndex * fragmentWidth + fragmentWidth / 2 - 20;

    controls.start({
      x: newX,
      transition: { duration: 0.2, ease: "easeInOut" },
    });

    controls.start({
      y: [0, -10, 0],
      transition: { duration: 0.2, ease: "easeInOut" },
    });

    setCurrentX(newX);

    const timer = setTimeout(() => {
      // console.log("difficultyArray2", difficultyArray);
      // const shouldRoast =
      //   (difficultyArray?.roast_multiplier > 0 &&
      //     difficultyArray?.roast_multiplier === dinoIndex) ||
      //   activeFireIndex === dinoIndex;
      const shouldRoast =
        (difficultyArray?.roast_multiplier > 0 &&
          Math.abs(
            difficultyArray?.multiplier?.[dinoIndex - 1] -
              difficultyArray?.roast_multiplier
          ) < 0.01) ||
        activeFireIndex === dinoIndex;

      // console.log("should roast:", shouldRoast);
      profileHandler();
      // console.log("status2:",status)
      if (shouldRoast) {
        // alert("roast the chicken")
        if (!redFragments.includes(dinoIndex)) {
          setRedFragments((prev) => [...prev, dinoIndex]);
          setFlipStates((prev) => ({
            ...prev,
            [dinoIndex]: (prev[dinoIndex] || 0) + 1,
          }));
        }

        setFireHitFragments((prev) => [...prev, dinoIndex]);
        setFireStages((prev) => ({ ...prev, [dinoIndex]: "bottom" })); // Step 1: fire at bottom

        setTimeout(() => {
          setFireStages((prev) => ({ ...prev, [dinoIndex]: "full" })); // Step 2: expand
        }, 10000);

        setTimeout(() => {
          setFireHitFragments((prev) =>
            prev.filter((index) => index !== dinoIndex)
          );
          setFireStages((prev) => ({ ...prev, [dinoIndex]: "done" })); // Step 3: show tandoori
        }, 1500);

        const lastGreenIndex = [...greenFragments].sort((a, b) => b - a)[0];
        const lastGreenMultiplier =
          lastGreenIndex !== undefined
            ? getMultiplierByIndex(lastGreenIndex)
            : 0;

        setTimeout(() => {
          restartGame();
        }, 2000);
      } else {
        if (!greenFragments.includes(dinoIndex)) {
          setGreenFragments((prev) => [...prev, dinoIndex]);
          setFlipStates((prev) => ({
            ...prev,
            [dinoIndex]: (prev[dinoIndex] || 0) + 1,
          }));
        }

        if (dinoIndex === fragmentCount) {
          const winningMultiplier =
            difficultyArray?.multiplier?.length > 0
              ? difficultyArray?.multiplier[
                  difficultyArray?.multiplier?.length - 1
                ]
              : 1;

          const total = (currentAmount * winningMultiplier).toFixed(2);

          setTimeout(() => {
            restartGame();
          }, 2000);
        }

        const prev = dinoIndex - 1;
        if (
          prev >= 1 &&
          greenFragments.includes(prev) &&
          !goldenFragments.includes(prev)
        ) {
          setGoldenFragments((prevGold) => [...prevGold, prev]);

          setFlipStates((prevState) => ({
            ...prevState,
            [prev]: (prevState[prev] || 0) + 1,
          }));
        }

        setDinoLandedIndex(dinoIndex);
      }
    }, frequency);

    return () => clearTimeout(timer);
  }, [dinoIndex, activeDifficulty]);

  useEffect(() => {
    if (dinoIndex === fragmentCount - 2) {
      setIslastSecondSegment(true);
    }
  }, [dinoIndex, fragmentCount]);

  const getMultiplierByIndex = (i) => {
    let base =
      difficultyArray?.multiplier?.length > 0
        ? difficultyArray?.multiplier[i - 1]
        : [];
    return i >= 1 ? parseFloat(base) : null;
  };

  const [font, setFont] = useState("25px");
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (400 < width <= 600) setFont("20px");
      if (width <= 1024) setFont("40px");
      if (width <= 400) setFont("25px");
      else setFont("20px");
    };

    handleResize(); // call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // console.log("redFragments",redFragments)

  const isLoading =
    !difficultyArray?.multiplier || difficultyArray?.multiplier.length === 0;

  // After your fragment result processing (inside setTimeout callbacks where restartGame is called):
  setTimeout(
    () => {
      // restartGame();
      setIsProcessingFragment(false);
    } /* match the same delay you have, e.g. 100 or 200ms after final state is shown */,
    2000
  );

  const [bottom, setBottom] = useState("52px");

  useEffect(() => {
    const updateDinoBottom = () => {
      if (containerRef?.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const screenWidth = window.innerWidth;

        let newBottom;

        if (screenWidth <= 360) {
          newBottom = containerHeight * 0.15;
        } else if (screenWidth <= 375) {
          newBottom = containerHeight * 0.15;
        } else if (screenWidth <= 400) {
          newBottom = containerHeight * 0.13;
        } else if (screenWidth <= 450) {
          newBottom = containerHeight * 0.13;
        } else if (screenWidth <= 800) {
          newBottom = containerHeight * 0.12;
        } else if (screenWidth <= 1000) {
          newBottom = containerHeight * 0.11;
        } else if (screenWidth <= 1200) {
          newBottom = containerHeight * 0.1;
        } else if (screenWidth <= 1500) {
          newBottom = containerHeight * 0.18;
        } else if (screenWidth <= 1540) {
          newBottom = containerHeight * 0.21;
        } else if (screenWidth <= 2000) {
          newBottom = containerHeight * 0.12;
        } else {
          newBottom = containerHeight * 0.1;
        }

        setBottom(`${newBottom}px`);
      }
    };

    updateDinoBottom();
    window.addEventListener("resize", updateDinoBottom);

    return () => {
      window.removeEventListener("resize", updateDinoBottom);
    };
  }, [containerRef]);

  const fireBottom = `${parseFloat(bottom) - 20}px`;

    // ✅ Effect to handle localStorage for red fragments
  useEffect(() => {
    if (redFragments.length > 0) {
      localStorage.setItem("redfragment", "true");
      console.log("🔴 Red fragment activated - localStorage set");

      const timer = setTimeout(() => {
        localStorage.removeItem("redfragment");
        console.log("🔴 Red fragment localStorage removed after 1 second");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [redFragments]);
  
  return (
    <div className="relative h-full overflow-auto">
      {/* 🔔 Fixed Notification */}
      <div className="absolute top-0 left-4 z-40">
        <Notification message="🔥 Watch out! Fire may hit!" />
      </div>
      <div
        ref={containerRef}
        className="scroll-container"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          height: "100%",
        }}
      >
        {/* chicken  🐔 Dino - Hide if collided */}
        <motion.div
          animate={controls}
          style={{
            position: "absolute",
            bottom: bottom,
            // bottom: 38,
            width: "50px",
            height: "60px",
            zIndex: 40,
            display: redFragments.includes(dinoIndex) ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dinoLandedIndex === null || dinoLandedIndex === 0 ? (
            <img
              className={`max-w-[120px] lg2:max-w-[120px] 2lg:max-w-[180px] h-auto object-contain`}
              src={cuttedChicken}
              alt="Chicken"
              style={{ transform: "translateX(20px)" }}
            />
          ) : (
            <img
              className={`max-w-[160px] lg:max-w-[150px] 2lg:max-w-[230px] h-auto object-contain  -ml-5`}
              src={ChickenGif}
              style={
                {
                  // bottom: window.innerWidth >= 1224 ? "25px" : bottom,
                }
              }
              alt="Chicken"
            />
          )}
        </motion.div>

        {/* 🧱 Fragments */}

        {isLoading && (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="inline-block animate-pulse"
                style={{
                  width: `${fragmentWidthVW}vw`,
                  height: "100%",
                  backgroundImage: `url(${i === 0 ? fregement1 : fregement2})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              />
            ))}
          </>
        )}

        {Array.from({ length: fragmentCount }).map((_, i) => {
          if (isLoading) {
            return (
              <div
                key={i}
                className="inline-block animate-pulse"
                style={{
                  width: `${fragmentWidthVW}vw`,
                  height: "100%",
                  backgroundImage: `url(${fregement2})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxSizing: "border-box",
                  position: "relative",
                  // filter: "brightness(0.4)",
                  // darken to indicate loading
                }}
              />
            );
          }
          // console.log("kitne freagment hai ",fragmentCount)
          const isSecondLast = i - 1 === fragmentCount - 2;
          const isLast = i === fragmentCount - 1;
          // if(isSecondLast+1){
          //   setIslastSecondSegment(true)
          // }
          if (isSecondLast) {
            return (
              <>
                <div
                  className="text-white overflow-hidden w-[50vw] lg:w-[18vw]"
                  key={i}
                  style={{
                    display: "inline-block",
                    // width: `40vw`,
                    height: "100%",
                    backgroundImage: `url(${golden_egg_wall})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                >
                  <div
                    className="text-white font-extrabold"
                    style={{
                      position: "absolute",
                      top: "42%",
                      left: "40%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontWeight: "black",
                      fontSize: "40px",
                      textShadow: "0 0 5px #ffd700",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                    }}
                  >
                    x
                    {difficultyArray?.multiplier?.length > 0
                      ? difficultyArray?.multiplier[
                          difficultyArray?.multiplier?.length - 1
                        ]
                      : ""}
                  </div>

                  <p className="h-7 ml-0.5 w-full absolute bottom-0 left-0 bg-[#333647]"></p>
                </div>
              </>
            );
          }
          // console.log("difficultyArray new", difficultyArray);
          const fragMultiplier =
            difficultyArray?.multiplier?.length > 0
              ? difficultyArray?.multiplier
              : 1;
          const isGolden = goldenFragments.includes(i);
          const isGreen = greenFragments.includes(i);
          const isRed = redFragments.includes(i);
          const isFireHit = fireHitFragments.includes(i);
          // console.log("fragMultiplier", fragMultiplier);
          // console.log(`Fragment ${i} - isGreen:`, greenFragments.includes(i));

          return (
            <>
              <div
                key={i}
                style={{
                  display: "inline-block",
                  width: `${fragmentWidthVW}vw`,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="h-[calc(100%-30px)]"
                  style={{
                    position: "relative",
                    width: "100%",
                    // height: "100%",
                    // margin: "0 auto",
                    // aspectRatio: "4 / 16",
                    backgroundImage: `url(${
                      i === 0
                        ? fregement1
                        : isGolden
                        ? goldenBackground
                        : isGreen
                        ? greenBackground
                        : fregement2
                    })`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {/* <div className="text-white absolute bottom-0 left-1/2 ">
                    sdfds
                  </div> */}
                  {redFragments.includes(i) &&
                    i === dinoIndex &&
                    (() => {
                      // Side effect before returning JSX
                      // if (!toggleSound) setToggleSound(true);
                      // playChickenDeadSound?.();
                      if (toggleSound) {
                        playChickenDeadSound?.();
                      }
                      return (
                        <>
                          {fireStages[i] === "bottom" ||
                          fireStages[i] === "full" ? (
                            <img
                              src={bigFire}
                              alt="Fire"
                              style={{
                                position: "absolute",
                                bottom: "5px",
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                                pointerEvents: "none",
                                zIndex: 15,
                              }}
                            />
                          ) : fireStages[i] === "done" ? (
                            <img
                              src={tandoriPlate}
                              alt="Tandoori"
                              style={{
                                position: "absolute",
                                bottom: "3px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "120px",
                                height: "120px",
                                pointerEvents: "none",
                                zIndex: 15,
                              }}
                            />
                          ) : null}
                        </>
                      );
                    })()}

                  {/* ✅ Red Coin Display After Fire */}
                  {redFragments.includes(i) && i !== 0 && (
                    <motion.div
                      key={`red-${flipStates[i] || 0}`}
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: "33%",
                        transform: "translate(-50%, -50%) rotateY(0deg)",
                        width: "100%",
                        height: "120px",
                        backgroundImage: `url(${RedChicken})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        pointerEvents: "none",
                        zIndex: 50,
                      }}
                    />
                  )}

                  {/* {fragMultiplier?.length > 0 && i > 0 && i !== fragmentCount  && ( */}
                  {/* Flip */}
                  {!isRed && i !== 0 && i !== fragmentCount - 1 && (
                    <motion.div
                      key={flipStates[i] || 0}
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: "33%",
                        transform: "translate(-50%, -50%) rotateY(0deg)",
                        width: "100%",
                        height: "120px",
                        backgroundImage: `url(${
                          isRed
                            ? RedChicken
                            : isGolden
                            ? GoldenChicken
                            : isGreen
                            ? greenCoin
                            : GreyCoin
                        })`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: font,
                        userSelect: "none",
                        pointerEvents: "none",
                        textShadow: "0 0 3px rgba(255,255,255,0.8)",
                        backfaceVisibility: "hidden",
                        perspective: "1000px",
                      }}
                    >
                      {!isRed && !isGolden && `x${fragMultiplier[i - 1] || 1}`}
                    </motion.div>
                  )}

                  {/* 🔥 Fire  to roast chicken*/}
                  {activeFireIndex === i && (
                    <img
                      src={Fire}
                      alt="Fire"
                      // className={`bottom:${fireBottom} lg:bottom-45`}
                      style={{
                        position: "absolute",
                        bottom: "15px",
                        // bottom: fireBottom,
                        // bottom: window.innerWidth >= 1024 ? "45px" : fireBottom,

                        left: "50%",
                        transform: "translateX(-50%)",
                        height: "80px",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* {console.log(
  "🔥 Fire fixed at fragment:",
  difficultyArray?.multiplier?.indexOf(difficultyArray?.roast_multiplier) + 1
)
} */}
                  {/* {difficultyArray?.roast_multiplier > 0 &&
                    difficultyArray?.multiplier?.indexOf(
                      difficultyArray?.roast_multiplier
                    ) ===
                      i - 1 && (
                      <img
                        src={Fire}
                        alt="Fire"
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          // bottom: fireBottom,
                          // bottom: window.innerWidth >= 1024 ? "45px" : fireBottom,
                          left: "50%",
                          transform: "translateX(-50%)",
                          height: "80px",
                          pointerEvents: "none",
                        }}
                      />
                    )} */}

                  {difficultyArray?.roast_multiplier > 0 &&
                    difficultyArray?.multiplier?.indexOf(
                      difficultyArray?.roast_multiplier
                    ) ===
                      i - 1 &&
                    i === dinoIndex && (
                      <img
                        src={Fire}
                        alt="Fire"
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          height: "80px",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                </div>
                <div
                  className="text-black text-sm font-semibold w-full text-center"
                  style={{
                    height: "30px",
                    lineHeight: "30px",
                    zIndex: 1,
                    backgroundImage: `url(${strip})`,
                    backgroundSize: "cover", // or "contain"
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {/* ddfdsfdsf */}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
