import type { CATEGORY, REPORT_STATUS } from './enums';

export type User = {
    id: number;
    name: string;
    email: string;
};

export type Cooperative = {
    id: number;
    name: string;
    email: string;
    cnpj: string;
    phone: string;
};

export type Report = {
    id: number;
    description?: string;
    status: REPORT_STATUS;
    created_at: Date | string | number;
    scheduled_at?: Date | string | number;
    collected_at?: Date | string | number;
    category: CATEGORY;
    number: string;
    street: string;
    city: string;
    state: string;
    neighborhood: string;
    zipcode: string;
    user: User;
    cooperative?: Cooperative;
};
