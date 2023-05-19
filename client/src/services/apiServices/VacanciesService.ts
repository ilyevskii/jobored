import axios from "axios";

import {SuperjobService} from "./SuperjobService";
import {Vacancy, RequestParams, ResultData} from "./Types";


export class VacanciesService {

    private static readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private static readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!
    private static readonly proxy_key: string =  process.env.REACT_APP_SUPERJOB_PROXY_KEY!


    public static async getVacancies(params: RequestParams): Promise<ResultData> {

        try {
            if (!SuperjobService.access_token) await SuperjobService.authorize();

            const response = await axios.get(`${this.url}/2.0/vacancies/${this.buildVacanciesParams(params)}`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${SuperjobService.access_token}`
                    }
                });

            return {
                type: "success",
                data: {
                    total: response.data.total,
                    vacancies: response.data.objects.map((vacancy: any) => this.transformVacancy(vacancy))
                }
            }
        }
        catch (err) {
            return await SuperjobService.handleError(err);
        }
    }

    public static async getVacancyInfo(vacancy_id: string): Promise<ResultData> {

        try {
            if (!SuperjobService.access_token) await SuperjobService.authorize();

            const response = await axios.get(`${this.url}/2.0/vacancies/${vacancy_id}`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${SuperjobService.access_token}`
                    }
                });

            return {
                type: "success",
                data: this.transformVacancy(response.data, false)
            }
        }
        catch (err) {
            return await SuperjobService.handleError(err);
        }
    }

    private static buildVacanciesParams(params: RequestParams): string | undefined {

        try {
            const {catalogue_id, payment_from, payment_to, keywords, currentPage}: RequestParams = params;
            const vacancies_params: string[] = [`page=${currentPage}&count=4&published=1`];

            if (keywords) vacancies_params.push(`keywords=${encodeURIComponent(keywords)}`);
            if (catalogue_id) vacancies_params.push(`catalogues=${encodeURIComponent(catalogue_id)}`);

            if (payment_from || payment_to) {
                let order_url: string = "order_field=payment&order_direction=asc&no_agreement=1&";

                if (payment_from) order_url += `payment_from=${encodeURIComponent(payment_from)}`;
                if (payment_to) order_url += `${payment_from && "&"}payment_to=${encodeURIComponent(payment_to)}`;

                vacancies_params.push(order_url);
            }

            return vacancies_params.length ? `?${vacancies_params.join('&')}` : '';
        }
        catch (err) {
            console.log(err);
        }
    }

    private static transformVacancy(vacancy: any, is_list: boolean = true): Vacancy {

        const salary = vacancy.payment_to && vacancy.payment_from ?
            `${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}` :
            vacancy.payment_to ?
                `до ${vacancy.payment_to} ${vacancy.currency}` :
                vacancy.payment_from ?
                    `от ${vacancy.payment_from} ${vacancy.currency}` :
                    "по договорённости";

        const transformed_vacancy: Vacancy = {
            id: vacancy.id,
            profession: vacancy.profession,
            firm_name: vacancy.firm_name,
            town: vacancy.town.title,
            type_of_work: vacancy.type_of_work.title,
            salary: salary
        }

        if (!is_list) transformed_vacancy.text = vacancy.vacancyRichText;

        return transformed_vacancy;
    }
}