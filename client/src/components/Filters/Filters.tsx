import React from "react";
import "./Filters.scss";

import {Navigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useForm, UseFormReturnType} from "@mantine/form";

import {useCategories, useLinkParams} from "hooks";
import {CollapseFilters, SimpleFilters} from "components";

export interface FiltersProps {
    form: UseFormReturnType<any, any>,
    reset_func?: () => void;
}



export function Filters() {

    const {isCategoriesError} = useCategories();
    const {currentSearchParams, resetSearchParams} = useLinkParams();

    const {category_id, payment_from, payment_to} = Object.fromEntries(currentSearchParams);
    const isMediumScreen = useMediaQuery({maxWidth: "767px"});


    const filters_form: UseFormReturnType<any, any> = useForm(
        {initialValues: {
                category_id: category_id || "",
                payment_from: payment_from ? parseInt(payment_from) : "",
                payment_to: payment_to ? parseInt(payment_to) : ""
            }
        });

    const handleReset = (): void => {
        filters_form.reset();
        resetSearchParams();
    }


    return (
        <>
            {isCategoriesError && <Navigate to="/error"/>}

            {!isMediumScreen ?
                    <SimpleFilters form={filters_form} reset_func={handleReset}/>
                    :
                    <CollapseFilters form={filters_form} reset_func={handleReset}/>
            }
        </>
    );
}