import {useQuery} from "react-query";

import {VacanciesService, Vacancy, ResultData} from "services";


export const useVacancyInfo = (id: string) => {

    const {data, isLoading, isError, error} = useQuery<Vacancy | undefined, Error>(["vacancy", id],
        async () => {
            const result: ResultData = await VacanciesService.getVacancyInfo(id);

            if (result.type === "success") {
                return result.data;
            }
            else {
                throw result.data;
            }
        });


    return {
        vacancy: data!,
        isVacancyLoading: isLoading,
        isVacancyError: isError,
        vacancyError: error
    };

};
