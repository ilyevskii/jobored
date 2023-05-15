import {combineReducers} from 'redux';
import {Reducer} from "react";

import requestParamsReducer from "./requestParamsReducer";
import paginationReducer from "./paginationReducer";


export const rootReducer: Reducer<any, any> = combineReducers({
    request_params: requestParamsReducer,
    pagination: paginationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
