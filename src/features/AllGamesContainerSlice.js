import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    height: null,
    gameName: 'popular'
}

export const AllGamesContainerSlice = createSlice(
    {
        name: "allgamesfeatures",
        initialState,
        reducers: {
            handleGameContainerType: (state, action) => {
                const { height, gameName } = action.payload
                state.height = height
                state.gameName = gameName
            }
        }
    })

export const { handleGameContainerType } = AllGamesContainerSlice.actions;
export default AllGamesContainerSlice.reducer

