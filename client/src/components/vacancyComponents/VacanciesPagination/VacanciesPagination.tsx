import React from "react";
import "./VacanciesPagination.scss";

import {Pagination} from "@mantine/core";
import {useLinkParams} from "hooks";

interface PaginationProps {
    total: number;
}


export function VacanciesPagination(props: PaginationProps) {

    const {currentSearchParams, setPageSearchParam} = useLinkParams();
    const {total} = props;


    return (
            <Pagination
                className="pagination"
                total={total}
                onChange={setPageSearchParam}
                value={parseInt(currentSearchParams.get("page") || "1")}>
            </Pagination>
    );
}