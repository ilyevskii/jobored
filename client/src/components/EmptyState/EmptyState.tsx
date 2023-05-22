import "./EmptyState.scss";
import React from "react";

import {useNavigate} from "react-router-dom";
import {useVacancies} from "../../hooks";

interface EmptyStateProps {
    is_error?: boolean;
}


export function EmptyState(props: EmptyStateProps) {

    const {is_error} = props;
    const navigate = useNavigate();
    const {refresh_vacancies} = useVacancies();

    const handleFindVacanciesClick = () => {
        refresh_vacancies();
        navigate("/vacancies?page=1");
    }


    return (
        <main className="alert-container">
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