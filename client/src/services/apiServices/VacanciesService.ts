import axios from "axios";

import {SuperjobService} from "./SuperjobService";
import {Vacancy, RequestParams, ResultData} from "./Types";


export class VacanciesService {

    private static readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private static readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!
    private static readonly proxy_key: string =  process.env.REACT_APP_SUPERJOB_PROXY_KEY!


    public static async getVacancies(params: any): Promise<ResultData> {

        try {
            if (!SuperjobService.access_token) await SuperjobService.authorize();

            const response = await axios.get(`${this.url}/2.0/vacancies/${this.buildVacanciesParams(params)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
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
                        "Content-Type": "application/json",
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
            throw await SuperjobService.handleError(err);
        }
    }

    public static async getFavoriteVacancies(favorites: number[]): Promise<ResultData> {

        try {
            if (!SuperjobService.access_token) await SuperjobService.authorize();
            if (!favorites.length) return {type: "success", data: {data: [], ids: []}}

            const response = await axios.get(`${this.url}/2.0/vacancies?ids[]=${favorites.join("&ids[]=")}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${SuperjobService.access_token}`
                    }
                });

            return {
                type: "success",
                data: {
                    data: response.data.objects.map((vacancy: any) => this.transformVacancy(vacancy)),
                    ids: response.data.objects.map((vacancy: any) => vacancy.id)
                }
            }
        }
        catch (err) {
            return await SuperjobService.handleError(err);
        }
    }

    private static buildVacanciesParams(params: RequestParams): string | undefined {

        try {
            const {category_id, payment_from, payment_to, keywords, page}: RequestParams = params;

            const vacancies_params: string[] = [`page=${page - 1}&count=4&published=1`];

            if (keywords) vacancies_params.push(`keywords=${encodeURIComponent(keywords)}`);
            if (category_id) vacancies_params.push(`catalogues=${encodeURIComponent(category_id)}`);

            if (payment_from || payment_to) {
                let order_url: string = "order_field=payment&order_direction=desc&no_agreement=1&";

                if (payment_from) order_url += `payment_from=${encodeURIComponent(payment_from)}`;
                if (payment_to) order_url += `${payment_from ? "&" : ""}payment_to=${encodeURIComponent(payment_to)}`;

                vacancies_params.push(order_url);
            }

            return vacancies_params.length ? `?${vacancies_params.join("&")}` : "";
        }
        catch (err) {
            console.log(err);
        }
    }

    private static transformVacancy(vacancy: any, is_list: boolean = true): Vacancy {

        let salary: string;

        if (vacancy.payment_to && vacancy.payment_from) {
            if (vacancy.payment_to === vacancy.payment_from) salary = `${vacancy.payment_to} ${vacancy.currency}`;
            else salary = `${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}`;
        }
        else if (vacancy.payment_to) {
            salary = `до ${vacancy.payment_to} ${vacancy.currency}`;
        }
        else if (vacancy.payment_from) {
            salary = `от ${vacancy.payment_from} ${vacancy.currency}`
        }
        else {
            salary = "по договорённости"
        }

        const transformed_vacancy: Vacancy = {
            id: vacancy.id,
            profession: vacancy.profession,
            firm_name: vacancy.firm_name,
            town: vacancy.town.title,
            type_of_work: vacancy.type_of_work.title,
            salary: salary!
        }

        if (!is_list) transformed_vacancy.text = vacancy.vacancyRichText;

        return transformed_vacancy;
    }
}