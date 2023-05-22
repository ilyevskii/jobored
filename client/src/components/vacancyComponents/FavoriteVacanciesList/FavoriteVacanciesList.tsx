import "../vacancy.scss";
import React from "react";

import {useFavoriteVacancies, useLinkParams} from "hooks";
import {VacanciesPagination, VacancyContainerContent} from "components";
import {Vacancy} from "services";

import {Navigate} from "react-router-dom";


export function FavoriteVacanciesList() {

    const {favorite_vacancies, getCurrentPageContent} = useFavoriteVacancies();
    const {currentSearchParams} = useLinkParams();

    const vacancies = getCurrentPageContent(parseInt(currentSearchParams.get("page") || "1"));


    return (
        <>
            {vacancies.length ?
                <>
                    <ul className="vacancies-list">
                        {vacancies!.map((vacancy: Vacancy) => (
                            <li className="vacancy-container" key={vacancy.id}>
                                <VacancyContainerContent vacancy={vacancy} is_list_item={true}/>
                            </li>
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