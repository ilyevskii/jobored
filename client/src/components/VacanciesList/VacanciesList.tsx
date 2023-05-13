import './VacanciesList.css';
import React, {useEffect} from 'react';

import {useVacancies} from "hooks";
import {Vacancy} from "services";
import {IconStar, IconMapPin} from "@tabler/icons-react";


export function VacanciesList() {

    const {vacancies, isVacanciesLoading, refresh_vacancies} = useVacancies();

    const addFavourite = () => {

    }

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
                                    <h3 className="vacancy-profession">{vacancy.profession}</h3>
                                    <p className="vacancy-salary">
                                        <span>з/п {vacancy.payment_from} {vacancy.currency}</span>
                                        <span className="vacancy-info-separator">•</span>
                                        <span>Полный рабочий день</span>
                                    </p>
                                    <p className="vacancy-town">
                                        <img src={`${process.env.PUBLIC_URL}/images/location.png`} alt="location"/>
                                        <span>{vacancy.town}</span>
                                    </p>
                                </div>
                                <button className="save-btn" onClick={addFavourite}>
                                    <img src={`${process.env.PUBLIC_URL}/images/star.png`} alt="favourite"/>
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