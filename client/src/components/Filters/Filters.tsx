import "./Filters.scss";
import React, {useEffect} from "react";

import {NumberInput, Select, Button} from "@mantine/core";
import {useForm} from "@mantine/form";

import {useCategories, useLinkParams} from "hooks";
import {Navigate} from "react-router-dom";


export function Filters() {

    const {categories, isCategoriesLoading, isCategoriesError} = useCategories();
    const {setFiltersSearchParams, resetSearchParams, currentSearchParams} = useLinkParams();

    const {category_id, payment_from, payment_to} = Object.fromEntries(currentSearchParams);


    const filters_form = useForm(
        {initialValues: {
                category_id: category_id || "",
                payment_from: payment_from ? parseInt(payment_from) : "",
                payment_to: payment_to ? parseInt(payment_to) : ""
            }
        });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setFiltersSearchParams(filters_form.values);
    }

    const handleReset = (): void => {
        filters_form.reset();
        resetSearchParams();
    }

    useEffect(() => {
        filters_form.setValues({
            category_id: category_id || "",
            payment_from: payment_from ? parseInt(payment_from) : "",
            payment_to: payment_to ? parseInt(payment_to) : ""
        });
    }, [currentSearchParams])


    return (
        <div className="filters-container">
            {isCategoriesError && <Navigate to="/error"/>}

            <div className="filters-topbar">
                <h2 className="filters-header semi-bold">Фильтры</h2>
                <button onClick={handleReset} className="reset-button" type="button">Сбросить все &times;</button>
            </div>
            <form onSubmit={handleSubmit} className="filters-form">
                <Select
                    label="Отрасль"
                    placeholder="Выберите отрасль"
                    data={!isCategoriesLoading ? categories: [{value: "Loading", label: "Загрузка..."}]}
                    rightSection={<img src={`${process.env.PUBLIC_URL}/images/expand.png`} alt="categories"/>}
                    rightSectionWidth={30}
                    styles={{rightSection: { pointerEvents: "none", paddingRight: "17px" }}}
                    {...filters_form.getInputProps("category_id")}
                />
                <div className="salary-range">
                    <NumberInput
                        label="Оклад"
                        placeholder="От"
                        step={1000}
                        min={0}
                        classNames={{
                            controlUp: "salary-input-control up",
                            controlDown: "salary-input-control down"
                        }}
                        {...filters_form.getInputProps("payment_from")}
                    />
                    <NumberInput
                        placeholder="До"
                        step={1000}
                        min={0}
                        classNames={{
                            controlUp: "salary-input-control up",
                            controlDown: "salary-input-control down"
                        }}
                        {...filters_form.getInputProps("payment_to")}
                    />
                </div>
                <Button type="submit" className="submit-btn">
                    Применить
                </Button>
            </form>
        </div>
    );
}