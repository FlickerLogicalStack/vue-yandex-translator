import {
    SET_INPUT,
    SET_LANGUAGE_BY_CONTROLLER_ID,
    ADD_TRANSLATION,
    CLEAR_TRANSLATIONS,
    SET_AVALIABLE_LANGUAGES,
    SET_TRANSLATION_ID,
    SET_LOADING_STATE,
    SET_AVALIABLE_LANGUAGES_PAIRS,
    INCREMENT_INTERFACE_SIZE
} from './types/mutations';

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
    },

    [INCREMENT_INTERFACE_SIZE](state, value) {
        state.interfaceSize += value;
    }
};
