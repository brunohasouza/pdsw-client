import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    if (to.meta.auth && !localStorage.getItem('token')) {
        // return { name: 'login' };
    }
    if (!to.meta.auth && localStorage.getItem('token')) {
        return { name: 'home' };
    }
});
