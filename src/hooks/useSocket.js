import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://aviatorudaan.com"; 

const getEventName = (gameId) => {
    const eventNames = {
        1: "usawin30",
        2: "usawin1",
        3: "usawin3",
        4: "usawin5",
        6: "usawin6",
        7: "usawin7",
        8: "usawin8",
        9: "usawin9",
    };
    return eventNames[gameId] || null;
};

export default function useSocket(gameId) {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (!gameId) return;

        const eventName = getEventName(gameId);
        if (!eventName) {
            console.warn(`Invalid gameId: ${gameId}`);
            return;
        }

        console.log(`Connecting to ${SOCKET_SERVER_URL} and listening for event: ${eventName}`);
        const socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

        socket.on(eventName, (time) => {
            console.log(`Received timer update for ${eventName}:`, time);
            setTimer(time);
        });

        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, [gameId]); // <-- Added gameId to dependencies so it updates when gameId changes.

    return timer;
}
