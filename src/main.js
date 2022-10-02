import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//styles
require('@/assets/style/style.scss');
require('@/assets/style/style.css');
/*
require('@/assets/css/nav.css')
require('@/assets/css/home.css')
require('@/assets/css/admin.css')
require('@/assets/css/style.css')
require('@/assets/css/channel.scss')
*/

Vue.config.productionTip = false
Vue.use(ElementUI);
import {isMobile} from "@/heplers/mobileCheck";
Vue.prototype.$isMobile = isMobile;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')