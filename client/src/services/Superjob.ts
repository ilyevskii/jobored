import axios from "axios";


export interface Catalogue {
    id: number;
    title: string;
    title_trimmed: string;
}


export class SuperjobService {

    private access_token?: string;
    private refresh_token?: string;

    private readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private readonly login: string = process.env.REACT_APP_SUPERJOB_LOGIN!
    private readonly password: string =  process.env.REACT_APP_SUPERJOB_PASSWORD!
    private readonly client_id: string =  process.env.REACT_APP_SUPERJOB_CLIENT_ID!
    private readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!
    private readonly proxy_key: string =  process.env.REACT_APP_SUPERJOB_PROXY_KEY!

    async authorize(): Promise<void | undefined> {

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
            console.log(err)
        }
    }

    async getCatalogues(): Promise<Catalogue[] | undefined> {

        try {
            const response = await axios.get(`${this.url}/2.0/catalogues/`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${this.access_token}`
                    }
                })

            return response.data.map((catalogue: any) => this.transformCatalogue(catalogue))
        }
        catch (err: any) {
            console.log(err)
        }
    }

    transformCatalogue(catalogue: any):  Catalogue {
        return {
            id: catalogue.key,
            title: catalogue.title,
            title_trimmed: catalogue.title_trimmed
        }
    }
}