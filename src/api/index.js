import { createParams } from '@/utils';

import {
    BASIC,
    DICTIONARY,
    DICTIONARY_API_KEY,
    TRANSLATER_API_KEY,
    DICTIONARY_ENDPOINT,
    TRANSLATER_ENDPOINT
} from '@/consts.js';

const apiCall = ({ url, fetchParams, text, lang, translationTypeId }) => {
    return fetch(url, fetchParams)
        .then(response => response.json())
        .then(json => ({
            translationTypeId,
            lang,
            input: text,
            output: json
        }));
};

export const fetchDictionaryTranslation = ({ text, lang }) => {
    const requestParams = { key: DICTIONARY_API_KEY, text, lang };

    return apiCall({
        url: `${DICTIONARY_ENDPOINT}?${createParams(requestParams)}`,
        translationTypeId: DICTIONARY,
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
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
            }
        },
        translationTypeId: BASIC,
        text,
        lang
    });
};
