import './Searchbar.scss';
import React, {useEffect} from 'react';

import {Input, Button} from '@mantine/core';
import {useForm} from "@mantine/form";

import {useRequestParams, useVacancies} from "hooks";


export function Searchbar() {

    const {setSearchBarParams} = useRequestParams();
    const {refresh_vacancies} = useVacancies();

    const searchbar_form = useForm({initialValues: {keywords: ''}});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        await refresh_vacancies();
    }

    const handleReset = (): void => {
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
                icon={<img src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search"/>}
                rightSection={
                    searchbar_form.values['keywords'].length ?
                        <div className="reset-btn" onClick={handleReset}>&times;</div>
                        :
                        <></>
                }
                styles={{rightSection: { width: 'auto' }}}
                {...searchbar_form.getInputProps('keywords')}
            />
            <Button type="submit" className="submit-btn">
                Поиск
            </Button>
        </form>
    );
}