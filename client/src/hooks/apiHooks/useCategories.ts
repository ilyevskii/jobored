import {useQuery} from "react-query";
import {CategoriesService, Category, ResultData} from "services";


export const useCategories = () => {

    const {data, isLoading, isError, error} = useQuery<Category[] | undefined, Error>(['categories'],
        async () => {
            const result: ResultData = await CategoriesService.getCategories();

            if (result.type === "success") {
                return result.data;
            }
            else {
                throw new Error(JSON.stringify(result.data));
            }
        });


    return {
        categories: data!,
        isCategoriesLoading: isLoading,
        isCategoriesError: isError,
        categoriesError: error
    };

};
