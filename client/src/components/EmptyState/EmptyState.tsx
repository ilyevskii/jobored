import './EmptyState.css';
import React from 'react';
import {useNavigate} from "react-router-dom";

export function EmptyState() {

    const navigate = useNavigate();

    const handleFindVacanciesClick = () => {
        navigate("/");
    }

    return (
        <main className="empty-state-container">
            <img src={`${process.env.PUBLIC_URL}/images/empty.png`} alt="logo"/>
            <p className="empty-state-text semi-bold">Упс, здесь еще ничего нет!</p>
            <button className="empty-state-btn" onClick={handleFindVacanciesClick}>Поиск Вакансий</button>
        </main>
    );
}