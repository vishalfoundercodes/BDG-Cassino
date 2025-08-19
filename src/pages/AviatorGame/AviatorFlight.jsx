/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import aviator from "../../assets/usaAsset/aviator/aviator.gif";
import fan_aviator from "../../assets/usaAsset/aviator/fan_aviator.gif";
import chakra from "../../assets/usaAsset/aviator/chakra.png";
import { socket } from "./AviatorSocket";
import ProgressBarIndicator from "./ProgressBarIndicator";
import bg_one from '../../assets/usaAsset/aviator/bg_one.png';
import bg_two from '../../assets/usaAsset/aviator/bg_two.png';
import bg_three from '../../assets/usaAsset/aviator/bg_three.png';
import bg_four from '../../assets/usaAsset/aviator/bg_four.png';
import bg_five from '../../assets/usaAsset/aviator/bg_five.png';


function AviatorFlight({ changeBg, setChangeBg, isSoundOn, setIsSoundOn, isPathRemoved, setIsPathRemoved }) {
    // const audioRef = useRef(null);
    const [isOscillating, setIsOscillating] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aviatorX, setAviatorX] = useState(0);
    const [aviatorY, setAviatorY] = useState(0);
    const [trajectoryPoints, setTrajectoryPoints] = useState([]);
    const parentRef = useRef(null);
    const [dots, setDots] = useState([]);
    let oscillationStartY = 0;
    const [hotAirData, setHotAirData] = useState(null);
    useEffect(() => {
        const handleSocket = (hotair) => {
            const q = JSON.parse(hotair);
            setHotAirData(q);
        };

        // socket.on("demo_aviator", handleSocket);
        socket.on("bdgcasino_aviator", handleSocket);
        return () => socket.off("bdgcasino_aviator", handleSocket);
    }, []);
    // console.log("hotAirData",hotAirData)

    // useEffect(() => {
    //     if (audioRef.current) {
    //         if (isSoundOn) {
    //             audioRef.current.play().catch(error => console.error("Audio play error:", error));
    //         } else {
    //             audioRef.current.pause();
    //             audioRef.current.currentTime = 0; // Reset to start when toggled on again
    //         }
    //     }
    // }, [isSoundOn]);

    useEffect(() => {
        const img = localStorage.getItem("aviatorBg")
        if (img) {
            // console.log("bgimage",img)
            setChangeBg({ modal: false, selectBg: false, image: img })
        }
    }, [changeBg?.selectBg])

    useEffect(() => {
        if (hotAirData?.status === 0) {
            // setIsSoundOn(false)
            setIsResetting(true); // Hide aviator before resetting
            setAviatorX(-1000);  // Move it far outside the screen
            setAviatorY(-1000);

            setTimeout(() => {
                setAviatorX(0);
                setAviatorY(0);
                setTrajectoryPoints([]);
                setIsResetting(false); // Show aviator after reset
                setIsModalOpen(true);
            }, 50); // Short delay to ensure the transition is not visible
        }
        if (hotAirData?.status === 1) setIsSoundOn(true)
    }, [hotAirData?.status]);

    useEffect(() => {
        let animationFrame;
        let startTime = performance.now();
        let duration = 7000;
        let parentWidth = 800, parentHeight = 600;
        let oscillationFactor = 0;

        function updateDimensions() {
            if (parentRef.current) {
                parentWidth = parentRef.current.clientWidth;
                parentHeight = parentRef.current.clientHeight;
            }
        }

        function animate(time) {
            updateDimensions();
            let elapsed = time - startTime;

            if (hotAirData?.status === 0) {
                if (hotAirData?.status === 0) {
                    setIsResetting(true); // Hide aviator before resetting
                    setAviatorX(-1000);  // Move it far outside the screen
                    setAviatorY(-1000);

                    setTimeout(() => {
                        setAviatorX(0);
                        setAviatorY(0);
                        setTrajectoryPoints([]);
                        setIsResetting(false); // Show aviator after reset
                        setIsModalOpen(true);
                    }, 50); // Short delay to ensure the transition is not visible
                }
                setIsModalOpen(true);
            } else if (hotAirData?.status === 1) {
                const screenWidth = window.innerWidth;
                setIsModalOpen(false);
                let progress = Math.min(elapsed / duration, 1);
                let curveY = Math.pow(progress, 2.5) * 0.66 * parentHeight;
                let curveX = progress * 0.65 * parentWidth;
                if (screenWidth < 640) {
                    curveY = Math.pow(progress, 2.5) * 0.60 * parentHeight;
                    curveX = progress * 0.65 * parentWidth;
                } else {
                    curveY = Math.pow(progress, 2.5) * 0.76 * parentHeight;
                    curveX = progress * 0.75 * parentWidth;
                }

                if (progress < 1) {
                    setAviatorX(curveX);
                    setAviatorY(-curveY);
                    setTrajectoryPoints((prev) => [...prev, { x: curveX, y: curveY }]);
                    oscillationStartY = -curveY;
                } else {
                    if (!isOscillating) {
                        setIsOscillating(true);
                    }
                    oscillationFactor = Math.sin(time / 200) * 0.5;
                    setAviatorY((prevY) => prevY + oscillationFactor);
                    setTrajectoryPoints((prev) => prev.map((p) => ({
                        x: p.x,
                        y: p.y + oscillationFactor * (p.y / oscillationStartY)
                    })));
                    // setAviatorY(oscillationY);
                }
            } else if (hotAirData?.status === 2) {
                setIsOscillating(false);
                let flyProgress = Math.min(elapsed / 2000, 1);
                let flyX = aviatorX + flyProgress * 2.5 * parentWidth;  // Adjust X movement
                let flyY = aviatorY - flyProgress * 1.5 * parentHeight; // Adjust Y movement                
                setAviatorX(flyX);
                setAviatorY(flyY);
                setTrajectoryPoints([]);
                if (!isModalOpen) {
                    setIsModalOpen(true); // Ensure it is set only once
                }
            }
            animationFrame = requestAnimationFrame(animate);
        }

        if (hotAirData?.status > 0) {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [hotAirData?.status]);
    useEffect(() => {
        let animationFrame;
        const dotSpeed = 1;
        const dotSpacing = 50;
        // const containerHeight = parentRef.current?.clientHeight || 600;
        function initializeDots() {
            let dotsArray = [];
            let parentWidth = parentRef.current?.clientWidth || 800;
            let parentHeight = parentRef.current?.clientHeight || 600;

            for (let i = 0; i < Math.ceil(parentWidth / dotSpacing); i++) {
                for (let j = 0; j < Math.ceil(parentHeight / dotSpacing); j++) {
                    dotsArray.push({
                        id: `${i}-${j}`,
                        x: i * dotSpacing,
                        y: j * dotSpacing,
                    });
                }
            }
            return dotsArray;
        }
        function animateDots() {
            setDots((prevDots) =>
                prevDots.map((dot) => ({
                    id: dot.id,
                    x: dot.x + dotSpeed < parentRef.current?.clientWidth ? dot.x + dotSpeed : 0,
                    y: dot.y + dotSpeed < parentRef.current?.clientHeight ? dot.y + dotSpeed : 0,
                }))
            );
            animationFrame = requestAnimationFrame(animateDots);
        }
        if ((hotAirData?.status === 1 || hotAirData?.status === 2) && dots.length === 0) {
            setDots(initializeDots());
        }

        if (hotAirData?.status === 1 || hotAirData?.status === 2) {
            animationFrame = requestAnimationFrame(animateDots);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [hotAirData?.status]);

    const linePoints = trajectoryPoints.flatMap((p) => [p.x, parentRef.current?.clientHeight - p.y]);
    const filledPolygon = [
        0, parentRef.current?.clientHeight || 0,
        ...linePoints,
        trajectoryPoints.length ? trajectoryPoints.at(-1).x : 0, parentRef.current?.clientHeight || 0,
    ];
    // console.log("changeBg?.image hai", changeBg?.image)
    return (
        <div ref={parentRef} className="h-full relative border-[0.2px] overflow-hidden border-gray rounded-2xl">
            {isModalOpen && <div className="absolute top-[30%] -left-5 xsm:left-[30%] xl:left-[40%] z-40 p-6 w-96 flex flex-col items-center justify-center">
                {hotAirData?.status == 2 ? (
                    <div className={`sm:-ml-28 [text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white leading-snug 
                           font-manrope font-extrabold w-full text-${(changeBg?.image === "3"||changeBg?.image === "5")?"yellow":"white"} text-center -mt-10 flex flex-col justify-start text-[2rem] sm:text-[3rem]`}>
                        Flew away! <br />
                        <span className={`[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] leading-snug 
                           font-manrope w-full font-extrabold text-[#F85050] text-${(changeBg?.image === "3"||changeBg?.image === "5")?"yellow":"white"}  text-[3rem] sm:text-[5rem]`}>{hotAirData?.timer}x</span>
                    </div>
                ) : (
                    <div className="flex flex-col -mt-32 sm:-ml-28 xsm:pl-0 items-center justify-center h-full">
                        <img src={fan_aviator} className="w-48 h-48 xsm:w-64 xsm:h-64" alt="Logo" />
                        <p className={`[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white leading-snug 
                           font-manrope font-extrabold  text-${(changeBg?.image === "3"||changeBg?.image === "5")?"yellow":"white"} -mt-12 text-nowrap font-bold text-center text-[1.5rem] sm:text-[3rem] w-full`}>Waiting for next round {hotAirData?.betTime}</p>
                    
                        <ProgressBarIndicator timer={100} />

                    </div>

                )}
            </div>}
            <Stage width={parentRef.current?.clientWidth || 800} height={parentRef.current?.clientHeight || 600} className="absolute bottom-4 xsm:bottom-8 left-4 xsm:left-8 z-40">
             
                <Layer>
                    {!isPathRemoved && <Line points={filledPolygon} fill="rgba(207, 32, 48, 0.6)" closed />}
                    {!isPathRemoved && <Line points={linePoints} stroke="#DE003D" strokeWidth={5} />}
                </Layer>
            </Stage>

            {hotAirData?.status === 1 && (
                <div className={`[text-shadow:_0_4px_8px_rgb(99_102_241_/_0.8)] 
                           text-white leading-snug 
                           font-manrope font-extrabold absolute left-[40%] top-[30%] text-${(changeBg?.image === "3"||changeBg?.image === "5")?"yellow":"white"} text-[2rem] sm:text-[5rem] font-bold w-4 xsm:w-8 z-40`}>
                    {hotAirData?.timer}x
                </div>
            )}

            {hotAirData?.status !== 2 && (
                <>
                    <div className="absolute left-0 top-0 h-[calc(100%-32px)] w-4 xsm:w-8 z-40 border-r-[2px] border-[#160408] overflow-hidden">
                        {dots.map((dot) => (
                            <div
                                key={dot.id}
                                className="w-1 h-1 bg-green rounded-full absolute left-1 xsm:left-3"
                                style={{ top: `${dot.y}px` }}
                            />
                        ))}
                    </div>
                    <div className="absolute right-0 bottom-0 w-[calc(100%-32px)] h-4 xsm:h-8 z-40 border-t-[2px] border-[#160408] overflow-hidden">
                        {dots.map((dot) => (
                            <div
                                key={dot.id}
                                className="w-1 h-1 bg-green rounded-full absolute top-1.5 xsm:top-3"
                                style={{ left: `${dot.x}px` }}
                            />
                        ))}
                    </div>
                </>
            )}

            <div
                className="absolute bottom-4 xsm:bottom-8 left-4 xsm:left-8 z-40 transition-transform duration-100"
                style={{
                    transform: `translate(${aviatorX}px, ${aviatorY}px)`,
                    opacity: isResetting ? 0 : 1,
                }}
            >
                <img src={aviator} className="w-24 h-12 -ml-2 md:w-48 md:h-20" alt="aviator" />
            </div>

            {changeBg?.image === "1" ?<img className="w-full object-fill bg-center h-[100%]" src={bg_one} alt="df" /> :
                changeBg?.image === "2" ?
                    <img className="w-full object-fill bg-center h-[100%]" src={bg_two} alt="df" /> :
                    changeBg?.image === "3"?
                        <img className="w-full object-fill bg-center h-[100%]" src={bg_three} alt="df" /> :
                        changeBg?.image === "4" ?
                        <img className="w-full object-fill bg-center h-[100%]" src={bg_four} alt="df" /> :
                            changeBg?.image === "5" ?
                            <img className="w-full object-fill bg-center h-[100%]" src={bg_five} alt="df" /> :
                                <div
                                    className={` absolute object-fill left-0 -bottom-[58rem] xsm:-bottom-[59rem] sm:-bottom-[88rem] lg:-bottom-[78rem] 3xl:-bottom-[91rem] w-[320%] md:w-[320%] -ml-[160%] h-[740%] xs1:h-[660%] xs:h-[600%] xsm:h-[420%] sm:h-[390%] md:h-[510%] lg:h-[520%] xl:h-[480%] 2xl:h-[520%]`}
                                    style={{
                                        backgroundImage: `url(${chakra})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover ",
                                        backgroundRepeat: "no-repeat",
                                        animation: hotAirData?.status === 1 ? "spin 15s linear infinite" : "none",
                                    }}
                                ></div>
            }
        </div>
    );
}

export default AviatorFlight;
