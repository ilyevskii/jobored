import './Header.css';
import React from 'react';

export function Header() {

    return (
        <header className="main-header">
            <div className="logo">
                <div className="union">
                    <div className="logo-ellipse"></div>
                    <div className="logo-ellipse"></div>
                </div>
                <span className="logo-text">Jobored</span>
            </div>
            <nav id="menu">
                <ul>
                    <li><a>Поиск вакансий</a></li>
                    <li><a>Избранное</a></li>
                </ul>
            </nav>
        </header>
    );
}