import { createParams } from '@/utils';

import {
    DICTIONARY_API_KEY,
    TRANSLATER_API_KEY,
    DICTIONARY_ENDPOINT,
    TRANSLATER_ENDPOINT,
    AVALIABLE_LANGUAGES_ENDPOINT,
    AVALIABLE_LANGUAGES_PAIRS_ENDPOINT
} from '@/consts.js';

const url = (base, params) => `${base}?${createParams(params)}`;

export const fetchDictionaryTranslation = ({ text, lang }) => {
    const requestParams = {
        key: DICTIONARY_API_KEY,
        text,
        lang,
        ui: lang.split('-')[0]
    };

    return fetch(url(DICTIONARY_ENDPOINT, requestParams))
        .then(response => response.json())
        .then(json => ({
            lang,
            input: text,
            output: json
        }));
};

export const fetchBasicTranslation = ({ text, lang }) =>
    fetch(TRANSLATER_ENDPOINT, {
        method: 'POST',
        body: createParams({ key: TRANSLATER_API_KEY, text, lang }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(json => ({
            lang,
            input: text,
            output: json
        }));

export const fetchAvaliableLanguages = () =>
    fetch(
        url(AVALIABLE_LANGUAGES_ENDPOINT, { key: TRANSLATER_API_KEY, ui: 'en' })
    ).then(response => response.json());

export const fetchAvaliableDicionaryPairs = () =>
    fetch(
        url(AVALIABLE_LANGUAGES_PAIRS_ENDPOINT, { key: DICTIONARY_API_KEY })
    ).then(response => response.json());
