import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    "price_list": {},
    "pos_profile": {}
}


export const posSlice = createSlice({
    name: "pos",
    initialState: initialState,
    reducers: {
        setPriceList: (state, action: PayloadAction<object>) => {
            state.price_list = action.payload;
        }
    }
});


export const { setPriceList } = posSlice.actions;