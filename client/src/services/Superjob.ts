import axios from "axios";


export class SuperjobService {

    private access_token?: string;
    private refresh_token?: string;

    private readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private readonly login: string = process.env.REACT_APP_SUPERJOB_LOGIN!
    private readonly password: string =  process.env.REACT_APP_SUPERJOB_PASSWORD!
    private readonly client_id: string =  process.env.REACT_APP_SUPERJOB_CLIENT_ID!
    private readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!

    async authorize(): Promise<any> {

        try {

            const response = await axios.get(
                `${this.url}/2.0/oauth2/password/?login=${this.login}&password=${this.password}&client_id=${this.client_id}&client_secret=${this.client_secret}`,
                {
                    headers: {
                        "x-secret-key": "GEU4nvd3rej*jeh.eqp"
                    }
                });

            this.access_token = response.data.access_token;
            this.refresh_token = response.data.refresh_token;
        }
        catch (err: any) {
            console.log(err)
        }

    }
}