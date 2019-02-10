import { BASIC, DICTIONARY } from '@/consts.js';
import { fetchDictionaryTranslation, fetchBasicTranslation } from '@/api';

class TranslationProcessor {
    constructor(id, priority) {
        this.id = id;
        this.priority = priority;
    }

    toOutput(translation) {
        return JSON.stringify(translation.output, null, 4);
    }

    translate(text, lang) {
        return new Promise((resolve, reject) => {});
    }

    isValidResponse(response) {
        return false;
    }

    isValidPair(pair, storeState) {
        return false;
    }
}

export class DictionaryProcessor extends TranslationProcessor {
    constructor() {
        super(DICTIONARY, 10);
    }

    translate(text, lang) {
        return fetchDictionaryTranslation({
            text,
            lang
        });
    }

    toOutput(translation) {
        const c = string => string.charAt(0).toUpperCase() + string.slice(1);

        const result = [];

        translation.output.def.forEach(ipart => {
            const part = { text: c(ipart.pos), groups: [] };

            (ipart.tr || []).forEach(itr => {
                const tr = {
                    text: c(itr.text),
                    groups: [],
                    collapsed: true,
                    isWord: true
                };

                if (itr.syn)
                    tr.groups.push({
                        text: 'Synonyms',
                        groups: (itr.syn || []).map(isyn => ({
                            text: c(isyn.text)
                        }))
                    });

                if (itr.mean)
                    tr.groups.push({
                        text: 'Meaning',
                        groups: (itr.mean || []).map(iex => ({
                            text: c(iex.text)
                        }))
                    });

                if (itr.ex)
                    tr.groups.push({
                        text: 'Examples',
                        isWord: true,
                        groups: (itr.ex || []).map(iex => ({
                            text: c(iex.text),
                            collapsed: true,
                            isWord: true,
                            groups: (iex.tr || []).map(i => ({
                                text: c(i.text)
                            }))
                        }))
                    });

                part.groups.push(tr);
            });

            result.push(part);
        });

        return result;
    }

    isValidResponse(response) {
        return response.def && response.def.length;
    }

    isValidPair(pair, pairs) {
        return pairs.includes(pair);
    }
}

export class BasicProcessor extends TranslationProcessor {
    constructor() {
        super(BASIC, 5);
    }

    translate(text, lang) {
        return fetchBasicTranslation({
            text,
            lang
        });
    }

    isValidResponse(response) {
        return response.text && response.text.length;
    }

    toOutput(translation) {
        return translation.output.text[0];
    }

    isValidPair(pair, pairs) {
        return true;
    }
}
