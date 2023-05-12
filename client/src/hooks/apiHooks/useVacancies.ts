import {useQuery} from "react-query";
import {SuperjobService, Vacancy} from "services";

import {useRequestParams} from "hooks";


export const useVacancies = () => {

    const {getActualRequestParams} = useRequestParams();

    const {data, isLoading, isError, error, refetch} = useQuery<Vacancy[] | undefined, Error>(['vacancies'],
        async () => {
            return await SuperjobService.getVacancies(getActualRequestParams());
        });

    return {
        vacancies: data,
        isVacanciesLoading: isLoading,
        isVacanciesError: isError,
        vacancies_error: error,
        refresh_vacancies: refetch,
    };

};
