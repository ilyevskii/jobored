import './Header.css';
import React from 'react';

import {useMenuItems} from "../../hooks";


export function Header() {

    const {current_menu_item, setCurrentMenuItem} = useMenuItems();


    return (
        <header className="main-header">
            <div className="logo" onClick={() => setCurrentMenuItem(1)}>
                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo"/>
                <h1 className="logo-text">Jobored</h1>
            </div>
            <nav id="menu">
                <ul className="menu-list">
                    <li
                        className={`menu-item${current_menu_item === 1 ? ' active' : ''}`}
                        onClick={() => setCurrentMenuItem(1)}
                    ><a>Поиск вакансий</a></li>
                    <li
                        className={`menu-item${current_menu_item === 2 ? ' active' : ''}`}
                        onClick={() => setCurrentMenuItem(2)}
                    ><a>Избранное</a></li>
                </ul>
            </nav>
        </header>
    );
}