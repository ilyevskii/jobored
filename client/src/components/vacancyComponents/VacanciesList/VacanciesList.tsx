import './VacanciesList.css';
import React, {useEffect} from 'react';

import {Navigate} from 'react-router-dom';
import {Pagination, Loader} from "@mantine/core";

import {useVacancies, usePaginationParams} from "hooks";
import {VacanciesListItem} from "components";
import {Vacancy} from "services";


export function VacanciesList() {

    const {vacancies, isVacanciesLoading, refresh_vacancies} = useVacancies();
    const {current_page, total_page_amount, setCurrentPage} = usePaginationParams();

    useEffect(() => {
        refresh_vacancies();
    }, [current_page, refresh_vacancies])

    useEffect(() => {
        console.log(vacancies)
        console.log(isVacanciesLoading)
    })

    return (
        <>
            {!isVacanciesLoading && vacancies ?
                <>
                    {vacancies.length ?
                        <>
                            <ul className="vacancies-list">
                                {vacancies!.map((vacancy: Vacancy) => (
                                    <VacanciesListItem vacancy={vacancy}/>
                                ))}
                            </ul>
                            <Pagination
                                className="pagination"
                                total={total_page_amount}
                                onChange={setCurrentPage}
                                value={current_page}/>
                        </>
                        :
                        <>
                            <Navigate to={"/empty"}/>
                        </>
                    }
                </>
                :
                <div className="loader-container">
                    <Loader className="loader" size="80px"/>
                </div>
            }
        </>
    );
}