import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    username : "",
    userid : "",
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
            state.userid = action.payload.$id;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.username = "";
            state.userid = "";
        }
     }
})

export const {login, logout} = authSlice.actions;   // login & logout are actions

export default authSlice.reducer;   // exporting the reducer