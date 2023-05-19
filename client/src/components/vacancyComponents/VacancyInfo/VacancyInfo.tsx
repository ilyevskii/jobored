import './VacancyInfo.scss';
import React from 'react';

import {Navigate, useParams} from 'react-router-dom';
import {useVacancyInfo} from 'hooks';
import {StarButton} from "components";
import {HtmlParserService} from "services";

import {Loader} from "@mantine/core";


export function VacancyInfo() {

    const {id} = useParams();
    const {vacancy, isVacancyLoading, isVacancyError} = useVacancyInfo(id!);


    return (
        <main className="container narrow">
            {isVacancyError && <Navigate to="/error"/>}

            {!isVacancyLoading ?
                <>
                    <div className="vacancy-container">
                        <div className="vacancy-info">
                            <h2 className="vacancy-profession single semi-bold">
                                {vacancy.profession}
                            </h2>
                            <p className="vacancy-salary single">
                                <span className="semi-bold">з/п {vacancy.salary}</span>
                                <span className="vacancy-info-separator">•</span>
                                <span>{vacancy.type_of_work}</span>
                            </p>
                            <p className="vacancy-town">
                                <img src={`${process.env.PUBLIC_URL}/images/location.png`} alt="location"/>
                                <span>{vacancy.town}</span>
                            </p>
                        </div>
                        <StarButton vacancy={vacancy}/>
                    </div>
                    <div className="vacancy-container info">
                        {HtmlParserService.parseCode(vacancy.text!)}
                    </div>
                </>
                :
                <Loader className="loader" size="80px"/>
             }
        </main>
    );
}