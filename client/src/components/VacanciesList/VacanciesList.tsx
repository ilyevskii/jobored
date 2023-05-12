import './VacanciesList.css';
import React, {useEffect} from 'react';

import {useVacancies} from "hooks";
import {Vacancy} from "services";


export function VacanciesList() {

    const {vacancies, isVacanciesLoading} = useVacancies();


    return (
        <div className="vacancies-container">
            {!isVacanciesLoading ?
                <>
                    {vacancies!.length ?
                        <>
                        {vacancies!.map((vacancy: Vacancy) => (
                            <div className="vacancy" key={vacancy.id}>
                                <div className="vacancy-info">
                                    <p>{vacancy.profession}</p>
                                    <p>{vacancy.payment_from} {vacancy.currency}</p>
                                    <p>{vacancy.town}</p>
                                </div>
                                <p>star</p>
                            </div>
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
        </div>
    );
}