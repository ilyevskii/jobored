import {useQuery} from "react-query";

import {VacanciesService, Vacancy, ResultData} from "services";
import {useLinkParams} from "hooks";

interface VacanciesResult {
    data: Vacancy[],
    total: number
}

export const useVacancies = () => {

    const queryParams = Object.fromEntries(useLinkParams().currentSearchParams);

    const {data,  isLoading, isError, error} = useQuery<VacanciesResult | undefined, Error>(
        ["vacancies", queryParams],

        async () =>  {
            const result: ResultData = await VacanciesService.getVacancies(queryParams);

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
            refetchOnWindowFocus: false,
        }
        );


    return {
        vacancies: data,
        isVacanciesLoading: isLoading,
        isVacanciesError: isError,
        vacancies_error: error
    };

};
