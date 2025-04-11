import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Report } from './types';
import { faker } from '@faker-js/faker';
import { CATEGORY, REPORT_STATUS } from './enums';

export const dateFnsLocale = (locale: string) =>
    ({ 'pt-br': ptBR })[locale] || ptBR;

export const dateFormat = (
    date?: Date | string | number,
    pattern = 'dd/MM/yyyy',
    locale = 'pt-br',
): string => {
    if (!date) return '';

    const d = isValid(new Date(date));

    return d
        ? format(new Date(date), pattern, {
              locale: dateFnsLocale(locale),
          })
        : '';
};

export const factoryReport = (): Report => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    state: 'PE',
    city: 'Recife',
    neighborhood: 'Campo Grande',
    street: 'Rua Mario Sete',
    number: '176',
    zipcode: '52040190',
    category: faker.helpers.enumValue(CATEGORY),
    description: faker.lorem.paragraph(),
    status: faker.helpers.enumValue(REPORT_STATUS),
    created_at: faker.date.past().toString(),
    scheduled_at: faker.date.future().toString(),
    collected_at: faker.date.recent().toString(),
    user: {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.person.fullName(),
        email: faker.internet.email(),
    },
    cooperative: {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.company.name(),
        email: faker.internet.email(),
        cnpj: faker.string.numeric(14),
        phone: faker.string.numeric(11),
    },
});
