import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import store from '@/store';
import auth from './modules/auth';
import pages from './modules/pages';
import errors from './modules/errors';
const routes = [
    ...auth,
    ...pages,
    ...errors,

];

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach(async (to, from, next) => {
    if(to.meta && to.meta.public)
        next();
    else if(!store.state.auth.loggedIn && to.name !== 'Login')
        next({name: 'Login'})
    else if(store.state.auth.loggedIn){
        if (!store.state.loaded.loaded) {
            await store.dispatch('auth/get_auth');
            await store.dispatch('loaded/set_loaded');
        }
        if(to.name === 'Login'){
            next({name: 'GenerateLink'})
        }
    }

     next();
});

router.afterEach((to) => {
    Vue.nextTick(() => {
        if(!store.state.auth.loggedIn){
            document.title = 'Bitly';
        }
        else
            document.title = to.meta.title || 'Bitly';
    });
});

export default router
