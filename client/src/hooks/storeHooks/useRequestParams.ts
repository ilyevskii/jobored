import {useSelector, useDispatch} from "react-redux";
import {Dispatch} from "react";
import {AnyAction} from "redux";

import {RootState, updateCatalogueId, updatePaymentFrom, updatePaymentTo, updateKeywords} from "store";
import {FiltersParams, SearchbarParams, RequestParams} from "services";

interface requestParamsHook {
    catalogue_id: string;
    payment_from: string;
    payment_to: string;
    keywords: string;
    setFiltersParams: (params: FiltersParams) => void;
    setSearchBarParams: (value: SearchbarParams) => void;
    getActualRequestParams: () => RequestParams;
}

export function useRequestParams(): requestParamsHook {

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const catalogue_id: string = useSelector((state: RootState) => state.request_params.catalogue_id);
    const payment_from: string = useSelector((state: RootState) => state.request_params.payment_from);
    const payment_to: string = useSelector((state: RootState) => state.request_params.payment_to);
    const keywords: string = useSelector((state: RootState) => state.request_params.keywords);
    const currentPage: number = useSelector((state: RootState) => state.pagination.currentPage);

    const setFiltersParams = (params: FiltersParams): void => {
        if (params.catalogue_id !== catalogue_id) dispatch(updateCatalogueId(params.catalogue_id));
        if (params.payment_from !== payment_from) dispatch(updatePaymentFrom(params.payment_from));
        if (params.payment_to !== payment_to) dispatch(updatePaymentTo(params.payment_to));
    }

    const setSearchBarParams = (params: SearchbarParams): void => {
        if (params.keywords !== keywords) dispatch(updateKeywords(params.keywords));
    }

    const getActualRequestParams = (): RequestParams => {
        return {
            catalogue_id: catalogue_id,
            payment_from: payment_from,
            payment_to: payment_to,
            keywords: keywords,
            currentPage: currentPage
        }
    }

    return {
        catalogue_id,
        payment_from,
        payment_to,
        keywords,
        setFiltersParams,
        setSearchBarParams,
        getActualRequestParams
    };
}
