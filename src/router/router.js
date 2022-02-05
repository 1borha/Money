import Main from '@/pages/Main';
import Expenses from '@/pages/Expenses';
import Income from '@/pages/Income';
import Plan from '@/pages/Plan';

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/expenses',
        component: Expenses
    },
    {
        path: '/income',
        component: Income
    },
    {
        path: '/plan',
        component: Plan
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL),
})

export default router;