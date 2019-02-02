import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import { BASIC, VUEX_PERSISTEDSTATE_KEY } from '@/consts';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [
        createPersistedState({
            key: VUEX_PERSISTEDSTATE_KEY,
            paths: [
                'input',
                'history',
                'currentTranslationId',
                'avaliableLanguages',
                'languages'
            ],
            arrayMerger: function(store, saved) {
                return saved.filter(item => item.processorId !== BASIC);
            }
        })
    ]
});
