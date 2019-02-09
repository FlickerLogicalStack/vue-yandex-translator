import {
    SET_INPUT,
    SET_LANGUAGE_BY_CONTROLLER_ID,
    ADD_TRANSLATION,
    SET_AVALIABLE_LANGUAGES,
    SET_LOADING_STATE,
    SET_TRANSLATION_ID,
    CLEAR_TRANSLATIONS,
    SET_AVALIABLE_LANGUAGES_PAIRS
} from './types';

export default {
    [SET_INPUT](state, value) {
        state.input = value;
    },

    [SET_LANGUAGE_BY_CONTROLLER_ID](state, { controllerId, languageId }) {
        const languageForMutation = state.languages.find(
            language => language.controllerId === controllerId
        );

        languageForMutation.languageId = languageId;
    },

    [ADD_TRANSLATION](state, payload) {
        const uniqueTranslationIds = state.history.reduce(
            (acc, translation) => acc.add(translation.translationId),
            new Set()
        );

        if (uniqueTranslationIds.size >= 100) state.history.shift();

        state.history.push(
            Object.freeze({
                ...payload,
                translationId: state.currentTranslationId
            })
        );
    },

    [CLEAR_TRANSLATIONS](state) {
        state.history = [];
    },

    [SET_AVALIABLE_LANGUAGES](state, languages) {
        state.avaliableLanguages = languages;
    },

    [SET_TRANSLATION_ID](state, id) {
        state.currentTranslationId = id;
    },

    [SET_LOADING_STATE](state, isLoading) {
        state.loadingState.loading = isLoading;
    },

    [SET_AVALIABLE_LANGUAGES_PAIRS](state, arrayOfPairs) {
        state.avaliableDictionaryPairs = arrayOfPairs;
    }
};
