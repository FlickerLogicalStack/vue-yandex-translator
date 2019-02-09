import {
    SET_LANGUAGE_BY_CONTROLLER_ID,
    ADD_TRANSLATION,
    SET_AVALIABLE_LANGUAGES,
    INCREMENT_CURRENT_TRANSLATION_ID,
    SET_LOADING_STATE,
    TRANSLATE_ACTION,
    SWAP_LANGUAGES_ACTION,
    FETCH_AVALIABLE_LANGUAGES_ACTION,
    SET_TRANSLATION_ID,
    TRY_TO_LOAD_EXISTING_TRANSLATION,
    ERASE_ALL_DATA,
    SET_INPUT,
    CLEAR_TRANSLATIONS,
    FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION,
    SET_AVALIABLE_LANGUAGES_PAIRS
} from './types';

import { fetchAvaliableLanguages, fetchAvaliableDicionaryPairs } from '@/api';

import { VUEX_PERSISTEDSTATE_KEY } from '@/consts';

export default {
    [INCREMENT_CURRENT_TRANSLATION_ID]({ state, commit }) {
        commit(
            SET_TRANSLATION_ID,
            Math.max(
                ...state.history.map(translation => translation.translationId),
                state.currentTranslationId
            ) + 1
        );
    },
    [TRANSLATE_ACTION]({ state, commit, dispatch, getters }) {
        dispatch(INCREMENT_CURRENT_TRANSLATION_ID);
        commit(SET_LOADING_STATE, true);

        state.processors.forEach(processor =>
            processor.translate(state.input, getters.lang).then(response => {
                if (processor.isValidResponse(response.output)) {
                    commit(ADD_TRANSLATION, {
                        translationId: state.currentTranslationId,
                        processorId: processor.id,
                        ...response
                    });

                    commit(SET_LOADING_STATE, false);
                }
            })
        );
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
        fetchAvaliableLanguages().then(({ langs }) => {
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
        });
    },
    [FETCH_AVALIABLE_LANGUAGES_PAIRS_ACTION]({ state, commit }) {
        fetchAvaliableDicionaryPairs().then(response =>
            commit(SET_AVALIABLE_LANGUAGES_PAIRS, response)
        );
    },
    [TRY_TO_LOAD_EXISTING_TRANSLATION]({ state, commit, getters }) {
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
    [ERASE_ALL_DATA]({ commit }) {
        commit(SET_INPUT, '');
        commit(CLEAR_TRANSLATIONS);
        commit(SET_TRANSLATION_ID, 0);
        commit(SET_LOADING_STATE, false);

        delete window.localStorage[VUEX_PERSISTEDSTATE_KEY];
    }
};
