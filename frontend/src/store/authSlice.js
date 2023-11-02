import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    username : ""
}

// We will use this authSlice to check whether the user is authenticated or not
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.username = action.payload.name;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;   // login & logout are actions

export default authSlice.reducer;   // exporting the reducer