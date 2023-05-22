import React from "react";
import "./Header.scss";

import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

import {BurgerMenu, SimpleMenu} from "components";


export function Header() {

    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery({maxWidth: "591px"});


    return (
        <header className="site-header">
            <div className="logo" onClick={() => navigate("/vacancies?page=1")}>
                <img className="logo-image" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo"/>
                <h1 className="logo-text">Jobored</h1>
            </div>
            {isSmallScreen ?
                <BurgerMenu/>
                :
                <SimpleMenu/>
            }
        </header>
    );
}