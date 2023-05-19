export type ResultData = {
    type: string;
    data: any;
}


export type Vacancy = {
    id: number;
    profession: string;
    firm_name: string;
    town: string;
    type_of_work: string;
    salary: string;
    text?: string;
}

export type RequestParams = {
    catalogue_id: string;
    payment_from: string;
    payment_to: string;
    keywords: string;
    currentPage: number;
}

export type Category = {
    value: string;
    label: string;
}