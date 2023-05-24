import React from "react";
import "./SimpleMenu.scss";

import {useMenuItems} from "hooks";


export function SimpleMenu() {
    const {current_menu_item} = useMenuItems();


    return (
        <nav id="menu">
            <ul className="menu-list">
                <li
                    className={`menu-item${current_menu_item === 1 ? " active" : ""}`}
                ><a href="/vacancies?page=1">Поиск вакансий</a></li>
                <li
                    className={`menu-item${current_menu_item === 2 ? " active" : ""}`}
                ><a href="/favorites?page=1">Избранное</a></li>
            </ul>
        </nav>
    )
}

