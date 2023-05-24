import {combineReducers} from 'redux';
import {Reducer} from "react";

import menuItemsReducer from "./menuItemsReducer";
import favoriteVacanciesReducer from "./favoriteVacanciesReducer";


export const rootReducer: Reducer<any, any> = combineReducers({
    menu_items: menuItemsReducer,
    favorite_vacancies: favoriteVacanciesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
