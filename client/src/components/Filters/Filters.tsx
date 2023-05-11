import './Filters.css';
import React from 'react';

import {NumberInput, Select, Button} from '@mantine/core';
import {IconChevronDown} from '@tabler/icons-react';
import {useForm} from '@mantine/form';

import {useCatalogues} from "hooks";


export function Filters() {

    const filters_form = useForm(
        {initialValues: {
                catalogue_id: '',
                payment_from: '',
                payment_to: ''
            }
        });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
    }

    const handleReset = (): void => {
        filters_form.reset();
    }

    const {catalogues, is_catalogues_loading, refresh_catalogues} = useCatalogues();

    return (
        <div className="filters-container">
            <div className="filters-topbar">
                <h2 className="filters-header">Фильтры</h2>
                <button onClick={handleReset} className="reset-button">Сбросить все ×</button>
            </div>
            {!is_catalogues_loading ?
                <form onSubmit={handleSubmit} className="filters-form">
                    <Select
                        label="Отрасль"
                        placeholder="Выберите отрасль"
                        data={catalogues}
                        rightSection={<IconChevronDown size="20px" color="var(--grey-500)"/>}
                        rightSectionWidth={30}
                        styles={{rightSection: { pointerEvents: 'none' }}}
                        {...filters_form.getInputProps('catalogue_id')}
                    />
                    <div className="salary-range">
                        <NumberInput
                            label="Оклад"
                            placeholder="От"
                            step={1000}
                            min={0}
                            classNames={{
                                controlUp: 'salary-input-control up',
                                controlDown: 'salary-input-control down'
                            }}
                            {...filters_form.getInputProps('payment_from')}
                        />
                        <NumberInput
                            placeholder="До"
                            step={1000}
                            min={0}
                            classNames={{
                                controlUp: 'salary-input-control up',
                                controlDown: 'salary-input-control down'
                            }}
                            {...filters_form.getInputProps('payment_to')}
                        />
                    </div>
                    <Button type="submit" className="submit-btn">
                        Применить
                    </Button>
                </form>
                :
                <div>Loading...</div>
            }
        </div>
    );
}