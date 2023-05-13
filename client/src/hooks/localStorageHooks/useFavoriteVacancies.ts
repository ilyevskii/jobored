import {Vacancy} from "services";
import {useState} from "react";

export const useFavoriteVacancies = () => {

    const [favorite_vacancies, setFavoriteVacancies] = useState<Array<Vacancy>>(
            localStorage.getItem("favorite_vacancies") ?
            JSON.parse(localStorage.getItem("favorite_vacancies")!) : new Array<Vacancy>
    );


    const toggleFavoriteVacancy = (vacancy: Vacancy): void => {

        let new_vacancies = [...favorite_vacancies];

        if (!isFavorite(vacancy)) {
            new_vacancies.push(vacancy);
        }
        else {
            new_vacancies = favorite_vacancies.filter((favorite: Vacancy) => {
                if (favorite.id !== vacancy.id) return favorite
            })
        }

        localStorage.setItem("favorite_vacancies", JSON.stringify(new_vacancies));
        setFavoriteVacancies(new_vacancies);
    }

    const isFavorite = (vacancy: Vacancy): boolean => {

        for (let favorite of favorite_vacancies) {
            if (favorite.id === vacancy.id) {
                return true;
            }
        }

        return false;
    }

    return {
        toggleFavoriteVacancy,
        favorite_vacancies,
        isFavorite
    }
};
