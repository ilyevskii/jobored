import './Searchbar.css';
import React from 'react';

import {Input, Button} from '@mantine/core';
import {IconSearch, IconTrashX} from "@tabler/icons-react";
import {useForm} from "@mantine/form";

export function Searchbar() {

    const searchbar_form = useForm(
        {initialValues: {
                searchbar: '',
            }
        });

    const handleReset = () => {
        searchbar_form.reset();
    }

    return (
        <form className="searchbar-form">
            <Input
                name="searchbar"
                className="searchbar-input-wrapper"
                placeholder="Введите название вакансии"
                icon={<IconSearch size={"18px"}/>}
                {...searchbar_form.getInputProps('searchbar')}
                rightSection={
                    searchbar_form.values['searchbar'].length ?
                        <IconTrashX className="reset-btn" onClick={handleReset}/>
                        :
                        <></>
                }
            />
            <Button type="submit" className="submit-btn search-btn">
                Поиск
            </Button>
        </form>
    );
}