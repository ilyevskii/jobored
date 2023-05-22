import React from "react";
import "./CollapseFilters.scss";

import {Group, Collapse, Box} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

import {FiltersForm} from "components";
import {FiltersProps} from "../Filters";




export function CollapseFilters(props: FiltersProps) {

    const [opened, {toggle}] = useDisclosure(false);


    return (
        <Box className="filters-container">
            <Group className="filters-topbar">
                <h2 className="filters-header semi-bold">Фильтры</h2>
                <button className="reset-button" onReset={props.reset_func} type="button">
                    Сбросить все &times;
                </button>
                <button type="button" onClick={toggle} className="collapse-btn">
                    <img
                        className={opened ? "rotate-out" : "rotate-in"}
                        src={`${process.env.PUBLIC_URL}/images/expand.png`}
                        alt="filters"/>
                </button>
            </Group>

            <Collapse in={opened} style={{width: "100%"}}>
                <FiltersForm form={props.form} reset_func={toggle}/>
            </Collapse>
        </Box>
    );
}