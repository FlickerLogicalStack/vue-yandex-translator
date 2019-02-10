import { createParams } from '@/utils';

import {
    DICTIONARY_API_KEY,
    TRANSLATER_API_KEY,
    DICTIONARY_ENDPOINT,
    TRANSLATER_ENDPOINT,
    AVALIABLE_LANGUAGES_ENDPOINT,
    AVALIABLE_LANGUAGES_PAIRS_ENDPOINT
} from '@/consts.js';

const apiCall = ({ url, fetchParams, text, lang }) => {
    return fetch(url, fetchParams)
        .then(response => response.json())
        .then(json => ({
            lang,
            input: text,
            output: json
        }));
};

export const fetchDictionaryTranslation = ({ text, lang }) => {
    const requestParams = {
        key: DICTIONARY_API_KEY,
        text,
        lang,
        ui: lang.split('-')[0]
    };

    return apiCall({
        url: `${DICTIONARY_ENDPOINT}?${createParams(requestParams)}`,
        text,
        lang
    });
};

export const fetchBasicTranslation = ({ text, lang }) => {
    const requestParams = { key: TRANSLATER_API_KEY, text, lang };

    return apiCall({
        url: TRANSLATER_ENDPOINT,
        fetchParams: {
            method: 'POST',
            body: createParams(requestParams),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        },
        text,
        lang
    });
};

export const fetchAvaliableLanguages = () => {
    const requestParams = { key: TRANSLATER_API_KEY, ui: 'en' };

    return fetch(`${AVALIABLE_LANGUAGES_ENDPOINT}?${createParams(requestParams)}`).then(
        response => response.json()
    );
};

export const fetchAvaliableDicionaryPairs = () => {
    const requestParams = { key: DICTIONARY_API_KEY };

    return fetch(
        `${AVALIABLE_LANGUAGES_PAIRS_ENDPOINT}?${createParams(requestParams)}`
    ).then(response => response.json());
};
