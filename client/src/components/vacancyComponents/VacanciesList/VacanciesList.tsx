import React from "react";
import "../vacancy.scss";

import {Navigate} from "react-router-dom";
import {Loader} from "@mantine/core";

import {useVacancies} from "hooks";
import {VacanciesPagination, VacancyContainerContent} from "components";
import {Vacancy} from "services";


export function VacanciesList() {

    const {vacancies, isVacanciesLoading, isVacanciesError} = useVacancies();


    return (
        <>
            {isVacanciesError && <Navigate to="/error"/>}

            {!isVacanciesLoading && vacancies ?
                <>
                    {vacancies.data.length ?
                        <>
                            <ul className="vacancies-list">
                                {vacancies.data.map((vacancy: Vacancy) => (
                                    <li className="vacancy-container" key={vacancy.id}>
                                        <VacancyContainerContent vacancy={vacancy} is_list_item={true}/>
                                    </li>
                                ))}
                            </ul>
                            <VacanciesPagination total={vacancies.total}/>
                        </>
                        :
                        <Navigate to={"/empty"}/>
                    }
                </>
                :
                <Loader className="loader" size="80px"/>
            }
        </>
    );
}