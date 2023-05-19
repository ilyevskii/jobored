import './VacanciesListItem.scss';
import React from 'react';

import {Vacancy} from "services";
import {StarButton} from "../../StarButton/StarButton";

interface VacancyItemProps {
    vacancy: Vacancy;
}


export function VacanciesListItem(props: VacancyItemProps) {

    const {vacancy} = props;


    return (
        <li className="vacancy-container" key={vacancy.id}>
            <div className="vacancy-info">
                <h3 className="vacancy-profession bold">
                    <a href={`/vacancy/${vacancy.id}`}>{vacancy.profession}</a>
                </h3>
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
            <StarButton vacancy={vacancy}/>
        </li>
    );
}