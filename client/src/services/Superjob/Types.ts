
export interface Catalogue {
    value: string;
    label: string;
}

export interface Vacancy {
    id: number;
    profession: string;
    firm_name: string;
    town: string;
    type_of_work: string;
    salary: string;
    text?: string;
}

export interface FiltersParams {
    catalogue_id: string;
    payment_from: string;
    payment_to: string;
}

export interface SearchbarParams {
    keywords: string;
}

export interface RequestParams {
    catalogue_id: string;
    payment_from: string;
    payment_to: string;
    keywords: string;
    currentPage: number;
}
