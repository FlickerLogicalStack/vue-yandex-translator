import {
    FROM_LANGUAGE_CONTROLLER_ID,
    TO_LANGUAGE_CONTROLLER_ID
} from '@/consts';

import { DictionaryProcessor, BasicProcessor } from '@/processors';

const getDefaultLanguages = () => [
    {
        controllerId: FROM_LANGUAGE_CONTROLLER_ID,
        languageId: 'ru'
    },
    {
        controllerId: TO_LANGUAGE_CONTROLLER_ID,
        languageId: 'en'
    }
];

const getDefaultAvaliableLanguages = () => [
    {
        languageId: 'ru',
        title: 'Russian'
    },
    {
        languageId: 'en',
        title: 'English'
    }
];

export default {
    currentTranslationId: 0,
    loadingState: {
        loading: false
    },
    input: '',
    processors: [new DictionaryProcessor(), new BasicProcessor()],
    history: [],
    languages: getDefaultLanguages(),
    avaliableLanguages: getDefaultAvaliableLanguages()
};
