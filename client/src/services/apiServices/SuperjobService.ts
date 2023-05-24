import axios from "axios";
import Cookies from "universal-cookie";

import {ResultData} from "./Types";

const cookies = new Cookies();


export class SuperjobService {

    public static access_token?: string = cookies.get("access_token");
    private static refresh_token?: string = cookies.get("refresh_token");

    private static readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private static readonly login: string = process.env.REACT_APP_SUPERJOB_LOGIN!
    private static readonly password: string =  process.env.REACT_APP_SUPERJOB_PASSWORD!
    private static readonly client_id: string =  process.env.REACT_APP_SUPERJOB_CLIENT_ID!
    private static readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!
    private static readonly proxy_key: string =  process.env.REACT_APP_SUPERJOB_PROXY_KEY!


    public static async authorize(): Promise<void | undefined> {

        try {
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
        catch (err: any) {
            await this.handleError(err);
        }
    }

    private static async refreshAccessToken(): Promise<void | undefined> {

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


    public static async handleError(error: any): Promise<ResultData> {

        if (error.response.status === 410 && error.response.data.error === "invalid_token") {
            await this.refreshAccessToken();
        }

        return {
            type: "error",
            data: {
                status_code: error.response.status,
                error: error.response.data.error,
                message: error.response.data.message
            }
        }
    }


}