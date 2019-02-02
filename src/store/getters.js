export default {
    currentTranslationOutput: (state, getters) => {
        const processorsMap = state.processors.reduce((acc, processor) => {
            acc[processor.id] = processor;
            return acc;
        }, {});

        if (getters.currentTranslations.length) {
            const mainTranslation = getters.currentTranslations.sort(
                (a, b) =>
                    processorsMap[b.processorId].priority -
                    processorsMap[a.processorId].priority
            )[0];

            return processorsMap[mainTranslation.processorId].toOutput(
                mainTranslation
            );
        }

        return null;
    },
    currentTranslations: state => {
        return state.history.filter(
            translation =>
                translation.translationId === state.currentTranslationId
        );
    },
    languageByContollerId: state => controllerId => {
        const languageId = state.languages.find(
            language => language.controllerId === controllerId
        ).languageId;

        return state.avaliableLanguages.find(
            language => language.languageId === languageId
        );
    },
    alreadyTranslated: state => {
        return state.history.filter(
            translation =>
                translation.input === state.input &&
                translation.lang ===
                    state.languages
                        .map(language => language.languageId)
                        .join('-')
        );
    },
    lang: state =>
        state.languages.map(language => language.languageId).join('-'),

    isTranslationRequired: (state, getters) => {
        return !!(
            state.input &&
            !state.loadingState.loading &&
            !getters.alreadyTranslated.length
        );
    }
};
