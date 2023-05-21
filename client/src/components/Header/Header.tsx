import "./Header.scss";
import React from "react";

import {useMenuItems} from "hooks";
import {useNavigate} from "react-router-dom";


export function Header() {

    const {current_menu_item} = useMenuItems();
    const navigate = useNavigate();


    return (
        <header className="site-header">
            <div className="logo" onClick={() => navigate("/vacancies?page=1")}>
                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo"/>
                <h1 className="logo-text">Jobored</h1>
            </div>
            <nav id="menu">
                <ul className="menu-list">
                    <li
                        className={`menu-item${current_menu_item === 1 ? " active" : ""}`}
                    ><a href="/">Поиск вакансий</a></li>
                    <li
                        className={`menu-item${current_menu_item === 2 ? " active" : ""}`}
                    ><a href="/favorites">Избранное</a></li>
                </ul>
            </nav>
        </header>
    );
}