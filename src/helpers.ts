import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
