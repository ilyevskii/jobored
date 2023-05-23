import React from "react";
import "../vacancy.scss";

import {Navigate} from "react-router-dom";
import {Loader} from "@mantine/core";

import {useFavoritesFunctions, useFavorites} from "hooks";
import {VacanciesPagination, VacancyContainerContent} from "components";
import {Vacancy} from "services";


export function FavoriteVacanciesList() {

    const {favorite_vacancies} = useFavoritesFunctions();
    const {favorites, isFavoritesLoading, isFavoritesError} = useFavorites();


    return (
        <>
            {isFavoritesError && <Navigate to="/error"/>}

            {!isFavoritesLoading ?
                <>
                    {favorites.data.length ?
                        <>
                            <ul className="vacancies-list">
                                {favorites.data.map((vacancy: Vacancy) => (
                                    <li className="vacancy-container" key={vacancy.id} data-elem={`vacancy-${vacancy.id}`}>
                                        <VacancyContainerContent vacancy={vacancy} is_list_item={true}/>
                                    </li>
                                ))}
                            </ul>
                            <VacanciesPagination total={Math.ceil(favorite_vacancies.length / 4)}/>
                        </>
                        :
                        <Navigate to={"/empty"}/>
                    }
                </>
                :
                <div className="loader-wrapper">
                    <Loader size="80px"/>
                </div>
            }
        </>
    );
}