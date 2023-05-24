import React, {useEffect} from "react";
import "./Searchbar.scss";

import {Input, Button} from "@mantine/core";
import {useForm} from "@mantine/form";

import {useLinkParams} from "hooks";


export function Searchbar() {

    const {currentSearchParams, setKeywordsSearchParam} = useLinkParams();

    const {keywords} = Object.fromEntries(currentSearchParams);
    const searchbar_form = useForm({initialValues: {keywords: keywords ? keywords : ""}});


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setKeywordsSearchParam(searchbar_form.values["keywords"]);
    }

    const handleReset = (): void => {
        searchbar_form.reset();
    }


    useEffect(() => {
        searchbar_form.setValues({keywords: keywords ? keywords : ""});
    }, [currentSearchParams])


    return (
        <form className="searchbar-form" onSubmit={handleSubmit}>
            <Input
                name="searchbar"
                className="searchbar-input-wrapper"
                data-elem="search-input"
                placeholder="Введите название вакансии"
                icon={<img src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search"/>}
                rightSection={
                    searchbar_form.values["keywords"].length ?
                        <button className="reset-btn" onClick={handleReset} type="button">&times;</button>
                        :
                        <></>
                }
                styles={{rightSection: { width: "auto" }}}
                {...searchbar_form.getInputProps("keywords")}
            />
            <Button type="submit" className="submit-btn" data-elem="search-button">
                Поиск
            </Button>
        </form>
    );
}