import './VacancyItem.css';
import React from 'react';

import {useFavoriteVacancies} from "hooks";
import {Vacancy} from "services";

interface VacancyItemProps {
    vacancy: Vacancy;
}


export function VacancyItem(props: VacancyItemProps) {

    const {toggleFavoriteVacancy, isFavorite} = useFavoriteVacancies();
    const {vacancy} = props;


    return (
        <li className="vacancy-item" key={vacancy.id}>
            <div className="vacancy-info">
                <h3 className="vacancy-profession bold">{vacancy.profession}</h3>
                <p className="vacancy-salary">
                    <span className="bold">з/п {vacancy.salary}</span>
                    <span className="vacancy-info-separator">•</span>
                    <span>{vacancy.type_of_work}</span>
                </p>
                <p className="vacancy-town">
                    <img src={`${process.env.PUBLIC_URL}/images/location.png`} alt="location"/>
                    <span>{vacancy.town}</span>
                </p>
            </div>

            <button className="make-starred-btn" onClick={() => toggleFavoriteVacancy(vacancy)}>
                {isFavorite(vacancy) ?
                    <img src={`${process.env.PUBLIC_URL}/images/star_filled.png`} alt="favourite"/>
                    :
                    <img src={`${process.env.PUBLIC_URL}/images/star.png`} alt="favourite"/>
                }
            </button>
        </li>
    );
}