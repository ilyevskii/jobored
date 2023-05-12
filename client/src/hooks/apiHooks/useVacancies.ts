import {useQuery} from "react-query";
import {SuperjobService, Vacancy} from "services";

import {useRequestParams} from "hooks";
import {useRef} from "react";


export const useVacancies = () => {

    const {getActualRequestParams} = useRequestParams();

    const {data,  isLoading, isFetching, isError, error, refetch} = useQuery<Vacancy[] | undefined, Error>(['vacancies'],
        async () => {
            return await SuperjobService.getVacancies(getActualRequestParams());
        });

    return {
        vacancies: data,
        isVacanciesLoading: isLoading || isFetching,
        isVacanciesError: isError,
        vacancies_error: error,
        refresh_vacancies: refetch,
    };

};
