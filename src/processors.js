import { BASIC, DICTIONARY } from '@/consts.js';

class TranslationProcessor {
    constructor(id, priority) {
        this.id = id;
        this.priority = priority;
    }

    toOutput(translation) {
        return '';
    }
}

export class DictionaryProcessor extends TranslationProcessor {
    constructor() {
        super(DICTIONARY, 10);
    }

    toOutput(translation) {
        return 'LOOKUP';
    }
}

export class BasicProcessor extends TranslationProcessor {
    constructor() {
        super(BASIC, 5);
    }

    toOutput(translation) {
        return 'TRANSLATION';
    }
}
