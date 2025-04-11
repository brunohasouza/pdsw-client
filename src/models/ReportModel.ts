import type { CATEGORY, REPORT_STATUS } from '@/enums';
import type { Report } from '@/types';
import { dateFormat } from '@/helpers';
import { UserModel } from './UserModel';
import { CooperativeModel } from './CooperativeModel';
import { Mask } from 'maska';

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

    get user(): UserModel {
        return new UserModel(this.report.user);
    }

    get cooperative(): CooperativeModel | null {
        return this.report.cooperative
            ? new CooperativeModel(this.report.cooperative)
            : null;
    }
}
