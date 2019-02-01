import { BASIC, DICTIONARY } from '@/consts.js';
import { fetchDictionaryTranslation, fetchBasicTranslation } from '@/api';

class TranslationProcessor {
    constructor(id, priority) {
        this.id = id;
        this.priority = priority;
    }

    toOutput(translation) {
        return '';
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

    toOutput(translation) {
        return `LOOKUP (${translation.translationId})`;
    }

    translate(text, lang) {
        return fetchDictionaryTranslation({ text, lang });
    }

    isValid({ output }) {
        return output.def && output.def.length;
    }
}

export class BasicProcessor extends TranslationProcessor {
    constructor() {
        super(BASIC, 5);
    }

    toOutput(translation) {
        return 'TRANSLATION';
    }

    translate(text, lang) {
        return fetchBasicTranslation({ text, lang });
    }

    isValid({ output }) {
        return output.text && output.text.length;
    }
}
