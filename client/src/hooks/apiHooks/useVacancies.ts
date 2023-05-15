import {useQuery} from "react-query";

import {SuperjobService, Vacancy} from "services";
import {useRequestParams, usePaginationParams} from "hooks";


export const useVacancies = () => {

    const {setTotalPageAmount} = usePaginationParams();
    const {getActualRequestParams} = useRequestParams();

    const {data,  isLoading, isFetching, isError, error, refetch} = useQuery<Vacancy[] | undefined, Error>(['vacancies'],
        async () => {
            const data = await SuperjobService.getVacancies(getActualRequestParams());
            setTotalPageAmount(Math.min(data![0], 125));
            return data![1];
        },
        {
            enabled: false
        });


    return {
        vacancies: data,
        isVacanciesLoading: isLoading || isFetching,
        isVacanciesError: isError,
        vacancies_error: error,
        refresh_vacancies: refetch,
    };

};
