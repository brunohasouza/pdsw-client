import { Mask } from 'maska';
import type { Cooperative } from '@/types';

export class CooperativeModel {
    constructor(private readonly cooperative: Cooperative) {}

    get id(): number {
        return this.cooperative.id;
    }

    get name(): string {
        return this.cooperative.name;
    }

    get email(): string {
        return this.cooperative.email;
    }

    get cnpj(): string {
        return this.cooperative.cnpj;
    }

    get phone(): string {
        return this.cooperative.phone;
    }

    get cnpjFormatted(): string {
        const mask = new Mask({ mask: '##.###.###/####-##' });
        return mask.masked(this.cooperative.cnpj);
    }

    get phoneFormatted(): string {
        const mask = new Mask({ mask: '(##) #####-####' });
        return mask.masked(this.cooperative.phone);
    }
}
