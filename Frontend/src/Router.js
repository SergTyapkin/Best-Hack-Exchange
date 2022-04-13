import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
// import Page404 from './views/Page404.vue';

export default function createVueRouter(Store) {
    const routes = [
        {path: '/', component: Home},
        // {path: '/signin', component: SignIn, meta: {noLoginRequired: true}},
        // {path: '/signup', component: SignUp, meta: {noLoginRequired: true}},
        // {path: '/profile', component: Profile, meta: {loginRequired: true}},
        // {path: '/:pathMatch(.*)*', component: Page404},
        {
            path: '/about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ];

    const Router = createRouter({
        history: createWebHistory(),
        routes: routes,
    });

    let router_got_user = false;
    Router.beforeEach(async (to, from, next) => {
        if (!router_got_user) {
            await Store.dispatch('GET_USER');
            router_got_user = true;
        }

        if (to.matched.some(record => record.meta.loginRequired)) {
            if (Store.state.user.isLogined) {
                next();
                return;
            }
            next({
                path: '/signin',
                params: {nextUrl: to.fullPath}
            });
        } else if (to.matched.some(record => record.meta.noLoginRequired)) {
            if (!Store.state.user.isLogined) {
                next();
                return;
            }
            next({
                path: '/profile',
                params: {nextUrl: to.fullPath}
            });
        }
        next();
    });

    return Router;
}
