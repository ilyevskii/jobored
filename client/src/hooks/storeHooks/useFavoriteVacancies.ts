import {Vacancy} from "services";
import {useEffect, useState} from "react";

export const useFavoriteVacancies = () => {

    const [favorite_vacancies, setFavoriteVacancies] =
    );

    useEffect(() => {
        localStorage.setItem('favorite_vacancies', JSON.stringify(favorite_vacancies));
    }, [favorite_vacancies])

    const toggleFavoriteVacancy = (vacancy: Vacancy): void => {

        if (!isFavorite(vacancy)) {
            setFavoriteVacancies(state => [...state, vacancy]);
        }
        else {
            setFavoriteVacancies(state => state.filter((favorite: Vacancy) => {
                                            return favorite.id !== vacancy.id
                                          })
            );
        }

    }

    const isFavorite = (vacancy: Vacancy): boolean => {
        return favorite_vacancies.some((favorite) => favorite.id === vacancy.id);
    }


    return {
        toggleFavoriteVacancy,
        favorite_vacancies,
        isFavorite
    }
};
