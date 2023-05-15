import axios from "axios";
import Cookies from "universal-cookie";

import {Catalogue, Vacancy, FiltersParams, RequestParams} from "./Types";

const cookies = new Cookies();

export class SuperjobService {

    private static access_token?: string;
    private static refresh_token?: string;

    private static readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private static readonly login: string = process.env.REACT_APP_SUPERJOB_LOGIN!
    private static readonly password: string =  process.env.REACT_APP_SUPERJOB_PASSWORD!
    private static readonly client_id: string =  process.env.REACT_APP_SUPERJOB_CLIENT_ID!
    private static readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!
    private static readonly proxy_key: string =  process.env.REACT_APP_SUPERJOB_PROXY_KEY!


    static async authorize(): Promise<void | undefined> {

        try {
            const cookie_access_token = cookies.get("access_token")

            if (!cookie_access_token) {
                const response = await axios.get(
                    `${this.url}/2.0/oauth2/password/?login=${this.login}&password=${this.password}&client_id=${this.client_id}&client_secret=${this.client_secret}`,
                    {
                        headers: {
                            "x-secret-key": this.proxy_key
                        }
                    });

                this.access_token = response.data.access_token;
                cookies.set("access_token", response.data.access_token);

                this.refresh_token = response.data.refresh_token;
                cookies.set("refresh_token", response.data.access_token);
            }
            else {
                this.access_token = cookie_access_token;
                this.refresh_token = cookies.get("refresh_token");
            }

        }
        catch (err: any) {
            await this.handleError(err);
        }
    }

    static async refreshAccessToken(): Promise<void | undefined> {

        try {
           const response = await axios.get(
                `${this.url}/2.0/oauth2/refresh_token/?refresh_token=${this.refresh_token}&client_id=${this.client_id}&client_secret=${this.client_secret}`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key
                    }
                });

            this.access_token = response.data.access_token;
            cookies.set("access_token", response.data.access_token);

            this.refresh_token = response.data.refresh_token;
            cookies.set("refresh_token", response.data.access_token);
        }
        catch (err: any) {
            await this.handleError(err);
        }
    }

    static async getCatalogues(): Promise<Catalogue[] | undefined> {

        try {
            if (!this.access_token) await this.authorize();

            const response = await axios.get(`${this.url}/2.0/catalogues/`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${this.access_token}`
                    }
                });

            return response.data.map((catalogue: any) => this.transformCatalogue(catalogue));
        }
        catch (err: any) {
            await this.handleError(err);
        }
    }

    static async getVacancies(params: RequestParams): Promise<any[] | undefined> {

        try {
            if (!this.access_token) await this.authorize();

            const response = await axios.get(`${this.url}/2.0/vacancies/${this.buildVacanciesParams(params)}`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${this.access_token}`
                    }
                });
            return [response.data.total, response.data.objects.map((vacancy: any) => this.transformVacancy(vacancy))];
        }
        catch (err) {
            await this.handleError(err);
        }
    }

    static async getVacancyInfo(vacancy_id: string): Promise<Vacancy | undefined> {

        try {
            if (!this.access_token) await this.authorize();

            const response = await axios.get(`${this.url}/2.0/vacancies/${vacancy_id}`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${this.access_token}`
                    }
                });

            return this.transformVacancy(response.data);
        }
        catch (err) {
            await this.handleError(err);
        }
    }

    private static async handleError(error: any) {

        if (error.response.status == 410 && error.response.data.error == "invalid_token") {
            await this.refreshAccessToken();
        }

        console.log(error.toString());
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

    private static transformCatalogue(catalogue: any):  Catalogue {
        return {
            value: catalogue.key,
            label: catalogue.title.length < 30 ? catalogue.title : catalogue.title_trimmed,
        }
    }

    private static transformVacancy(vacancy: any): Vacancy {

        const salary = vacancy.payment_to && vacancy.payment_from ?
                            `${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}` :
                       vacancy.payment_to ?
                            `до ${vacancy.payment_to} ${vacancy.currency}` :
                       vacancy.payment_from ?
                            `от ${vacancy.payment_from} ${vacancy.currency}` :
                            "по договорённости";

        return {
            id: vacancy.id,
            profession: vacancy.profession,
            firm_name: vacancy.firm_name,
            town: vacancy.town.title,
            type_of_work: vacancy.type_of_work.title,
            salary: salary
        }
    }
}