import {useQuery} from "react-query";
import {SuperjobService, Catalogue} from "services";


export const useCatalogues = () => {

    const {data, isLoading, isError, error, refetch} = useQuery<Catalogue[] | undefined, Error>(['catalogues'],
        async () => {
            return await SuperjobService.getCatalogues();
        });

    return {
        catalogues: data!,
        is_catalogues_loading: isLoading,
        is_catalogues_error: isError,
        vacancies_error: error,
        refresh_catalogues: refetch,
    };

};
