import Vue from 'vue';
import Vuex from 'vuex';
import {
    FROM_LANGUAGE_CONTROLLER_ID,
    TO_LANGUAGE_CONTROLLER_ID
} from '@/consts';

import {
    SET_INPUT,
    SET_LANGUAGE_BY_CONTROLLER_ID,
    ADD_TRANSLATION,
    SET_AVALIABLE_LANGUAGES,
    GET_DICTIONARY_LOOKUP,
    GET_TEXT_TRANSLATE
} from './types';

import { DictionaryProcessor, BasicProcessor } from '@/processors';

import { fetchDictionaryTranslation, fetchBasicTranslation } from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        input: '',
        translationTypes: [new DictionaryProcessor(), new BasicProcessor()],
        history: [],
        languages: [
            {
                controlerId: FROM_LANGUAGE_CONTROLLER_ID,
                languageId: 'ru'
            },
            {
                controlerId: TO_LANGUAGE_CONTROLLER_ID,
                languageId: 'en'
            }
        ],
        avaliableLanguages: [
            {
                languageId: 'ru',
                title: 'Russian'
            },
            {
                languageId: 'en',
                title: 'English'
            }
        ]
    },
    mutations: {
        [SET_INPUT](state, { value }) {
            state.input = value;
        },

        [SET_LANGUAGE_BY_CONTROLLER_ID](state, { controlerId, languageId }) {
            const languageForMutation = state.languages.find(
                language => language.controlerId === controlerId
            );

            languageForMutation.languageId = languageId;
        },

        [ADD_TRANSLATION](state, payload) {
            state.history.push(payload);
        },

        [SET_AVALIABLE_LANGUAGES](state, { languages }) {
            state.avaliableLanguages = languages;
        }
    },
    actions: {
        [GET_DICTIONARY_LOOKUP]({ state, commit }, { text, lang }) {
            return fetchDictionaryTranslation({ text, lang }).then(response =>
                commit(ADD_TRANSLATION, response)
            );
        },

        [GET_TEXT_TRANSLATE]({ state, commit }, { text, lang }) {
            return fetchBasicTranslation({
                text,
                lang
            }).then(response => commit(ADD_TRANSLATION, response));
        }
    }
});
