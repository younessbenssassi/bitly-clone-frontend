
const state = {
    loaded: false,
};



// getters
const getters = {

};

// actions
const actions = {
    set_loaded ({commit}) {
        commit('set_loaded', true);
    }

}

// mutations
const mutations = {
    set_loaded (state, loaded) {
        state.loaded = loaded;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
