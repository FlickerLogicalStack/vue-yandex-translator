import {
    FROM_LANGUAGE_CONTROLLER_ID,
    TO_LANGUAGE_CONTROLLER_ID,
    DICTIONARY,
    BASIC
} from '@/consts';

import { DictionaryProcessor, BasicProcessor } from '@/processors';

import BasicOutput from '@/components/outputs/BasicOutput';
import DictionaryOutput from '@/components/outputs/DictionaryOutput';

const EN = 'en';
const RU = 'ru';

const getDefaultAvaliableLanguages = () => [
    {
        languageId: RU,
        title: 'Russian'
    },
    {
        languageId: EN,
        title: 'English'
    }
];

const getDefaultLanguages = () => [
    {
        controllerId: FROM_LANGUAGE_CONTROLLER_ID,
        languageId: getDefaultAvaliableLanguages()[0].title
    },
    {
        controllerId: TO_LANGUAGE_CONTROLLER_ID,
        languageId: getDefaultAvaliableLanguages()[1].title
    }
];

const getDefaultAvaliableLanguagesPairs = () => [
    `${EN}-${RU}`,
    `${RU}-${EN}`,
    `${EN}-${EN}`,
    `${RU}-${RU}`
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
    avaliableLanguagesPairs: getDefaultAvaliableLanguagesPairs(),
    translationOutputsMap: {
        [BASIC]: BasicOutput,
        [DICTIONARY]: DictionaryOutput
    }
};
