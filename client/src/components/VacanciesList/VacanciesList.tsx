import './VacanciesList.css';
import React, {useEffect} from 'react';

import {useVacancies, usePaginationParams} from "hooks";
import {VacancyItem} from "components";
import {Vacancy} from "services";

import {Pagination, Loader} from "@mantine/core";


export function VacanciesList() {

    const {vacancies, isVacanciesLoading, refresh_vacancies} = useVacancies();
    const {current_page, total_page_amount, setCurrentPage} = usePaginationParams()

    useEffect(() => {
        refresh_vacancies();

    }, [current_page, refresh_vacancies])

    return (
        <>
            {!isVacanciesLoading ?
                <>
                    {vacancies && vacancies.length ?
                        <>
                            <ul className="vacancies-list">
                                {vacancies!.map((vacancy: Vacancy) => (
                                    <VacancyItem vacancy={vacancy}/>
                                ))}
                            </ul>
                            <Pagination
                                className="pagination"
                                total={total_page_amount}
                                onChange={setCurrentPage}
                                value={current_page}/>
                        </>
                        :
                        <div>
                            No results.
                        </div>
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