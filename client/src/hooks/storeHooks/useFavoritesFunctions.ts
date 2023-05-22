import {useSelector, useDispatch} from "react-redux";
import {Dispatch, useEffect} from "react";
import {AnyAction} from "redux";

import {RootState, updateFavoriteVacancies} from "store";
import {useFavorites} from "hooks";


export const useFavoriteVacancies = (page: number) => {

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const favorite_vacancies: number[] = useSelector((state: RootState) => state.favorite_vacancies.favorite_vacancies);
    const favorites_ids = favorite_vacancies.slice((page-1) * 4, Math.min((page-1) * 4 + 4, favorite_vacancies.length));
    const {favorites, isFavoritesError, isFavoritesLoading, favoritesError} = useFavorites(favorites_ids);

    const setFavoriteVacancies = (vacancies: number[]) => {
        dispatch(updateFavoriteVacancies(vacancies));
    }

    useEffect(() => {
        localStorage.setItem('favorite_vacancies', JSON.stringify(favorite_vacancies));
    }, [favorite_vacancies])

    const toggleFavoriteVacancy = (vacancy_id: number): void => {

        if (!isFavorite(vacancy_id)) {
            setFavoriteVacancies([...favorite_vacancies, vacancy_id]);
        }
        else {
            setFavoriteVacancies(favorite_vacancies.filter((favorite_id: number) => {
                                            return favorite_id !== vacancy_id
                                          })
            );
        }

    }

    const isFavorite = (vacancy_id: number): boolean => {
        return favorite_vacancies.some((favorite_id) => favorite_id === vacancy_id);
    }

    const getCurrentPageVacancies = (page: number): number[] => {
        page -= 1;
        return favorite_vacancies.slice(page * 4, Math.min(page * 4 + 4, favorite_vacancies.length));
    }


    return {
        toggleFavoriteVacancy,
        favorite_vacancies,
        getCurrentPageVacancies,
        isFavorite,
        favorites,
        isFavoritesError,
        isFavoritesLoading,
        favoritesError
    }
};
