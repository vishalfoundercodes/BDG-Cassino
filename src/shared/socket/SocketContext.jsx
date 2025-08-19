/* eslint-disable react/prop-types */
import React, { createContext, useContext, useMemo, useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const domain = "https://aviatorudaan.com/";
  const socket = useMemo(() => io(domain), []);

  const [timers, setTimers] = useState({
    type1: 0,
    type2: 0,
    type3: 0,
    type4: 0,
    type5: 0,
  });

  const [eventName, setEventName] = useState("bigcasino_wingo");  // Default event name

  useEffect(() => {
    const handleTimer = (data) => {
      // console.log("data received from socket:", data);
      const q = JSON.parse(data);
      const { timerBetTime, oneMinTimer, threeMinTimer, fiveMinTimer, tenMinTimer } = q;

      setTimers({
        type1: timerBetTime,    // 30s timer
        type2: oneMinTimer,     // 60s timer
        type3: threeMinTimer,   // 180s timer
        type4: fiveMinTimer,    // 300s timer
        type5: tenMinTimer,     // 600s timer
      });
    };

    if (eventName) {
      socket.on(eventName, handleTimer);
    }

    return () => {
      if (eventName) {
        socket.off(eventName, handleTimer);
      }
    };
  }, [socket, eventName]);

  return (
    <SocketContext.Provider value={{ socket, timers, setEventName }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
