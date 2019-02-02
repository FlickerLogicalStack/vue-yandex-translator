import {
    SET_LANGUAGE_BY_CONTROLLER_ID,
    ADD_TRANSLATION,
    SET_AVALIABLE_LANGUAGES,
    INCREMENT_CURRENT_TRANSLATION_ID,
    SET_LOADING_STATE,
    TRANSLATE_ACTION,
    SWAP_LANGUAGES_ACTION,
    GET_AVALIABLE_LANGUAGES_ACTION,
    SET_TRANSLATION_ID,
    TRY_TO_LOAD_EXISTING_TRANSLATION
} from './types';

import { fetchAvaliableLanguages } from '@/api';

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
    [TRANSLATE_ACTION]({ state, commit, dispatch }, { text, lang }) {
        dispatch(INCREMENT_CURRENT_TRANSLATION_ID);
        commit(SET_LOADING_STATE, true);

        state.processors.forEach(processor =>
            processor.translate(text, lang).then(response => {
                if (processor.isValid(response)) {
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
    },
    [TRY_TO_LOAD_EXISTING_TRANSLATION]({ state, commit }, { input, lang }) {
        const translationWithTheSameInput = state.history.find(
            translation =>
                translation.input === input && translation.lang === lang
        );

        if (translationWithTheSameInput) {
            commit(
                SET_TRANSLATION_ID,
                translationWithTheSameInput.translationId
            );
        }
    }
};
