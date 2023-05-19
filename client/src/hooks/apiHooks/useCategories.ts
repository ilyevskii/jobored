import {useQuery} from "react-query";
import {CategoriesService, Category, ResultData} from "services";


export const useCatalogues = () => {

    const {data, isLoading, isError, error, refetch} = useQuery<Category[] | undefined, Error>(['categories'],
        async () => {
            const result: ResultData = await CategoriesService.getCategories();

            if (result.type === "success") {
                return result.data;
            }
            else {
                throw result.data;
            }
        });


    return {
        catalogues: data!,
        is_catalogues_loading: isLoading,
        is_catalogues_error: isError,
        vacancies_error: error,
        refresh_catalogues: refetch,
    };

};
