import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { jwtDecode } from "jwt-decode";

const initialState = {
    user: null,
    isAuthenticated: false,
    tokens: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginUser: (state, payload) => {
            const { tokens } = payload;
            const user = jwtDecode(tokens.access);

            console.log(user)
            state.isAuthenticated = true;
            state.tokens = tokens

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("tokens", JSON.stringify(tokens));

        }
    }
});



export const { loginUser } = authSlice.actions;
export default authSlice.reducer;