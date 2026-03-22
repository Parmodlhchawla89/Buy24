// loginSlice.js

import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return null; 
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}


const initialState = {
  user: fetchFromLocalStorage(),
  isGoogleUser: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      // If payload has a property indicating Google login, set isGoogleUser
      state.isGoogleUser = !!action.payload.isGoogleUser;
      storeInLocalStorage(state.user);
    },
    logoutUser: (state) => {
      state.user = null;
      state.isGoogleUser = false;
      storeInLocalStorage(state.user);
    },
  },
});

export const { loginUser, logoutUser } = loginSlice.actions;
export const selectUser = (state) => state.login.user;

export default loginSlice.reducer;
