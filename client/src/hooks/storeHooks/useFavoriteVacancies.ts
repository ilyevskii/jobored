import {useSelector, useDispatch} from "react-redux";
import {Dispatch, useEffect} from "react";
import {AnyAction} from "redux";

import {Vacancy} from "services";
import {RootState, updateFavoriteVacancies} from "store";

export const useFavoriteVacancies = () => {

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const favorite_vacancies: Vacancy[] = useSelector((state: RootState) => state.favorite_vacancies.favorite_vacancies);

    const setFavoriteVacancies = (vacancies: Vacancy[]) => {
        dispatch(updateFavoriteVacancies(vacancies));
    }

    useEffect(() => {
        localStorage.setItem('favorite_vacancies', JSON.stringify(favorite_vacancies));
    }, [favorite_vacancies])

    const toggleFavoriteVacancy = (vacancy: Vacancy): void => {

        if (!isFavorite(vacancy)) {
            setFavoriteVacancies([...favorite_vacancies, vacancy]);
        }
        else {
            setFavoriteVacancies(favorite_vacancies.filter((favorite: Vacancy) => {
                                            return favorite.id !== vacancy.id
                                          })
            );
        }

    }

    const isFavorite = (vacancy: Vacancy): boolean => {
        return favorite_vacancies.some((favorite) => favorite.id === vacancy.id);
    }

    const getCurrentPageContent = (page: number): Vacancy[] => {
        page -= 1;
        return favorite_vacancies.slice(page * 4, Math.min(page * 4 + 4, favorite_vacancies.length));
    }


    return {
        toggleFavoriteVacancy,
        favorite_vacancies,
        getCurrentPageContent,
        isFavorite
    }
};
