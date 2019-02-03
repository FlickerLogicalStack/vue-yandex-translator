export default {
    currentOutput: (state, getters) => {
        if (getters.currentTranslation) {
            const processor = state.processors.find(
                processor =>
                    processor.id === getters.currentTranslation.processorId
            );

            return processor.toOutput(getters.currentTranslation);
        }

        return null;
    },
    currentTranslation: state => {
        const processorsMap = state.processors.reduce((acc, processor) => {
            acc[processor.id] = processor;
            return acc;
        }, {});

        return (
            state.history
                .filter(
                    translation =>
                        translation.translationId === state.currentTranslationId
                )
                .sort(
                    (a, b) =>
                        processorsMap[b.processorId].priority -
                        processorsMap[a.processorId].priority
                )[0] || null
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
                translation.input.trim() === state.input.trim() &&
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
