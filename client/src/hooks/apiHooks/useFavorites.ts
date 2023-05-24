import {useQuery} from "react-query";

import {VacanciesService, Vacancy, ResultData} from "services";
import {useFavoritesFunctions, useLinkParams} from "hooks";

interface FavoritesResult {
    data: Vacancy[],
    ids: number[]
}


export const useFavorites = () => {

    const {currentSearchParams} = useLinkParams();
    const {getCurrentPageVacancies} = useFavoritesFunctions();
    const favorites = getCurrentPageVacancies(parseInt(currentSearchParams.get("page")!))


    const {data, isLoading, isError, error} = useQuery<FavoritesResult | undefined, Error>(["favorites", currentSearchParams.get("page")!],
        async () => {
            const result: ResultData = await VacanciesService.getFavoriteVacancies(favorites);

            if (result.type === "success") {
                return result.data;
            }
            else {
                throw result.data;
            }
        });


    return {
        favorites: data!,
        isFavoritesLoading: isLoading,
        isFavoritesError: isError,
        favoritesError: error
    };

};
