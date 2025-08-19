/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio("/path-to-your-audio.mp3")); // Replace with actual path
  const [isMuted, setIsMuted] = useState(false);

  // Toggle mute
  const toggleAudio = () => {
    setIsMuted((prev) => {
      const newMutedState = !prev;
      audioRef.current.muted = newMutedState;
      return newMutedState;
    });
  };

  return (
    <AudioContext.Provider value={{ audioRef, isMuted, toggleAudio }}>
      {children}
      <audio ref={audioRef} loop src="/path-to-your-audio.mp3"></audio>
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
