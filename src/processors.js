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

    isValid(response) {
        return false;
    }
}

export class DictionaryProcessor extends TranslationProcessor {
    constructor() {
        super(DICTIONARY, 10);
    }

    translate(text, lang) {
        return fetchDictionaryTranslation({ text, lang, processor: this });
    }

    toOutput(translation) {
        const c = string => string.charAt(0).toUpperCase() + string.slice(1);

        let result = '';

        translation.output.def.forEach((article, i, arr) => {
            result += `${c(article.pos)}:\n`;

            article.tr.forEach(tr => {
                result += `  • ${c(tr.text)}`;
                if (tr.mean) {
                    result += ` (${tr.mean.map(mean => mean.text).join(', ')})`;
                }
                if (tr.ex) {
                    result += ':\n';
                    result += tr.ex
                        .map(example => `    –  ${c(example.text)}`)
                        .join('.\n');
                }

                result += '\n';
            });
        });

        return result;
    }

    isValid({ output }) {
        return output.def && output.def.length;
    }
}

export class BasicProcessor extends TranslationProcessor {
    constructor() {
        super(BASIC, 5);
    }

    translate(text, lang) {
        return fetchBasicTranslation({ text, lang, processor: this });
    }

    isValid({ output }) {
        return output.text && output.text.length;
    }

    toOutput(translation) {
        return translation.output.text[0];
    }
}
