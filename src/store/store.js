import { configureStore } from "@reduxjs/toolkit"
import AllGamesContainerReducer from "../features/AllGamesContainerSlice"
import ProfileDetailsReducer from "../features/ProfileDetailsSlice"
import ChnageHeaderReducer from "../features/HeaderSlice"
export const store = configureStore({
    reducer: {
        // add your slice below
        AllGamesContainer: AllGamesContainerReducer,
        ProfileDetails: ProfileDetailsReducer,
        ChangeHeader: ChnageHeaderReducer

    }
})

