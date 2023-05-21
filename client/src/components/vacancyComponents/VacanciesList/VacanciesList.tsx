import "../vacancy.scss";
import React, {useEffect} from "react";

import {Navigate} from "react-router-dom";
import {Loader} from "@mantine/core";

import {useVacancies, usePaginationParams, useLinkParams} from "hooks";
import {VacanciesPagination, VacancyContainerContent} from "components";
import {Vacancy} from "services";


export function VacanciesList() {

    const {vacancies, isVacanciesLoading, isVacanciesError, refresh_vacancies} = useVacancies();
    const {current_page, total_page_amount} = usePaginationParams();
    const {setPageSearchParam} = useLinkParams();


    useEffect(() => {
        refresh_vacancies();
    }, [])

    useEffect(() => {
        setPageSearchParam(current_page);
    }, [current_page])


    return (
        <>
            {isVacanciesError && <Navigate to="/error"/>}

            {!isVacanciesLoading && vacancies ?
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
                            <VacanciesPagination total={total_page_amount}/>
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