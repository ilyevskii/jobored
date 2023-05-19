import './EmptyState.scss';
import React, {useEffect} from 'react';

import {useNavigate} from "react-router-dom";
import {useVacancies, useVacancyInfo} from "../../hooks";

interface EmptyStateProps {
    is_error?: boolean;
}

export function EmptyState(props: EmptyStateProps) {

    const navigate = useNavigate();
    const {is_error} = props;
    const {refresh_vacancies} = useVacancies();

    const handleFindVacanciesClick = () => {
        refresh_vacancies();
        navigate("/");
    }


    return (
        <main className="empty-state-container">
            <img src={`${process.env.PUBLIC_URL}/images/empty.png`} alt="empty page"/>
            {is_error ?
                <p className="alert-text semi-bold">Что-то пошло не так... Попробуйте снова!</p>
                :
                <p className="alert-text semi-bold">Упс, здесь еще ничего нет!</p>
            }
            <button className="redirect-btn bold" onClick={handleFindVacanciesClick}>Поиск Вакансий</button>
        </main>
    );
}