import {useQuery} from "react-query";

import {VacanciesService, Vacancy, ResultData} from "services";
import {useRequestParams, usePaginationParams} from "hooks";


export const useVacancies = () => {

    const {setTotalPageAmount} = usePaginationParams();
    const {getActualRequestParams} = useRequestParams();

    const {data,  isLoading, isFetching, isError, error, refetch} = useQuery<Vacancy[] | undefined, Error>(['vacancies'],
        async () => {
            const result: ResultData = await VacanciesService.getVacancies(getActualRequestParams());

            if (result.type === "success") {
                setTotalPageAmount(Math.min(result.data.total, 125));
                return result.data.vacancies;
            }
            else {
                throw result.data;
            }
        }, {
            enabled: false
        });


    return {
        vacancies: data,
        isVacanciesLoading: isLoading || isFetching,
        isVacanciesError: isError,
        vacancies_error: error,
        refresh_vacancies: refetch
    };

};
