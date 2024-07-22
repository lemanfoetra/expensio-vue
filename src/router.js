import { createRouter, createWebHistory } from 'vue-router'

import HeaderNav from './components/layout/HeaderNav.vue'

import PageLogin from './pages/login/PageLogin.vue'
import PageExpense from './pages/expense/PageExpense.vue'
import PageHome from './pages/home/PageHome.vue'
import PagePlanning from './pages/planning/PagePlanning.vue'
import PageIncome from './pages/income/PageIncome.vue'

const routes = [
    {
        path: '/',
        meta: { requireUnAuth: true },
        component: PageLogin,
    },
    {
        path: '/home',
        meta: { requireAuth: true },
        component: HeaderNav,
        children: [
            {
                path: '',
                component: PageHome,
            },
        ],
    },
    {
        path: '/planning',
        meta: { requireAuth: true },
        component: HeaderNav,
        children: [
            {
                path: '',
                component: PagePlanning,
            },
        ],
    },
    {
        path: '/income',
        meta: { requireAuth: true },
        component: HeaderNav,
        children: [
            {
                path: '',
                component: PageIncome,
            },
        ],
    },
    {
        path: '/expense',
        meta: { requireAuth: true },
        component: HeaderNav,
        children: [
            {
                path: '',
                component: PageExpense,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// CHECK AUTH
router.beforeEach(function (to, _, next) {
    // TOLAK JIKA TIDAK MEMILIKI AUTH
    if (to.meta.requireAuth && !isAuthenticated()) {
        next('/');
    } else if (to.meta.requireUnAuth && isAuthenticated()) {
        next('/home');
    } else {
        next();
    }
})

function isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return !!token;
}
export default router