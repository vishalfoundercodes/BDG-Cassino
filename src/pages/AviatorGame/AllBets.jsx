/* eslint-disable react/prop-types */

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
import { useEffect, useState } from "react"
import { socket } from "./AviatorSocket"

// Array of avatars
const personImages = [
    person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11, person12, person13, person14, person15, person16, person17, person18, person19, person20
];

// Function to generate random names
function generateRandomNames(count = 50) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const names = new Set();

    while (names.size < count) {
        let randomSuffix = "";
        for (let i = 0; i < 3; i++) {
            randomSuffix += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        names.add(`Mem***${randomSuffix}`);
    }

    return Array.from(names);
}

const randomNames = generateRandomNames();

function AllBets({ setTotalBetValue }) {
    const [winninDataNew, setWinninDataNew] = useState(() => {
        const savedData = localStorage.getItem("winningData");
        return savedData ? JSON.parse(savedData) : [];
    });
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
    // console.log("hotAirData", hotAirData)

    useEffect(() => {
        if (hotAirData?.status === 0) {
            const newWinninData = Array.from({ length: 50 }, (_, index) => ({
                id: index + 1,
                avatar: personImages[Math.floor(Math.random() * personImages.length)], // Random avatar from person1-person20
                name: randomNames[index],
                amount: Math.floor(Math.random() * (5000 - 10 + 1)) + 10,
                timer: null, // Initialize timer as null
                isWinner: false // To track if this row is selected
            }));

            setWinninDataNew(newWinninData);
            localStorage.setItem("winningData", JSON.stringify(newWinninData));
               // Calculate total bet amount and update state
               const totalBet = newWinninData.reduce((sum, bet) => sum + bet.amount, 0);
               setTotalBetValue(totalBet);
               localStorage.setItem("totalBetValue", totalBet.toFixed(2));
        }
    }, [hotAirData]);
    useEffect(() => {
        if (hotAirData?.status === 1 && winninDataNew.length > 0) {
            const totalRows = winninDataNew.length;
            const percentagePerSecond = 8; // Each second, 5% of rows get selected
            const maxPercentage = 90; // Max limit of selected winners is 70%
    
            // Calculate the number of winners needed based on the timer
            const currentPercentage = Math.min(hotAirData.timer * percentagePerSecond, maxPercentage);
            const targetWinners = Math.floor((totalRows * currentPercentage) / 100);
    
            // Count existing winners
            const currentWinners = winninDataNew.filter(data => data.isWinner).length;
    
            if (currentWinners >= targetWinners) return;
    
            const remainingSlots = targetWinners - currentWinners;
            let newWinners = [];
            let availableIndices = winninDataNew.map((_, index) => index).filter(i => !winninDataNew[i].isWinner);
    
            for (let i = 0; i < remainingSlots && availableIndices.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableIndices.length);
                newWinners.push(availableIndices[randomIndex]);
                availableIndices.splice(randomIndex, 1);
            }
    
            const updatedData = winninDataNew.map((data, index) =>
                newWinners.includes(index) ? { ...data, timer: hotAirData.timer, isWinner: true } : data
            );
    
            setWinninDataNew(updatedData);
            localStorage.setItem("winningData", JSON.stringify(updatedData));
        }
    }, [hotAirData]);    

    // console.log("winninDataNew",winninDataNew);

    return (
        <div className='text-white w-full h-full'>
            <div className="w-full flex items-center py-0.5 justify-between">
                <p className="text-gray w-[40%]">User</p>
                <p className="text-gray xl:-mr-5 2xl:-mr-10 w-[30%]">Bet, X</p>
                <p className="text-gray w-[30%]">Cash out,</p>
            </div>
            <div className="w-full h-full overflow-y-auto  hide-scrollbar">
                <div className="overflow-y-auto w-full">
                    {winninDataNew.map((data) => (
                        <div
                            key={data.id}
                            className={`flex px-1 mt-0.5 w-full items-center justify-between rounded-lg shadow-md transform transition-transform duration-500 ease-in-out 
            ${data.isWinner ? 'bg-[#123405] bg-opacity-70 border-[1px] border-[#427F00]' : ''}`}
                            style={{
                                animation: "fadeInFromTop 300ms ease-in-out",
                            }}
                        >
                            <div className="flex items-center w-[40%] space-x-1 xsm:space-x-2">
                                <img
                                    src={data.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <p className="text-xs 3xl:text-xsm font-semibold">{data.name}</p>
                            </div>
                            <div className="w-[30%] flex justify-start items-center -ml-12 xsm:-ml-16 gap-2">
                                <p className="text-white">{data.amount}.00</p>
                                <div className="w-14">

                                    {data.isWinner && (
                                        <p className="text-xsm bg-black px-2 py-0.5 rounded-full">
                                            {data.timer}x
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex justify-center items-center rounded-lg w-[4.2rem] h-12">
                                    {data.timer ? (data.amount * data.timer).toFixed(2) : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllBets