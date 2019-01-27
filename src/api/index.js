import { createParams } from '@/utils';

import {
    BASIC,
    DICTIONARY,
    DICTIONARY_API_KEY,
    TRANSLATER_API_KEY,
    DICTIONARY_ENDPOINT,
    TRANSLATER_ENDPOINT
} from '@/consts.js';

const apiCall = ({ url, fetchParams, text, lang, translationType }) => {
    return fetch(url)
        .then(response => response.json())
        .then(json => ({
            translationType,
            lang,
            input: text,
            output: json
        }));
};

export const fetchDictionaryTranslation = ({ text, lang }) => {
    const requestParams = { key: DICTIONARY_API_KEY, text, lang };

    return apiCall({
        url: `${DICTIONARY_ENDPOINT}?${createParams(requestParams)}`,
        translationType: DICTIONARY,
        text,
        lang
    });
};

export const fetchBasicTranslation = ({ text, lang }) => {
    const formData = new FormData();
    const requestParams = { key: TRANSLATER_API_KEY, text, lang };

    Object.entries(requestParams).forEach(([key, value]) =>
        formData.append(key, value)
    );

    return apiCall({
        url: TRANSLATER_ENDPOINT,
        fetchParams: {
            method: 'POST',
            body: formData
        },
        translationType: BASIC,
        text,
        lang
    });
};
