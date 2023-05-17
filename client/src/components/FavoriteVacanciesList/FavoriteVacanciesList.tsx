import './FavoriteVacanciesList.css';
import React from 'react';

import {useFavoriteVacancies, usePaginationParams} from "hooks";
import {VacancyItem} from "components";
import {Vacancy} from "services";

import {Pagination} from "@mantine/core";


export function FavoriteVacanciesList() {

    const {favorite_vacancies, getCurrentPageContent} = useFavoriteVacancies();
    const {current_page, setCurrentPage} = usePaginationParams();

    const vacancies = getCurrentPageContent(current_page);

    return (
        <>
            {vacancies.length ?
                <>
                    <ul className="vacancies-list">
                        {vacancies!.map((vacancy: Vacancy) => (
                            <VacancyItem vacancy={vacancy}/>
                        ))}
                    </ul>
                    <Pagination
                        className="pagination"
                        total={Math.ceil(favorite_vacancies.length / 4)}
                        onChange={setCurrentPage}
                        value={current_page}
                    />
                </>
                :
                <div>
                    No results.
                </div>
            }
        </>
    );
}