import {useSearchParams} from "react-router-dom";

export interface FiltersParams {
    category_id: string;
    payment_from: string | number;
    payment_to: string | number;
    keywords: string;
}


export function useLinkParams() {

    const [currentSearchParams, setSearchParams] = useSearchParams();


    const setPageSearchParam = (page: number): void => {
        currentSearchParams.set("page", page.toString());
        setSearchParams(currentSearchParams);
    }

    const setFiltersSearchParams = (filters: FiltersParams): void => {

        resetSearchParams(false);

        if (filters.payment_from) currentSearchParams.set("payment_from", filters.payment_from.toString());
        if (filters.payment_to) currentSearchParams.set("payment_to", filters.payment_to.toString());
        if (filters.category_id) currentSearchParams.set("category_id", filters.category_id);
        if (filters.keywords) currentSearchParams.set("keywords", filters.keywords);

        currentSearchParams.set("page", "1");

        setSearchParams(currentSearchParams);
    }

    const resetSearchParams = (is_full_reset: boolean = true): void => {
        currentSearchParams.delete("payment_from");
        currentSearchParams.delete("payment_to");
        currentSearchParams.delete("category_id");
        currentSearchParams.delete("keywords");
        currentSearchParams.set("page", "1");

        if (is_full_reset) setSearchParams(currentSearchParams);
    }


    return {
        currentSearchParams,
        setPageSearchParam,
        setFiltersSearchParams,
        resetSearchParams
    };
}
