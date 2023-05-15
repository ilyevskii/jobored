import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Vacancy} from "services";
import {useState} from "react";

interface menuState {
    favorite_vacancies: Vacancy[];
}

const initialState: menuState = {
    favorite_vacancies: localStorage.getItem('favorite_vacancies') ? JSON.parse(localStorage.getItem('favorite_vacancies')!) : []
};

const favoriteVacanciesReducer = createSlice({
    name: "menu_items",
    initialState,
    reducers: {
        updateFavoriteVacancies: (state, action: PayloadAction<Vacancy[]>): void => {
            state.favorite_vacancies = action.payload;
        }
    }
});

export const {updateFavoriteVacancies} = favoriteVacanciesReducer.actions;

export default favoriteVacanciesReducer.reducer;
