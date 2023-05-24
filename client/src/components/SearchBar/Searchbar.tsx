import React, {ChangeEvent, useState} from "react";
import "./Searchbar.scss";

import {Input, Button} from "@mantine/core";
import {useLinkParams} from "hooks";


export function Searchbar() {

    const {currentSearchParams} = useLinkParams();
    const {keywords} = Object.fromEntries(currentSearchParams);
    const [value, setValue] = useState(keywords ? keywords : "");


    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    }


    return (
        <div className="searchbar-form">
            <Input
                form="filters"
                name="searchbar"
                className="searchbar-input-wrapper"
                value={value}
                onChange={handleChange}
                data-elem="search-input"
                placeholder="Введите название вакансии"
                icon={<img src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search"/>}
                rightSection={value.length ?
                    <button className="reset-btn" onClick={() => setValue("")} type="button">&times;</button>
                        :
                    <></>
                }
                styles={{rightSection: { width: "auto" }}}
                classNames={{input: "searchbar-input"}}
            />
            <Button
                type="submit"
                className="submit-btn"
                data-elem="search-button"
                form="filters"
            >
                Поиск
            </Button>
        </div>
    );
}