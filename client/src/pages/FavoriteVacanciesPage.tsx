import React, {useEffect} from 'react';
import {FavoriteVacanciesList} from "components";
import {useMenuItems} from "../hooks";


export function FavoriteVacanciesPage() {

    const {setCurrentMenuItem} = useMenuItems();

    useEffect(() => {
        setCurrentMenuItem(2);
    }, [setCurrentMenuItem])


    return (
        <main className="container narrow">
            <FavoriteVacanciesList/>
        </main>
    );
}