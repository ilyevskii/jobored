import React from "react";
import "./SingleVacancyInfo.scss";

import {Loader} from "@mantine/core";
import {Navigate, useParams} from "react-router-dom";

import {useVacancyInfo} from "hooks";
import {VacancyContainerContent} from "components";
import {HtmlParserService} from "services";


export function SingleVacancyInfo() {

    const {id} = useParams();
    const {vacancy, isVacancyLoading, isVacancyError} = useVacancyInfo(id!);


    return (
        <main className="container narrow">
            {isVacancyError && <Navigate to="/error"/>}

            {!isVacancyLoading ?
                <>
                    <div className="vacancy-container">
                        <VacancyContainerContent vacancy={vacancy} is_list_item={false}/>
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