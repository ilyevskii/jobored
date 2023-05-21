import React from "react";
import "./VacanciesPagination.scss";

import {Pagination} from "@mantine/core";
import {usePaginationParams} from "hooks";

interface PaginationProps {
    total: number;
}


export function VacanciesPagination(props: PaginationProps) {

    const {current_page, setCurrentPage} = usePaginationParams();
    const {total} = props;


    return (
            <Pagination
                className="pagination"
                total={total}
                onChange={setCurrentPage}
                value={current_page}>
            </Pagination>
    );
}