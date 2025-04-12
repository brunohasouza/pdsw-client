import { Mask } from 'maska';
import { faker } from '@faker-js/faker';
import { CATEGORY, REPORT_STATUS } from '@/enums';
import type { Report } from '@/types';
import { dateFormat } from '@/helpers';
import { UserModel } from './UserModel';
import { CooperativeModel } from './CooperativeModel';
import type { Location } from '@/views/HomePage.vue';

export class ReportModel {
    constructor(private readonly report: Report) {}

    get id(): number {
        return this.report.id;
    }

    get description(): string | undefined {
        return this.report.description;
    }

    get status(): REPORT_STATUS {
        return this.report.status;
    }

    get createdAt(): string {
        return dateFormat(this.report.created_at);
    }

    get scheduledAt(): string {
        return dateFormat(this.report.scheduled_at);
    }

    get collectedAt(): string {
        return dateFormat(this.report.collected_at);
    }

    get category(): CATEGORY {
        return this.report.category;
    }

    get number(): string {
        return this.report.number;
    }
    get street(): string {
        return this.report.street;
    }
    get city(): string {
        return this.report.city;
    }
    get state(): string {
        return this.report.state;
    }
    get neighborhood(): string {
        return this.report.neighborhood;
    }

    get zipcode(): string {
        const mask = new Mask({ mask: '#####-###' });
        return mask.masked(this.report.zipcode);
    }

    get fullAddress(): string {
        return `${this.street}, ${this.number} - ${this.neighborhood}, ${this.city} - ${this.state}, ${this.zipcode}`;
    }

    get position(): Location {
        return {
            lat: this.report.latitude,
            lng: this.report.longitude,
        };
    }

    get user(): UserModel {
        return new UserModel(this.report.user);
    }

    get toTable() {
        return {
            data: this.createdAt,
            endereço: this.fullAddress,
            tipo: this.category,
            status: this.status,
        };
    }

    get cooperative(): CooperativeModel | null {
        return this.report.cooperative
            ? new CooperativeModel(this.report.cooperative)
            : null;
    }
}

export const factoryReport = (overrides: Partial<Report> = {}): Report => {
    const status = faker.helpers.enumValue(REPORT_STATUS);
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        description: faker.lorem.paragraph(),
        status,
        created_at: faker.date.past().toString(),
        scheduled_at: faker.date.future().toString(),
        collected_at: faker.date.future().toString(),
        category: faker.helpers.enumValue(CATEGORY),
        number: faker.number.int({ min: 1, max: 1000 }).toString(),
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        neighborhood: faker.location.state(),
        zipcode: faker.location.zipCode('#####-###'),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        user: {
            id: faker.number.int({ min: 1, max: 1000 }),
            email: faker.internet.email(),
            name: faker.person.fullName(),
        },
        cooperative:
            status === REPORT_STATUS.PENDING
                ? undefined
                : {
                      id: faker.number.int({ min: 1, max: 1000 }),
                      name: faker.company.name(),
                      cnpj: faker.string.numeric(14),
                      phone: faker.string.numeric(11),
                      email: faker.internet.email(),
                  },
        ...overrides,
    };
};

export const factoryReportModelList = (
    count = faker.number.int({ max: 15 }),
): ReportModel[] =>
    Array(count)
        .fill(false)
        .map(() => new ReportModel(factoryReport()));
