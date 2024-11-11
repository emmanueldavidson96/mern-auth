import {createSlice} from "@reduxjs/toolkit";

const initial_state = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || "{}"): null
}

const authSlice = createSlice({
    name: "auth",
    initialState:initial_state,
    reducers:{
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        clearCredentials:(state,action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
});

export const {setCredentials, clearCredentials} = authSlice.actions;
export default authSlice.reducer; 
