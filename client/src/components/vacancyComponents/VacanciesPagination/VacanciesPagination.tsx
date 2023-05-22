import React from "react";
import "./VacanciesPagination.scss";

import {Pagination} from "@mantine/core";
import {useMediaQuery} from "react-responsive";
import {useLinkParams} from "hooks";

interface PaginationProps {
    total: number;
}


export function VacanciesPagination(props: PaginationProps) {

    const {total} = props;
    const {currentSearchParams, setPageSearchParam} = useLinkParams();
    const isSmallScreen = useMediaQuery({maxWidth: "441px"});


    return (
            <Pagination
                size={isSmallScreen ? "sm" : "md"}
                classNames={{control: "control"}}
                className="pagination"
                total={total}
                onChange={setPageSearchParam}
                value={parseInt(currentSearchParams.get("page") || "1")}>
            </Pagination>
    );
}