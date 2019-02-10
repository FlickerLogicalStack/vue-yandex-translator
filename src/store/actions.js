import {
    SET_NEW_TRANSLATION_ID_ACTION,
    TRANSLATE_ACTION,
    SWAP_LANGUAGES_ACTION,
    FETCH_AVALIABLE_LANGUAGES_ACTION,
    FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION,
    TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION,
    ERASE_ALL_DATA_ACTION,
    INCREMENT_INTERFACE_SIZE_ACTION
} from './types/actions';

import {
    SET_TRANSLATION_ID,
    SET_LOADING_STATE,
    ADD_TRANSLATION_TO_HISTORY,
    SET_LANGUAGE_BY_CONTROLLER_ID,
    SET_AVALIABLE_LANGUAGES,
    SET_AVALIABLE_LANGUAGES_PAIRS,
    SET_INPUT,
    CLEAR_TRANSLATION_HISTORY,
    INCREMENT_INTERFACE_SIZE
} from './types/mutations';

import { fetchAvaliableLanguages, fetchAvaliableDicionaryPairs } from '@/api';

import {
    VUEX_PERSISTEDSTATE_KEY,
    NO_TRANSITION_CLASS_NAME,
    FONT_SIZE_PROPERTY_NAME
} from '@/consts';

export default {
    [SET_NEW_TRANSLATION_ID_ACTION]({ state, commit }) {
        commit(
            SET_TRANSLATION_ID,
            Math.max(
                ...state.history.map(translation => translation.translationId),
                state.currentTranslationId
            ) + 1
        );
    },

    [TRANSLATE_ACTION]({ state, commit, dispatch, getters }) {
        dispatch(SET_NEW_TRANSLATION_ID_ACTION);
        commit(SET_LOADING_STATE, true);

        state.processors.forEach(processor => {
            if (
                processor.isValidPair(
                    getters.lang,
                    state.avaliableLanguagesPairs
                )
            )
                processor
                    .translate(state.input, getters.lang)
                    .then(response => {
                        if (processor.isValidResponse(response.output)) {
                            commit(ADD_TRANSLATION_TO_HISTORY, {
                                translationId: state.currentTranslationId,
                                processorId: processor.id,
                                ...response
                            });

                            commit(SET_LOADING_STATE, false);
                        }
                    });
        });
    },

    [SWAP_LANGUAGES_ACTION]({ state, commit }) {
        const reversedCurrentLanguages = JSON.parse(
            JSON.stringify(state.languages.map(language => language.languageId))
        ).reverse();

        state.languages.forEach((language, index) => {
            commit(SET_LANGUAGE_BY_CONTROLLER_ID, {
                controllerId: language.controllerId,
                languageId: reversedCurrentLanguages[index]
            });
        });
    },

    [FETCH_AVALIABLE_LANGUAGES_ACTION]({ state, commit }) {
        commit(SET_LOADING_STATE, true);

        fetchAvaliableLanguages()
            .then(({ langs }) => {
                const languagesAsStrings = Object.entries(langs)
                    .map(([id, title]) => `${title}-${id}`)
                    .sort()
                    .map(lang => lang.split('-'));

                commit(
                    SET_AVALIABLE_LANGUAGES,
                    languagesAsStrings.map(([title, id]) => ({
                        languageId: id,
                        title: title
                    }))
                );
            })
            .finally(() => commit(SET_LOADING_STATE, false));
    },

    [FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION]({ state, commit }) {
        commit(SET_LOADING_STATE, true);

        fetchAvaliableDicionaryPairs()
            .then(response => commit(SET_AVALIABLE_LANGUAGES_PAIRS, response))
            .finally(() => commit(SET_LOADING_STATE, false));
    },

    [TRY_TO_LOAD_EXISTING_TRANSLATION_ACTION]({ state, commit, getters }) {
        const translationWithTheSameInput = state.history.find(
            translation =>
                translation.input === state.input &&
                translation.lang === getters.lang
        );

        if (translationWithTheSameInput) {
            commit(
                SET_TRANSLATION_ID,
                translationWithTheSameInput.translationId
            );
        }
    },

    [ERASE_ALL_DATA_ACTION]({ commit }) {
        commit(SET_INPUT, '');
        commit(CLEAR_TRANSLATION_HISTORY);
        commit(SET_TRANSLATION_ID, 0);
        commit(SET_LOADING_STATE, false);

        delete window.localStorage[VUEX_PERSISTEDSTATE_KEY];
    },

    [INCREMENT_INTERFACE_SIZE_ACTION]({ state, commit }, value) {
        commit(INCREMENT_INTERFACE_SIZE, value);

        document.body.classList.add(NO_TRANSITION_CLASS_NAME);

        setTimeout(() => {
            document
                .querySelector(':root')
                .style.setProperty(
                    FONT_SIZE_PROPERTY_NAME,
                    `${state.interfaceSize}px`
                );

            setTimeout(() => {
                document.body.classList.remove(NO_TRANSITION_CLASS_NAME);
            }, 10);
        }, 50);
    }
};
