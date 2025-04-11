import type { User } from '@/types';

export class UserModel {
    constructor(private readonly user: User) {}

    get id(): number {
        return this.user.id;
    }

    get name(): string {
        return this.user.name;
    }

    get email(): string {
        return this.user.email;
    }
}
