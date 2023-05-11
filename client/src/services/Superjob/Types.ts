export interface Catalogue {
    id: number;
    title: string;
    title_trimmed: string;
}

export interface Vacancy {
    id: number;
    profession: string;
    firm_name: string;
    town: string;
    type_of_work: string;
    payment_to: string;
    payment_from: string;
    currency: string;
}

export interface VacanciesParams {
    catalogue_id: string;
    payment_from: string;
    payment_to: string;
}