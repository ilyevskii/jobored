import React from "react";

import {FiltersForm} from "components";
import {FiltersProps} from "../Filters";


export function SimpleFilters(props: FiltersProps) {

    return (
        <div className="filters-container">
            <div className="filters-topbar">
                <h2 className="filters-header semi-bold">Фильтры</h2>
                <button
                    className="reset-button"
                    onClick={props.reset_func}
                    type="button">Сбросить все &times;</button>
            </div>
            <FiltersForm form={props.form}/>
        </div>
    );
}