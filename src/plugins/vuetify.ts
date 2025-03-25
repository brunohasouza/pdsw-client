import { createVuetify } from 'vuetify';
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme: {
                dark: false,
                colors: {
                    primary: '#346834',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});
