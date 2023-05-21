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

export interface RequestParams extends Object {
    category_id: string;
    payment_from: string | number;
    payment_to: string | number;
    keywords: string;
    page: number;
}

export type Category = {
    value: string;
    label: string;
}