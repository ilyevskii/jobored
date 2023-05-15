import React from 'react';
import {Filters, Searchbar, VacanciesList} from "../components";


export function VacanciesPage() {

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