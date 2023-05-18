import {useQuery} from "react-query";
import {SuperjobService, Vacancy} from "services";


export const useVacancyInfo = (id: string) => {

    const {data, isLoading, isError, error} = useQuery<Vacancy | undefined, Error>(['vacancy', id],
        async () => {
            return await SuperjobService.getVacancyInfo(id);
        });

    return {
        vacancy: data!,
        is_vacancy_loading: isLoading,
        is_vacancy_error: isError,
        vacancy_error: error
    };

};
