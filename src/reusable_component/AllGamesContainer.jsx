import React, { useEffect, useRef } from "react";
import LotteryGamesList from "../components/LotteryGamesList";
import { useSelector } from "react-redux";
import PopularGamesList from "../components/PopularGamesList";
import MiniGamesList from "../components/MiniGamesList";
import SlotsGamesList from "../components/SlotsGamesList";
import FishingGamesList from "../components/FishingGamesList";
import FlashGameList from "../components/FlashGameList";
import CasinoGamesList from "../components/CasinoGamesList";
import LobbyGamesList from "../components/LobbyGamesList";
import PokerGamesList from "../components/PokerGamesList";

function AllGamesContainer() {
    const { gameName } = useSelector((state) => state.AllGamesContainer);
    const renderGamesList = () => {
        switch (gameName) {
            case "lottery":
                return (
                    <div className="">
                        <LotteryGamesList />
                    </div>
                );
            case "minigames":
                return (
                    <div className="">
                        <MiniGamesList />
                    </div>
                );
            case "popular":
                return (
                    <div className="">
                        <PopularGamesList />
                    </div>
                );
            case "casino":
                return (
                    <div className="">
                        <CasinoGamesList />
                    </div>
                );
            case "slots":
                return (
                    <div className="">
                        <SlotsGamesList />
                    </div>
                );
            case "fishing":
                return (
                    <div className="">
                        <FishingGamesList />
                    </div>
                );
            case "flash":
                return (
                  <div className="">
                    <FlashGameList />
                  </div>
                );
            case "rummy":
                return (
                    <div className="">
                        <PokerGamesList />
                    </div>
                );
            case "lobby":
                return (
                    <div className="">
                        <LobbyGamesList />
                    </div>
                );
            case "poker":
                return (
                    <div className="">
                        <PokerGamesList />
                    </div>
                );
            default:
                return null;
        }
    };

    // Scroll to a fixed position after rendering
    // Only run the effect when gameName changes

    return (
        <div > {/* Assign ref to the div wrapping the rendered component */}
            {renderGamesList()}
        </div>
    );
}

export default AllGamesContainer;
