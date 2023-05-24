import React, {useEffect} from "react";
import "./SingleVacancyInfo.scss";

import {Loader} from "@mantine/core";
import {Navigate} from "react-router-dom";

import {useLinkParams, useVacancyInfo} from "hooks";
import {VacancyContainerContent} from "components";
import {HtmlParserService} from "services";


export function SingleVacancyInfo() {

    const {currentSearchParams} = useLinkParams();
    const {vacancy, isVacancyLoading, vacancyError} = useVacancyInfo(currentSearchParams.get("id") || "");


    return (
        <main className="container narrow">
            {(vacancyError || !currentSearchParams.get("id")) ? <Navigate to="/error"/> : <></>}

            {!isVacancyLoading ?
                <>
                    {vacancy ?
                        <>
                            <div className="vacancy-container">
                                <VacancyContainerContent vacancy={vacancy} is_list_item={false}/>
                            </div>
                            <div className="vacancy-container info">
                                {HtmlParserService.parseCode(vacancy.text!)}
                            </div>
                        </>
                        :
                        <Navigate to="/404"/>
                    }
                </>
                :
                <div className="loader-wrapper">
                    <Loader className="loader" size="80px"/>
                </div>
             }
        </main>
    );
}