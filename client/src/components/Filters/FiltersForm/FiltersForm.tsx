import React from "react";

import {NumberInput, Select, Button} from "@mantine/core";
import {useCategories, useLinkParams} from "hooks";

import {FiltersProps} from "../Filters";


export function FiltersForm(props: FiltersProps) {

    const {form} = props;
    const {categories, isCategoriesLoading} = useCategories();
    const {setFiltersSearchParams} = useLinkParams();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (props.reset_func) props.reset_func();
        setFiltersSearchParams(form.values);
    }


    return (
        <form onSubmit={handleSubmit} className="filters-form">
            <Select
                label="Отрасль"
                placeholder="Выберите отрасль"
                data={!isCategoriesLoading ? categories : [{value: "Loading", label: "Загрузка...", disabled: true}]}
                data-elem="industry-select"
                rightSection={<img src={`${process.env.PUBLIC_URL}/images/expand.png`} alt="categories"/>}
                rightSectionWidth={30}
                styles={{rightSection: { pointerEvents: "none", paddingRight: "17px" }}}
                {...form.getInputProps("category_id")}
            />
            <div className="salary-range">
                <NumberInput
                    label="Оклад"
                    placeholder="От"
                    data-elem="salary-from-input"
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
                    data-elem="salary-to-input"
                    step={1000}
                    min={0}
                    classNames={{
                        controlUp: "salary-input-control up",
                        controlDown: "salary-input-control down"
                    }}
                    {...form.getInputProps("payment_to")}
                />
            </div>
            <Button type="submit" className="submit-btn" data-elem="search-button">
                Применить
            </Button>
        </form>
    );
}