import React, {useState} from 'react';
import "./BurgerMenu.scss";

import {Menu, Burger} from '@mantine/core';
import {useMenuItems} from "hooks";


export function BurgerMenu() {
    const [opened, setOpened] = useState(false);
    const {current_menu_item} = useMenuItems();


    return (
        <Menu trigger="click">
            <Menu.Target>
                <Burger
                    className="burger"
                    opened={opened}
                    onClick={() => setOpened(prev => !prev)}
                />
            </Menu.Target>

            <Menu.Dropdown className="burger-dropdown">
                <Menu.Item className={`menu-item${current_menu_item === 1 ? " active" : ""}`}>
                    <a href="/vacancies?page=1">Поиск вакансий</a>
                </Menu.Item>
                <Menu.Item className={`menu-item${current_menu_item === 2 ? " active" : ""}`}>
                    <a href="/favorites?page=1">Избранное</a>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

