import './VacanciesList.css';
import React, {useEffect} from 'react';

import {useVacancies, useFavoriteVacancies} from "hooks";
import {Vacancy} from "services";


export function VacanciesList() {


    const {toggleFavoriteVacancy, isFavorite, favorite_vacancies} = useFavoriteVacancies();
    const {vacancies, isVacanciesLoading, refresh_vacancies} = useVacancies();

    const toggleFavourite = (vacancy: Vacancy) => {
        toggleFavoriteVacancy(vacancy);
    }

    useEffect(() => {
        console.log(favorite_vacancies)
    }, [favorite_vacancies])

    useEffect(() => {
        refresh_vacancies();
    }, [])

    return (
        <ul className="vacancies-list">
            {!isVacanciesLoading ?
                <>
                    {vacancies && vacancies.length ?
                        <>
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
                        </>
                        :
                        <div>
                            No results.
                        </div>}
                </>
                :
                <div>
                    Loading...
                </div>
            }
        </ul>
    );
}