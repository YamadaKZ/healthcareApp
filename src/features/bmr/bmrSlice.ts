// src/features/bmr/bmrSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BmrState {
    value: number | null;
}

const initialState: BmrState = {
    value: null,
};

const bmrSlice = createSlice({
    name: "bmr",
    initialState ,
    reducers: {
        setBmr: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        resetBmr: (state) => {
            state.value = null;
        },
    },
});

export const { setBmr, resetBmr } = bmrSlice.actions;
export const selectBmr = (state: { bmr: BmrState }) => state.bmr.value;
export default bmrSlice.reducer;
