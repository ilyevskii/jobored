import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface paramsState {
    catalogue_id: string;
    payment_from: string;
    payment_to: string;
    keywords: string;
}

const initialState: paramsState = {
    catalogue_id: "",
    payment_from: "",
    payment_to: "",
    keywords: ""
};

const requestParamsReducer = createSlice({
    name: "request_params",
    initialState,
    reducers: {
        updateCatalogueId: (state, action: PayloadAction<string>): void => {
            state.catalogue_id = action.payload;
        },
        updatePaymentFrom: (state, action: PayloadAction<string>): void => {
            state.payment_from = action.payload;
        },
        updatePaymentTo: (state, action: PayloadAction<string>): void => {
            state.payment_to = action.payload;
        },
        updateKeywords: (state, action: PayloadAction<string>): void => {
            state.keywords = action.payload;
        }
    }
});

export const {updateCatalogueId, updatePaymentFrom, updatePaymentTo, updateKeywords} = requestParamsReducer.actions;

export default requestParamsReducer.reducer;
