import {
    FROM_LANGUAGE_CONTROLLER_ID,
    TO_LANGUAGE_CONTROLLER_ID,
    DICTIONARY,
    BASIC
} from '@/consts';

import { DictionaryProcessor, BasicProcessor } from '@/processors';

import BasicOutput from '@/components/outputs/BasicOutput';
import DictionaryOutput from '@/components/outputs/DictionaryOutput';

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

const getDefaultAvaliableLanguagesPairs = () => [
    'ru-en',
    'en-ru',
    'en-en',
    'ru-ru'
];

export default {
    interfaceSize: 14,
    currentTranslationId: 0,
    loadingState: {
        loading: false
    },
    input: '',
    processors: [new DictionaryProcessor(), new BasicProcessor()],
    history: [],
    languages: getDefaultLanguages(),
    avaliableLanguages: getDefaultAvaliableLanguages(),
    avaliableDictionaryPairs: getDefaultAvaliableLanguagesPairs(),
    translationOutputsMap: {
        [BASIC]: BasicOutput,
        [DICTIONARY]: DictionaryOutput
    }
};
