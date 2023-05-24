import axios from "axios";

import {SuperjobService} from "./SuperjobService";
import {Category, ResultData} from "./Types";


export class CategoriesService {

    private static readonly url: string = process.env.REACT_APP_SUPERJOB_API_URL!;
    private static readonly client_secret: string =  process.env.REACT_APP_SUPERJOB_CLIENT_SECRET!
    private static readonly proxy_key: string =  process.env.REACT_APP_SUPERJOB_PROXY_KEY!


    public static async getCategories(): Promise<ResultData> {

        try {
            if (!SuperjobService.access_token) await SuperjobService.authorize();

            const response = await axios.get(`${this.url}/2.0/catalogues/`,
                {
                    headers: {
                        "x-secret-key": this.proxy_key,
                        "X-Api-App-Id": this.client_secret,
                        "Authorization": `Bearer ${SuperjobService.access_token}`
                    }
                });

            return {
                type: "success",
                data: response.data.map((category: any) => this.transformCategory(category))
            };
        }
        catch (err: any) {
            return await SuperjobService.handleError(err);
        }
    }

    private static transformCategory(category: any):  Category {
        return {
            value: category.key.toString(),
            label: category.title_trimmed
        }
    }
}