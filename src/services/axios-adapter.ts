import type { AxiosResponse } from 'axios';
import axios from 'axios';

export enum HTTP_STATUS_CODE {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

export type HttpGetParams = {
    url: string;
    params?: any;
};

export type HttpPostParams<B = any> = {
    url: string;
    body?: B;
    params?: any;
};

export type HttpResponse<R = any> = {
    statusCode: HTTP_STATUS_CODE;
    data?: R;
};

export class AxiosAdapter {
    async get<R = any>({
        url,
        params = {},
    }: HttpGetParams): Promise<HttpResponse<R>> {
        let response: AxiosResponse;

        try {
            response = await axios.get(url, { params: params || {} });
        } catch (error) {
            response = error;
        }

        return this._adapt(response);
    }

    async post<R = any, B = any>({
        url,
        body,
        params,
    }: HttpPostParams<B>): Promise<HttpResponse<R>> {
        let response: AxiosResponse;

        try {
            response = await axios.post(url, body, { params: params || {} });
        } catch (error) {
            response = error;
        }

        return this._adapt(response);
    }

    private _adapt<R = any>(response: AxiosResponse): HttpResponse<R> {
        const { status, data } = response;

        return {
            statusCode: status,
            data,
        };
    }
}
