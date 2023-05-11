import axios from "axios";
import {Catalogue, Vacancy, VacanciesParams} from "./Types";


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
           const response = await axios.get(
                `${this.url}/2.0/oauth2/password/?login=${this.login}&password=${this.password}&client_id=${this.client_id}&client_secret=${this.client_secret}`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key
                    }
                });

            this.access_token = response.data.access_token;
            this.refresh_token = response.data.refresh_token;
        }
        catch (err: any) {
            console.log(err);
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
            this.refresh_token = response.data.refresh_token;
        }
        catch (err: any) {
            console.log(err);
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
            console.log(err);
        }
    }

    static async getVacancies(params: VacanciesParams): Promise<Vacancy[] | undefined> {

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

            return response.data.objects.map((vacancy: any) => this.transformVacancy(vacancy));
        }
        catch (err) {
            console.log(err);
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
            console.log(err);
        }
    }

    private static buildVacanciesParams(params: VacanciesParams): string | undefined {

        try {
            const {catalogue_id, payment_from, payment_to}: VacanciesParams = params;
            const vacancies_params: string[] = [];

            if (catalogue_id) {
                vacancies_params.push(`catalogues=${encodeURIComponent(catalogue_id)}`);
            }

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
            id: catalogue.key,
            title: catalogue.title,
            title_trimmed: catalogue.title_trimmed
        }
    }

    private static transformVacancy(vacancy: any): Vacancy {
        return {
            id: vacancy.id,
            profession: vacancy.profession,
            firm_name: vacancy.firm_name,
            town: vacancy.town.title,
            type_of_work: vacancy.type_of_work.title,
            payment_to: vacancy.payment_to,
            payment_from: vacancy.payment_from,
            currency: vacancy.currency
        }
    }
}