import './VacancyInfo.css';
import React, {DOMElement, useEffect} from 'react';

import {useParams} from 'react-router-dom';
import {useVacancyInfo} from 'hooks';
import {StarButton} from "components";

import HTMLReactParser, {DOMNode} from 'html-react-parser';


export function VacancyInfo() {

    const {id} = useParams();
    const {vacancy, is_vacancy_loading} = useVacancyInfo(id!);

    const parseHtmlCode = (code: string): JSX.Element | JSX.Element[] | string => {

        return HTMLReactParser(code, {
                replace: (node: DOMNode) => {
                    const nodeObject: any = {...node};

                    if (nodeObject.type === 'tag' && nodeObject.name === 'br') {
                        return <></>;
                    }

                    if (nodeObject.type === 'tag' && nodeObject.children[0] && nodeObject.children[0].name === 'br') {
                        return <></>;
                    }

                    if (nodeObject.type === 'tag' && nodeObject.name === 'p') {

                        let tagChild = nodeObject.children[0];

                        if (tagChild && tagChild.name === 'b') {
                            const tagText = tagChild.children[0].data;
                            return <p className="vacancy-info-point semi-bold">{tagText}</p>
                        }

                        if (tagChild && tagChild.hasOwnProperty('data')) {

                            const tagText = tagChild.data.trim();
                            if (tagText.split(' ').length < 5 && tagText.endsWith(":")) {
                                return <p className="vacancy-info-point semi-bold">{tagText}</p>
                            }

                        }

                    }

                    if (nodeObject.type === 'tag' && nodeObject.name === 'b') {
                        const tagText = nodeObject.children[0].data;
                        return <p className="vacancy-info-point semi-bold">{tagText}</p>
                    }

                }
            }
        )

    }


    return (
        <main className="container narrow">
            {!is_vacancy_loading ?
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
                    <div className="vacancy-container info-text">
                        {parseHtmlCode(vacancy.text!)}
                    </div>
                </>

                :
                <div>
                    Loading...
                </div>
            }
        </main>
    );
}