import './FavoriteVacanciesList.scss';
import React from 'react';

import {useFavoriteVacancies, usePaginationParams} from "hooks";
import {VacanciesListItem, VacanciesPagination} from "components";
import {Vacancy} from "services";

import {Navigate} from "react-router-dom";


export function FavoriteVacanciesList() {

    const {favorite_vacancies, getCurrentPageContent} = useFavoriteVacancies();
    const {current_page} = usePaginationParams();

    const vacancies = getCurrentPageContent(current_page);


    return (
        <>
            {vacancies.length ?
                <>
                    <ul className="vacancies-list">
                        {vacancies!.map((vacancy: Vacancy) => (
                            <VacanciesListItem vacancy={vacancy}/>
                        ))}
                    </ul>
                    <VacanciesPagination total={Math.ceil(favorite_vacancies.length / 4)}/>
                </>
                :
                <Navigate to={"/empty"}/>
            }
        </>
    );
}