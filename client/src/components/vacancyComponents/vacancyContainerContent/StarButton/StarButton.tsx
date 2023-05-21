import "./StarButton.scss";
import React from "react";

import {useFavoriteVacancies} from "hooks";
import {Vacancy} from "services";

interface StarButtonProps {
    vacancy: Vacancy;
}


export function StarButton(props: StarButtonProps) {

    const {vacancy} = props;
    const {toggleFavoriteVacancy, isFavorite} = useFavoriteVacancies();


    return (
        <button className="star-btn" onClick={() => toggleFavoriteVacancy(vacancy)}>
            {isFavorite(vacancy) ?
                <img src={`${process.env.PUBLIC_URL}/images/star_filled.png`} alt="favourite"/>
                :
                <img src={`${process.env.PUBLIC_URL}/images/star.png`} alt="favourite"/>
            }
        </button>
    );
}