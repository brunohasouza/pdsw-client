import { AxiosAdapter, HTTP_STATUS_CODE } from './axios-adapter';
import { UnexpectedError } from './http-errors';

export type LoginParams = {
    email: string;
    password: string;
};

export type SignupParams = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export class AuthService {
    private readonly url = import.meta.env.VITE_BASE_URL;
    private readonly client: AxiosAdapter;

    constructor() {
        this.client = new AxiosAdapter();
    }

    public async login(params: LoginParams) {
        const { statusCode, data } = await this.client.post({
            url: `${this.url}/login`,
            body: params,
        });

        if (statusCode !== HTTP_STATUS_CODE.SUCCESS) {
            throw new UnexpectedError(statusCode);
        }

        return data;
    }

    public async signup(params: SignupParams) {
        const { statusCode, data } = await this.client.post({
            url: `${this.url}/signup`,
            body: params,
        });

        if (statusCode !== HTTP_STATUS_CODE.CREATED) {
            throw new UnexpectedError(statusCode);
        }

        return data;
    }
}
