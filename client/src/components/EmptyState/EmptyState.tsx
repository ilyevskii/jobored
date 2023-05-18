import './EmptyState.scss';
import React from 'react';

import {useNavigate} from "react-router-dom";


export function EmptyState() {

    const navigate = useNavigate();

    const handleFindVacanciesClick = () => {
        navigate("/");
    }


    return (
        <main className="empty-state-container">
            <img src={`${process.env.PUBLIC_URL}/images/empty.png`} alt="empty page"/>
            <p className="alert-text semi-bold">Упс, здесь еще ничего нет!</p>
            <button className="redirect-btn bold" onClick={handleFindVacanciesClick}>Поиск Вакансий</button>
        </main>
    );
}