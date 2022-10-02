import AuthResource from '@/resources/auth.resource'


const state = {
    user: {
        id: null,
        name: null,
        firstname: null,
        lastname: null,
        email: null,
        profile_image: null,
    },
    access_token: null,
    loggedIn: false,
};



// getters
const getters = {
    isLogged(state) {
        return state.loggedIn;
    }
};

// actions
const actions = {
    async get_auth ({commit}) {
        try {
            const auth = await AuthResource.getAuthState();

            if (auth.data.status) {
                commit('setAuthState',auth.data.account);
            }else{
                commit('resetAuthState');
            }

        } catch (error) {
            console.error(error);
            return false
        }
    },

    setAuthState({commit},payload){
        commit('setAuthState',payload);
    },
    resetAuthState({commit}){
        commit('resetAuthState');
    },
    setUser({commit},payload){
        commit('setUser',payload);
    },

}

// mutations
const mutations = {
    setAuthState(state,payload){
        state.loggedIn = false;
        state.user = payload;
        state.access_token = payload.access_token;
        if (state.user && state.user.id && state.user.id != null){
            state.loggedIn = true;
        }
        else {
            state.loggedIn = false;
        }
    },

    resetAuthState(state){
        state.user= {
            id: null,
            name: null,
            firstname: null,
            lastname: null,
            email: null,
            profile_image: null,
        }
        state.access_token= null;
        state.loggedIn= false;

    },

    setUser(state,payload){
        state.user = payload;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
