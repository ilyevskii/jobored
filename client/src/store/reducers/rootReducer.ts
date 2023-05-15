import {combineReducers} from 'redux';
import {Reducer} from "react";

import requestParamsReducer from "./requestParamsReducer";
import paginationReducer from "./paginationReducer";
import menuItemsReducer from "./menuItemsReducer";


export const rootReducer: Reducer<any, any> = combineReducers({
    request_params: requestParamsReducer,
    pagination: paginationReducer,
    menu_items: menuItemsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
