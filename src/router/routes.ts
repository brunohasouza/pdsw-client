import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/BaseLayout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '',
                component: () => import('@/views/HomePage.vue'),
                name: 'home',
            },
        ],
    },
    {
        path: '/',
        component: () => import('@/layouts/BlankLayout.vue'),
        meta: { auth: false },
        children: [
            {
                path: 'login',
                component: () => import('@/views/LoginPage.vue'),
                name: 'login',
            },
            {
                path: 'signup',
                component: () => import('@/views/SignupPage.vue'),
                name: 'signup',
            },
        ],
    },
];
