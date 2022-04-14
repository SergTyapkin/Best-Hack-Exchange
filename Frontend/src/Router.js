import { createRouter, createWebHistory } from 'vue-router';

import SignIn from "./views/sign_in_up/SignIn.vue";
import SignUp from "./views/sign_in_up/SignUp.vue";
import Profile from "./views/Main.vue";
import Page404 from './views/Page404.vue';

export default function createVueRouter(Store) {
    const routes = [
        {path: '/', redirect: '/profile'},
        {path: '/signin', component: SignIn, meta: {noLoginRequired: true}},
        {path: '/signup', component: SignUp, meta: {noLoginRequired: true}},
        {path: '/profile', component: Profile, meta: {loginRequired: false}},
        {path: '/:pathMatch(.*)*', component: Page404},
    ];
    const loginRedirect = '/signin';
    const noLoginRedirect = '/profile';

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
                path: loginRedirect,
                params: {nextUrl: to.fullPath}
            });
        } else if (to.matched.some(record => record.meta.noLoginRequired)) {
            if (!Store.state.user.isLogined) {
                next();
                return;
            }
            next({
                path: noLoginRedirect,
                params: {nextUrl: to.fullPath}
            });
        }
        next();
    });

    return Router;
}
