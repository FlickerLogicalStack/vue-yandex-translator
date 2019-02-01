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
    SET_LOADING_STATE,
    TRANSLATE_ACTION,
    SWAP_LANGUAGES_ACTION,
    GET_AVALIABLE_LANGUAGES_ACTION
} from './types';

import { DictionaryProcessor, BasicProcessor } from '@/processors';
import { fetchAvaliableLanguages } from '@/api';

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
                controllerId: FROM_LANGUAGE_CONTROLLER_ID,
                languageId: 'ru'
            },
            {
                controllerId: TO_LANGUAGE_CONTROLLER_ID,
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

        [SET_LANGUAGE_BY_CONTROLLER_ID](state, { controllerId, languageId }) {
            const languageForMutation = state.languages.find(
                language => language.controllerId === controllerId
            );

            languageForMutation.languageId = languageId;
        },

        [ADD_TRANSLATION](state, payload) {
            state.history.push({
                ...payload,
                translationId: state.currentTranslationId
            });
        },

        [SET_AVALIABLE_LANGUAGES](state, languages) {
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
        [TRANSLATE_ACTION]({ state, commit, getters }, { text, lang }) {
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
        },
        [SWAP_LANGUAGES_ACTION]({ state, commit }) {
            const reversedCurrentLanguages = JSON.parse(
                JSON.stringify(
                    state.languages.map(language => language.languageId)
                )
            ).reverse();

            state.languages.forEach((language, index) => {
                commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                    controllerId: language.controllerId,
                    languageId: reversedCurrentLanguages[index]
                });
            });
        },
        [GET_AVALIABLE_LANGUAGES_ACTION]({ state, commit }) {
            fetchAvaliableLanguages().then(({ langs }) => {
                const languagesAsStrings = Object.entries(langs)
                    .map(([id, title]) => `${title}-${id}`)
                    .sort();

                commit(
                    SET_AVALIABLE_LANGUAGES,
                    languagesAsStrings.map(lang => ({
                        languageId: lang.split('-')[1],
                        title: lang.split('-')[0]
                    }))
                );
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
