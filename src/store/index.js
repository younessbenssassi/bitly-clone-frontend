import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import loaded from './modules/loaded'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        loaded,
    },
    strict: false,
    plugins: [
        new VuexPersistence({
            key: 'bitly.1.0.0',
            reducer: (state) => ({
                auth: state.auth,
            })
        }).plugin,
    ]
})
