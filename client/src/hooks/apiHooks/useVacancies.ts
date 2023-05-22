import {useQuery} from "react-query";

import {VacanciesService, Vacancy, ResultData} from "services";
import {useLinkParams} from "hooks";

interface VacanciesResult {
    data: Vacancy[],
    total: number
}

export const useVacancies = () => {

    const {currentSearchParams} = useLinkParams();

    const {data,  isLoading, isFetching, isError, error, refetch} = useQuery<VacanciesResult | undefined, Error>(['vacancies'],

        async () =>  {
            const result: ResultData = await VacanciesService.getVacancies(Object.fromEntries(currentSearchParams));

            if (result.type === "success") {
                return {
                    data: result.data.vacancies,
                    total: Math.min(result.data.total, 125)
                }
            }
            else {
                throw result.data;
            }
        },
        {
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
