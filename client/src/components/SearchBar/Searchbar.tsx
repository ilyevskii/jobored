import './Searchbar.css';
import React, {useEffect} from 'react';

import {Input, Button} from '@mantine/core';
import {IconSearch, IconTrashX} from "@tabler/icons-react";
import {useForm} from "@mantine/form";

import {useRequestParams, useVacancies} from "hooks";


export function Searchbar() {

    const {setSearchBarParams} = useRequestParams();
    const {refresh_vacancies} = useVacancies();

    const searchbar_form = useForm(
        {initialValues: {
                keywords: '',
            }
        })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        await refresh_vacancies();
    }

    const handleReset = () => {
        searchbar_form.reset();
    }

    useEffect(() => {
        setSearchBarParams(searchbar_form.values);
    }, [searchbar_form.values])

    return (
        <form className="searchbar-form" onSubmit={handleSubmit}>
            <Input
                name="searchbar"
                className="searchbar-input-wrapper"
                placeholder="Введите название вакансии"
                icon={<IconSearch size={"18px"}/>}
                {...searchbar_form.getInputProps('keywords')}
                rightSection={
                    searchbar_form.values['keywords'].length ?
                        <div className="reset-btn" onClick={handleReset}>×</div>
                        :
                        <></>
                }
                styles={{rightSection: { width: 'auto' }}}
            />
            <Button type="submit" className="submit-btn search-btn">
                Поиск
            </Button>
        </form>
    );
}