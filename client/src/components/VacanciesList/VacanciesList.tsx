import './VacanciesList.css';
import React, {useEffect} from 'react';

import {useVacancies, useFavoriteVacancies, usePaginationParams} from "hooks";
import {Vacancy} from "services";

import {Pagination, Loader} from "@mantine/core";


export function VacanciesList() {

    const {toggleFavoriteVacancy, isFavorite} = useFavoriteVacancies();
    const {vacancies, isVacanciesLoading, refresh_vacancies} = useVacancies();
    const {current_page, total_page_amount, setCurrentPage} = usePaginationParams()

    const toggleFavourite = (vacancy: Vacancy) => {
        toggleFavoriteVacancy(vacancy);
    }

    useEffect(() => {
        refresh_vacancies();
    }, [current_page])

    return (
        <>
            {!isVacanciesLoading ?
                <>
                    {vacancies && vacancies.length ?
                        <>
                            <ul className="vacancies-list">
                                {vacancies!.map((vacancy: Vacancy) => (
                                    <li className="vacancy-item" key={vacancy.id}>
                                        <div className="vacancy-info">
                                            <h3 className="vacancy-profession bold">{vacancy.profession}</h3>
                                            <p className="vacancy-salary">
                                                <span className="bold">з/п {vacancy.payment_from} {vacancy.currency}</span>
                                                <span className="vacancy-info-separator">•</span>
                                                <span>Полный рабочий день</span>
                                            </p>
                                            <p className="vacancy-town">
                                                <img src={`${process.env.PUBLIC_URL}/images/location.png`} alt="location"/>
                                                <span>{vacancy.town}</span>
                                            </p>
                                        </div>
                                        <button className="make-starred-btn" onClick={() => toggleFavourite(vacancy)}>
                                            {isFavorite(vacancy) ?
                                                <img src={`${process.env.PUBLIC_URL}/images/star_filled.png`} alt="favourite"/>
                                                :
                                                <img src={`${process.env.PUBLIC_URL}/images/star.png`} alt="favourite"/>
                                            }

                                        </button>
                                    </li>
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