// Main Application Setup for E-Inventory SPA

import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Product from './components/Product.js';

// Retrieve global constructors from CDN scripts
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// 1. Configure Axios Globals and Interceptors
axios.defaults.baseURL = 'http://localhost:8080';

// Request Interceptor: Automatically inject Bearer JWT Token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Catch globally unauthorized requests (Expired/Invalid Token)
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            
            // Clear local storage session
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            
            // Redirect to login using hash routing
            window.location.hash = '/login';
        }
        return Promise.reject(error);
    }
);

// 2. Define SPA Routes
const routes = [
    { 
        path: '/', 
        name: 'landing',
        component: Landing 
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login 
    },
    { 
        path: '/dashboard', 
        name: 'dashboard',
        component: Dashboard, 
        meta: { requiresAuth: true } 
    },
    { 
        path: '/products', 
        name: 'products',
        component: Product, 
        meta: { requiresAuth: true } 
    }
];

// 3. Create Router Instance (Hash history is best for simple CDN deployments)
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'bg-slate-800 text-blue-400 border-l-4 border-blue-500' // Highlight active sidebar link
});

// 4. Router Navigation Guard
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // If route requires auth and user is not logged in
    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'login' });
    } 
    // If logged in user tries to visit login page, send to dashboard
    else if (to.name === 'login' && isLoggedIn) {
        next({ name: 'dashboard' });
    } 
    else {
        next();
    }
});

// 5. Mount Vue Application
const app = createApp({});
app.use(router);
app.mount('#app');
