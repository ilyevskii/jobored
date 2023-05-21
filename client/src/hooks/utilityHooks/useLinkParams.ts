import {useSearchParams} from "react-router-dom";

export interface FiltersParams {
    category_id: string;
    payment_from: string | number;
    payment_to: string | number;
}


export function useLinkParams() {

    const [currentSearchParams, setSearchParams] = useSearchParams();


    const setPageSearchParam = (page: number): void => {
        currentSearchParams.set("page", page.toString());
        setSearchParams(currentSearchParams);
    }

    const setKeywordsSearchParam = (keywords: string): void => {
        if (keywords) {
            currentSearchParams.set("keywords", keywords);
        }
        else {
            currentSearchParams.delete("keywords");
        }

        setSearchParams(currentSearchParams);
    }

    const setFiltersSearchParams = (filters: FiltersParams): void => {
        if (filters.payment_from) currentSearchParams.set("payment_from", filters.payment_from.toString());
        if (filters.payment_to) currentSearchParams.set("payment_to", filters.payment_to.toString());
        if (filters.category_id) currentSearchParams.set("category_id", filters.category_id);

        currentSearchParams.set("page", "1");

        setSearchParams(currentSearchParams);
    }

    const resetSearchParams = (): void => {
        currentSearchParams.delete("payment_from");
        currentSearchParams.delete("payment_to");
        currentSearchParams.delete("category_id");
        currentSearchParams.delete("keywords");
        currentSearchParams.set("page", "1");

        setSearchParams(currentSearchParams);
    }


    return {
        currentSearchParams,
        setPageSearchParam,
        setKeywordsSearchParam,
        setFiltersSearchParams,
        resetSearchParams
    };
}
