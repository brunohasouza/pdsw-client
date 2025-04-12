import { HTTP_STATUS_CODE } from './axios-adapter';

export class UnexpectedError extends Error {
    constructor(code = HTTP_STATUS_CODE.BAD_REQUEST) {
        super('Erro inesperado');
        this.name = `${code}`;
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Usuário não autorizado');
        this.name = `${HTTP_STATUS_CODE.UNAUTHORIZED}`;
    }
}
