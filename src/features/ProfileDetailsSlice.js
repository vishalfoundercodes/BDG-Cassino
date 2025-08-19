import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_wallet: 0, // default value, can be null or empty as needed
};

const ProfileDetailsSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileDetails: (state, action) => {
            state.total_wallet = action.payload.total_wallet;
        },
        clearProfile: (state) => {
            state.total_wallet = 0;
        }
    },
});

export const { setProfileDetails, clearProfile } = ProfileDetailsSlice.actions;

export default ProfileDetailsSlice.reducer;
