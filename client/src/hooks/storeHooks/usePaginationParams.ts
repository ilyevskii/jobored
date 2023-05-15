import {useSelector, useDispatch} from "react-redux";
import {Dispatch} from "react";
import {AnyAction} from "redux";

import {RootState, updateCurrentPage, updateTotalPageAmount} from "store";

interface paginationParamsHook {
    current_page: number;
    total_page_amount: number;
    setCurrentPage: (page: number) => void;
    setTotalPageAmount: (amount: number) => void;
}


export function usePaginationParams(): paginationParamsHook {

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const current_page: number = useSelector((state: RootState) => state.pagination.current_page);
    const total_page_amount: number = useSelector((state: RootState) => state.pagination.total_page_amount);

    const setCurrentPage = (page: number): void => {
        dispatch(updateCurrentPage(page));
    }

    const setTotalPageAmount = (amount: number): void => {
        dispatch(updateTotalPageAmount(amount));
    }

    return {
        current_page,
        total_page_amount,
        setCurrentPage,
        setTotalPageAmount
    };
}
