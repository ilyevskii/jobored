import './Header.css';
import React from 'react';

import {useMenuItems} from "../../hooks";


export function Header() {

    const {current_menu_item} = useMenuItems();

    return (
        <header className="main-header">
            <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo"/>
                <h1 className="logo-text">Jobored</h1>
            </div>
            <nav id="menu">
                <ul className="menu-list">
                    <li
                        className={`menu-item${current_menu_item === 1 ? ' active' : ''}`}
                    ><a href="/">Поиск вакансий</a></li>
                    <li
                        className={`menu-item${current_menu_item === 2 ? ' active' : ''}`}
                    ><a href="/favorites">Избранное</a></li>
                </ul>
            </nav>
        </header>
    );
}