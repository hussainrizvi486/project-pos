import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import posSummarySlice from './features/pos/reducers/summary'
import authSlice from "@features/auth/reducers";

const store = configureStore({
    reducer: {
        pos: posSummarySlice,
        auth: authSlice
    }
})

export default store;

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>