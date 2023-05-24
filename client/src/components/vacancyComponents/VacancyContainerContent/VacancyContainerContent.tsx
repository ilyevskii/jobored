import React from "react";
import "./VacancyContainerContent.scss";

import {StarButton} from "components";
import {Vacancy} from "services";

interface VacancyContainerContentProps {
    vacancy: Vacancy;
    is_list_item: boolean;
}


export function VacancyContainerContent(props: VacancyContainerContentProps) {

    const {vacancy, is_list_item} = props;


    return (
        <>
            <div className="vacancy-container-content">
                {is_list_item ?
                    <h3 className="vacancy-profession bold">
                        <a href={`/vacancy?id=${vacancy.id}`}>{vacancy.profession}</a>
                    </h3>
                    :
                    <h2 className="vacancy-profession single bold">
                        {vacancy.profession}
                    </h2>
                }
                <p className={`vacancy-salary ${!is_list_item ? " single" : ""}`}>
                    <span className="bold">з/п {vacancy.salary}</span>
                    <span className="vacancy-info-separator">•</span>
                    <span>{vacancy.type_of_work}</span>
                </p>
                <p className="vacancy-location">
                    <img src={`${process.env.PUBLIC_URL}/images/location.png`} alt="location"/>
                    <span>{vacancy.town}</span>
                </p>
            </div>
            <StarButton vacancy={vacancy}/>
        </>

    );
}