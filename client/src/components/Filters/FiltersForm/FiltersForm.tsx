import React, {useEffect} from "react";

import {NumberInput, Select, Button} from "@mantine/core";
import {useCategories, useLinkParams} from "hooks";

import {FiltersProps} from "../Filters";


export function FiltersForm(props: FiltersProps) {

    const {form} = props;
    const {categories, isCategoriesLoading} = useCategories();
    const {setFiltersSearchParams, currentSearchParams} = useLinkParams();

    const {category_id, payment_from, payment_to} = Object.fromEntries(currentSearchParams);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (props.reset_func) props.reset_func();
        setFiltersSearchParams(form.values);
    }

    useEffect(() => {
        form.setValues({
            category_id: category_id || "",
            payment_from: payment_from ? parseInt(payment_from) : "",
            payment_to: payment_to ? parseInt(payment_to) : ""
        });
    }, [currentSearchParams])


    return (
        <form onSubmit={handleSubmit} className="filters-form">
            <Select
                label="Отрасль"
                placeholder="Выберите отрасль"
                data={!isCategoriesLoading ? categories: [{value: "Loading", label: "Загрузка...", disabled: true}]}
                rightSection={<img src={`${process.env.PUBLIC_URL}/images/expand.png`} alt="categories"/>}
                rightSectionWidth={30}
                styles={{rightSection: { pointerEvents: "none", paddingRight: "17px" }}}
                {...form.getInputProps("category_id")}
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
                    {...form.getInputProps("payment_from")}
                />
                <NumberInput
                    placeholder="До"
                    step={1000}
                    min={0}
                    classNames={{
                        controlUp: "salary-input-control up",
                        controlDown: "salary-input-control down"
                    }}
                    {...form.getInputProps("payment_to")}
                />
            </div>
            <Button type="submit" className="submit-btn">
                Применить
            </Button>
        </form>
    );
}