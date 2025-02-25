import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    "price_list": "",
}


export const posSlice = createSlice({
    name: "pos",
    initialState: initialState,
    reducers: {
        setPriceList: (state, action: PayloadAction<string>) => {
            state.price_list = action.payload;
        }
    }
});