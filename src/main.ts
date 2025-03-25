import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { vuetify } from './plugins';
import { router } from './router';

createApp(App).use(router).use(vuetify).mount('#app');
