import {combineReducers} from 'redux';
import {Reducer} from "react";

import requestParamsReducer from "./requestParamsReducer";
export const rootReducer: Reducer<any, any> = combineReducers({
    request_params: requestParamsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
