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
    INCREMENT_CURRENT_TRANSLATION_ID,
    SET_LOADING_STATE
} from './types';

import { DictionaryProcessor, BasicProcessor } from '@/processors';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentTranslationId: 0,
        loadingState: {
            loading: false
        },

        input: '',
        processors: [new DictionaryProcessor(), new BasicProcessor()],
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
            state.history.push({
                ...payload,
                translationId: state.currentTranslationId
            });
        },

        [SET_AVALIABLE_LANGUAGES](state, { languages }) {
            state.avaliableLanguages = languages;
        },

        [INCREMENT_CURRENT_TRANSLATION_ID](state) {
            state.currentTranslationId++;
        },

        [SET_LOADING_STATE](state, isLoading) {
            state.loadingState.loading = isLoading;
        }
    },
    actions: {
        translate({ state, commit, getters }, { text, lang }) {
            commit(INCREMENT_CURRENT_TRANSLATION_ID);
            commit(SET_LOADING_STATE, true);

            getters.sortedProcessors.forEach(processor => {
                processor
                    .translate(text, lang)
                    .then(response => {
                        if (processor.isValid(response)) {
                            commit(ADD_TRANSLATION, {
                                translationId: state.currentTranslationId,
                                ...response
                            });

                            commit(SET_LOADING_STATE, false);
                        }
                    })
                    .catch(console.warn);
            });
        }
    },
    getters: {
        sortedProcessors: state =>
            state.processors.sort((a, b) => b.priority - a.priority),

        currentTranslationOutput: state => {
            const currentMainTranslation = state.history
                .filter(
                    translation =>
                        translation.translationId === state.currentTranslationId
                )
                .sort((a, b) => b.priority - a.priority)[0];

            if (currentMainTranslation) {
                return state.processors
                    .find(
                        processor =>
                            processor.id ===
                            currentMainTranslation.translationTypeId
                    )
                    .toOutput(currentMainTranslation);
            }

            return null;
        }
    }
});
