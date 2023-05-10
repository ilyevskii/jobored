import './Filters.css';
import React from 'react';

import {NumberInput, Select, Button} from '@mantine/core';
import {IconChevronDown} from '@tabler/icons-react';
import {useForm} from '@mantine/form';

export function Filters() {

    const filters_form = useForm({
        initialValues: {
            catalogue_id: '',
            payment_from: '',
            payment_to: ''
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    }

    const handleReset = (): void => {
        filters_form.reset();
    }

    const options = [
        { value: '1', label: 'test1' },
        { value: '2', label: 'test2' },
        { value: '3', label: 'test3' }
    ]

    return (
        <div className="filters-container">
            <div className="filters-topbar">
                <h2 className="filters-header">Фильтры</h2>
                <button onClick={handleReset} className="reset-button">Сбросить все ×</button>
            </div>
            <form onSubmit={handleSubmit} className="filters-form">
                <Select
                    label="Отрасль"
                    placeholder="Выберите отрасль"
                    data={options}
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
        </div>
    );
}