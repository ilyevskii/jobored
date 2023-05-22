import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface paginationState {
    current_page: number;
    total_page_amount: number;
}

const initialState: paginationState = {
    current_page: 1,
    total_page_amount: 0
};


const paginationReducer = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        updateCurrentPage: (state, action: PayloadAction<number>): void => {
            state.current_page = action.payload;
        },
        updateTotalPageAmount: (state, action: PayloadAction<number>): void => {
            state.total_page_amount = action.payload;
        }
    }
});


export const {updateCurrentPage, updateTotalPageAmount} = paginationReducer.actions;
export default paginationReducer.reducer;
