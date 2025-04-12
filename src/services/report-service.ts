import { AxiosAdapter } from './axios-adapter';
import { UnexpectedError } from './http-errors';

export type ReportParams = {
    description?: string;
    status?: string;
    scheduled_at?: Date | string | number;
    collected_at?: Date | string | number;
    category: string;
    number: string;
    street: string;
    city: string;
    state: string;
    neighborhood: string;
    zipcode: string;
    user_id: number;
    latitude: number;
    longitude: number;
};

export class ReportService {
    private readonly url = import.meta.env.VITE_BASE_URL;
    private readonly client: AxiosAdapter;

    constructor() {
        this.client = new AxiosAdapter();
    }

    public async index(userId?: number) {
        const { statusCode, data } = await this.client.get({
            url: `${this.url}/reports`,
            params: { user_id: userId },
        });

        if (statusCode !== 200) {
            throw new UnexpectedError(statusCode);
        }

        return data;
    }

    public async store(params: ReportParams) {
        const { statusCode, data } = await this.client.post({
            url: `${this.url}/reports`,
            body: params,
            params: { user_id: params.user_id },
        });

        if (statusCode !== 201) {
            throw new UnexpectedError(statusCode);
        }

        return data;
    }

    public async show(reportId: number) {
        const { statusCode, data } = await this.client.get({
            url: `${this.url}/reports/${reportId}`,
        });

        if (statusCode !== 200) {
            throw new UnexpectedError(statusCode);
        }

        return data;
    }
}
