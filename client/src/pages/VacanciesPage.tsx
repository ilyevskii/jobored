import React, {useEffect} from "react";

import {Filters, Searchbar, VacanciesList} from "components";
import {useMenuItems} from "hooks";


export function VacanciesPage() {

    const {setCurrentMenuItem} = useMenuItems();

    useEffect(() => {
        setCurrentMenuItem(1);
    }, [])


    return (
        <div className="container">
            <Filters/>
            <main>
                <Searchbar/>
                <VacanciesList/>
            </main>
        </div>
    );
}