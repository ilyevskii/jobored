import React from "react";

import {useFavoritesFunctions} from "hooks";
import {Vacancy} from "services";

interface StarButtonProps {
    vacancy: Vacancy;
}


export function StarButton(props: StarButtonProps) {

    const {vacancy} = props;
    const {toggleFavoriteVacancy, isFavorite} = useFavoritesFunctions();


    return (
        <button className="star-btn" onClick={() => toggleFavoriteVacancy(vacancy.id)}>
            {isFavorite(vacancy.id) ?
                <img src={`${process.env.PUBLIC_URL}/images/star_filled.png`} alt="favourite"/>
                :
                <img src={`${process.env.PUBLIC_URL}/images/star.png`} alt="favourite"/>
            }
        </button>
    );
}